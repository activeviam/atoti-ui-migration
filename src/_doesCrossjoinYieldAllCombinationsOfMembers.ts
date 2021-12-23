import { Cube, LevelCoordinates } from "@activeviam/data-model";
import {
  findLevels,
  getSpecificCompoundIdentifier,
  isMdxCompoundIdentifier,
  MdxFunction,
} from "@activeviam/mdx";

/**
 * Returns whether `crossjoin` yields all combinations of members of the hierarchies expressed on the axis.
 */
export function _doesCrossjoinYieldAllCombinationsOfMembers(
  crossjoin: MdxFunction & { name: "Crossjoin" },
  { cube, levelsOnAxis }: { cube: Cube; levelsOnAxis: LevelCoordinates[] }
): boolean {
  const levelsInCrossjoin = findLevels(crossjoin, cube);
  // Each level on the axis is represented in the crossjoin, and not only by a specific member of this level.
  // For example:
  // [Geography].[City].[AllMember].[Paris] // does not count
  // [Geography].[City].Members // does count
  return levelsOnAxis.every(({ dimensionName, hierarchyName, levelName }) =>
    levelsInCrossjoin.some(
      (levelInCrossjoin) =>
        levelInCrossjoin.dimensionName === dimensionName &&
        levelInCrossjoin.hierarchyName === hierarchyName &&
        levelInCrossjoin.levelName === levelName &&
        (!isMdxCompoundIdentifier(levelInCrossjoin.match) ||
          getSpecificCompoundIdentifier(levelInCrossjoin.match, { cube })
            ?.type === "level")
    )
  );
}
