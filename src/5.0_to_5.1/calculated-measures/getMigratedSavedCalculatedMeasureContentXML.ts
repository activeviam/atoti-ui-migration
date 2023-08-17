import { create } from "xmlbuilder2";
import { XMLBuilder } from "xmlbuilder2/lib/interfaces";

/**
 * Returns the content of a calculated measure created with ActiveUI 5.0 transformed into an XML document that is natively supported by ActivePivot.
 */
export const getMigratedSavedCalculatedMeasureContentXML = (
  legacyCalculatedMeasureContent: {
    expression: string;
    properties: string[];
  },
  calculatedMeasureName: string,
): XMLBuilder => {
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

  const root = create({ version: "1.0", encoding: "UTF-8", standalone: "yes" })
    .ele("calculatedMember", {
      expression,
      formatStringExpression: formatStringExpression,
      uniqueName: `[Measures].[${calculatedMeasureName}]`,
      xmlns: "http://www.quartetfs.com",
    })
    .ele("additionalProperties", additionalProperties);

  return root;
};
