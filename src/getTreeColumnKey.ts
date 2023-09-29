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
}): string | undefined {
  if (mapping.rows.length === 0) {
    return undefined;
  }

  const firstFieldOnRows = mapping.rows[0];

  switch (firstFieldOnRows.type) {
    case "hierarchy": {
      const { dimensionName, hierarchyName } = firstFieldOnRows;
      const hierarchy = mapping.rows[0]
        ? getHierarchy(
            {
              dimensionName,
              hierarchyName,
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
                dimensionName,
                hierarchyName,
                levelName: firstLevelName.name,
              },
              cube,
            )
          : undefined;

      const levelName = firstLevel
        ? firstLevel.name
        : firstFieldOnRows.levelName;

      return quote(dimensionName, hierarchyName, levelName);
    }
    case "compositeHierarchy": {
      const { dimensionName, hierarchyName, levelName } =
        firstFieldOnRows.hierarchies[0];
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
