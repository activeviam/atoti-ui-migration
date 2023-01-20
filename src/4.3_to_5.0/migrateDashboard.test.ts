import _map from "lodash/map";
import _mapValues from "lodash/mapValues";
import { legacyDashboard } from "./__test_resources__/legacyDashboard";
import { migrateDashboard } from "./migrateDashboard";
import { LegacyDashboardState } from "./migration.types";
import { servers } from "./__test_resources__/servers";

describe("migrateDashboard", () => {
  it("turns the pages content from arrays into maps", () => {
    const [dashboard] = migrateDashboard(legacyDashboard, {
      servers,
    });

    expect(dashboard.pages["p-0"].content).toMatchInlineSnapshot(`
      {
        "1": {
          "columnWidths": {
            "[Currency].[Currency].[Currency]": 250,
          },
          "filters": [
            "TopCount(Filter([Geography].[City].Levels(1).Members, NOT IsEmpty([Measures].[contributors.COUNT])), 3, [Measures].[contributors.COUNT])",
            "{[Currency].[Currency].[ALL].[AllMember].[GBP], [Currency].[Currency].[ALL].[AllMember].[JPY], [Currency].[Currency].[ALL].[AllMember].[USD]}",
          ],
          "mapping": {
            "columns": [
              "ALL_MEASURES",
            ],
            "measures": [
              "[Measures].[contributors.COUNT]",
            ],
            "rows": [
              "[Currency].[Currency].[Currency]",
            ],
          },
          "name": "Tree table",
          "query": {
            "mdx": "SELECT NON EMPTY Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])) ON ROWS, NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
            "updateMode": "once",
          },
          "queryContext": [
            {
              "key": "queriesTimeLimit",
              "value": 60,
            },
            {
              "key": "mdx.casesensitive",
              "value": true,
            },
            {
              "key": "mdx.defaultmembers.[Geography].[City]",
              "value": "[AllMember].[Berlin]",
            },
          ],
          "serverKey": "my-server",
          "widgetKey": "tree-table",
        },
        "2": {
          "filters": [],
          "mapping": {
            "horizontalSubplots": [],
            "secondaryValues": [],
            "splitBy": [
              "ALL_MEASURES",
            ],
            "values": [
              "[Measures].[pnlDelta.SUM]",
              "[Measures].[pnlVega.SUM]",
            ],
            "verticalSubplots": [],
            "xAxis": [
              "[Currency].[Currency].[Currency]",
            ],
          },
          "name": "Chart",
          "plotly": {
            "data": {
              "overridesByTraceKey": {
                "[Measures].[pnlVega.SUM]": {
                  "name": "Taux de marge",
                  "yaxis": "y2",
                },
              },
            },
            "layout": {
              "margin": {
                "b": 20,
                "l": 20,
                "r": 20,
                "t": 20,
              },
              "xaxis": {
                "showgrid": false,
                "showline": false,
                "showticklabels": false,
              },
              "yaxis": {
                "showline": false,
                "showticklabels": true,
              },
              "yaxis2": {
                "overlaying": "y",
                "range": [
                  -1000,
                  1000,
                ],
                "showline": true,
                "showticklabels": true,
                "side": "right",
              },
            },
          },
          "query": {
            "mdx": "SELECT NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS, NON EMPTY {[Measures].[pnlDelta.SUM], [Measures].[pnlVega.SUM]} ON COLUMNS FROM [EquityDerivativesCube]",
            "updateMode": "once",
          },
          "queryContext": [],
          "serverKey": "my-server",
          "switchedTo": "plotly-line-chart",
          "widgetKey": "plotly-line-chart",
        },
        "3": {
          "cubeName": "EquityDerivativesCube",
          "levelCoordinates": {
            "dimensionName": "Currency",
            "hierarchyName": "Currency",
            "levelName": "Currency",
          },
          "mode": "checkbox",
          "name": "Quick filter",
          "serverKey": "my-server",
          "widgetKey": "quick-filter",
        },
        "4": {
          "name": "Page filters",
          "widgetKey": "filters",
        },
      }
    `);
  });

  it("flattens the page layouts", () => {
    const [dashboard] = migrateDashboard(legacyDashboard, {
      servers,
    });
    expect(dashboard.pages["p-0"].layout).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "leafKey": "4",
            "size": 0.2,
          },
          {
            "children": [
              {
                "leafKey": "3",
                "size": 0.3,
              },
              {
                "leafKey": "1",
                "size": 0.27999999999999997,
              },
              {
                "leafKey": "2",
                "size": 0.42,
              },
            ],
            "direction": "column",
            "size": 0.8,
          },
        ],
        "direction": "row",
      }
    `);
  });

  it("migrates dashboard context values", () => {
    // Due to the flattening, the context values from the first cube that are also defined in the second cube are overriden.
    const [dashboard] = migrateDashboard(legacyDashboard, {
      servers,
    });
    expect(dashboard.queryContext).toMatchInlineSnapshot(`
      [
        {
          "key": "queriesTimeLimit",
          "value": 60,
        },
        {
          "key": "mdx.casesensitive",
          "value": false,
        },
        {
          "key": "mdx.defaultmembers.[Geography].[City]",
          "value": "[AllMember].[Paris]",
        },
      ]
    `);
  });

  it("migrates page context values", () => {
    const [dashboard] = migrateDashboard(legacyDashboard, {
      servers,
    });
    expect(_mapValues(dashboard.pages, ({ queryContext }) => queryContext))
      .toMatchInlineSnapshot(`
      {
        "p-0": [
          {
            "key": "mdx.lightCrossjoin",
            "value": true,
          },
          {
            "key": "mdx.aggressiveFormulaEvaluation",
            "value": true,
          },
        ],
      }
    `);
  });

  it("never returns a layout leaf", () => {
    // LegacyDashboardState has some attributes that are uninteresting to this test.
    // eslint-disable-next-line
    const legacyEmptyDashboard = {
      value: {
        body: {
          pages: [
            {
              content: [],
              layout: {
                "0": {
                  ck: "0",
                },
              },
            },
          ],
        },
      },
    } as unknown as LegacyDashboardState;
    const [emptyDashboard] = migrateDashboard(legacyEmptyDashboard, {
      servers,
    });
    expect(emptyDashboard).toMatchInlineSnapshot(`
      {
        "filters": [],
        "name": undefined,
        "pages": {
          "p-0": {
            "content": {},
            "filters": [],
            "layout": {
              "0": {
                "ck": "0",
              },
              "children": [],
            },
            "queryContext": [],
          },
        },
        "pagesOrder": [
          "p-0",
        ],
        "queryContext": [],
      }
    `);
  });

  it("removes the specified widget keys, and adapts the layout", () => {
    const keysOfWidgetPluginsToRemove = ["filters"];

    // Safeguard to make sure that the test makes sense: before checking that the key has been removed in the migrated dashboard, check that it's here in the first place in the legacy dashboard.
    const widgetPluginKeysInLegacyDashboard: string[] = [];
    legacyDashboard.value.body.pages.forEach((page) =>
      page.content.forEach(({ bookmark }) =>
        widgetPluginKeysInLegacyDashboard.push(bookmark.value.containerKey),
      ),
    );
    expect(widgetPluginKeysInLegacyDashboard).toEqual(
      expect.arrayContaining(keysOfWidgetPluginsToRemove),
    );

    const [dashboard] = migrateDashboard(legacyDashboard, {
      servers,
      keysOfWidgetPluginsToRemove,
    });

    const { content, layout } = dashboard.pages["p-0"];
    const widgetPluginKeys = _map(content, ({ widgetKey }) => widgetKey);
    expect(widgetPluginKeys).toEqual(
      expect.not.arrayContaining(keysOfWidgetPluginsToRemove),
    );
    expect(layout).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "leafKey": "3",
            "size": 0.3,
          },
          {
            "leafKey": "1",
            "size": 0.27999999999999997,
          },
          {
            "leafKey": "2",
            "size": 0.42,
          },
        ],
        "direction": "column",
      }
    `);
  });
});
