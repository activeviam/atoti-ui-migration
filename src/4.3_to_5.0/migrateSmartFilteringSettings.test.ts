import { migrateSmartFilteringSettings } from "../migrateSmartFilteringSettings";

describe("migrateSmartFilteringSettings", () => {
  it("migrates 4.3 smart filtering settings into their 5.x equivalent", () => {
    const migratedSettingsMap = {
      theme: "dark-activeviam",
    };
    const legacySettingsMap = {
      "tree.search.maxResults": 20,
      "memberSelection.smartFiltering.nonEmptyMeasure": "[Measures].[pnl.SUM]",
      "memberSelection.smartFiltering.ignoreFromContext.[Currency].[Currency]":
        true,
      "memberSelection.smartFiltering.ignoreFromContext.[Geography].[City]":
        true,
    };
    migrateSmartFilteringSettings(migratedSettingsMap, legacySettingsMap);
    expect(migratedSettingsMap).toStrictEqual({
      "smartFiltering.ignoredHierarchies": [
        "[Currency].[Currency]",
        "[Geography].[City]",
      ],
      "smartFiltering.nonEmptyEvaluationMeasureName": "pnl.SUM",
      theme: "dark-activeviam",
    });
  });

  it("sets smart filtering as disabled if it was in 4.3", () => {
    const migratedSettingsMap = {
      theme: "dark-activeviam",
    };
    const legacySettingsMap = {
      "tree.search.maxResults": 20,
      "memberSelection.smartFiltering": false,
    };
    migrateSmartFilteringSettings(migratedSettingsMap, legacySettingsMap);
    expect(migratedSettingsMap).toStrictEqual({
      "smartFiltering.isEnabled": false,
      theme: "dark-activeviam",
    });
  });
});
