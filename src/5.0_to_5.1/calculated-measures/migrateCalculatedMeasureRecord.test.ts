import { migrateCalculatedMeasureRecord } from "./migrateCalculatedMeasureRecord";
import _cloneDeep from "lodash/cloneDeep";

const distinctCountCity = {
  entry: {
    content:
      '{"expression":"Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY)","properties":["FORMAT_STRING = \\"#,###.##\\"","CAPTION = \\"Distinct count city\\" "]}',
    isDirectory: false,
    owners: ["admin"],
    readers: ["admin"],
    timestamp: 1666091498549,
    lastEditor: "admin",
    canRead: true,
    canWrite: true,
  },
};

const expGammaSum = {
  entry: {
    content: '{"expression":"10 ^ [Measures].[gamma.SUM]","properties":[]}',
    isDirectory: false,
    owners: ["admin"],
    readers: ["admin"],
    timestamp: 1666091548728,
    lastEditor: "admin",
    canRead: true,
    canWrite: true,
  },
};

describe("migrateCalculatedMeasureRecord", () => {
  it("transforms the serialized definition of a calculated measure created with ActiveUI 5.0 which contains a `FORMAT_STRING` property and an `additionalProperty`, into one that is natively supported by ActivePivot", () => {
    const calculatedMeasureRecord = _cloneDeep(distinctCountCity);
    migrateCalculatedMeasureRecord(
      calculatedMeasureRecord,
      "Distinct count city",
    );
    expect(calculatedMeasureRecord).toMatchInlineSnapshot(`
      Object {
        "entry": Object {
          "canRead": true,
          "canWrite": true,
          "content": "{\\"className\\":\\"com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription\\",\\"additionalProperties\\":{\\"CAPTION\\":\\"\\\\\\"Distinct count city\\\\\\" \\"},\\"uniqueName\\":\\"[Measures].[Distinct count city]\\",\\"expression\\":\\"Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY)\\",\\"formatStringExpression\\":\\"\\\\\\"#,###.##\\\\\\"\\"}",
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
    expect(JSON.parse(calculatedMeasureRecord.entry.content)).toStrictEqual({
      additionalProperties: {
        CAPTION: '"Distinct count city" ',
      },
      className:
        "com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription",
      expression:
        "Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY)",
      formatStringExpression: '"#,###.##"',
      uniqueName: "[Measures].[Distinct count city]",
    });
  });

  it("transforms the serialized definition of a calculated measure created with ActiveUI 5.0 which doesn't contain a `FORMAT_STRING` property or any `additionalProperties`, into one that is natively supported by ActivePivot", () => {
    const calculatedMeasureRecord = _cloneDeep(expGammaSum);
    migrateCalculatedMeasureRecord(calculatedMeasureRecord, "Exp gamma sum");
    expect(calculatedMeasureRecord).toMatchInlineSnapshot(`
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

    expect(JSON.parse(calculatedMeasureRecord.entry.content)).toStrictEqual({
      additionalProperties: {},
      className:
        "com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription",
      expression: "10 ^ [Measures].[gamma.SUM]",
      uniqueName: "[Measures].[Exp gamma sum]",
    });
  });
});
