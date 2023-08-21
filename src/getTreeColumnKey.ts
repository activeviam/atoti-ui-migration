import {
  Cube,
  DataVisualizationWidgetMapping,
  LevelCoordinates,
  getHierarchy,
  getLevel,
} from "@activeviam/activeui-sdk";
import { quote } from "@activeviam/mdx";

/**
 * Returns the column key to be used for mapping column widths to their respective columns.
 */
export function getTreeColumnKey({
  mapping,
  rowLevels,
  cube,
}: {
  mapping: DataVisualizationWidgetMapping;
  rowLevels: LevelCoordinates[];
  cube: Cube;
}): string {
  switch (mapping.rows[0].type) {
    case "hierarchy": {
      const hierarchy = rowLevels[0]
        ? getHierarchy(
            {
              dimensionName: rowLevels[0].dimensionName,
              hierarchyName: rowLevels[0].hierarchyName,
            },
            cube,
          )
        : undefined;

      const firstLevelName = hierarchy && hierarchy.levels[1];
      const firstLevel =
        firstLevelName && rowLevels[0]
          ? getLevel(
              {
                dimensionName: rowLevels[0].dimensionName,
                hierarchyName: rowLevels[0].hierarchyName,
                levelName: firstLevelName.name,
              },
              cube,
            )
          : undefined;

      const { dimensionName, hierarchyName } = mapping.rows[0];

      const levelName = firstLevel
        ? firstLevel.name
        : mapping.rows[0].levelName;

      return quote(dimensionName, hierarchyName, levelName);
    }
    case "compositeHierarchy": {
      const { dimensionName, hierarchyName, levelName } =
        mapping.rows[0].hierarchies[0];
      return quote(dimensionName, hierarchyName, levelName);
    }
    case "allMeasures": {
      return "[Measures].[Measures]";
    }
    default: {
      throw new Error("A measure cannot be mapped on an ordinal field.");
    }
  }
}
