import { getMigratedSavedCalculatedMeasureContentJSON } from "./getMigratedSavedCalculatedMeasureContentJSON";

describe("getMigratedSavedCalculatedMeasureContentJSON", () => {
  it("returns the content of a calculated measure created with ActiveUI 5.0 which contains a `FORMAT_STRING` property and an `additionalProperty`, transformed into a JSON object that is natively supported by ActivePivot", () => {
    const migratedContent = getMigratedSavedCalculatedMeasureContentJSON(
      "Distinct count city",
      "Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY)",
      { FORMAT_STRING: '"#,###.##"', CAPTION: '"Distinct count city"' },
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

  it("returns the content of a calculated measure created with ActiveUI 5.0 which doesn't contain a `FORMAT_STRING` property or any `additionalProperties`, transformed into a JSON object that is natively supported by ActivePivot", () => {
    const migratedContent = getMigratedSavedCalculatedMeasureContentJSON(
      "Exp gamma sum",
      "10 ^ [Measures].[gamma.SUM]",
      {},
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
