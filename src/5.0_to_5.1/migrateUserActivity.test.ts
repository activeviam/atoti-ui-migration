import _cloneDeep from "lodash/cloneDeep";
import { migrateUserActivity } from "./migrateUserActivity";
import { contentServer as testContentServer } from "./__test_resources__/contentServer";
import {
  dualCatalogDataModel,
  sandboxDataModel,
} from "@activeviam/data-model-5.1/dist/__test_resources__";
import { ContentRecord } from "@activeviam/activeui-sdk-5.0";

const dataModels = {
  sandbox: sandboxDataModel,
  dualCatalog: dualCatalogDataModel,
};

let contentServer: ContentRecord;

describe("migrateUserActivity", () => {
  beforeEach(() => {
    contentServer = _cloneDeep(testContentServer);
  });

  it("migrates 5.0 user filters and query context to usable ones in 5.1", () => {
    const parsed50UserActivity = JSON.parse(
      contentServer.children?.ui.children?.users.children?.user2.children
        ?.activity.entry.content,
    );

    expect(parsed50UserActivity).toMatchInlineSnapshot(`
      {
        "recentlyOpenedDashboards": [
          {
            "id": "e54",
            "lastOpened": 1670589758805,
          },
          {
            "id": "7d7",
            "lastOpened": 1669821874599,
          },
        ],
        "userFilters": [
          "[Currency].[Currency].[ALL].[AllMember].[EUR]",
        ],
        "userQueryContext": [
          {
            "key": "queriesTimeLimit",
            "value": 30,
          },
        ],
      }
    `);

    migrateUserActivity(contentServer, dataModels);

    const parsed51UserActivity = JSON.parse(
      contentServer.children?.ui.children?.users.children?.user2.children
        ?.activity.entry.content,
    );

    expect(parsed51UserActivity).toMatchInlineSnapshot(`
      {
        "recentlyOpenedDashboards": [
          {
            "id": "e54",
            "lastOpened": 1670589758805,
          },
          {
            "id": "7d7",
            "lastOpened": 1669821874599,
          },
        ],
        "userFilters": [
          {
            "dimensionName": "Currency",
            "hierarchyName": "Currency",
            "members": [
              [
                "AllMember",
                "EUR",
              ],
            ],
            "type": "members",
          },
        ],
        "userQueryContext": [
          {
            "key": "queriesTimeLimit",
            "value": "30",
          },
        ],
      }
    `);
  });

  it("does not do anything if there was no user filters or query context", () => {
    const parsed50UserActivity = JSON.parse(
      contentServer.children?.ui.children?.users.children?.admin.children
        ?.activity.entry.content,
    );

    migrateUserActivity(contentServer, dataModels);

    const parsed51UserActivity = JSON.parse(
      contentServer.children?.ui.children?.users.children?.admin.children
        ?.activity.entry.content,
    );

    expect(parsed51UserActivity).toStrictEqual(parsed50UserActivity);
  });
});
