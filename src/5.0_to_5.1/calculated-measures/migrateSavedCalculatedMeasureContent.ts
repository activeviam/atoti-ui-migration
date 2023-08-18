import { lt } from "semver";

import { getMigratedSavedCalculatedMeasureContentJSON } from "./getMigratedSavedCalculatedMeasureContentJSON";
import { getMigratedSavedCalculatedMeasureContentXML } from "./getMigratedSavedCalculatedMeasureContentXML";

/**
 * Transforms the content of a calculated measure created with ActiveUI 5.0, into one that is natively supported by ActivePivot.
 * Returns its serialized version.
 */
export const migrateSavedCalculatedMeasureContent = (
  legacyCalculatedMeasureContent: { expression: string; properties: string[] },
  calculatedMeasureName: string,
  contentServerVersion?: string,
): string => {
  const propertiesEntries = legacyCalculatedMeasureContent.properties.map(
    (property) => property.split(" = "),
  );
  const properties = Object.fromEntries(propertiesEntries);

  if (contentServerVersion && lt(contentServerVersion, "5.11.0")) {
    const migratedSavedCalculatedMeasureContentXML =
      getMigratedSavedCalculatedMeasureContentXML(
        calculatedMeasureName,
        legacyCalculatedMeasureContent.expression,
        properties,
      );
    return migratedSavedCalculatedMeasureContentXML.end({ prettyPrint: true });
  }

  const migratedSavedCalculatedMeasureContentJSON =
    getMigratedSavedCalculatedMeasureContentJSON(
      calculatedMeasureName,
      legacyCalculatedMeasureContent.expression,
      properties,
    );

  return JSON.stringify(migratedSavedCalculatedMeasureContentJSON);
};
