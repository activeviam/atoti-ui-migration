import _cloneDeep from "lodash/cloneDeep";
import { MdxSelect, parse, stringify } from "@activeviam/activeui-sdk-5.0";

import { _fixErroneousExpansionMdx } from "./_fixErroneousExpansionMdx";
import { dataModelsForTests } from "@activeviam/data-model-5.0";

const cube = dataModelsForTests.sandbox.catalogs[0].cubes[0];

describe("_fixErroneousExpansionMdx", () => {
  it("removes the problematic part of the Mdx of a widget where a user collapsed and then re-expanded a member in ActiveUI 4", () => {
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

    const updatedMdx = _fixErroneousExpansionMdx(mdx, cube);

    expect(stringify(updatedMdx, { indent: true })).toMatchInlineSnapshot(`
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

  it("removes the problematic part of the Mdx of a widget where a user collapsed and then re-expanded a member in ActiveUI 4 - even if one of the involved hierarchies is slicing", () => {
    const mdx = parse<MdxSelect>(`SELECT
      NON EMPTY Hierarchize(
        Union(
          Crossjoin(
            Hierarchize(
              [Time].[HistoricalDates].[AsOfDate].Members
            ),
            Hierarchize(
              DrilldownLevel(
                [Currency].[Currency].[ALL].[AllMember]
              )
            )
          ),
          Crossjoin(
            [Time].[HistoricalDates].[AsOfDate].[2021-12-10],
            Descendants(
              {
                [Currency].[Currency].[ALL].[AllMember]
              },
              [Currency].[Currency].[Currency]
            )
          )
        )
      ) ON ROWS
      FROM [EquityDerivativesCube]
      CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS`);

    const updatedMdx = _fixErroneousExpansionMdx(mdx, cube);

    expect(stringify(updatedMdx, { indent: true })).toMatchInlineSnapshot(`
      "SELECT
        NON EMPTY Hierarchize(
          Crossjoin(
            Hierarchize(
              [Time].[HistoricalDates].[AsOfDate].Members
            ),
            Hierarchize(
              DrilldownLevel(
                [Currency].[Currency].[ALL].[AllMember]
              )
            )
          )
        ) ON ROWS
        FROM [EquityDerivativesCube]
        CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"
    `);
  });

  it("removes the problematic parts of the Mdx of a widget where a user collapsed and then re-expanded 2 different members in ActiveUI 4 (collapsing all of them, then re-expanding all of them)", () => {
    const mdx = parse<MdxSelect>(`SELECT
      NON EMPTY Hierarchize(
        Union(
          Crossjoin(
            Hierarchize(
              Union(
                Hierarchize(
                  DrilldownLevel(
                    [Currency].[Currency].[ALL].[AllMember]
                  )
                ),
                [Currency].[Currency].[ALL].[AllMember].[EUR]
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
          ),
          Crossjoin(
            [Currency].[Currency].[ALL].[AllMember].[GBP],
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

    const updatedMdx = _fixErroneousExpansionMdx(mdx, cube);

    expect(stringify(updatedMdx, { indent: true })).toMatchInlineSnapshot(`
      "SELECT
        NON EMPTY Hierarchize(
          Crossjoin(
            Hierarchize(
              Union(
                Hierarchize(
                  DrilldownLevel(
                    [Currency].[Currency].[ALL].[AllMember]
                  )
                ),
                [Currency].[Currency].[ALL].[AllMember].[EUR]
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

  it("removes the problematic parts of the Mdx of a widget where a user collapsed and then re-expanded 2 different members in ActiveUI 4 (collapsing and re-expanding each one before moving to the next)", () => {
    const mdx = parse<MdxSelect>(`SELECT
      NON EMPTY Hierarchize(
        Union(
          Crossjoin(
            Hierarchize(
              Union(
                Hierarchize(
                  DrilldownLevel(
                    [Currency].[Currency].[ALL].[AllMember]
                  )
                ),
                [Currency].[Currency].[ALL].[AllMember].[EUR]
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
          ),
          Crossjoin(
            [Currency].[Currency].[ALL].[AllMember].[GBP],
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

    const updatedMdx = _fixErroneousExpansionMdx(mdx, cube);

    expect(stringify(updatedMdx, { indent: true })).toMatchInlineSnapshot(`
      "SELECT
        NON EMPTY Hierarchize(
          Crossjoin(
            Hierarchize(
              Union(
                Hierarchize(
                  DrilldownLevel(
                    [Currency].[Currency].[ALL].[AllMember]
                  )
                ),
                [Currency].[Currency].[ALL].[AllMember].[EUR]
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

  it("removes the problematic parts of the Mdx of a widget where a user collapsed and then re-expanded 3 different members in ActiveUI 4 (collapsing and re-expanding each one before moving to the next)", () => {
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
        ),
        Crossjoin(
          [Currency].[Currency].[ALL].[AllMember].[GBP],
          Descendants(
            {
              [Geography].[City].[ALL].[AllMember]
            },
            [Geography].[City].[City]
          )
        ),
        Crossjoin(
          [Currency].[Currency].[ALL].[AllMember].[USD],
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

    const updatedMdx = _fixErroneousExpansionMdx(mdx, cube);

    expect(stringify(updatedMdx, { indent: true })).toMatchInlineSnapshot(`
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

  it("removes the problematic part of the query where a member was collapsed and then re-expanded, while maintaining other collapsed members collapsed", () => {
    const mdx = parse<MdxSelect>(`SELECT
    NON EMPTY Except(
      Hierarchize(
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
      ),
      Crossjoin(
        [Currency].[Currency].[ALL].[AllMember].[GBP],
        [Geography].[City].[City].Members
      )
    ) ON ROWS
    FROM [EquityDerivativesCube]
    CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS`);

    const updatedMdx = _fixErroneousExpansionMdx(mdx, cube);

    expect(stringify(updatedMdx, { indent: true })).toMatchInlineSnapshot(`
      "SELECT
        NON EMPTY Except(
          Hierarchize(
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
          ),
          Crossjoin(
            [Currency].[Currency].[ALL].[AllMember].[GBP],
            [Geography].[City].[City].Members
          )
        ) ON ROWS
        FROM [EquityDerivativesCube]
        CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"
    `);
  });

  it("does not change a valid Mdx with a collapsed member", () => {
    const mdx = parse<MdxSelect>(`SELECT
      NON EMPTY Except(
        Hierarchize(
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
        ),
        Crossjoin(
          [Currency].[Currency].[ALL].[AllMember].[EUR],
          [Geography].[City].[City].Members
        )
      ) ON ROWS
      FROM [EquityDerivativesCube]
      CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS`);

    const updatedMdx = _fixErroneousExpansionMdx(mdx, cube);

    expect(updatedMdx).toBe(mdx);
  });

  it("does not change a valid mdx with an expanded member", () => {
    const mdx = parse<MdxSelect>(`SELECT
      NON EMPTY Hierarchize(
        Union(
          Hierarchize(
            Crossjoin(
              DrilldownLevel(
                [Currency].[Currency].[ALL].[AllMember]
              ),
              [Geography].[City].DefaultMember
            )
          ),
          Crossjoin(
            [Currency].[Currency].[ALL].[AllMember].[EUR],
            [Geography].[City].[City].Members
          )
        )
      ) ON ROWS
      FROM [EquityDerivativesCube]
      CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS`);

    const updatedMdx = _fixErroneousExpansionMdx(mdx, cube);

    expect(updatedMdx).toBe(mdx);
  });

  it("does not mutate `mdx`", () => {
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

    const clone = _cloneDeep(mdx);

    _fixErroneousExpansionMdx(mdx, cube);

    expect(mdx).toStrictEqual(clone);
  });
});
