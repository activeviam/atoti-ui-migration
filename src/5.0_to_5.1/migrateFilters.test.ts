import { parse } from "@activeviam/activeui-sdk-5.0";
import {
  dualCatalogDataModel,
  sandboxDataModel,
} from "@activeviam/data-model-5.1/dist/__test_resources__";
import { migrateFilters } from "./migrateFilters";

const dataModels = {
  sandbox: sandboxDataModel,
  dualCatalog: dualCatalogDataModel,
};

describe("migrateFilters", () => {
  it("transforms each MdxExpression into a Filter, with the first cube containing the hierarchies expressed in the MDX expression", () => {
    const euro = "[Currency].[Currency].[ALL].[AllMember].[EUR]";
    const berlin = "[Geography].[City].[ALL].[AllMember].[Berlin]";
    const filters = [euro, berlin].map(parse);
    migrateFilters(filters, { dataModels });
    expect(filters).toMatchInlineSnapshot(`
      [
        {
          "dimensionName": "Currency",
          "hierarchyName": "Currency",
          "members": [
            [
              "AllMember",
              "EUR",
            ],
          ],
          "type": "members",
        },
        {
          "dimensionName": "Geography",
          "hierarchyName": "City",
          "members": [
            [
              "AllMember",
              "Berlin",
            ],
          ],
          "type": "members",
        },
      ]
    `);
  });

  it("uses the target cube identified by `cubeName` to create a Filter", () => {
    const berlin = "[Geography].[City].[ALL].[AllMember].[Berlin]";
    const filters = [berlin].map(parse);
    migrateFilters(filters, {
      dataModels,
      // EmptyCube1 is a cube of `dualCatalogDataModel`.
      cubeName: "EmptyCube1",
    });
    expect(filters).toMatchInlineSnapshot(`
      [
        {
          "dimensionName": "Geography",
          "hierarchyName": "City",
          "members": [
            [
              "AllMember",
              "Berlin",
            ],
          ],
          "type": "members",
        },
      ]
    `);
  });

  it("throws if there is no cube containing the hierarchies expressed in Filter", () => {
    const squirtle = "[Pokemon].[Water].[ALL].[AllMember].[Squirtle]";
    const filters = [parse(squirtle)];
    expect(() => {
      migrateFilters(filters, {
        dataModels,
      });
    }).toThrowErrorMatchingInlineSnapshot(
      `"The following MDX does not represent a filter: [Pokemon].[Water].[ALL].[AllMember].[Squirtle]"`,
    );
  });
});
