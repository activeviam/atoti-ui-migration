import type {
  Cube,
  DataVisualizationWidgetMapping,
} from "@activeviam/activeui-sdk-5.0";
import {
  isMdxCompoundIdentifier,
  isMdxFunction,
  parse,
} from "@activeviam/activeui-sdk-5.0";
import { getSpecificCompoundIdentifier } from "@activeviam/mdx-5.0";
import { getTreeColumnKey } from "./getTreeColumnKey";
import { _getLevelDepthOnRows } from "./_getLevelDepthOnRows";

interface LegacyColumn {
  key: string;
  width?: number;
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
  const levelDepthOnRows = _getLevelDepthOnRows({ cube, mapping });

  if (
    (legacyColumns === undefined || legacyColumns.length === 0) &&
    treeTableColumnWidth
  ) {
    const columnKey = getTreeColumnKey({
      mapping,
      cube,
    });

    const [baseWidth, maxLevelMultiplier] = treeTableColumnWidth;
    columnWidths[columnKey] = baseWidth + levelDepthOnRows * maxLevelMultiplier;

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
      columnWidths[columnKey] = width;
    }
  });

  return columnWidths;
}
