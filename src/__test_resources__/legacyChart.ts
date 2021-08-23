import type { LegacyWidgetState } from "../migration.types";

/**
 * The widgetState of a legacy line chart, useful for unit tests.
 */
export const legacyChart: LegacyWidgetState = {
  name: "Chart",
  type: "container",
  writable: true,
  value: {
    containerKey: "chart",
    body: {
      configuration: {
        type: "plotly-line-chart",
        plotly: {
          data: {
            overridesByTraceKey: {
              "[Measures].[pnlVega.SUM]": {
                name: "Taux de marge",
                yaxis: "y2",
              },
            },
          },
          layout: {
            xaxis: {
              showticklabels: false,
              showgrid: false,
              showline: false,
            },
            yaxis: {
              showticklabels: true,
              showline: false,
            },
            yaxis2: {
              showticklabels: true,
              showline: true,
              side: "right",
              range: [-1000, 1000],
              overlaying: "y",
            },
            margin: {
              t: 20,
              l: 20,
              r: 20,
              b: 20,
            },
          },
        },
        mapping: {
          xAxis: ["[Currency].[Currency].[Currency]"],
          values: ["[Measures].[pnlDelta.SUM]", "[Measures].[pnlVega.SUM]"],
          splitBy: [],
          horizontalSubplots: [],
          verticalSubplots: [],
        },
        switchedTo: "plotly-line-chart",
      },
      query: {
        serverUrl: "http://localhost:9090",
        mdx:
          "SELECT NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS, NON EMPTY {[Measures].[pnlDelta.SUM], [Measures].[pnlVega.SUM]} ON COLUMNS FROM [EquityDerivativesCube]",
        contextValues: {},
        updateMode: "once",
      },
    },
  },
};
