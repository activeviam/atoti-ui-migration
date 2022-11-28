/**
 * The widgetState of a legacy scatter plot, useful for unit tests.
 */
export const legacyScatterPlot = {
  name: "Legacy scatter plot",
  type: "container",
  value: {
    style: {},
    showTitleBar: true,
    body: {
      configuration: {
        type: "scatter",
        mapping: {
          x: {
            from: "[Measures].[contributors.COUNT]",
          },
          y: {
            from: "[Measures].[pnl.FOREX]",
          },
          cardinality: {
            from: ["[Currency].[Currency].[Currency]"],
          },
          r: {
            from: "[Measures].[pnl.FOREX]",
          },
          color: {
            from: ["[Booking].[Desk].[LegalEntity]"],
          },
        },
      },
      query: {
        serverUrl: "http://localhost:9090",
        mdx:
          "SELECT {[Measures].[contributors.COUNT], [Measures].[pnl.FOREX]} ON COLUMNS, NON EMPTY Crossjoin([Currency].[Currency].[Currency].Members, [Booking].[Desk].[LegalEntity].Members) ON ROWS FROM [EquityDerivativesCube]",
        contextValues: {},
        updateMode: "once",
      },
    },
    containerKey: "chart",
  },
};
