import { migrateContextValues } from "./migrateContextValues";

describe("migrateContextValues", () => {
  it("stringifies the query context values", () => {
    const contextValues = [{ key: "queriesTimeLimit", value: 30 }];
    migrateContextValues(contextValues);
    expect(contextValues).toHaveLength(1);
    expect(contextValues[0].value).toBe("30");
  });
});
