import { calculatedMeasures } from "../__test_resources__/aui5.0calculatedMeasuresFolder";
import { createAPCalculatedMeasure } from "./createAPCalculatedMeasure";

describe("createAPCalculatedMeasure", () => {
  it("returns `undefined` if the provided id does not match a calculated measure in the provided `calculated_measures` folder", () => {
    expect(
      createAPCalculatedMeasure(
        calculatedMeasures,
        "Distinct count city",
        "abc",
      ),
    ).toStrictEqual(undefined);
  });

  it("returns an object containing the content of a calculated measure when the calculated measure is at the top level of the folder structure", () => {
    expect(
      createAPCalculatedMeasure(
        calculatedMeasures,
        "Distinct count city",
        "196",
      ),
    ).toMatchInlineSnapshot(`
      Object {
        "entry": Object {
          "canRead": true,
          "canWrite": true,
          "content": "{\\"className\\":\\"com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription\\",\\"additionalProperties\\":{},\\"uniqueName\\":\\"[Measures].[Distinct count city]\\",\\"expression\\":\\"Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY)\\",\\"formatStringExpression\\":\\"FORMAT_STRING = \\\\\\"#,###.##\\\\\\"\\"}",
          "isDirectory": false,
          "lastEditor": "admin",
          "owners": Array [
            "admin",
          ],
          "readers": Array [
            "admin",
          ],
          "timestamp": 1666091498549,
        },
      }
    `);
  });

  it("returns an object containing the content of a calculated measure when the calculated measure is nested inside 2 parent folders", () => {
    expect(createAPCalculatedMeasure(calculatedMeasures, "Log pv.SUM", "585"))
      .toMatchInlineSnapshot(`
      Object {
        "entry": Object {
          "canRead": true,
          "canWrite": true,
          "content": "{\\"className\\":\\"com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription\\",\\"additionalProperties\\":{},\\"uniqueName\\":\\"[Measures].[Log pv.SUM]\\",\\"expression\\":\\"Log([Measures].[pv.SUM], 10)\\",\\"formatStringExpression\\":\\"FORMAT_STRING = \\\\\\"#,###.##\\\\\\"\\"}",
          "isDirectory": false,
          "lastEditor": "admin",
          "owners": Array [
            "admin",
          ],
          "readers": Array [
            "admin",
          ],
          "timestamp": 1666170634498,
        },
      }
    `);
  });
});
