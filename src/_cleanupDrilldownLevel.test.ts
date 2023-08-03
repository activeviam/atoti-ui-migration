import { parse, stringify } from "@activeviam/mdx";
import { dataModelsForTests } from "@activeviam/data-model";

import { _cleanupDrilldownLevel } from "./_cleanupDrilldownLevel";

const cube = dataModelsForTests.sandbox.catalogs[0].cubes[0];

describe("_cleanupDrilldownLevel", () => {
  it("replaces a DrilldownLevel function by its input set if the deepest level expressed in the set is a leaf level", () => {
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
});
