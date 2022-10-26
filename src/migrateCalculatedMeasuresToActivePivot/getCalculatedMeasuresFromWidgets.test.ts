import { widgetsWithCalculatedMeasuresFrom2Cubes } from "../__test_resources__/aui5.0LegacyTestResources/widgetsFolderWithCalculatedMeasuresFrom2Cubes";
import { widgetsFolder } from "../__test_resources__/aui5.0LegacyTestResources/widgetsFolder";
import { getCalculatedMeasuresFromWidgets } from "./getCalculatedMeasuresFromWidgets";

describe("getCalculatedMeasuresFromWidgets", () => {
  it("returns an array of the names of the calculated measures from the saved widgets folder, organized by cube, when there is one cube with calculated measures", () => {
    expect(getCalculatedMeasuresFromWidgets(widgetsFolder))
      .toMatchInlineSnapshot(`
      Object {
        "EquityDerivativesCube": Array [
          "Distinct count city",
          "Log pv.SUM",
          "activeui5 calculated measure",
          "EXP pnl.Forex",
        ],
      }
    `);
  });

  it("returns an array of the names of the calculated measures from the saved widgets folder, organized by cube, when there is more than one cube with calculated measures", () => {
    expect(
      getCalculatedMeasuresFromWidgets(widgetsWithCalculatedMeasuresFrom2Cubes),
    ).toMatchInlineSnapshot(`
      Object {
        "EquityDerivativesCube": Array [
          "activeui5 calculated measure",
        ],
        "EquityDerivativesCubeDist": Array [
          "pvSum ^ 2",
        ],
      }
    `);
  });
});
