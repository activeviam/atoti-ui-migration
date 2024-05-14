import {
  DashboardState,
  getLayoutPath,
  removeWidget,
} from "@activeviam/activeui-sdk-5.0";
import _cloneDeep from "lodash/cloneDeep";

/**
 * Removes the widgets identified by `keysOfLeavesToRemove` from the given `dashboard`.
 */
export const removeWidgetsFromDashboard = (
  dashboard: DashboardState<"deserialized">,
  keysOfLeavesToRemove: { [key: string]: string[] },
): DashboardState<"deserialized"> => {
  const dashboardWithWidgetsRemoved = _cloneDeep(dashboard);

  Object.keys(keysOfLeavesToRemove).forEach((pageKey) => {
    keysOfLeavesToRemove[pageKey].forEach((leafKey) => {
      const layoutPath = getLayoutPath(
        dashboardWithWidgetsRemoved.pages[pageKey].layout,
        leafKey,
      );
      const updatedPage = removeWidget({
        dashboardState: dashboardWithWidgetsRemoved,
        layoutPath,
        leafKey,
        pageKey,
      });
      dashboardWithWidgetsRemoved.pages[pageKey] = updatedPage.pages[pageKey];
    });
  });

  return dashboardWithWidgetsRemoved;
};
