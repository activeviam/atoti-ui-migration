import { MdxSelect, parse, stringify } from "@activeviam/mdx-5.0";
import { _addDefaultMeasureIfNoneIsExplicitlyExpressed } from "./_addDefaultMeasureIfNoneIsExplicitlyExpressed";
import { dataModelsForTests } from "@activeviam/data-model-5.0";

const cube = dataModelsForTests.sandbox.catalogs[0].cubes[0];

describe("_addDefaultMeasureIfNoneIsExplicitlyExpressed", () => {
  it("adds the default measure on columns when no measure is expressed on axes, but at least one hierarchy is", () => {
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
              [Currency].[Currency].Members ON ROWS,
              NON EMPTY {
                [Measures].[contributors.COUNT]
              } ON COLUMNS
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
