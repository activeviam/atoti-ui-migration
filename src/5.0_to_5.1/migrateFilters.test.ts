import { parse, stringify } from "@activeviam/activeui-sdk-5.0";
import { migrateFilters } from "./migrateFilters";

describe("migrateFilters", () => {
  it("wraps the MDX representing each filter", () => {
    const euroAsString = "[Currency].[Currency].[ALL].[AllMember].[EUR]";
    const euro = parse(euroAsString);
    const filters = [euro];
    migrateFilters(filters);
    expect(filters).toHaveLength(1);
    // @ts-expect-error The point of the migration is to mutate the filters from `mdx` to `{mdx}`.
    expect(stringify(filters[0].mdx)).toBe(euroAsString);
  });
});
