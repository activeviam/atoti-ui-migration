/**
 * The widgetState of a legacy area chart, useful for unit tests.
 */
export const legacyAreaChart = {
  name: "Legacy area chart",
  type: "container",
  value: {
    style: {},
    showTitleBar: true,
    body: {
      configuration: {
        type: "combo-line-area",
        mapping: {
          x: {
            from: ["[Currency].[Currency].[Currency]"],
          },
          y: {
            from: "[Measures].[contributors.COUNT]",
          },
        },
      },
      query: {
        serverUrl: "http://localhost:9090",
        mdx:
          "SELECT NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS, [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube]",
        contextValues: {},
        updateMode: "once",
      },
    },
    containerKey: "chart",
  },
};
