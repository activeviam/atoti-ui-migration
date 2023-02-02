import { sandboxDataModel } from "@activeviam/data-model-5.1/dist/__test_resources__";
import { migrateSavedFilter } from "./migrateSavedFilter";
import { parse } from "@activeviam/activeui-sdk-5.0";

const dataModels = { sandbox: sandboxDataModel };

const euro = "[Currency].[Currency].[ALL].[AllMember].[EUR]";

describe("migrateSavedFilter", () => {
  it("migrates a 5.0 saved filter into one usable by ActiveUI 5.1", () => {
    expect(
      migrateSavedFilter(
        { mdx: parse(euro) },
        {
          dataModels,
        },
      ),
    ).toMatchInlineSnapshot(`
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
      }
    `);
  });
});
