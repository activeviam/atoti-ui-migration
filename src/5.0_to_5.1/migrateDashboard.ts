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
  console.log("Inside migrateDashboard", dashboardState.name);
  migrateFilters(dashboardState.filters);
  console.log("After migrate dashboard filters");
  migrateContextValues(dashboardState.queryContext);
  console.log("After migrate dashboard context values");

  _forEach(dashboardState.pages, (pageState) => {
    migrateFilters(pageState.filters);
    console.log("After migrate page filters");
    migrateContextValues(pageState.queryContext);
    console.log("After migrate page context values");
  });

  migrateWidgetsWithinDashboard(dashboardState, migrateWidget, {
    dataModels,
    keysOfWidgetPluginsToRemove,
    onError: onErrorWhileMigratingWidget,
  });
};
