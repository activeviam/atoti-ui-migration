import { getMigratedSavedCalculatedMeasureContentXML } from "./getMigratedSavedCalculatedMeasureContentXML";

const distinctCountCityContent = JSON.parse(
  '{"expression":"Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY)","properties":["FORMAT_STRING = \\"#,###.##\\"","CAPTION = \\"Distinct count city\\""]}',
);

const expGammaSumContent = JSON.parse(
  '{"expression":"10 ^ [Measures].[gamma.SUM]","properties":[]}',
);

describe("getMigratedSavedCalculatedMeasureContentXML", () => {
  it("returns the content of a calculated measure created with ActiveUI 5.0 which contains a `FORMAT_STRING` property and an `additionalProperty`, transformed into an XML document that is natively supported by ActivePivot", () => {
    const migratedContent = getMigratedSavedCalculatedMeasureContentXML(
      distinctCountCityContent,
      "Distinct count city",
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
      expGammaSumContent,
      "Exp gamma sum",
    );

    expect(migratedContent.end({ prettyPrint: true })).toMatchInlineSnapshot(`
      "<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <calculatedMember expression="10 ^ [Measures].[gamma.SUM]" uniqueName="[Measures].[Exp gamma sum]" xmlns="http://www.quartetfs.com">
        <additionalProperties/>
      </calculatedMember>"
    `);
  });
});
