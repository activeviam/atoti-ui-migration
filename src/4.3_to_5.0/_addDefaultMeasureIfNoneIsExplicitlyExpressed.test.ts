import { MdxSelect, parse, stringify } from "@activeviam/mdx-5.0";
import { _addDefaultMeasureIfNoneIsExplicitlyExpressed } from "./_addDefaultMeasureIfNoneIsExplicitlyExpressed";
import { dataModelsForTests } from "@activeviam/data-model-5.0";

const cube = dataModelsForTests.sandbox.catalogs[0].cubes[0];

describe("_addDefaultMeasureIfNoneIsExplicitlyExpressed", () => {
  it("adds the default measure on columns when no measure is expressed on axes, but at least one on the columns axis hierarchy is", () => {
    const mdx: MdxSelect = parse(`
        SELECT
         [Currency].[Currency].Members ON COLUMNS
         FROM [EquityDerivativesCube]`);
    expect(
      stringify(_addDefaultMeasureIfNoneIsExplicitlyExpressed(mdx, { cube }), {
        indent: true,
      }),
    ).toMatchInlineSnapshot(`
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

  it("does not add the default measure on columns when there are no measures expressed and the columns axis is empty", () => {
    const mdx: MdxSelect = parse(`
      SELECT
        [Currency].[Currency].Members ON ROWS
        FROM [EquityDerivativesCube]`);

    expect(
      stringify(_addDefaultMeasureIfNoneIsExplicitlyExpressed(mdx, { cube }), {
        indent: true,
      }),
    ).toMatchInlineSnapshot(`
      "SELECT
        [Currency].[Currency].Members ON ROWS
        FROM [EquityDerivativesCube]"
    `);
  });

  it("adds the default measure when there are no measures expressed and the columns axis contains a sorted hierarchy", () => {
    const mdx: MdxSelect = parse(`
      WITH
        Member [Measures].[[Currency]].[Currency]].[Currency]]_for_order] AS Rank(
          [Currency].[Currency].CurrentMember,
          [Currency].[Currency].Members
        ) 
        SELECT
          NON EMPTY Order(
            Hierarchize(
              Descendants(
                {
                  [Currency].[Currency].[ALL].[AllMember]
                },
                1,
                SELF_AND_BEFORE
              )
            ),
            [Measures].[[Currency]].[Currency]].[Currency]]_for_order],
            DESC
          ) ON COLUMNS
          FROM [EquityDerivativesCube]`);

    expect(
      stringify(_addDefaultMeasureIfNoneIsExplicitlyExpressed(mdx, { cube }), {
        indent: true,
      }),
    ).toMatchInlineSnapshot(`
      "WITH
       Member [Measures].[[Currency]].[Currency]].[Currency]]_for_order] AS Rank(
        [Currency].[Currency].CurrentMember,
        [Currency].[Currency].Members
      ) 
      SELECT
        NON EMPTY Order(
          Crossjoin(
            Hierarchize(
              Descendants(
                {
                  [Currency].[Currency].[ALL].[AllMember]
                },
                1,
                SELF_AND_BEFORE
              )
            ),
            {
              [Measures].[contributors.COUNT]
            }
          ),
          [Measures].[[Currency]].[Currency]].[Currency]]_for_order],
          DESC
        ) ON COLUMNS
        FROM [EquityDerivativesCube]"
    `);
  });

  it("returns the given mdx if there are no axes expressed", () => {
    const mdx: MdxSelect = parse(`
      SELECT
        FROM [EquityDerivativesCube]`);

    expect(
      stringify(_addDefaultMeasureIfNoneIsExplicitlyExpressed(mdx, { cube }), {
        indent: true,
      }),
    ).toMatchInlineSnapshot(`
      "SELECT
        FROM [EquityDerivativesCube]"
    `);
  });

  it("returns the given MDX if a measure is already expressed", () => {
    const mdx: MdxSelect = parse(`
      SELECT
        [Currency].[Currency].Members ON ROWS,
        [Measures].[pnl.SUM] ON COLUMNS
        FROM [EquityDerivativesCube]`);
    expect(
      stringify(_addDefaultMeasureIfNoneIsExplicitlyExpressed(mdx, { cube }), {
        indent: true,
      }),
    ).toMatchInlineSnapshot(`
          "SELECT
            [Currency].[Currency].Members ON ROWS,
            [Measures].[pnl.SUM] ON COLUMNS
            FROM [EquityDerivativesCube]"
        `);
  });
});
