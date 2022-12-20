import { DashboardState as DashboardState50 } from "@activeviam/activeui-sdk-5.0";
import { DashboardState as DashboardState51 } from "@activeviam/activeui-sdk-5.1";
import { MigrateDashboardCallback } from "../migration.types";
import { migrateFilters } from "./migrateFilters";
import _forEach from "lodash/forEach";
import { migrateContextValues } from "./migrateContextValues";
import { migrateWidgetsWithinDashboard } from "../migrateWidgetsWithinDashboard";
import { migrateWidget } from "./migrateWidget";

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
