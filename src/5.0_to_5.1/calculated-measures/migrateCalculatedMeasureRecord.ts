import { ContentRecord } from "@activeviam/activeui-sdk-5.0";
import { produce } from "immer";

/**
 * Transforms the serialized definition of a calculated measure created with ActiveUI 5.0, into one that is natively supported by ActivePivot.
 */
export const migrateCalculatedMeasureRecord = (
  legacyCalculatedMeasureContent: ContentRecord,
  calculatedMeasureName: string,
): ContentRecord => {
  const migratedRecord = produce(legacyCalculatedMeasureContent, (draft) => {
    const parsedContent = JSON.parse(draft.entry.content);

    const expression = parsedContent.expression;
    const properties: string[] = parsedContent.properties;

    const formatStringExpression = properties
      ? properties.find((property) => property.startsWith("FORMAT_STRING"))
      : undefined;

    const migratedCalculatedMeasureContent = JSON.stringify({
      // The className comes from Active Pivot.
      // See https://github.com/activeviam/activepivot/blob/876981bef9a65acbb228f97c53825a356de59382/pivot/core/impl/src/main/java/com/quartetfs/biz/pivot/definitions/impl/CalculatedMemberDescription.java
      className:
        "com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription",
      additionalProperties: {},
      uniqueName: `[Measures].[${calculatedMeasureName}]`,
      expression,
      formatStringExpression,
    });
    draft.entry.content = migratedCalculatedMeasureContent;
  });
  return migratedRecord;
};
