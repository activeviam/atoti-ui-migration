import { parse, stringify } from "@activeviam/activeui-sdk-5.0";
import { sandboxDataModel } from "@activeviam/data-model-5.1/dist/__test_resources__";
import { migrateFilters } from "./migrateFilters";

const dataModels = { sandbox: sandboxDataModel };

describe("migrateFilters", () => {
  it("wraps the MDX representing each filter", () => {
    const euroAsString = "[Currency].[Currency].[ALL].[AllMember].[EUR]";
    const euro = parse(euroAsString);
    const filters = [euro];
    migrateFilters(filters, { dataModels });
    expect(filters).toHaveLength(1);
    // @ts-expect-error The point of the migration is to mutate the filters from `mdx` to `{mdx}`.
    expect(stringify(filters[0].mdx)).toBe(euroAsString);
  });
});
