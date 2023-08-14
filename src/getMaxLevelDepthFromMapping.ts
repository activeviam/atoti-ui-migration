import { DataVisualizationWidgetMapping } from "@activeviam/activeui-sdk";
import { quote } from "@activeviam/mdx";

/**
 * Returns the column width for the tree table calculated by the baseWidth + (maxLevelDepth * levelMultiplier)
 */
export function getTreeColumnWidth({
  maxLevelDepth,
  mapping,
  treeTableColumnWidth,
}: {
  mapping: DataVisualizationWidgetMapping;
  maxLevelDepth: number;
  treeTableColumnWidth: [number, number];
}): { [columnKey: string]: number } {
  let columnKey: string;

  switch (mapping.rows[0].type) {
    case "hierarchy": {
      const { dimensionName, hierarchyName, levelName } = mapping.rows[0];
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
