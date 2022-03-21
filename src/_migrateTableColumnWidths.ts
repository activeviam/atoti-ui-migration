import type {
  Cube,
  DataVisualizationWidgetMapping,
} from "@activeviam/activeui-sdk";
import {
  isMdxCompoundIdentifier,
  isMdxFunction,
  parse,
  quote,
} from "@activeviam/activeui-sdk";
import { getSpecificCompoundIdentifier } from "@activeviam/mdx";

interface LegacyColumn {
  key: string;
  width?: number;
}

/**
 * Returns the converted table column widths, ready to be used in the widget state of a {@link TableWidgetPlugin} in ActiveUI 5.
 */
export function _migrateTableColumnWidths({
  legacyColumns,
  mapping,
  cube,
}: {
  legacyColumns: LegacyColumn[];
  mapping: DataVisualizationWidgetMapping;
  cube: Cube;
}): { [columnKey: string]: number } {
  const columnWidths: { [columnKey: string]: number } = {};
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
      switch (mapping.rows[0].type) {
        case "allMeasures": {
          columnKey = "[Measures].[Measures]";
          break;
        }
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
        default: {
          throw new Error("A measure cannot be mapped on an ordinal field.");
        }
      }
    } else {
      try {
        // Most column keys are either a level unique name, a member or a tuple.
        const parsedColumnKey = parse(key);
        if (
          isMdxCompoundIdentifier(parsedColumnKey) &&
          ["level", "member", "measure"].includes(
            getSpecificCompoundIdentifier(parsedColumnKey, { cube }).type
          )
        ) {
          columnKey = key;
        } else if (
          isMdxFunction(parsedColumnKey, "()") &&
          parsedColumnKey.arguments.every(
            (arg) =>
              isMdxCompoundIdentifier(arg) &&
              ["member", "measure"].includes(
                getSpecificCompoundIdentifier(arg, { cube }).type
              )
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
