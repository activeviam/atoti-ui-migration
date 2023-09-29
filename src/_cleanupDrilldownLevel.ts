import { Mdx, Cube } from "@activeviam/activeui-sdk";
import { getHierarchy, getLevelIndex, areHierarchiesEqual } from "@activeviam/data-model";
import {
  MdxFunction,
  findDescendant,
  getHierarchies,
  getLevels,
  isMdxFunction,
} from "@activeviam/mdx";
import { produce } from "immer";
import _set from "lodash/set";

/**
 * A DrilldownLevel can be replaced by its first argument if both the following conditions are met:
 * - It has a single argument, which is a set.
 * - In this set, the deepest level expressed in the first hierarchy (which is the one being implicitly drilled) is a leaf level (and therefore cannot be drilled down)
 */
const canDrilldownLevelBeReplacedByItsFirstArgument = (
  drilldownLevelNode: MdxFunction,
  cube: Cube,
) => {
  const [set, ...otherArguments] = drilldownLevelNode.arguments;
  if (otherArguments.length > 0) {
    // Do not attempt to cleanup the more complex DrilldownLevel expressions.
    return false;
  }

  const hierarchyCoordinates = getHierarchies(set, { cube })[0];
  const hierarchy = getHierarchy(hierarchyCoordinates, cube);

  const levelsInSet = getLevels(set, {
    cube,
  }).filter((levelCoordinates) =>
    areHierarchiesEqual(levelCoordinates, hierarchyCoordinates),
  );
  const deepestLevelIndexInSet = Math.max(
    ...levelsInSet.map((levelCoordinates) =>
      getLevelIndex({ cube, ...levelCoordinates }),
    ),
  );

  return deepestLevelIndexInSet === hierarchy.levels.length - 1;
};

/**
 * Returns a new MDX where the relevant DrilldownLevel function nodes are replaced by their respective input set.
 *
 * @example
 * DrilldownLevel([Currency].[Currency].[ALL].[AllMember].[EUR]) => [Currency].[Currency].[ALL].[AllMember].[EUR]
 *
 */
export function _cleanupDrilldownLevel<T extends Mdx>(mdx: T, cube: Cube): T {
  return produce(mdx, (draft) => {
    let nextNodeToCleanup;
    while (
      (nextNodeToCleanup = findDescendant(
        draft,
        (node) =>
          isMdxFunction(node, "drilldownlevel") &&
          canDrilldownLevelBeReplacedByItsFirstArgument(node, cube),
      ))
    ) {
      const { match, path } = nextNodeToCleanup;
      _set(draft, path, (match as MdxFunction).arguments[0]);
    }
  });
}
