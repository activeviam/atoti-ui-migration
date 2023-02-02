/**
 * The widgetState of a legacy pie chart, useful for unit tests.
 */
export const legacyPieChart = {
  name: "Legacy pie chart",
  type: "container",
  value: {
    style: {},
    showTitleBar: true,
    body: {
      configuration: {
        type: "pie",
        mapping: {
          angle: {
            from: "[Measures].[contributors.COUNT]",
          },
          color: {
            from: ["[Currency].[Currency].[Currency]"],
          },
        },
      },
      query: {
        serverUrl: "http://localhost:9090",
        mdx:
          "SELECT [Measures].[contributors.COUNT] ON COLUMNS, NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS FROM [EquityDerivativesCube]",
        contextValues: {},
        updateMode: "once",
      },
    },
    containerKey: "chart",
  },
};
