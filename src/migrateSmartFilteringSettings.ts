import _reduce from "lodash/reduce";

import { unquote } from "@activeviam/mdx-5.0";
import { Settings } from "@activeviam/activeui-sdk-5.0";

/**
 * Adds the smart-filtering settings from `legacySettingsMap` into `migratedSettingsMap`.
 * Mutates `migratedSettingsMap`.
 */
export function migrateSmartFilteringSettings(
  migratedSettingsMap: Partial<Settings>,
  legacySettingsMap: {
    [settingKey: string]: any;
  },
): Partial<Settings> {
  const isSmartFilteringDisabled =
    legacySettingsMap["memberSelection.smartFiltering"] === false;
  if (isSmartFilteringDisabled) {
    migratedSettingsMap["smartFiltering.isEnabled"] = false;
  } else {
    const nonEmptyEvaluationMeasureUniqueName =
      legacySettingsMap["memberSelection.smartFiltering.nonEmptyMeasure"];
    if (nonEmptyEvaluationMeasureUniqueName !== undefined) {
      const [, nonEmptyEvaluationMeasureName] = unquote(
        nonEmptyEvaluationMeasureUniqueName,
      );
      migratedSettingsMap["smartFiltering.nonEmptyEvaluationMeasureName"] =
        nonEmptyEvaluationMeasureName;
    }

    const hierarchiesToIgnoreWhenSmartFiltering = _reduce(
      legacySettingsMap,
      (hierarchyUniqueNames: string[], settingValue, settingKey) => {
        const [, hierarchyUniqueName] = settingKey.split(
          "memberSelection.smartFiltering.ignoreFromContext.",
        );
        if (hierarchyUniqueName && settingValue === true) {
          hierarchyUniqueNames.push(hierarchyUniqueName);
        }
        return hierarchyUniqueNames;
      },
      [],
    );
    if (hierarchiesToIgnoreWhenSmartFiltering.length > 0) {
      migratedSettingsMap["smartFiltering.ignoredHierarchies"] =
        hierarchiesToIgnoreWhenSmartFiltering;
    }
  }

  return migratedSettingsMap;
}
