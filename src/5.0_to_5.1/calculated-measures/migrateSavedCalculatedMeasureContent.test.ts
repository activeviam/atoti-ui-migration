import { migrateSavedCalculatedMeasureContent } from "./migrateSavedCalculatedMeasureContent";

const distinctCountCityContent = JSON.parse(
  '{"expression":"Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY)","properties":["FORMAT_STRING = \\"#,###.##\\"","CAPTION = \\"Distinct count city\\""]}',
);

const expGammaSumContent = JSON.parse(
  '{"expression":"10 ^ [Measures].[gamma.SUM]","properties":[]}',
);

describe("migrateSavedCalculatedMeasureContent", () => {
  it("transforms the content of a calculated measure created with Atoti UI 5.0 which contains a `FORMAT_STRING` property and an `additionalProperty`, into one that is natively supported by ActivePivot", () => {
    const migratedContent = migrateSavedCalculatedMeasureContent(
      distinctCountCityContent,
      "Distinct count city",
    );

    expect(migratedContent).toStrictEqual({
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

  it("transforms the content of a calculated measure created with Atoti UI 5.0 which doesn't contain a `FORMAT_STRING` property or any `additionalProperties`, into one that is natively supported by ActivePivot", () => {
    const migratedContent = migrateSavedCalculatedMeasureContent(
      expGammaSumContent,
      "Exp gamma sum",
    );

    expect(migratedContent).toStrictEqual({
      additionalProperties: {},
      className:
        "com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription",
      expression: "10 ^ [Measures].[gamma.SUM]",
      formatStringExpression: undefined,
      uniqueName: "[Measures].[Exp gamma sum]",
    });
  });
});
