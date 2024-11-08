/* eslint-disable no-console */
import { dataModelsForTests } from "@activeviam/data-model-5.0";
import { stringify } from "@activeviam/activeui-sdk-5.0";
import { LegacyQuery, _migrateQuery } from "./_migrateQuery";

const cube = dataModelsForTests.sandbox.catalogs[0].cubes[0];

describe("_migrateQuery", () => {
  it("warns if the updateMode is the legacy 'refresh-periodically'", () => {
    const legacyQuery: LegacyQuery = {
      mdx: "SELECT FROM [EquityDerivativesCube]",
      updateMode: "refresh-periodically",
    };
    const [migratedQuery, isUsingUnsupportedUpdateMode] = _migrateQuery({
      legacyQuery,
      cube,
      shouldUpdateFiltersMdx: true,
    });
    expect(migratedQuery).toMatchInlineSnapshot(`
      {
        "filters": [],
        "query": {
          "mdx": {
            "axes": [],
            "cellProps": [],
            "elementType": "Select",
            "from": {
              "cubeName": "EquityDerivativesCube",
              "elementType": "From",
            },
            "slicerAxis": undefined,
            "withClause": [],
          },
          "updateMode": "once",
        },
        "queryContext": [],
      }
    `);
    expect(isUsingUnsupportedUpdateMode).toBe(true);
  });

  it("gracefully handles an empty MDX", () => {
    const [migratedQuery, isUsingUnsupportedUpdateMode] = _migrateQuery({
      legacyQuery: { mdx: "" },
      cube,
      shouldUpdateFiltersMdx: false,
    });
    expect(migratedQuery).toEqual({
      query: { updateMode: "once" },
      queryContext: [],
      filters: [],
    });
    expect(isUsingUnsupportedUpdateMode).toBe(false);
  });

  it("strips filters from the MDX and returns them in the output", () => {
    const legacyQuery = {
      mdx: "SELECT FROM [EquityDerivativesCube] WHERE [Currency].[Currency].[AllMember].[EUR]",
    };
    const [{ query, filters }] = _migrateQuery({
      legacyQuery,
      cube,
      shouldUpdateFiltersMdx: true,
    })!;

    // Filters are unchanged in the query.
    expect(stringify(query.mdx!)).toBe("SELECT FROM [EquityDerivativesCube]");

    expect(filters.length).toBe(1);
    expect(stringify(filters[0])).toBe(
      "[Currency].[Currency].[AllMember].[EUR]",
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

    const [
      {
        query: { mdx },
      },
    ] = _migrateQuery({ legacyQuery, cube, shouldUpdateFiltersMdx: true })!;

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

  it("adds the default measure on columns when no measure is expressed on axes, but at least one hierarchy is expressed on the columns axis", () => {
    const legacyQuery: LegacyQuery = {
      mdx: `
        SELECT
         [Currency].[Currency].Members ON COLUMNS
         FROM [EquityDerivativesCube]`,
    };
    const [
      {
        query: { mdx },
      },
    ] = _migrateQuery({
      legacyQuery,
      cube,
      shouldUpdateFiltersMdx: true,
    });
    expect(stringify(mdx!, { indent: true })).toMatchInlineSnapshot(`
      "SELECT
        Crossjoin(
          [Currency].[Currency].Members,
          {
            [Measures].[contributors.COUNT]
          }
        ) ON COLUMNS
        FROM [EquityDerivativesCube]"
    `);
  });
});
