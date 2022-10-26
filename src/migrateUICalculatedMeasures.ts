import {
  ContentRecord,
  findContentRecords,
  getMetaData,
} from "@activeviam/activeui-sdk";

export const getCalculatedMeasureIds = (
  legacyCalculatedMeasureFolder: ContentRecord,
): string[] => {
  const calculatedMeasures =
    legacyCalculatedMeasureFolder.children?.content.children ?? {};
  return Object.keys(calculatedMeasures);
};

export const getUniqueCalculatedMeasureNames = (
  legacyCalculatedMeasureFolder: ContentRecord,
  ids: string[],
): string[] => {
  const { structure } = legacyCalculatedMeasureFolder.children ?? {};
  const contentRecords = structure ? findContentRecords(structure, ids) : {};

  const uniqueCalculatedMeasureNames = ids.map((id) => {
    const calculatedMeasureName = JSON.parse(
      getMetaData(contentRecords[id].node, id),
    ).name;
    return calculatedMeasureName;
  });

  return uniqueCalculatedMeasureNames;
};

export const getCalculatedMeasureContent = (
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
