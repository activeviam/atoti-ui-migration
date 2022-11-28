import { MdxSelect, parse, stringify } from "@activeviam/activeui-sdk-5.0";
import { _findErroneousUnionNode } from "./_findErroneousUnionNode";
import { dataModelsForTests } from "@activeviam/data-model-5.0";

const cube = dataModelsForTests.sandbox.catalogs[0].cubes[0];

describe("_findErroneousUnionNode", () => {
  it("returns the path and the match, if `mdx` contains an erroneous union node", () => {
    // This Mdx must be sanitized: its second crossjoin is useless.
    const mdx = parse<MdxSelect>(`SELECT
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
      CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS`);

    const { path, match } = _findErroneousUnionNode(mdx, {
      cube,
      levelsOnAxis: [
        {
          dimensionName: "Currency",
          hierarchyName: "Currency",
          levelName: "Currency",
        },
        {
          dimensionName: "Geography",
          hierarchyName: "City",
          levelName: "City",
        },
      ],
    })!;

    expect(path).toMatchInlineSnapshot(`
      Array [
        "axes",
        0,
        "expression",
        "arguments",
        0,
      ]
    `);

    expect(stringify(match, { indent: true })).toMatchInlineSnapshot(`
      "Union(
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
      )"
    `);
  });

  it("returns `undefined`, if `mdx` is valid", () => {
    // There is no issue with this Mdx.
    const mdx = parse<MdxSelect>(`SELECT
    NON EMPTY Hierarchize(
      Union(
        Crossjoin(
          DrilldownLevel(
            [Currency].[Currency].[ALL].[AllMember]
          ),
          [Geography].[City].DefaultMember
        ),
        Crossjoin(
          [Currency].[Currency].[ALL].[AllMember].[GBP],
          [Geography].[City].[City].Members
        )
      )
    ) ON ROWS
    FROM [EquityDerivativesCube]
    CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS`);

    const result = _findErroneousUnionNode(mdx, {
      cube,
      levelsOnAxis: [
        {
          dimensionName: "Currency",
          hierarchyName: "Currency",
          levelName: "Currency",
        },
        {
          dimensionName: "Geography",
          hierarchyName: "City",
          levelName: "City",
        },
      ],
    });

    expect(result).toBeUndefined();
  });
});
