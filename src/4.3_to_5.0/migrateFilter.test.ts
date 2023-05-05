import { migrateFilter } from "./migrateFilter";

describe("migrateFilter", () => {
  it("returns the converted filter, ready to be used in Atoti UI 5", () => {
    const legacyFilter = {
      name: "My filter",
      type: "mdx" as const,
      value: {
        shouldReplace: true,
        type: "filter" as const,
        mdx: "[Currency].[Currency].[ALL].[AllMember].[EUR]",
        cube: "EquityDerivativesCube",
      },
    };
    expect(migrateFilter(legacyFilter)).toEqual({
      content: { mdx: "[Currency].[Currency].[ALL].[AllMember].[EUR]" },
      metaData: { name: "My filter" },
    });
  });
});
