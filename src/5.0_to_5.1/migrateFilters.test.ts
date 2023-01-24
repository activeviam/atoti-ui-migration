import { parse } from "@activeviam/activeui-sdk-5.0";
import { sandboxDataModel } from "@activeviam/data-model-5.1/dist/__test_resources__";
import { migrateFilters } from "./migrateFilters";

const dataModels = { sandbox: sandboxDataModel };

describe("migrateFilters", () => {
  it("transforms each MdxExpression into a Filter", () => {
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
});
