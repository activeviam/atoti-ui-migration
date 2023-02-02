import { migrateKpi } from "./migrateKpi";
import { emptyLegacyKpi } from "./__test_resources__/emptyLegacyKpi";
import { legacyComparisonValues } from "./__test_resources__/legacyComparisonValues";
import { legacyKpi } from "./__test_resources__/legacyKpi";
import { servers } from "./__test_resources__/servers";

describe("migrateKpi", () => {
  it("returns the ActiveUI5 KPI widget state corresponding to the given ActiveUI4 KPI widget state", () => {
    expect(migrateKpi(legacyKpi, servers)).toMatchInlineSnapshot(`
      {
        "filters": [],
        "mapping": {
          "columns": [],
          "measures": [
            "[Measures].[contributors.COUNT]",
          ],
          "rows": [
            "[Currency].[Currency].[Currency]",
          ],
        },
        "name": "Untitled Featured Values",
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
        "widgetKey": "kpi",
      }
    `);
  });

  it("migrates a KPI widget with a comparison", () => {
    expect(migrateKpi(legacyComparisonValues, servers)).toMatchInlineSnapshot(`
      {
        "comparison": {
          "comparedMemberNamePath": [
            "AllMember",
            "LegalEntityA",
          ],
          "dimensionName": "Booking",
          "hierarchyName": "Desk",
          "referenceMemberNamePath": [
            "AllMember",
            "LegalEntityB",
          ],
        },
        "filters": [],
        "mapping": {
          "columns": [],
          "measures": [
            "[Measures].[pnl.FOREX]",
          ],
          "rows": [
            "[Currency].[Currency].[Currency]",
          ],
        },
        "name": "Comparison values",
        "query": {
          "mdx": "SELECT NON EMPTY Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])) ON ROWS, NON EMPTY [Measures].[pnl.FOREX] ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
          "updateMode": "once",
        },
        "queryContext": [],
        "serverKey": "my-server",
        "widgetKey": "kpi",
      }
    `);
  });

  it("migrates an empty KPI widget", () => {
    expect(migrateKpi(emptyLegacyKpi, servers)).toMatchInlineSnapshot(`
      {
        "filters": [],
        "mapping": {
          "columns": [],
          "measures": [],
          "rows": [],
        },
        "name": "Untitled Featured Values",
        "query": {
          "updateMode": "once",
        },
        "queryContext": [],
        "serverKey": "my-server",
        "widgetKey": "kpi",
      }
    `);
  });
});
