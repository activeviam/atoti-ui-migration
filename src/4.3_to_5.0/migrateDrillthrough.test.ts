import { migrateDrillthrough } from "./migrateDrillthrough";
import { emptyLegacyDrillthrough } from "../__test_resources__/emptyLegacyDrillthrough";
import { legacyDrillthrough } from "../__test_resources__/legacyDrillthrough";
import { servers } from "../__test_resources__/servers";

describe("migrateDrillthrough", () => {
  it("returns the ActiveUI5 drillthrough-table widget state corresponding to the given ActiveUI4 drillthrough widget state", () => {
    expect(migrateDrillthrough(legacyDrillthrough, servers))
      .toMatchInlineSnapshot(`
      Object {
        "columnWidths": Object {},
        "filters": Array [
          "[Booking].[Desk].[ALL].[AllMember].[LegalEntityA].[BusinessUnitA]",
        ],
        "name": "Drillthrough LegalEntityA ➜ BusinessUnitA",
        "query": Object {
          "mdx": "DRILLTHROUGH SELECT FROM [EquityDerivativesCube] RETURN MemberValue([BusinessUnit]), Caption([BusinessUnit]), MemberValue([TradeId]), Caption([TradeId])",
          "updateMode": "once",
        },
        "queryContext": Array [],
        "serverKey": "my-server",
        "widgetKey": "drillthrough-table",
      }
    `);
  });

  it("migrates an empty drillthrough widget", () => {
    expect(migrateDrillthrough(emptyLegacyDrillthrough, servers))
      .toMatchInlineSnapshot(`
      Object {
        "columnWidths": Object {},
        "filters": Array [],
        "name": "Untitled Drillthrough Table",
        "query": Object {
          "updateMode": "once",
        },
        "queryContext": Array [],
        "serverKey": "my-server",
        "widgetKey": "drillthrough-table",
      }
    `);
  });
});
