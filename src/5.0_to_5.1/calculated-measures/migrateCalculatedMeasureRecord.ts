import {
  ContentRecord,
  MdxCompoundIdentifier,
  MdxFunction,
  MdxLiteral,
  parse,
} from "@activeviam/activeui-sdk-5.0";

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

  const formatStringExpression = properties
    ? properties
        .find((property) => property.startsWith("FORMAT_STRING"))
        ?.replace("FORMAT_STRING = ", "")
    : undefined;

  const additionalProperties = properties
    .filter((property) => !property.startsWith("FORMAT_STRING"))
    .reduce((acc, property) => {
      // When property is parsed an `MdxFunction` with name "=" is returned.
      const parsedProperty = parse<MdxFunction>(property);
      // The first argument of `parsedProperty` is an `MdxCompoundIdentifier`.
      const firstArg = parsedProperty.arguments[0] as MdxCompoundIdentifier;
      // The second argument of `parsedProperty` is an `MdxLiteral`.
      const secondArg = parsedProperty.arguments[1] as MdxLiteral;

      const propertyKey = firstArg.identifiers[0].value;
      const propertyValue = secondArg.value;
      return {
        ...acc,
        [propertyKey]: propertyValue,
      };
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
