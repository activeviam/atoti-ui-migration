/**
 * The widgetState of a legacy column chart, useful for unit tests.
 */
export const legacyColumnChart = {
  name: "Legacy column chart",
  type: "container",
  value: {
    style: {},
    showTitleBar: true,
    body: {
      configuration: {
        type: "combo-histogram",
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
