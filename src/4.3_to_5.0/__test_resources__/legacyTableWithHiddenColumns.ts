import { LegacyWidgetState } from "../migration.types";

/**
 * The state of a legacy table with Currency and City on rows and contributors.COUNT on columns.
 * The "City" column is hidden.
 */
export const legacyTableWithHiddenColumns: LegacyWidgetState = {
  type: "container",
  name: "Untitled Tabular View",
  value: {
    body: {
      mdx: "SELECT NON EMPTY Crossjoin([Currency].[Currency].[Currency].Members, [Geography].[City].[City].Members) ON ROWS, [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
      configuration: {
        tabular: {
          columns: [
            {
              key: "[Geography].[City].[City]",
              hide: true,
            },
          ],
        },
      },
    },
    containerKey: "tabular-view",
  },
};
