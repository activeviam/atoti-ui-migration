import { getMigratedSavedCalculatedMeasureContentXML } from "./getMigratedSavedCalculatedMeasureContentXML";

describe("getMigratedSavedCalculatedMeasureContentXML", () => {
  it("returns the content of a calculated measure created with ActiveUI 5.0 which contains a `FORMAT_STRING` property and an `additionalProperty`, transformed into an XML document that is natively supported by ActivePivot", () => {
    const migratedContent = getMigratedSavedCalculatedMeasureContentXML(
      "Distinct count city",
      "Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY)",
      { FORMAT_STRING: '"#,###.##"', CAPTION: '"Distinct count city"' },
    );

    expect(migratedContent.end({ prettyPrint: true })).toMatchInlineSnapshot(`
      "<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <calculatedMember expression="Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY)" formatStringExpression="&quot;#,###.##&quot;" uniqueName="[Measures].[Distinct count city]" xmlns="http://www.quartetfs.com">
        <additionalProperties CAPTION="&quot;Distinct count city&quot;"/>
      </calculatedMember>"
    `);
  });

  it("returns the content of a calculated measure created with ActiveUI 5.0 which doesn't contain a `FORMAT_STRING` property or any `additionalProperties`, transformed into an XML document that is natively supported by ActivePivot", () => {
    const migratedContent = getMigratedSavedCalculatedMeasureContentXML(
      "Exp gamma sum",
      "10 ^ [Measures].[gamma.SUM]",
      {},
    );

    expect(migratedContent.end({ prettyPrint: true })).toMatchInlineSnapshot(`
      "<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <calculatedMember expression="10 ^ [Measures].[gamma.SUM]" uniqueName="[Measures].[Exp gamma sum]" xmlns="http://www.quartetfs.com">
        <additionalProperties/>
      </calculatedMember>"
    `);
  });
});
