import { ContentRecord, parse } from "@activeviam/activeui-sdk-5.0";
import { serializeFilter } from "@activeviam/dashboard-base-5.1";
import { DataModel } from "@activeviam/data-model-5.1";
import { migrateContextValues } from "./migrateContextValues";
import { migrateFilters } from "./migrateFilters";

/**
 * Migrates the 5.0 user activity into one usable in 5.1.
 * In particular, migrates the user filters and the user query context.
 * Mutates `contentServer`.
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
