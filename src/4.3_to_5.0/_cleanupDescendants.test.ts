import { MdxSelect, parse, stringify } from "@activeviam/mdx-5.0";
import { dataModelsForTests } from "@activeviam/data-model-5.0";

import { _cleanupDescendants } from "./_cleanupDescendants";

const cube = dataModelsForTests.sandbox.catalogs[0].cubes[0];

describe("_cleanupDescendants", () => {
  it("replaces a Descendants function by its input set if the shallowest level expressed in the set is the same as the target one or above", () => {
    const mdx = parse<MdxSelect>(`                                 
    SELECT                                                                                                                                                              
      NON EMPTY Hierarchize(
            Descendants(
              {
                [Geography].[City].[ALL].[AllMember].[Berlin]
              },
              [Geography].[City].[City]
            )
          ) ON ROWS
        FROM [EquityDerivativesCube]`);
    const cleanMdx = _cleanupDescendants(mdx, cube);
    expect(stringify(cleanMdx, { indent: true })).toMatchInlineSnapshot(`
      "SELECT
        NON EMPTY Hierarchize(
          {
            [Geography].[City].[ALL].[AllMember].[Berlin]
          }
        ) ON ROWS
        FROM [EquityDerivativesCube]"
    `);
  });

  it("replaces a useless Descendants function called on a set from a multilevel hierarchy", () => {
    const mdx = parse<MdxSelect>(`                                 
    SELECT                                                                                                                                                              
      NON EMPTY Hierarchize(
            Descendants(
              {
                [Booking].[Desk].[ALL].[AllMember].[LegalEntityA]
              },
              [Booking].[Desk].[LegalEntity]
            )
          ) ON ROWS
        FROM [EquityDerivativesCube]`);
    const cleanMdx = _cleanupDescendants(mdx, cube);
    expect(stringify(cleanMdx, { indent: true })).toMatchInlineSnapshot(`
      "SELECT
        NON EMPTY Hierarchize(
          {
            [Booking].[Desk].[ALL].[AllMember].[LegalEntityA]
          }
        ) ON ROWS
        FROM [EquityDerivativesCube]"
    `);
  });

  it("replaces a useless Descendants function when the first argument is a set of members from the leaf level, and the second argument is a distance", () => {
    const mdx = parse<MdxSelect>(`                                 
    SELECT                                                                                                                                                              
      NON EMPTY Hierarchize(
            Descendants(
              {
                [Booking].[Desk].[ALL].[AllMember].[LegalEntityA].[BusinessUnitA].[DeskA].[0]
              },
              1
            )
          ) ON ROWS
        FROM [EquityDerivativesCube]`);
    const cleanMdx = _cleanupDescendants(mdx, cube);
    expect(stringify(cleanMdx, { indent: true })).toMatchInlineSnapshot(`
      "SELECT
        NON EMPTY Hierarchize(
          {
            [Booking].[Desk].[ALL].[AllMember].[LegalEntityA].[BusinessUnitA].[DeskA].[0]
          }
        ) ON ROWS
        FROM [EquityDerivativesCube]"
    `);
  });

  it("does not replace a Descendants function when the first argument is a set of members from a non-leaf level, and the second argument is a distance", () => {
    const mdx = parse<MdxSelect>(`                                 
    SELECT                                                                                                                                                              
      NON EMPTY Hierarchize(
            Descendants(
              {
                [Booking].[Desk].[ALL].[AllMember].[LegalEntityA].[BusinessUnitA]
              },
              1
            )
          ) ON ROWS
        FROM [EquityDerivativesCube]`);
    const cleanMdx = _cleanupDescendants(mdx, cube);
    expect(cleanMdx).toStrictEqual(mdx);
  });

  it("replaces a useless Descendants function called on a set with members from the leaf level, without a second argument", () => {
    const mdx = parse<MdxSelect>(`                                 
    SELECT                                                                                                                                                              
      NON EMPTY Hierarchize(
            Descendants(
              {
                [Booking].[Desk].[ALL].[AllMember].[LegalEntityA].[BusinessUnitA].[DeskA].[1]
              }
            )
          ) ON ROWS
        FROM [EquityDerivativesCube]`);
    const cleanMdx = _cleanupDescendants(mdx, cube);
    expect(stringify(cleanMdx, { indent: true })).toMatchInlineSnapshot(`
      "SELECT
        NON EMPTY Hierarchize(
          {
            [Booking].[Desk].[ALL].[AllMember].[LegalEntityA].[BusinessUnitA].[DeskA].[1]
          }
        ) ON ROWS
        FROM [EquityDerivativesCube]"
    `);
  });

  it("does not cleanup the descendants of a hierarchy's current member", () => {
    const mdxString = `
      WITH
      Member [Measures].[City] AS Count(
        Descendants(
          [Geography].[City].CurrentMember,
          [Geography].[City].[City]
        ),
        EXCLUDEEMPTY
      ), FORMAT_STRING = "#,###.##" 
      SELECT
        NON EMPTY {
          [Measures].[City]
        } ON COLUMNS,
        NON EMPTY [Geography].[City].[City].Members ON ROWS
        FROM [EquityDerivativesCube]
        CELL PROPERTIES BACK_COLOR, FONT_FLAGS, FORE_COLOR, FORMATTED_VALUE, VALUE
  `;
    const mdx = parse<MdxSelect>(mdxString);
    const cleanMdx = _cleanupDescendants(mdx, cube);
    expect(cleanMdx).toStrictEqual(mdx);
  });
});
