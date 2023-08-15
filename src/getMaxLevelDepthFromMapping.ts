import {
  Cube,
  DataVisualizationWidgetMapping,
  LevelCoordinates,
  getHierarchy,
  getLevel,
} from "@activeviam/activeui-sdk";
import { quote } from "@activeviam/mdx";

/**
 * Returns the column width for the tree table calculated by the baseWidth + (maxLevelDepth * levelMultiplier)
 */
export function getTreeColumnWidth({
  maxLevelDepth,
  mapping,
  treeTableColumnWidth,
  columnLevels,
  cube,
}: {
  mapping: DataVisualizationWidgetMapping;
  maxLevelDepth: number;
  treeTableColumnWidth: [number, number];
  columnLevels: LevelCoordinates[];
  cube: Cube;
}): { [columnKey: string]: number } {
  let columnKey: string;

  switch (mapping.rows[0].type) {
    case "hierarchy": {
      const hierarchy = columnLevels[0]
        ? getHierarchy(
            {
              dimensionName: columnLevels[0].dimensionName,
              hierarchyName: columnLevels[0].hierarchyName,
            },
            cube,
          )
        : undefined;

      const firstLevelName = hierarchy && hierarchy.levels[1];
      const firstLevel =
        firstLevelName && columnLevels[0]
          ? getLevel(
              {
                dimensionName: columnLevels[0].dimensionName,
                hierarchyName: columnLevels[0].hierarchyName,
                levelName: firstLevelName.name,
              },
              cube,
            )
          : undefined;

      const { dimensionName, hierarchyName } = mapping.rows[0];

      const levelName = firstLevel
        ? firstLevel.name
        : mapping.rows[0].levelName;

      columnKey = quote(dimensionName, hierarchyName, levelName);
      break;
    }
    case "compositeHierarchy": {
      const { dimensionName, hierarchyName, levelName } =
        mapping.rows[0].hierarchies[0];
      columnKey = quote(dimensionName, hierarchyName, levelName);
      break;
    }
    case "allMeasures": {
      columnKey = "[Measures].[Measures]";
      break;
    }
    default: {
      throw new Error("A measure cannot be mapped on an ordinal field.");
    }
  }

  const [baseWidth, maxLevelMultiplier] = treeTableColumnWidth;
  return { [columnKey]: baseWidth + maxLevelDepth * maxLevelMultiplier };
}
