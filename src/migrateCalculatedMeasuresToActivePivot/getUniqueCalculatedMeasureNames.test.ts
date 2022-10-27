import { calculatedMeasures } from "../__test_resources__/aui5.0LegacyTestResources/calculatedMeasuresFolder";
import { getCalculatedMeasureIds } from "./getCalculatedMeasureIds";
import { getUniqueCalculatedMeasureNames } from "./getUniqueCalculatedMeasureNames";

const ids = getCalculatedMeasureIds(calculatedMeasures);

describe("getUniqueCalculatedMeasureNames", () => {
  it("returns an array containing the names of all the calculated measures from an ActiveUI 5.0 `calculated_measures` folder", () => {
    expect(
      getUniqueCalculatedMeasureNames(calculatedMeasures, ids),
    ).toStrictEqual([
      "Distinct count city",
      "Exp gamma sum",
      "Log pv.SUM",
      "activeui5 calculated measure",
      "Test calculated measure",
      "pvSum ^ 2",
    ]);
  });
});
