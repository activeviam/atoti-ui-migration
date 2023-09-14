/**
 * The state of a legacy pivot table with dates on columns and one column is hidden.
 */
export const legacyPivotTableWithHiddenColumns = {
  name: "Untitled Pivot Table",
  type: "container",
  value: {
    body: {
      mdx: "SELECT NON EMPTY [Time].[HistoricalDates].[AsOfDate].Members ON COLUMNS, NON EMPTY Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
      configuration: {
        tabular: {
          columns: [
            {
              key: "[Time].[HistoricalDates].[AsOfDate].[2023-09-05]",
              hide: true,
            },
          ],
        },
      },
    },
    containerKey: "pivot-table",
  },
};
