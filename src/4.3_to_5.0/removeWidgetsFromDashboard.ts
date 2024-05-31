import {
  DashboardState,
  getLayoutPath,
  removeWidget,
} from "@activeviam/activeui-sdk-5.0";
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
        const layoutPath = getLayoutPath(draft.pages[pageKey].layout, leafKey);
        draft.pages[pageKey] = removeWidget({
          dashboardState: draft,
          layoutPath,
          leafKey,
          pageKey,
        }).pages[pageKey];
      });
    });
  });
};
