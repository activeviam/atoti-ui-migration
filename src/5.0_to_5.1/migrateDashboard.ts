import { DashboardState as DashboardState50 } from "@activeviam/activeui-sdk-5.0";
import { DashboardState as DashboardState51 } from "@activeviam/activeui-sdk-5.1";
import _forEach from "lodash/forEach";
import { migrateWidgetsWithinDashboard } from "../migrateWidgetsWithinDashboard";
import { MigrateDashboardCallback } from "../migration.types";
import { migrateContextValues } from "./migrateContextValues";
import { migrateFilters } from "./migrateFilters";
import { migrateWidget } from "./migrateWidget";

/**
 * Mutates a 5.0 `dashboardState` into one usable in 5.1.
 */
export const migrateDashboard: MigrateDashboardCallback<
  DashboardState50,
  DashboardState51
> = (
  dashboardState,
  { dataModels, keysOfWidgetPluginsToRemove, onErrorWhileMigratingWidget },
) => {
  migrateFilters(dashboardState.filters);
  migrateContextValues(dashboardState.queryContext);

  _forEach(dashboardState.pages, (pageState) => {
    migrateFilters(pageState.filters);
    migrateContextValues(pageState.queryContext);
  });

  migrateWidgetsWithinDashboard(dashboardState, migrateWidget, {
    dataModels,
    keysOfWidgetPluginsToRemove,
    onError: onErrorWhileMigratingWidget,
  });
};
