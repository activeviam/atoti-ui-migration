import type {
  Cube,
  DataVisualizationWidgetMapping,
} from "@activeviam/activeui-sdk";
import {
  isMdxCompoundIdentifier,
  isMdxFunction,
  parse,
} from "@activeviam/activeui-sdk";
import { getSpecificCompoundIdentifier } from "@activeviam/mdx";
import { getTreeColumnKey } from "./getTreeColumnKey";
import { getLevelIndex } from "@activeviam/data-model";
import _max from "lodash/max";
import _groupBy from "lodash/groupBy";
import _sum from "lodash/sum";

interface LegacyColumn {
  key: string;
  width?: number;
}

/**
 * Returns the sum of the deepest level per hierarchy found on the rows axis.
 *
 */
function getTotalRowLevelDepth({
  cube,
  mapping,
}: {
  cube: Cube;
  mapping: DataVisualizationWidgetMapping;
}) {
  const maxLevelDepthPerHierarchy = mapping.rows.reduce(
    (levelDepthPerHierarchy: { [hierarchyName: string]: number }, row) => {
      switch (row.type) {
        case "hierarchy": {
          const { dimensionName, hierarchyName } = row;
          const levelName = row.expandedDownTo
            ? row.expandedDownTo
            : row.levelName;

          const currentDeepestLevelForHierarchy =
            levelDepthPerHierarchy[hierarchyName];

          const maxLevelDepthForCurrentRow = getLevelIndex({
            cube,
            dimensionName,
            hierarchyName,
            levelName,
          });

          if (currentDeepestLevelForHierarchy === undefined) {
            levelDepthPerHierarchy[hierarchyName] = maxLevelDepthForCurrentRow;
          } else {
            levelDepthPerHierarchy[hierarchyName] =
              _max([
                currentDeepestLevelForHierarchy,
                maxLevelDepthForCurrentRow,
              ]) || currentDeepestLevelForHierarchy;
          }
          break;
        }

        case "compositeHierarchy": {
          const groupedHierarchies = _groupBy(row.hierarchies, "hierarchyName");
          Object.entries(groupedHierarchies).forEach(([hierarchyName, row]) => {
            const currentDeepestLevelForHierarchy =
              levelDepthPerHierarchy[hierarchyName];
            const maxLevelDepthForHierarchy = _max(
              row.map((level) => {
                const { dimensionName } = level;
                const levelName = level.expandedDownTo
                  ? level.expandedDownTo
                  : level.levelName;

                return getLevelIndex({
                  cube,
                  dimensionName,
                  hierarchyName,
                  levelName,
                });
              }),
            );

            if (currentDeepestLevelForHierarchy === undefined) {
              levelDepthPerHierarchy[hierarchyName] =
                maxLevelDepthForHierarchy || 1;
            } else {
              levelDepthPerHierarchy[hierarchyName] =
                _max([
                  currentDeepestLevelForHierarchy,
                  maxLevelDepthForHierarchy,
                ]) || currentDeepestLevelForHierarchy;
            }
          });
        }
      }

      return levelDepthPerHierarchy;
    },
    {},
  );

  return _sum(Object.values(maxLevelDepthPerHierarchy));
}

/**
 * Returns the converted table column widths, ready to be used in the widget state of a {@link TableWidgetPlugin} in ActiveUI 5.
 */
export function _migrateTableColumnWidths({
  legacyColumns = [],
  mapping,
  cube,
  treeTableColumnWidth,
}: {
  legacyColumns: LegacyColumn[];
  mapping: DataVisualizationWidgetMapping;
  cube: Cube;
  treeTableColumnWidth?: [number, number];
}): { [columnKey: string]: number } {
  const columnWidths: { [columnKey: string]: number } = {};
  const rowLevelDepth = getTotalRowLevelDepth({ cube, mapping });

  if (
    (legacyColumns === undefined || legacyColumns.length === 0) &&
    treeTableColumnWidth
  ) {
    const columnKey = getTreeColumnKey({
      mapping,
      cube,
    });

    const [baseWidth, maxLevelMultiplier] = treeTableColumnWidth;
    columnWidths[columnKey] = baseWidth + rowLevelDepth * maxLevelMultiplier;

    return columnWidths;
  }

  legacyColumns.forEach(({ key, width }) => {
    if (!width) {
      return;
    }

    let columnKey;

    if (key === "[Measures].[Measures].[Measures]") {
      columnKey = "[Measures].[Measures]";
    } else if (key === "c-treeCells-member" && mapping?.rows?.[0]) {
      // Special handling for the tree table column corresponding to all fields mapped on rows.
      // In ActiveUI 5, its column key is the unique id of the first field.
      columnKey = getTreeColumnKey({ mapping, cube });
    } else {
      try {
        // Most column keys are either a level unique name, a member or a tuple.
        const parsedColumnKey = parse(key);
        if (
          isMdxCompoundIdentifier(parsedColumnKey) &&
          ["level", "member", "measure"].includes(
            getSpecificCompoundIdentifier(parsedColumnKey, { cube }).type,
          )
        ) {
          columnKey = key;
        } else if (
          isMdxFunction(parsedColumnKey, "()") &&
          parsedColumnKey.arguments.every(
            (arg) =>
              isMdxCompoundIdentifier(arg) &&
              ["member", "measure"].includes(
                getSpecificCompoundIdentifier(arg, { cube }).type,
              ),
          )
        ) {
          // The column key is a tuple.
          // In ActiveUI 5, it is stripped from its wrapping parentheses.
          columnKey = key.slice(1, key.length - 1);
        }
      } catch {
        // The column key is not an MDX expression.
        // This means that the column does not hold data coming from the widget's MDX query.
        // E.g., the ActiveUI 4 line numbers column.
        // These columns have no equivalent in ActiveUI 5, so they are ignored.
      }
    }

    if (columnKey) {
      const [baseWidth, levelMultiplier] = treeTableColumnWidth || [];
      columnWidths[columnKey] =
        baseWidth && levelMultiplier
          ? baseWidth + levelMultiplier * rowLevelDepth
          : width;
    }
  });

  return columnWidths;
}
