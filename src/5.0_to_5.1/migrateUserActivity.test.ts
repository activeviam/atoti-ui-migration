import { migrateUserActivity } from "./migrateUserActivity";
import { contentServer } from "./__test_resources__/contentServer";
import {
  dualCatalogDataModel,
  sandboxDataModel,
} from "@activeviam/data-model-5.1/dist/__test_resources__";

const dataModels = {
  sandbox: sandboxDataModel,
  dualCatalog: dualCatalogDataModel,
};

describe("migrateUserActivity", () => {
  it("migrates 5.0 `userFilters` and `userQueryContext` to usable data in 5.1", () => {
    migrateUserActivity(contentServer, dataModels);
    expect(
      contentServer.children?.ui.children?.users.children?.user2.children
        ?.activity.entry.content,
    ).toMatchInlineSnapshot(
      `"{"recentlyOpenedDashboards":[{"id":"e54","lastOpened":1670589758805},{"id":"7d7","lastOpened":1669821874599}],"userFilters":[{"dimensionName":"Currency","hierarchyName":"Currency","members":[["AllMember","EUR"]],"type":"members"}],"userQueryContext":[{"key":"queriesTimeLimit","value":"30"}]}"`,
    );
  });
});
