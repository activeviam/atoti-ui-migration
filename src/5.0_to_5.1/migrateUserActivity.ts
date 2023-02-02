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
  const users = contentServer.children?.ui.children?.users;

  if (users?.children === undefined) {
    return;
  }
  Object.values(users.children).forEach((user) => {
    if (user.children?.activity) {
      const userActivity = JSON.parse(user.children?.activity.entry.content);
      const userFilters = userActivity.userFilters.map(parse);
      migrateFilters(userFilters, { dataModels });
      const stringifiedUserFilters = userFilters.map(serializeFilter);
      userActivity.userFilters = stringifiedUserFilters;
      migrateContextValues(userActivity.userQueryContext);
      const stringifiedUserActivity = JSON.stringify(userActivity);
      user.children.activity.entry.content = stringifiedUserActivity;
    }
  });
};
