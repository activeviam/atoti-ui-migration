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
    const contentServerClone = _cloneDeep(contentServer);

    const userSettings =
      contentServer.children!.ui.children!.users.children!["user2"].children!
        .settings;
    const userPermissions =
      contentServer.children!.ui.children!.users.children!["user2"].children!
        .permissions;

    expect(userSettings).toBeUndefined();

    migrateSettings(contentServer);

    const userSettingsClone =
      contentServerClone.children!.ui.children!.users.children!["user2"]
        .children!.settings;
    const userPermissionsClone =
      contentServerClone.children!.ui.children!.users.children!["user2"]
        .children!.permissions;

    expect(userSettingsClone).toStrictEqual(userSettings);
    expect(userPermissionsClone).toStrictEqual(userPermissions);
  });

  it("deletes some settings if there are no permissions", () => {
    const userSettings =
      contentServer.children!.ui.children!.users.children!["admin"].children!
        .settings;
    const userPermissions =
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
    expect(userPermissions).toBeUndefined();
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

    // "calculatedMeasures.areEnabled", "userFilters.areEnabled" and "userQueryContext.isEnabled" are moved from the settings to become permissions.
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
});
