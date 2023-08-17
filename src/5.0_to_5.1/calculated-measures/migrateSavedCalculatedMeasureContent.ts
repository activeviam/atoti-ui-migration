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
  if (contentServerVersion && lt(contentServerVersion, "5.11.0")) {
    const migratedSavedCalculatedMeasureContentXML =
      getMigratedSavedCalculatedMeasureContentXML(
        legacyCalculatedMeasureContent,
        calculatedMeasureName,
      );
    return migratedSavedCalculatedMeasureContentXML.end({ prettyPrint: true });
  }

  const migratedSavedCalculatedMeasureContentJSON =
    getMigratedSavedCalculatedMeasureContentJSON(
      legacyCalculatedMeasureContent,
      calculatedMeasureName,
    );

  return JSON.stringify(migratedSavedCalculatedMeasureContentJSON);
};
