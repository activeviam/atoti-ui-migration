import { ContentRecord } from "@activeviam/activeui-sdk";

const getCalculatedMeasureContent = (
  legacyCalculatedMeasureContent: ContentRecord,
  calculatedMeasureName: string,
): string => {
  const parsedContent = JSON.parse(
    legacyCalculatedMeasureContent.entry.content,
  );

  const expression = parsedContent.expression;
  const properties: string[] = parsedContent.properties;

  const formatStringExpression = properties
    ? properties.find((property) => property.startsWith("FORMAT_STRING"))
    : undefined;

  const migratedCalculatedMeasureContent = JSON.stringify({
    className:
      "com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription",
    additionalProperties: {},
    uniqueName: `[Measures].[${calculatedMeasureName}]`,
    expression: expression,
    formatStringExpression,
  });

  return migratedCalculatedMeasureContent;
};

/**
 * Transforms an ActiveUI 5.0 calculated measure saved on the content server into an object with the structure required in order to be added to the `entitlements/cm/` folder in ActivePivot.
 */
export const createAPCalculatedMeasure = (
  legacyCalculatedMeasuresFolder: ContentRecord,
  calculatedMeasureName: string,
  calculatedMeasureId: string,
): ContentRecord | undefined => {
  const content = legacyCalculatedMeasuresFolder.children?.content;

  const calculatedMeasure = content?.children?.[calculatedMeasureId];

  if (!calculatedMeasure) {
    return undefined;
  }

  calculatedMeasure.entry.content = getCalculatedMeasureContent(
    calculatedMeasure,
    calculatedMeasureName,
  );
  return calculatedMeasure;
};
