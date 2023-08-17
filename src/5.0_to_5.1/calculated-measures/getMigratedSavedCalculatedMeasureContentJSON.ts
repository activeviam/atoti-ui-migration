/**
 * Returns the content of a calculated measure created with ActiveUI 5.0 transformed into a JSON object that is natively supported by ActivePivot.
 */
export const getMigratedSavedCalculatedMeasureContentJSON = (
  legacyCalculatedMeasureContent: { expression: string; properties: string[] },
  calculatedMeasureName: string,
): {
  className: string;
  additionalProperties: { [propertyName: string]: string };
  uniqueName: string;
  expression: string;
  formatStringExpression?: string;
} => {
  const { expression, properties } = legacyCalculatedMeasureContent;

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

  return {
    // The className comes from Active Pivot.
    // See https://github.com/activeviam/activepivot/blob/876981bef9a65acbb228f97c53825a356de59382/pivot/core/impl/src/main/java/com/quartetfs/biz/pivot/definitions/impl/CalculatedMemberDescription.java
    className:
      "com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription",
    additionalProperties,
    uniqueName: `[Measures].[${calculatedMeasureName}]`,
    expression,
    formatStringExpression,
  };
};
