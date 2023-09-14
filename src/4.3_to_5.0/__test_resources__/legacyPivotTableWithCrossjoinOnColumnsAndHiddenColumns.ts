/**
 * The state of a legacy pivot table with Dates, LegalEntities, pnl.FOREX and pnl.SUM on columns and one column is hidden.
 */
export const legacyPivotTableWithCrossjoinOnColumnsAndHiddenColumns = {
  name: "Untitled Pivot Table",
  type: "container",
  value: {
    body: {
      mdx: "SELECT NON EMPTY Crossjoin([Time].[HistoricalDates].[AsOfDate].Members, Hierarchize(DrilldownLevel([Booking].[Desk].[ALL].[AllMember])), {[Measures].[pnl.FOREX], [Measures].[pnl.SUM]}) ON COLUMNS, NON EMPTY Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
      configuration: {
        tabular: {
          columns: [
            {
              key: "([Time].[HistoricalDates].[AsOfDate].[2023-09-05],[Booking].[Desk].[ALL].[AllMember].[LegalEntityA],[Measures].[pnl.FOREX])",
              hide: true,
            },
          ],
        },
      },
    },
    containerKey: "pivot-table",
  },
};
