/* eslint-disable no-console */
import { migrateWidget } from "./migrateWidget";
import { LegacyWidgetState } from "./migration.types";
import { servers } from "./__test_resources__/servers";

describe("migrateWidget", () => {
  it("converts a widget saved with ActiveUI 4 into one usable with ActiveUI 5", () => {
    const legacyWidgetState: LegacyWidgetState = {
      name: "Untitled chart",
      type: "container",
      value: {
        containerKey: "chart",
        body: {
          query: {
            updateMode: "once",
            mdx: "SELECT NON EMPTY Crossjoin([Booking].[Desk].[LegalEntity].Members, [Currency].[Currency].[Currency].Members) ON ROWS, NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube]",
          },
          configuration: {
            type: "plotly-line-chart",
            mapping: {
              xAxis: ["[Currency].[Currency].[Currency]"],
              values: ["[Measures].[contributors.COUNT]"],
              splitBy: ["[Booking].[Desk].[LegalEntity]"],
              horizontalSubplots: [],
              verticalSubplots: [],
            },
          },
        },
      },
      writable: true,
    };

    expect(migrateWidget(legacyWidgetState, servers)).toMatchInlineSnapshot(`
      Object {
        "filters": Array [],
        "mapping": Object {
          "horizontalSubplots": Array [],
          "secondaryValues": Array [],
          "splitBy": Array [
            "[Booking].[Desk].[LegalEntity]",
            "ALL_MEASURES",
          ],
          "values": Array [
            "[Measures].[contributors.COUNT]",
          ],
          "verticalSubplots": Array [],
          "xAxis": Array [
            "[Currency].[Currency].[Currency]",
          ],
        },
        "name": "Untitled chart",
        "query": Object {
          "mdx": "SELECT NON EMPTY Crossjoin([Booking].[Desk].[LegalEntity].Members, [Currency].[Currency].[Currency].Members) ON ROWS, NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube]",
          "updateMode": "once",
        },
        "queryContext": Array [],
        "serverKey": "my-server",
        "widgetKey": "plotly-line-chart",
      }
    `);
  });

  it("warns if the widget has no core equivalent in ActiveUI 5", () => {
    const warn = console.warn;
    console.warn = jest.fn();
    try {
      const legacyWidgetState: LegacyWidgetState = {
        name: "Untitled page context values",
        type: "container",
        value: {
          containerKey: "context-values",
          body: {},
        },
        writable: true,
      };
      expect(migrateWidget(legacyWidgetState, servers)).toMatchInlineSnapshot(`
        Object {
          "name": "Untitled page context values",
          "widgetKey": "context-values",
        }
      `);
      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenCalledWith(
        `Unsupported widgetKey: "context-values". The widget ("Untitled page context values") will be copied as is. It will most likely not work correctly in ActiveUI 5. Alternatively, you can remove all widgets of this type by using the --remove-widgets option in the CLI.`
      );
    } finally {
      console.warn = warn;
    }
  });
});
