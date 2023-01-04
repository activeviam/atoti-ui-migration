import { contentServer } from "../__test_resources__/contentServer";
import { getNamesOfCalculatedMeasuresToMigrate } from "./getNamesOfCalculatedMeasuresToMigrate";

describe("getNamesOfCalculatedMeasuresToMigrate", () => {
  it("returns the names of the calculated measures created and saved with ActiveUI 5.0", () => {
    expect(getNamesOfCalculatedMeasuresToMigrate(contentServer))
      .toMatchInlineSnapshot(`
      Array [
        "CM in 2 cubes",
        "Log pv.SUM",
      ]
    `);
  });
});
