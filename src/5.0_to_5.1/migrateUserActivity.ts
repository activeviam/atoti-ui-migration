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
  const users = contentServer.children?.ui.children?.users.children || {};

  for (const userName in users) {
    const user = users[userName];
    const userActivity = user.children?.activity;
    if (userActivity) {
      const userActivityContent = JSON.parse(userActivity.entry.content);

      const userFilters = userActivityContent.userFilters?.map(parse);
      if (userFilters) {
        migrateFilters(userFilters, { dataModels });
        userActivityContent.userFilters = userFilters.map(serializeFilter);
      }

      const userQueryContext = userActivityContent.userQueryContext;
      if (userQueryContext) {
        migrateContextValues(userQueryContext);
      }
      
      userActivity.entry.content = JSON.stringify(userActivityContent);
    }
  }
};
