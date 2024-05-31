import { DashboardState, getLayoutPath } from "@activeviam/activeui-sdk-5.0";
import { removeWidgetFromPage } from "@activeviam/dashboard-base-5.0";

import { produce } from "immer";

/**
 * Removes the widgets identified by `keysOfLeavesToRemove` from the given `dashboard`.
 */
export const removeWidgetsFromDashboard = (
  dashboard: DashboardState<"deserialized">,
  keysOfLeavesToRemove: { [key: string]: string[] },
): DashboardState<"deserialized"> => {
  return produce(dashboard, (draft) => {
    Object.keys(keysOfLeavesToRemove).forEach((pageKey) => {
      keysOfLeavesToRemove[pageKey].forEach((leafKey) => {
        const pageState = draft.pages[pageKey];
        const layoutPath = getLayoutPath(pageState.layout, leafKey);
        removeWidgetFromPage(pageState, layoutPath, leafKey);
      });
    });
  });
};
