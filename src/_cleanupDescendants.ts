import { Mdx, Cube } from "@activeviam/activeui-sdk";
import { getHierarchy, getLevelIndex } from "@activeviam/data-model";
import {
  MdxFunction,
  findDescendant,
  getHierarchies,
  getLevels,
  isMdxCompoundIdentifier,
  isMdxFunction,
  isMdxLiteral,
  stringify,
} from "@activeviam/mdx";
import { produce } from "immer";
import _set from "lodash/set";

/**
 * If the level down to which descendants are retrieved is the one from the input set or above, then it is equivalent to the set.
 */
const canDescendantsBeReplacedByItsFirstArgument = (
  descendantsNode: MdxFunction,
  cube: Cube,
) => {
  const [set, downToLevel] = descendantsNode.arguments;
  const levelsInSet = getLevels(set, { cube });
  const shallowestLevelIndexInSet = Math.min(
    ...levelsInSet.map((levelCoordinates) =>
      getLevelIndex({ cube, ...levelCoordinates }),
    ),
  );

  if (!downToLevel) {
    // Only the set as argument: check whether it holds only leaf members.
    const hierarchyCoordinates = getHierarchies(set, { cube })[0];
    const hierarchy = getHierarchy(hierarchyCoordinates, cube);
    return shallowestLevelIndexInSet === hierarchy.levels.length - 1;
  }

  let downToLevelIndex;
  if (isMdxLiteral(downToLevel)) {
    downToLevelIndex = parseInt(downToLevel.value, 10);
  } else {
    if (!isMdxCompoundIdentifier(downToLevel)) {
      throw new Error(
        `Invalid second argument of Descendants. Expected a level index or a level unique name, but got: ${stringify(
          downToLevel,
          { indent: true },
        )}`,
      );
    }
    const [dimensionName, hierarchyName, levelName] =
      downToLevel.identifiers.map((identifier) => identifier.value);
    downToLevelIndex = getLevelIndex({
      cube,
      dimensionName,
      hierarchyName,
      levelName,
    });
  }

  return shallowestLevelIndexInSet >= downToLevelIndex;
};

/**
 * Returns a new MDX where the relevant Descendants function nodes are replaced by their respective input set.
 *
 * @example
 * Descendants([Currency].[Currency].[ALL].[AllMember].[EUR], [Currency].[Currency].[Currency]) => [Currency].[Currency].[ALL].[AllMember].[EUR]
 *
 */
export function _cleanupDescendants<T extends Mdx>(mdx: T, cube: Cube): T {
  return produce(mdx, (draft) => {
    let nextNodeToCleanup;
    while (
      (nextNodeToCleanup = findDescendant(
        draft,
        (node) =>
          isMdxFunction(node, "descendants") &&
          canDescendantsBeReplacedByItsFirstArgument(node, cube),
      ))
    ) {
      const { match, path } = nextNodeToCleanup;
      _set(draft, path, (match as MdxFunction).arguments[0]);
    }
  });
}
