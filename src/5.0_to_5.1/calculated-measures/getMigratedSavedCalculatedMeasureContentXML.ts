import { create } from "xmlbuilder2";
import { XMLBuilder } from "xmlbuilder2/lib/interfaces";

/**
 * Returns the content of a calculated measure created with ActiveUI 5.0 transformed into an XML document that is natively supported by ActivePivot.
 */
export const getMigratedSavedCalculatedMeasureContentXML = (
  name: string,
  expression: string,
  properties: { [key: string]: string },
): XMLBuilder => {
  const { FORMAT_STRING: formatStringExpression, ...additionalProperties } =
    properties;

  const root = create({ version: "1.0", encoding: "UTF-8", standalone: "yes" })
    .ele("calculatedMember", {
      expression,
      formatStringExpression: formatStringExpression,
      uniqueName: `[Measures].[${name}]`,
      xmlns: "http://www.quartetfs.com",
    })
    .ele("additionalProperties", additionalProperties);

  return root;
};
