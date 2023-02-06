import { ContentRecord, parse } from "@activeviam/activeui-sdk-5.0";
import { serializeFilter } from "@activeviam/dashboard-base-5.1";
import { DataModel } from "@activeviam/data-model-5.1";
import { migrateContextValues } from "./migrateContextValues";
import { migrateFilters } from "./migrateFilters";

/**
 * Mutates 5.0 `userFilters` and `userQueryContext` into usable data in 5.1.
 */
export const migrateUserActivity = (
  contentServer: ContentRecord,
  dataModels: { [serverKey: string]: DataModel },
): void => {
  const users = contentServer.children?.ui.children?.users.children || {};

  for (const userName in users) {
    const user = users[userName];
    const userActivity = user.children?.activity;
    if (userActivity) {
      const userActivityContent = JSON.parse(userActivity.entry.content);
      const userFilters = userActivityContent.userFilters.map(parse);
      migrateFilters(userFilters, { dataModels });
      userActivityContent.userFilters = userFilters.map(serializeFilter);
      migrateContextValues(userActivityContent.userQueryContext);
      userActivity.entry.content = JSON.stringify(userActivityContent);
    }
  }
};
