import { calculatedMeasures } from "../__test_resources__/aui5.0calculatedMeasuresFolder";
import { getCalculatedMeasureIds } from "./getCalculatedMeasureIds";

describe("getCalculatedMeasureIds", () => {
  it("returns an array containing the ids of all the calculated measures from an ActiveUI 5.0 `calculated_measures` folder", () => {
    expect(getCalculatedMeasureIds(calculatedMeasures)).toStrictEqual([
      "196",
      "501",
      "585",
      "cef",
      "6b5",
    ]);
  });
});
