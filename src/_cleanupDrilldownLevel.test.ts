import { parse, stringify } from "@activeviam/mdx";
import { dataModelsForTests } from "@activeviam/data-model";

import { _cleanupDrilldownLevel } from "./_cleanupDrilldownLevel";

const cube = dataModelsForTests.sandbox.catalogs[0].cubes[0];

describe("_cleanupDrilldownLevel", () => {
  it("replaces a DrilldownLevel function by its input set if it is the only argument, and if the deepest level expressed within it is a leaf level", () => {
    const mdx = parse(`                                 
    SELECT                                                                                                                                                              
      NON EMPTY Hierarchize(
            DrilldownLevel(
              {
                [Geography].[City].[ALL].[AllMember].[Berlin]
              }
            )
          ) ON ROWS
        FROM [EquityDerivativesCube]`);
    const cleanMdx = _cleanupDrilldownLevel(mdx, cube);
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

  it("does not replace a DrilldownLevel function if it has several arguments", () => {
    // See the function doc: https://learn.microsoft.com/en-us/sql/mdx/drilldownlevel-mdx?view=sql-server-ver16
    // Extra arguments can include a level expression or a hierarchy index to specify where to drilldown to.
    // These more complex cases are not covered by _cleanupDrilldownLevel: better to keep suboptimal MDX than break it.
    const mdx = parse(`                                 
    SELECT                                                                                                                                                              
      NON EMPTY Hierarchize(
            DrilldownLevel(
              {
                (
                  [Geography].[City].[ALL].[AllMember].[Berlin],
                  [Currency].[Currency].[ALL].[AllMember].[EUR]
                )
              },
              1
            )
          ) ON ROWS
        FROM [EquityDerivativesCube]`);
    const cleanMdx = _cleanupDrilldownLevel(mdx, cube);
    expect(cleanMdx).toStrictEqual(mdx);
  });

  it("does not replace a DrilldownLevel function if the deepest level expressed in the input set is not a leaf level", () => {
    const mdx = parse(`                                 
    SELECT                                                                                                                                                              
      NON EMPTY Hierarchize(
            DrilldownLevel(
              {
                [Booking].[Desk].[ALL].[AllMember].[LegalEntityA].[BusinessUnitA]
              }
            )
          ) ON ROWS
        FROM [EquityDerivativesCube]`);
    const cleanMdx = _cleanupDrilldownLevel(mdx, cube);
    expect(cleanMdx).toStrictEqual(mdx);
  });
});
