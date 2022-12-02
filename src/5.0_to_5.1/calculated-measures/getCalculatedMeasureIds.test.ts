import { calculatedMeasures } from "../__test_resources__/uiCalculated_measuresFolder";
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
