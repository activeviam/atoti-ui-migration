/**
 * The widgetState of a legacy bar chart, useful for unit tests.
 */
export const legacyBarChart = {
  name: "Legacy bar chart",
  type: "container",
  value: {
    style: {},
    showTitleBar: true,
    body: {
      configuration: {
        type: "combo-horizontal-histogram",
        mapping: {
          y: {
            from: ["[Currency].[Currency].[Currency]"],
          },
          x: {
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
