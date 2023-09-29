import { Mdx, Cube } from "@activeviam/activeui-sdk";
import { getHierarchy, getLevelIndex } from "@activeviam/data-model";
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
 * If the input set holds members of the leaf level, then DrilldownLevel can be replaced by it.
 */
const canDrilldownLevelBeReplacedByItsFirstArgument = (
  drilldownLevelNode: MdxFunction,
  cube: Cube,
) => {
  const set = drilldownLevelNode.arguments[0];
  const levelsInSet = getLevels(set, { cube });
  const deepestLevelIndexInSet = Math.max(
    ...levelsInSet.map((levelCoordinates) =>
      getLevelIndex({ cube, ...levelCoordinates }),
    ),
  );
  const hierarchyCoordinates = getHierarchies(set, { cube })[0];
  const hierarchy = getHierarchy(hierarchyCoordinates, cube);
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
