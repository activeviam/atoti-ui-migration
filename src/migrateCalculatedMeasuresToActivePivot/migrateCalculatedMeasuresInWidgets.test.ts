import { widgetsWithCalculatedMeasuresFrom2Cubes } from "../__test_resources__/aui5.0LegacyTestResources/widgetsFolderWithCalculatedMeasuresFrom2Cubes";
import { widgetsFolder } from "../__test_resources__/aui5.0LegacyTestResources/widgetsFolder";
import { migrateCalculatedMeasuresInWidgets } from "./migrateCalculatedMeasuresInWidgets";

describe("getCalculatedMeasuresFromWidgets", () => {
  it("returns an array of the names of the calculated measures from the saved widgets folder, organized by cube, when there is one cube with calculated measures", () => {
    expect(migrateCalculatedMeasuresInWidgets(widgetsFolder)).toStrictEqual({
      "Distinct count city": "EquityDerivativesCube",
      "EXP pnl.Forex": "EquityDerivativesCube",
      "Log pv.SUM": "EquityDerivativesCube",
      "activeui5 calculated measure": "EquityDerivativesCube",
    });
  });

  it("returns an array of the names of the calculated measures from the saved widgets folder, organized by cube, when there is more than one cube with calculated measures", () => {
    expect(
      migrateCalculatedMeasuresInWidgets(widgetsWithCalculatedMeasuresFrom2Cubes),
    ).toStrictEqual({
      "activeui5 calculated measure": "EquityDerivativesCube",
      "pvSum ^ 2": "EquityDerivativesCubeDist",
    });
  });
});
