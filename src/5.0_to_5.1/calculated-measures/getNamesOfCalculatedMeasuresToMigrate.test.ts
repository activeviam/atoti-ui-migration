import { contentServer } from "../__test_resources__/contentServer";
import { getNamesOfCalculatedMeasuresToMigrate } from "./getNamesOfCalculatedMeasuresToMigrate";

describe("getNamesOfCalculatedMeasuresToMigrate", () => {
  it("returns the names of the calculated measures created and saved with Atoti UI 5.0", () => {
    expect(getNamesOfCalculatedMeasuresToMigrate(contentServer)).toStrictEqual([
      "CM in 2 cubes",
      "Log pv.SUM",
      "One",
    ]);
  });
});
