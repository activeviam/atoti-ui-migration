import _cloneDeep from "lodash/cloneDeep";
import _mapValues from "lodash/mapValues";
import _uniq from "lodash/uniq";
import _pick from "lodash/pick";
import _reduce from "lodash/reduce";
import {
  Activity,
  ContentRecord,
  Settings,
  MdxString,
  unquote,
} from "@activeviam/activeui-sdk-5.0";
import { emptyUIFolder } from "@activeviam/content-server-initialization-5.0";

const emptySettingsFolders = _pick(
  emptyUIFolder.children,
  "organization_settings",
  "users",
);

/**
 * Returns the converted settings map, ready to be used by ActiveUI 5.
 */
function migrateSettingsMap(legacySettingsMap: {
  [settingKey: string]: any;
}): Partial<Settings> {
  const migratedSettingsMap: Partial<Settings> = {};

  const theme = legacySettingsMap["global.theme"];
  if (["light-activeviam", "dark-activeviam"].includes(theme)) {
    migratedSettingsMap.theme = theme;
  }

  const searchMaxResults = legacySettingsMap["tree.search.maxResults"];
  if (searchMaxResults !== undefined) {
    migratedSettingsMap["search.maxResults"] = searchMaxResults;
  }

  const areUserFiltersEnabled = legacySettingsMap["userFilters.enabled"];
  if (areUserFiltersEnabled !== undefined) {
    migratedSettingsMap["userFilters.areEnabled"] = areUserFiltersEnabled;
  }

  const legacyDrillthroughColumns:
    | {
        [serverUrl: string]: {
          [cubeName: string]: {
            functionName: "Value" | "Caption" | "MemberValue" | "MemberCaption";
            columnName: string;
          }[];
        };
      }
    | undefined =
    legacySettingsMap["widgets.Tabular.drillthrough.selectedColumns"];

  if (legacyDrillthroughColumns !== undefined) {
    const migratedDrillthroughColumns: Settings["drillthrough.defaultSelectedColumns"] =
      {};
    // The legacy settings are per server and per cube.
    // The new ones are only per cube: the assumption is that no customer has multiple servers containing a cube with the same name but exposing a different data model.
    for (const serverUrl in legacyDrillthroughColumns) {
      for (const cubeName in legacyDrillthroughColumns[serverUrl]) {
        if (migratedDrillthroughColumns[cubeName] === undefined) {
          migratedDrillthroughColumns[cubeName] = [];
        }
        migratedDrillthroughColumns[cubeName].push(
          ...legacyDrillthroughColumns[serverUrl][cubeName].map(
            ({ columnName }) => columnName,
          ),
        );
      }
    }

    // Remove duplicates.
    migratedSettingsMap["drillthrough.defaultSelectedColumns"] = _mapValues(
      migratedDrillthroughColumns,
      _uniq,
    );
  }

  /* Smart filtering settings start. */
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
      // @ts-expect-error TypeScript rightfully complains that this setting key does not exist in 5.0
      // It was added only in 5.1 indeed, but it makes sense to migrate it as an intermediate step.
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
  /* Smart filtering settings end. */

  return migratedSettingsMap;
}

/**
 * Returns the legacy settings map corresponding to the given legacy settings subfolder,
 * where the settings from the "permissions" file take precedence over those from the "preferences" file.
 */
function getLegacySettingsMap(legacySettingsSubfolder: ContentRecord): {
  [settingKey: string]: any;
} {
  const { permissions: permissionsFile, preferences: preferencesFile } =
    legacySettingsSubfolder?.children || {};
  const [permissions, preferences] = [permissionsFile, preferencesFile].map(
    (file) => (file ? JSON.parse(file.entry.content).map : {}),
  );
  return { ...preferences, ...permissions };
}

/**
 * Returns the folders corresponding to the converted ActiveUI 4 settings folder, ready to be used by ActiveUI 5.
 */
export function migrateSettingsFolder(legacySettingsFolder?: ContentRecord): {
  organization_settings: ContentRecord;
  users: ContentRecord;
} {
  const migratedSettingsFolders: {
    organization_settings: ContentRecord;
    users: ContentRecord;
  } = _cloneDeep(emptySettingsFolders);

  const { default: legacyDefaultFolder, users: legacyUsersFolder } =
    legacySettingsFolder?.children ?? {};

  if (legacyDefaultFolder) {
    const legacyDefaultSettingsMap = getLegacySettingsMap(legacyDefaultFolder);
    const migratedDefaultSettingsMap = migrateSettingsMap(
      legacyDefaultSettingsMap,
    );
    migratedSettingsFolders.organization_settings.entry = {
      content: JSON.stringify(migratedDefaultSettingsMap),
      owners: ["ROLE_CS_ROOT"],
      readers: ["ROLE_USER"],
    };
  }

  if (legacyUsersFolder?.children) {
    migratedSettingsFolders.users.children = _mapValues(
      legacyUsersFolder.children,
      (userFolder, userName) => {
        const legacyUserSettingsMap = getLegacySettingsMap(userFolder);
        const migratedUserSettingsMap = migrateSettingsMap(
          legacyUserSettingsMap,
        );

        const activity: Partial<Activity<"serialized">> = {};
        const legacyUserFilters: MdxString[] =
          legacyUserSettingsMap["user.filters"];
        if (legacyUserFilters !== undefined) {
          activity.userFilters = Object.values(legacyUserFilters).flat();
        }

        const migratedUserFolder = {
          entry: userFolder.entry,
          children: {
            settings: {
              entry: {
                content: JSON.stringify(migratedUserSettingsMap),
                owners: [userName],
                readers: [userName],
              },
            },
            activity: {
              entry: {
                content: JSON.stringify(activity),
                owners: [userName],
                readers: [userName],
              },
            },
          },
        };
        return migratedUserFolder;
      },
    );
  }

  return migratedSettingsFolders;
}
