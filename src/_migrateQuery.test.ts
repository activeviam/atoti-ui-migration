/* eslint-disable no-console */
import { dataModelsForTests } from "@activeviam/data-model";
import { stringify } from "@activeviam/activeui-sdk";
import { LegacyQuery, _migrateQuery } from "./_migrateQuery";

const cube = dataModelsForTests.sandbox.catalogs[0].cubes[0];

describe("_migrateQuery", () => {
  it("warns if the updateMode is the legacy 'refresh-periodically'", () => {
    const warn = console.warn;
    console.warn = jest.fn();
    try {
      const legacyQuery: LegacyQuery = {
        mdx: "SELECT FROM [EquityDerivativesCube]",
        updateMode: "refresh-periodically",
      };
      _migrateQuery({ legacyQuery, cube });
      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenCalledWith(
        "The 'refresh-periodically' mode for query updates is not supported in ActiveUI 5. Falling back on 'once'"
      );
      expect(_migrateQuery({ legacyQuery, cube })).toMatchInlineSnapshot(`
        Object {
          "filters": Array [],
          "query": Object {
            "mdx": Object {
              "axes": Array [],
              "cellProps": Array [],
              "elementType": "Select",
              "from": Object {
                "cubeName": "EquityDerivativesCube",
                "elementType": "From",
              },
              "slicerAxis": undefined,
              "withClause": Array [],
            },
            "updateMode": "once",
          },
          "queryContext": Array [],
        }
      `);
    } finally {
      console.warn = warn;
    }
  });

  it("gracefully handles an empty MDX", () => {
    expect(_migrateQuery({ legacyQuery: { mdx: "" }, cube })).toEqual({
      query: { updateMode: "once" },
      queryContext: [],
      filters: [],
    });
  });

  it("strips filters from the MDX and returns them in the output", () => {
    const legacyQuery = {
      mdx: "SELECT FROM [EquityDerivativesCube] WHERE [Currency].[Currency].[AllMember].[EUR]",
    };
    const { query, filters } = _migrateQuery({ legacyQuery, cube })!;
    expect(stringify(query.mdx!)).toBe("SELECT FROM [EquityDerivativesCube]");
    expect(filters.length).toBe(1);
    expect(stringify(filters[0])).toBe(
      "[Currency].[Currency].[AllMember].[EUR]"
    );
  });

  it("removes the useless (and dangerous) parts of the queries created when users collapse and re-expand a member in ActiveUI 4", () => {
    const legacyQuery = {
      mdx: `SELECT
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
        CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS`,
    };

    const {
      query: { mdx },
    } = _migrateQuery({ legacyQuery, cube })!;

    expect(stringify(mdx!, { indent: true })).toMatchInlineSnapshot(`
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
