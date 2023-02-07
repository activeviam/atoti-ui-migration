import { ContentRecord } from "@activeviam/activeui-sdk-5.0";
import _cloneDeep from "lodash/cloneDeep";
import { migrateSettings } from "./migrateSettings";
import { contentServer as testContentServer } from "./__test_resources__/contentServer";

describe("migrateSettings", () => {
  let contentServer: ContentRecord;

  beforeEach(() => {
    contentServer = _cloneDeep(testContentServer);
  });

  it("doesn't do anything if there is no settings", () => {
    const userSettings =
      contentServer.children!.ui.children!.users.children!["user2"].children!
        .settings;
    const userPermissions =
      contentServer.children!.ui.children!.users.children!["user2"].children!
        .permissions;

    expect(userSettings).toBeUndefined();

    migrateSettings(contentServer);

    const userSettingsClone =
      testContentServer.children!.ui.children!.users.children!["user2"]
        .children!.settings;
    const userPermissionsClone =
      testContentServer.children!.ui.children!.users.children!["user2"]
        .children!.permissions;

    expect(userSettingsClone).toStrictEqual(userSettings);
    expect(userPermissionsClone).toStrictEqual(userPermissions);
  });

  it("transforms some settings attributes into permissions attributes.", () => {
    const organizationSettings =
      contentServer.children!.ui.children!["organization_settings"];
    const organizationPermissions =
      contentServer.children!.ui.children!["organization_permissions"];

    expect(JSON.parse(organizationSettings.entry.content))
      .toMatchInlineSnapshot(`
      {
        "calculatedMeasures.areEnabled": false,
        "homePageLayout": "list",
        "theme": "light-activeviam",
        "userFilters.areEnabled": false,
        "userQueryContext.isEnabled": true,
      }
    `);
    expect(JSON.parse(organizationPermissions.entry.content))
      .toMatchInlineSnapshot(`
      {
        "canManageContent": true,
        "canShare": true,
        "canUseUserQueryContext": false,
      }
    `);

    migrateSettings(contentServer);

    // "calculatedMeasures.areEnabled", "userFilters.areEnabled" and "userQueryContext.isEnabled" are moved from settings to permissions, with different keys.
    // "canUseUserQueryContext" keeps its value, because it was already in the permissions.
    expect(JSON.parse(organizationSettings.entry.content))
      .toMatchInlineSnapshot(`
      {
        "homePageLayout": "list",
        "theme": "light-activeviam",
      }
    `);
    expect(JSON.parse(organizationPermissions.entry.content))
      .toMatchInlineSnapshot(`
      {
        "canManageContent": true,
        "canShare": true,
        "canUseCalculatedMeasures": false,
        "canUseUserFilters": false,
        "canUseUserQueryContext": false,
      }
    `);
  });

  it("creates the 'permissions' file if it doesn't exist before transforming the settings attributes", () => {
    const userSettings =
      contentServer.children!.ui.children!.users.children!["admin"].children!
        .settings;
    let userPermissions =
      contentServer.children!.ui.children!.users.children!["admin"].children!
        .permissions;

    expect(JSON.parse(userSettings.entry.content)).toMatchInlineSnapshot(`
      {
        "calculatedMeasures.areEnabled": false,
        "homePageLayout": "list",
        "smartFiltering.ignoredHierarchies": [
          "[Underlyings].[Products]",
        ],
        "userFilters.areEnabled": true,
      }
    `);
    expect(userPermissions).toBeUndefined();

    migrateSettings(contentServer);

    expect(JSON.parse(userSettings.entry.content)).toMatchInlineSnapshot(`
      {
        "homePageLayout": "list",
        "smartFiltering.ignoredHierarchies": [
          "[Underlyings].[Products]",
        ],
      }
    `);

    userPermissions =
      contentServer.children!.ui.children!.users.children!["admin"].children!
        .permissions;
    expect(userPermissions).toMatchInlineSnapshot(`
      {
        "entry": {
          "content": "{"canUseUserFilters":true,"canUseCalculatedMeasures":false}",
          "isDirectory": false,
          "owners": [
            "ROLE_CS_ROOT",
          ],
          "readers": [
            "admin",
          ],
        },
      }
    `);
  });

  it("creates the 'organization_permissions' file if it doesn't exist before transforming the settings attributes", () => {
    const organizationSettings =
      contentServer.children!.ui.children!["organization_settings"];

    delete contentServer.children!.ui.children!["organization_permissions"];

    expect(JSON.parse(organizationSettings.entry.content))
      .toMatchInlineSnapshot(`
      {
        "calculatedMeasures.areEnabled": false,
        "homePageLayout": "list",
        "theme": "light-activeviam",
        "userFilters.areEnabled": false,
        "userQueryContext.isEnabled": true,
      }
    `);

    migrateSettings(contentServer);

    expect(JSON.parse(organizationSettings.entry.content))
      .toMatchInlineSnapshot(`
      {
        "homePageLayout": "list",
        "theme": "light-activeviam",
      }
    `);

    const organizationPermissions =
      contentServer.children!.ui.children!["organization_permissions"];
    expect(organizationPermissions).toMatchInlineSnapshot(`
      {
        "entry": {
          "content": "{"canUseUserFilters":false,"canUseUserQueryContext":true,"canUseCalculatedMeasures":false}",
          "isDirectory": false,
          "owners": [
            "ROLE_CS_ROOT",
          ],
          "readers": [
            "ROLE_USER",
          ],
        },
      }
    `);
  });
});
