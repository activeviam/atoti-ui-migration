import { calculatedMeasures } from "../__test_resources__/uiCalculated_measuresFolder";
import { migrateCalculatedMeasureRecord } from "./migrateCalculatedMeasureRecord";

const distinctCountCity = calculatedMeasures.children.content.children["196"];
const expGammaSum = calculatedMeasures.children.content.children["501"];

describe("migrateCalculatedMeasureRecord", () => {
  it("transforms the serialized definition of a calculated measure created with ActiveUI 5.0 which contains a `FORMAT_STRING` property, into one that is natively supported by ActivePivot", () => {
    const migratedRecord = migrateCalculatedMeasureRecord(
      distinctCountCity,
      "Distinct count city",
    );
    expect(migratedRecord).toMatchInlineSnapshot(`
      Object {
        "entry": Object {
          "canRead": true,
          "canWrite": true,
          "content": "{\\"className\\":\\"com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription\\",\\"additionalProperties\\":{},\\"uniqueName\\":\\"[Measures].[Distinct count city]\\",\\"expression\\":\\"Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY)\\",\\"formatStringExpression\\":\\"\\\\\\"#,###.##\\\\\\"\\"}",
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

    expect(JSON.parse(migratedRecord.entry.content)).toStrictEqual({
      additionalProperties: {},
      className:
        "com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription",
      expression:
        "Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY)",
      formatStringExpression: `"#,###.##"`,
      uniqueName: "[Measures].[Distinct count city]",
    });
  });

  it("transforms the serialized definition of a calculated measure created with ActiveUI 5.0 which doesn't contain a `FORMAT_STRING` property, into one that is natively supported by ActivePivot", () => {
    const migratedRecord = migrateCalculatedMeasureRecord(
      expGammaSum,
      "Exp gamma sum",
    );

    expect(migratedRecord).toMatchInlineSnapshot(`
      Object {
        "entry": Object {
          "canRead": true,
          "canWrite": true,
          "content": "{\\"className\\":\\"com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription\\",\\"additionalProperties\\":{},\\"uniqueName\\":\\"[Measures].[Exp gamma sum]\\",\\"expression\\":\\"10 ^ [Measures].[gamma.SUM]\\"}",
          "isDirectory": false,
          "lastEditor": "admin",
          "owners": Array [
            "admin",
          ],
          "readers": Array [
            "admin",
          ],
          "timestamp": 1666091548728,
        },
      }
    `);

    expect(JSON.parse(migratedRecord.entry.content)).toStrictEqual({
      additionalProperties: {},
      className:
        "com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription",
      expression: "10 ^ [Measures].[gamma.SUM]",
      uniqueName: "[Measures].[Exp gamma sum]",
    });
  });
});
