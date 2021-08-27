import _cloneDeep from "lodash/cloneDeep";
import _mapValues from "lodash/mapValues";
import type {
  Activity,
  ContentRecord,
  Settings,
} from "@activeviam/content-client";
import type { MdxString } from "@activeviam/mdx";

const emptySettingsFolders = {
  organization_settings: {
    entry: {
      isDirectory: false,
      owners: ["ROLE_CS_ROOT"],
      readers: ["ROLE_USER"],
      content: "{}",
    },
  },
  users: {
    entry: {
      isDirectory: true,
      owners: ["ROLE_USER"],
      readers: ["ROLE_USER"],
    },
  },
};

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
    (file) => (file ? JSON.parse(file.entry.content).map : {})
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
      legacyDefaultSettingsMap
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
          legacyUserSettingsMap
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
      }
    );
  }

  return migratedSettingsFolders;
}
