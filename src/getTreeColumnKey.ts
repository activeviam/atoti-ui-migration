import {
  Cube,
  DataVisualizationWidgetMapping,
  getHierarchy,
  getLevel,
} from "@activeviam/activeui-sdk";
import { quote } from "@activeviam/mdx";

/**
 * Returns the column key to be used for mapping column widths to their respective columns.
 */
export function getTreeColumnKey({
  mapping,
  cube,
}: {
  mapping: DataVisualizationWidgetMapping;
  cube: Cube;
}): string {
  switch (mapping.rows[0].type) {
    case "hierarchy": {
      const hierarchy = mapping.rows[0]
        ? getHierarchy(
            {
              dimensionName: mapping.rows[0].dimensionName,
              hierarchyName: mapping.rows[0].hierarchyName,
            },
            cube,
          )
        : undefined;

      const firstLevelName =
        hierarchy && hierarchy.levels[hierarchy.slicing ? 0 : 1];
      const firstLevel =
        firstLevelName && mapping.rows[0]
          ? getLevel(
              {
                dimensionName: mapping.rows[0].dimensionName,
                hierarchyName: mapping.rows[0].hierarchyName,
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
      throw new Error(`Cannot get the key of the tree column, because the type of the first item on rows is "${mapping.rows[0].type}". Expected "hierarchy", "compositeHierarchy" or "allMeasures"`);
    }
  }
}
