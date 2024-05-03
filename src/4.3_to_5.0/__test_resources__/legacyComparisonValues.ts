/**
 * The widgetState of a legacy kpi widget with comparisons, useful for unit tests.
 */
export const legacyComparisonValues = {
  name: "Comparison values",
  type: "container",
  value: {
    style: {},
    showTitleBar: true,
    body: {
      serverUrl: "http://localhost:9090",
      mdx: "SELECT NON EMPTY Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])) ON ROWS, NON EMPTY [Measures].[pnl.FOREX] ON COLUMNS, {[Booking].[Desk].[ALL].[AllMember].[LegalEntityA], [Booking].[Desk].[ALL].[AllMember].[LegalEntityB]} ON PAGES FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
      contextValues: {},
      updateMode: "once",
      ranges: {
        row: {
          chunkSize: 20,
          thresholdPercentage: 0.1,
        },
        column: {
          chunkSize: 20,
          thresholdPercentage: 0.1,
        },
      },
      configuration: {
        featuredValues: {
          locations: {
            "[Currency].[Currency].[AllMember].[GBP],[Measures].[pnl.FOREX]": {
              title: "Hello World",
            },
          },
        },
      },
    },
    containerKey: "featured-values",
  },
};
