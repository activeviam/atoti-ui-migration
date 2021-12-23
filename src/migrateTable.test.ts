import { parse, stringify } from "@activeviam/mdx";
import { TableWidgetState } from "@activeviam/table";
import _cloneDeep from "lodash/cloneDeep";
import { migrateTable } from "./migrateTable";
import { emptyLegacyTable } from "./__test_resources__/emptyLegacyTable";
import { legacyPivotTable } from "./__test_resources__/legacyPivotTable";
import { legacyTable } from "./__test_resources__/legacyTable";
import { legacyTabularView } from "./__test_resources__/legacyTabularView";
import { legacyTreeTable } from "./__test_resources__/legacyTreeTable";
import { servers } from "./__test_resources__/servers";

describe("migrateTable", () => {
  it("migrates a tree table widget", () => {
    expect(migrateTable(legacyTreeTable, servers)).toMatchInlineSnapshot(`
      Object {
        "columnWidths": Object {
          "[Currency].[Currency].[Currency]": 250,
        },
        "filters": Array [
          "TopCount(Filter([Geography].[City].Levels(1).Members, NOT IsEmpty([Measures].[contributors.COUNT])), 3, [Measures].[contributors.COUNT])",
          "{[Currency].[Currency].[ALL].[AllMember].[GBP], [Currency].[Currency].[ALL].[AllMember].[JPY], [Currency].[Currency].[ALL].[AllMember].[USD]}",
        ],
        "mapping": Object {
          "columns": Array [
            "ALL_MEASURES",
          ],
          "measures": Array [
            "[Measures].[contributors.COUNT]",
          ],
          "rows": Array [
            "[Currency].[Currency].[Currency]",
          ],
        },
        "name": "Tree table",
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
        "widgetKey": "tree-table",
      }
    `);
  });

  it("migrates an empty table widget", () => {
    expect(migrateTable(emptyLegacyTable, servers)).toMatchInlineSnapshot(`
      Object {
        "columnWidths": Object {},
        "filters": Array [],
        "mapping": Object {
          "columns": Array [
            "ALL_MEASURES",
          ],
          "measures": Array [],
          "rows": Array [],
        },
        "name": "Table",
        "query": Object {
          "updateMode": "once",
        },
        "queryContext": Array [],
        "serverKey": "my-server",
        "widgetKey": "tree-table",
      }
    `);
  });

  it("migrates a tabular view widget", () => {
    expect(migrateTable(legacyTabularView, servers)).toMatchInlineSnapshot(`
      Object {
        "columnWidths": Object {
          "[Currency].[Currency].[Currency]": 250,
        },
        "filters": Array [],
        "mapping": Object {
          "columns": Array [
            "ALL_MEASURES",
          ],
          "measures": Array [],
          "rows": Array [
            "[Currency].[Currency].[Currency]",
          ],
        },
        "name": "Tabular View",
        "query": Object {
          "mdx": "SELECT NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
          "updateMode": "once",
        },
        "queryContext": Array [],
        "serverKey": "my-server",
        "widgetKey": "table",
      }
    `);
  });

  it("migrates a pivot table widget", () => {
    expect(migrateTable(legacyPivotTable, servers)).toMatchInlineSnapshot(`
      Object {
        "columnWidths": Object {
          "[Currency].[Currency].[Currency]": 250,
        },
        "filters": Array [],
        "mapping": Object {
          "columns": Array [
            "ALL_MEASURES",
          ],
          "measures": Array [],
          "rows": Array [
            "[Currency].[Currency].[Currency]",
          ],
        },
        "name": "Pivot Table",
        "query": Object {
          "mdx": "SELECT NON EMPTY Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
          "updateMode": "once",
        },
        "queryContext": Array [],
        "serverKey": "my-server",
        "widgetKey": "pivot-table",
      }
    `);
  });

  it("migrates a table widget", () => {
    expect(migrateTable(legacyTable, servers)).toMatchInlineSnapshot(`
      Object {
        "columnWidths": Object {
          "[Currency].[Currency].[Currency]": 250,
        },
        "filters": Array [],
        "mapping": Object {
          "columns": Array [
            "ALL_MEASURES",
          ],
          "measures": Array [],
          "rows": Array [
            "[Currency].[Currency].[Currency]",
          ],
        },
        "name": "Table",
        "query": Object {
          "mdx": "SELECT NON EMPTY Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
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
        "widgetKey": "table",
      }
    `);
  });

  it("fixes erroneous mdx mistakenly generated by ActiveUI 4 when the user collapses a member and then re-expands it", () => {
    // Cloning in order to avoid impacting other tests with undesired mutations.
    const legacyPivotTableState = _cloneDeep(legacyPivotTable);

    legacyPivotTableState.value.body.mdx = `SELECT
      NON EMPTY Hierarchize(
        Union(
          Crossjoin(
            Hierarchize(
              DrilldownLevel(
                [Currency].[Currency].[ALL].[AllMember]
              )
            ),
            Hierarchize(
              DrilldownLevel(
                [Geography].[City].[ALL].[AllMember]
              )
            )
          ),
          Crossjoin(
            [Currency].[Currency].[ALL].[AllMember].[EUR],
            Descendants(
              {
                [Geography].[City].[ALL].[AllMember]
              },
              [Geography].[City].[City]
            )
          )
        )
      ) ON ROWS
      FROM [EquityDerivativesCube]
      CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS`;

    const migratedPivotTableState = migrateTable(
      legacyPivotTableState,
      servers
    ) as TableWidgetState<"serialized">;

    expect(
      stringify(parse(migratedPivotTableState.query.mdx!), { indent: true })
    ).toMatchInlineSnapshot(`
      "SELECT
        NON EMPTY Hierarchize(
          Crossjoin(
            Hierarchize(
              DrilldownLevel(
                [Currency].[Currency].[ALL].[AllMember]
              )
            ),
            Hierarchize(
              DrilldownLevel(
                [Geography].[City].[ALL].[AllMember]
              )
            )
          )
        ) ON ROWS
        FROM [EquityDerivativesCube]
        CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"
    `);
  });
});
