import { Mdx, Cube } from "@activeviam/activeui-sdk-5.0";
import { getLevelIndex } from "@activeviam/data-model-5.0";
import {
  MdxFunction,
  findDescendant,
  getLevels,
  isMdxFunction,
  getIndexOfDeepestLevelExpressedInDescendantsNode,
} from "@activeviam/mdx-5.0";
import { produce } from "immer";
import _set from "lodash/set";

/**
 * If the level down to which descendants are retrieved is the one from the input set or above, then it is equivalent to the set.
 */
const canDescendantsBeReplacedByItsFirstArgument = (
  descendantsNode: MdxFunction,
  cube: Cube,
) => {
  const set = descendantsNode.arguments[0];
  const levelsInSet = getLevels(set, { cube });
  if (levelsInSet.length === 0) {
    return false;
  }

  const { dimensionName, hierarchyName } = levelsInSet[0];

  const levelIndexesInSet = levelsInSet.map((levelCoordinates) =>
    getLevelIndex({ cube, ...levelCoordinates }),
  );
  const shallowestLevelIndexInSet = Math.min(...levelIndexesInSet);
  const deepestLevelIndexInSet = Math.max(...levelIndexesInSet);

  const deepestLevelExpressedInDescendantsNode =
    getIndexOfDeepestLevelExpressedInDescendantsNode({
      descendantsNode,
      dimensionName,
      hierarchyName,
      indexOfDeepestLevelExpressedInInputSet: deepestLevelIndexInSet,
      cube,
    });

  return shallowestLevelIndexInSet >= deepestLevelExpressedInDescendantsNode;
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
