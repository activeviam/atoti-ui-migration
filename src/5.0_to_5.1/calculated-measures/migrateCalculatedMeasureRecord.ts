import {
  ContentRecord,
  MdxFunction,
  parse,
} from "@activeviam/activeui-sdk-5.0";
import { isMdxCompoundIdentifier, isMdxLiteral } from "@activeviam/mdx-5.1";
import { produce } from "immer";

/**
 * Transforms the serialized definition of a calculated measure created with ActiveUI 5.0, into one that is natively supported by ActivePivot.
 */
export const migrateCalculatedMeasureRecord = (
  legacyCalculatedMeasureContent: ContentRecord,
  calculatedMeasureName: string,
): ContentRecord => {
  const migratedRecord = produce(legacyCalculatedMeasureContent, (draft) => {
    const {
      expression,
      properties,
    }: { expression: string; properties: string[] } = JSON.parse(
      draft.entry.content,
    );

    const formatStringExpression = properties
      ? properties
          .find((property) => property.startsWith("FORMAT_STRING"))
          ?.replace("FORMAT_STRING = ", "")
      : undefined;
    console.log(properties.map(parse)[0].arguments[1]);

    const additionalProperties = properties
      .filter((property) => !property.startsWith("FORMAT_STRING"))
      .reduce((acc, property) => {
        const parsedProperty = parse<MdxFunction>(property);
        const firstArg = parsedProperty.arguments[0];
        const secondArg = parsedProperty.arguments[1];

        if (isMdxCompoundIdentifier(firstArg) && isMdxLiteral(secondArg)) {
          const propertyKey = firstArg.identifiers[0].value;
          const propertyValue = secondArg.value;
          return {
            ...acc,
            [propertyKey]: propertyValue,
          };
        }

        return acc;
      }, {});

    const migratedCalculatedMeasureContent = JSON.stringify({
      // The className comes from Active Pivot.
      // See https://github.com/activeviam/activepivot/blob/876981bef9a65acbb228f97c53825a356de59382/pivot/core/impl/src/main/java/com/quartetfs/biz/pivot/definitions/impl/CalculatedMemberDescription.java
      className:
        "com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription",
      additionalProperties,
      uniqueName: `[Measures].[${calculatedMeasureName}]`,
      expression,
      formatStringExpression,
    });
    draft.entry.content = migratedCalculatedMeasureContent;
  });
  return migratedRecord;
};
