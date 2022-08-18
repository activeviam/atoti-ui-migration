import { migrateKpi } from "./migrateKpi";
import { emptyLegacyKpi } from "./__test_resources__/emptyLegacyKpi";
import { legacyComparisonValues } from "./__test_resources__/legacyComparisonValues";
import { legacyKpi } from "./__test_resources__/legacyKpi";
import { servers } from "./__test_resources__/servers";

describe("migrateKpi", () => {
  it("returns the ActiveUI5 KPI widget state corresponding to the given ActiveUI4 KPI widget state", () => {
    expect(migrateKpi(legacyKpi, servers)).toMatchInlineSnapshot(`
      Object {
        "filters": Array [],
        "mapping": Object {
          "columns": Array [],
          "measures": Array [
            "[Measures].[contributors.COUNT]",
          ],
          "rows": Array [
            "[Currency].[Currency].[Currency]",
          ],
        },
        "name": "Untitled Featured Values",
        "query": Object {
          "mdx": "SELECT NON EMPTY Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])) ON ROWS, NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
          "updateMode": "once",
        },
        "queryContext": Array [
          Object {
            "key": "queriesTimeLimit",
            "value": 60,
          },
          Object {
            "key": "mdx.casesensitive",
            "value": true,
          },
          Object {
            "key": "mdx.defaultmembers.[Geography].[City]",
            "value": "[AllMember].[Berlin]",
          },
        ],
        "serverKey": "my-server",
        "widgetKey": "kpi",
      }
    `);
  });

  it("migrates a KPI widget with a comparison", () => {
    expect(migrateKpi(legacyComparisonValues, servers)).toMatchInlineSnapshot(`
      Object {
        "comparison": Object {
          "comparedMemberNamePath": Array [
            "AllMember",
            "LegalEntityA",
          ],
          "dimensionName": "Booking",
          "hierarchyName": "Desk",
          "referenceMemberNamePath": Array [
            "AllMember",
            "LegalEntityB",
          ],
        },
        "filters": Array [],
        "mapping": Object {
          "columns": Array [],
          "measures": Array [
            "[Measures].[pnl.FOREX]",
          ],
          "rows": Array [
            "[Currency].[Currency].[Currency]",
          ],
        },
        "name": "Comparison values",
        "query": Object {
          "mdx": "SELECT NON EMPTY Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])) ON ROWS, NON EMPTY [Measures].[pnl.FOREX] ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
          "updateMode": "once",
        },
        "queryContext": Array [],
        "serverKey": "my-server",
        "widgetKey": "kpi",
      }
    `);
  });

  it("migrates an empty KPI widget", () => {
    expect(migrateKpi(emptyLegacyKpi, servers)).toMatchInlineSnapshot(`
      Object {
        "filters": Array [],
        "mapping": Object {
          "columns": Array [],
          "measures": Array [],
          "rows": Array [],
        },
        "name": "Untitled Featured Values",
        "query": Object {
          "updateMode": "once",
        },
        "queryContext": Array [],
        "serverKey": "my-server",
        "widgetKey": "kpi",
      }
    `);
  });
});
