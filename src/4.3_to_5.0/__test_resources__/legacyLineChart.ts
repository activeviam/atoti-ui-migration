/**
 * The widgetState of a legacy line chart, useful for unit tests.
 */
export const legacyLineChart = {
  name: "Legacy subplots",
  type: "container",
  value: {
    style: {},
    showTitleBar: true,
    body: {
      configuration: {
        type: "combo-line",
        mapping: {
          x: {
            from: ["[Currency].[Currency].[Currency]"],
          },
          y: {
            from: "[Measures].[contributors.COUNT]",
          },
          row: {
            from: ["[Booking].[Desk].[LegalEntity]"],
          },
          column: {
            from: ["[Geography].[City].[City]"],
          },
        },
      },
      query: {
        serverUrl: "http://localhost:9090",
        mdx:
          "SELECT NON EMPTY Crossjoin([Geography].[City].[City].Members, [Booking].[Desk].[LegalEntity].Members, [Currency].[Currency].[Currency].Members) ON ROWS, [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube]",
        contextValues: {},
        updateMode: "once",
      },
    },
    containerKey: "chart",
  },
};
