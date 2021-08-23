import { migrateChart } from "./migrateChart";
import { emptyLegacyChart } from "./__test_resources__/emptyLegacyChart";
import { legacyAreaChart } from "./__test_resources__/legacyAreaChart";
import { legacyBarChart } from "./__test_resources__/legacyBarChart";
import { legacyChart } from "./__test_resources__/legacyChart";
import { legacyColumnChart } from "./__test_resources__/legacyColumnChart";
import { legacyLineChart } from "./__test_resources__/legacyLineChart";
import { legacyPieChart } from "./__test_resources__/legacyPieChart";
import { legacyScatterPlot } from "./__test_resources__/legacyScatterPlot";
import { servers } from "./__test_resources__/servers";

describe("migrateChart", () => {
  it("returns the ActiveUI5 chart widget state corresponding to the given ActiveUI4 chart widget state", () => {
    expect(migrateChart(legacyChart, servers)).toMatchInlineSnapshot(`
      Object {
        "filters": Array [],
        "mapping": Object {
          "horizontalSubplots": Array [],
          "splitBy": Array [],
          "values": Array [
            "[Measures].[pnlDelta.SUM]",
            "[Measures].[pnlVega.SUM]",
          ],
          "verticalSubplots": Array [],
          "xAxis": Array [
            "[Currency].[Currency].[Currency]",
          ],
        },
        "name": "Chart",
        "plotly": Object {
          "data": Object {
            "overridesByTraceKey": Object {
              "[Measures].[pnlVega.SUM]": Object {
                "name": "Taux de marge",
                "yaxis": "y2",
              },
            },
          },
          "layout": Object {
            "margin": Object {
              "b": 20,
              "l": 20,
              "r": 20,
              "t": 20,
            },
            "xaxis": Object {
              "showgrid": false,
              "showline": false,
              "showticklabels": false,
            },
            "yaxis": Object {
              "showline": false,
              "showticklabels": true,
            },
            "yaxis2": Object {
              "overlaying": "y",
              "range": Array [
                -1000,
                1000,
              ],
              "showline": true,
              "showticklabels": true,
              "side": "right",
            },
          },
        },
        "query": Object {
          "mdx": "SELECT NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS, NON EMPTY {[Measures].[pnlDelta.SUM], [Measures].[pnlVega.SUM]} ON COLUMNS FROM [EquityDerivativesCube]",
          "updateMode": "once",
        },
        "queryContext": Array [],
        "serverKey": "my-server",
        "switchedTo": "plotly-line-chart",
        "widgetKey": "plotly-line-chart",
      }
    `);
  });

  it("migrates a legacy line chart to a Plotly line chart", () => {
    expect(migrateChart(legacyLineChart, servers)).toMatchInlineSnapshot(`
      Object {
        "filters": Array [],
        "mapping": Object {
          "horizontalSubplots": undefined,
          "values": Array [
            "[Measures].[contributors.COUNT]",
          ],
          "verticalSubplots": undefined,
          "xAxis": Array [
            "[Currency].[Currency].[Currency]",
          ],
        },
        "name": "Legacy subplots",
        "query": Object {
          "mdx": "SELECT NON EMPTY Crossjoin([Geography].[City].[City].Members, [Booking].[Desk].[LegalEntity].Members, [Currency].[Currency].[Currency].Members) ON ROWS, [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube]",
          "updateMode": "once",
        },
        "queryContext": Array [],
        "serverKey": "my-server",
        "widgetKey": "plotly-line-chart",
      }
    `);
  });

  it("migrates a legacy area chart to a Plotly area chart", () => {
    expect(migrateChart(legacyAreaChart, servers)).toMatchInlineSnapshot(`
      Object {
        "filters": Array [],
        "mapping": Object {
          "values": Array [
            "[Measures].[contributors.COUNT]",
          ],
          "xAxis": Array [
            "[Currency].[Currency].[Currency]",
          ],
        },
        "name": "Legacy area chart",
        "query": Object {
          "mdx": "SELECT NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS, [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube]",
          "updateMode": "once",
        },
        "queryContext": Array [],
        "serverKey": "my-server",
        "widgetKey": "plotly-area-chart",
      }
    `);
  });

  it("migrates a legacy column chart to a Plotly column chart", () => {
    expect(migrateChart(legacyColumnChart, servers)).toMatchInlineSnapshot(`
      Object {
        "filters": Array [],
        "mapping": Object {
          "values": Array [
            "[Measures].[contributors.COUNT]",
          ],
          "xAxis": Array [
            "[Currency].[Currency].[Currency]",
          ],
        },
        "name": "Legacy column chart",
        "query": Object {
          "mdx": "SELECT NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS, [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube]",
          "updateMode": "once",
        },
        "queryContext": Array [],
        "serverKey": "my-server",
        "widgetKey": "plotly-stacked-column-chart",
      }
    `);
  });

  it("migrates a legacy bar chart to a Plotly bar chart", () => {
    expect(migrateChart(legacyBarChart, servers)).toMatchInlineSnapshot(`
      Object {
        "filters": Array [],
        "mapping": Object {
          "values": Array [
            "[Measures].[contributors.COUNT]",
          ],
          "yAxis": Array [
            "[Currency].[Currency].[Currency]",
          ],
        },
        "name": "Legacy bar chart",
        "query": Object {
          "mdx": "SELECT NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS, [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube]",
          "updateMode": "once",
        },
        "queryContext": Array [],
        "serverKey": "my-server",
        "widgetKey": "plotly-stacked-bar-chart",
      }
    `);
  });

  it("migrates a legacy pie chart to a Plotly pie chart", () => {
    expect(migrateChart(legacyPieChart, servers)).toMatchInlineSnapshot(`
      Object {
        "filters": Array [],
        "mapping": Object {
          "sliceBy": Array [
            "[Currency].[Currency].[Currency]",
          ],
          "values": Array [
            "[Measures].[contributors.COUNT]",
          ],
        },
        "name": "Legacy pie chart",
        "query": Object {
          "mdx": "SELECT [Measures].[contributors.COUNT] ON COLUMNS, NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS FROM [EquityDerivativesCube]",
          "updateMode": "once",
        },
        "queryContext": Array [],
        "serverKey": "my-server",
        "widgetKey": "plotly-pie-chart",
      }
    `);
  });

  it("migrates a legacy scatter plot to a Plotly scatter plot", () => {
    expect(migrateChart(legacyScatterPlot, servers)).toMatchInlineSnapshot(`
      Object {
        "filters": Array [],
        "mapping": Object {
          "color": Array [
            "[Booking].[Desk].[LegalEntity]",
          ],
          "size": Array [
            "[Measures].[pnl.FOREX]",
          ],
          "splitBy": Array [
            "[Currency].[Currency].[Currency]",
          ],
          "xValues": Array [
            "[Measures].[contributors.COUNT]",
          ],
          "yValues": Array [
            "[Measures].[pnl.FOREX]",
          ],
        },
        "name": "Legacy scatter plot",
        "query": Object {
          "mdx": "SELECT {[Measures].[contributors.COUNT], [Measures].[pnl.FOREX]} ON COLUMNS, NON EMPTY Crossjoin([Currency].[Currency].[Currency].Members, [Booking].[Desk].[LegalEntity].Members) ON ROWS FROM [EquityDerivativesCube]",
          "updateMode": "once",
        },
        "queryContext": Array [],
        "serverKey": "my-server",
        "widgetKey": "plotly-scatter-plot",
      }
    `);
  });

  it("migrates an empty chart widget to a plotly-line-chart", () => {
    expect(migrateChart(emptyLegacyChart, servers)).toMatchInlineSnapshot(`
      Object {
        "filters": Array [],
        "name": "Untitled Chart",
        "query": Object {
          "updateMode": "once",
        },
        "queryContext": Array [],
        "serverKey": "my-server",
        "widgetKey": "plotly-line-chart",
      }
    `);
  });
});
