import { contentServer } from "../__test_resources__/contentServer";
import { getNamesOfCalculatedMeasuresToMigrate } from "./getNamesOfCalculatedMeasuresToMigrate";

describe("getNamesOfCalculatedMeasuresToMigrate", () => {
  it("returns the names corresponding to the calculated measure files created with ActiveUI 5.0", () => {
    expect(getNamesOfCalculatedMeasuresToMigrate(contentServer))
      .toMatchInlineSnapshot(`
      Array [
        "CM in 2 cubes",
        "Log pv.SUM",
      ]
    `);
  });
});
