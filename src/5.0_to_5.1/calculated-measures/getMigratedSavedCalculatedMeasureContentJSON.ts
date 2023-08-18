/**
 * Returns the content of a calculated measure created with ActiveUI 5.0 transformed into a JSON object that is natively supported by ActivePivot.
 */
export const getMigratedSavedCalculatedMeasureContentJSON = (
  name: string,
  expression: string,
  properties: { [key: string]: string },
): {
  className: string;
  additionalProperties: { [propertyName: string]: string };
  uniqueName: string;
  expression: string;
  formatStringExpression?: string;
} => {
  const { FORMAT_STRING: formatStringExpression, ...additionalProperties } =
    properties;

  return {
    // The className comes from Active Pivot.
    // See https://github.com/activeviam/activepivot/blob/876981bef9a65acbb228f97c53825a356de59382/pivot/core/impl/src/main/java/com/quartetfs/biz/pivot/definitions/impl/CalculatedMemberDescription.java
    className:
      "com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription",
    additionalProperties,
    uniqueName: `[Measures].[${name}]`,
    expression,
    formatStringExpression,
  };
};
