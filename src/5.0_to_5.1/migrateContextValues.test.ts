import { migrateContextValues } from "./migrateContextValues";

describe("migrateContextValues", () => {
  it("stringifies the query context values", () => {
    const contextValues = [{ key: "queriesTimeLimit", value: 30 }];
    migrateContextValues(contextValues);
    expect(contextValues).toStrictEqual([
      { key: "queriesTimeLimit", value: "30" },
    ]);
  });
});
