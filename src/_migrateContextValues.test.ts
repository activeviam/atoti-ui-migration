import { _migrateContextValues } from "./_migrateContextValues";

describe("_migrateContextValues", () => {
  it("returns the query context entries corresponding to flat legacy context values", () => {
    const legacyContextValues = {
      keyA: "valueA",
      keyB: "valueB",
    };
    expect(_migrateContextValues(legacyContextValues)).toEqual([
      {
        key: "keyA",
        value: "valueA",
      },
      {
        key: "keyB",
        value: "valueB",
      },
    ]);
  });

  it("returns the query context entries corresponding to legacy context values grouped by cube name", () => {
    const legacyContextValuesGroupedByCubeName = {
      cube1: {
        keyA: "cube1-valueA",
        keyB: "cube1-valueB",
      },
      cube2: {
        keyA: "cube2-valueA",
        keyC: "cube2-valueC",
      },
    };
    expect(_migrateContextValues(legacyContextValuesGroupedByCubeName)).toEqual(
      [
        {
          key: "keyA",
          value: "cube2-valueA",
        },
        {
          key: "keyB",
          value: "cube1-valueB",
        },
        { key: "keyC", value: "cube2-valueC" },
      ]
    );
  });
});
