import { ContentRecord } from "@activeviam/activeui-sdk-5.0";

const settingsToPermissionsMapping = {
  "userFilters.areEnabled": "canUseUserFilters",
  "userQueryContext.isEnabled": "canUseUserQueryContext",
  "calculatedMeasures.areEnabled": "canUseCalculatedMeasures",
};

/**
 * Moves some attributes from `settings` to `permissions` and updates their name.
 * Only moves an attribute if the corresponding permission doesn't exist yet.
 * If there is no `permissions`, deletes the `settings` attribute that were supposed to be moved.
 * Mutates `settings` and `permissions`.
 */
const moveSettingsToPermissions = (
  settings: ContentRecord,
  permissions: ContentRecord | undefined,
): void => {
  const settingsContent = JSON.parse(settings.entry.content);

  if (!permissions) {
    Object.keys(settingsToPermissionsMapping).forEach((settingKey) => {
      if (settingKey in settingsContent) {
        delete settingsContent[settingKey];
      }
    });

    settings.entry.content = JSON.stringify(settingsContent);
  } else {
    const permissionsContent = JSON.parse(permissions.entry.content);

    Object.entries(settingsToPermissionsMapping).forEach(
      ([settingKey, permissionKey]) => {
        if (settingKey in settingsContent) {
          if (!(permissionKey in permissionsContent)) {
            permissionsContent[permissionKey] = settingsContent[settingKey];
          }
          delete settingsContent[settingKey];
        }
      },
    );

    settings.entry.content = JSON.stringify(settingsContent);
    permissions.entry.content = JSON.stringify(permissionsContent);
  }
};

/**
 * Transforms some settings attributes into permissions attributes.
 * Applies the logic to the organization settings and permissions, as well as to each user's settings and permissions.
 * Mutates `contentServer`.
 */
export const migrateSettings = (contentServer: ContentRecord): void => {
  const organizationSettings =
    contentServer.children?.ui.children?.["organization_settings"];
  const organizationPermissions =
    contentServer.children?.ui.children?.["organization_permissions"];

  if (organizationSettings) {
    moveSettingsToPermissions(organizationSettings, organizationPermissions);
  }

  const users = contentServer.children?.ui.children?.users.children || {};

  for (const userName in users) {
    const settings = users[userName].children?.settings;
    const permissions = users[userName].children?.permissions;

    if (settings) {
      moveSettingsToPermissions(settings, permissions);
    }
  }
};
