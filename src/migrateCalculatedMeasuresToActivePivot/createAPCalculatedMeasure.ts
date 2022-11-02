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
    expression,
    formatStringExpression,
  });

  return migratedCalculatedMeasureContent;
};

/**
 * Transforms the serialized definition of a calculated measure created with ActiveUI 5.0, into one that is natively supported by ActivePivot.
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
