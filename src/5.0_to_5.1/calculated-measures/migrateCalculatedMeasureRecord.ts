import { ContentRecord } from "@activeviam/activeui-sdk-5.0";

/**
 * Transforms the serialized definition of a calculated measure created with ActiveUI 5.0, into one that is natively supported by ActivePivot.
 * Mutates `legacyCalculatedMeasureContent`.
 */
export const migrateCalculatedMeasureRecord = (
  legacyCalculatedMeasureContent: ContentRecord,
  calculatedMeasureName: string,
): void => {
  const {
    expression,
    properties,
  }: { expression: string; properties: string[] } = JSON.parse(
    legacyCalculatedMeasureContent.entry.content,
  );

  const formatStringProperty = properties.find((property) =>
    property.startsWith("FORMAT_STRING"),
  );
  // The `FORMAT_STRING` property is a string with the following syntax: "FORMAT_STRING = \\"#,###.##\\"".
  // Splitting it by " = " returns an array with the property name at index [0] and the value at index [1].
  const formatStringExpression = formatStringProperty
    ? formatStringProperty.split(" = ")[1]
    : undefined;

  const additionalProperties = properties
    .filter((propertyString) => propertyString !== formatStringProperty)
    .reduce((acc, propertyString) => {
      const [propertyName, propertyExpression] = propertyString.split(" = ");
      return { ...acc, [propertyName]: propertyExpression };
    }, {});

  legacyCalculatedMeasureContent.entry.content = JSON.stringify({
    // The className comes from Active Pivot.
    // See https://github.com/activeviam/activepivot/blob/876981bef9a65acbb228f97c53825a356de59382/pivot/core/impl/src/main/java/com/quartetfs/biz/pivot/definitions/impl/CalculatedMemberDescription.java
    className:
      "com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription",
    additionalProperties,
    uniqueName: `[Measures].[${calculatedMeasureName}]`,
    expression,
    formatStringExpression,
  });
};