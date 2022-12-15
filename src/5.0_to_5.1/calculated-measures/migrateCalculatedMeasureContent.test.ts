import { migrateCalculatedMeasureContent } from "./migrateCalculatedMeasureContent";

const distinctCountCityContent = JSON.parse(
  '{"expression":"Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY)","properties":["FORMAT_STRING = \\"#,###.##\\"","CAPTION = \\"Distinct count city\\""]}',
);

const expGammaSumContent = JSON.parse(
  '{"expression":"10 ^ [Measures].[gamma.SUM]","properties":[]}',
);

describe("migrateCalculatedMeasureContent", () => {
  it("transforms the content of a calculated measure created with ActiveUI 5.0 which contains a `FORMAT_STRING` property and an `additionalProperty`, into one that is natively supported by ActivePivot", () => {
    const migratedContent = migrateCalculatedMeasureContent(
      distinctCountCityContent,
      "Distinct count city",
    );

    expect(JSON.parse(migratedContent)).toStrictEqual({
      additionalProperties: {
        CAPTION: '"Distinct count city"',
      },
      className:
        "com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription",
      expression:
        "Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY)",
      formatStringExpression: '"#,###.##"',
      uniqueName: "[Measures].[Distinct count city]",
    });
  });

  it("transforms the content of a calculated measure created with ActiveUI 5.0 which doesn't contain a `FORMAT_STRING` property or any `additionalProperties`, into one that is natively supported by ActivePivot", () => {
    const migratedContent = migrateCalculatedMeasureContent(
      expGammaSumContent,
      "Exp gamma sum",
    );

    expect(JSON.parse(migratedContent)).toStrictEqual({
      additionalProperties: {},
      className:
        "com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription",
      expression: "10 ^ [Measures].[gamma.SUM]",
      uniqueName: "[Measures].[Exp gamma sum]",
    });
  });
});
