import { DashboardState as DashboardState50 } from "@activeviam/activeui-sdk-5.0";
import _forEach from "lodash/forEach";
import { migrateWidgetsWithinDashboard } from "../migrateWidgetsWithinDashboard";
import { MigrateDashboardCallback } from "../migration.types";
import { migrateContextValues } from "./migrateContextValues";
import { migrateFilters } from "./migrateFilters";
import { mutateWidget } from "./mutateWidget";

/**
 * Migrates the 5.0 `dashboardState` to a 5.1 dashboard state.
 * Mutates `dashboardState`.
 */
export const mutateDashboard: MigrateDashboardCallback<DashboardState50, void> =
  (
    dashboardState,
    { dataModels, keysOfWidgetPluginsToRemove, onErrorWhileMigratingWidget },
  ) => {
    migrateFilters(dashboardState.filters);
    migrateContextValues(dashboardState.queryContext);

    _forEach(dashboardState.pages, (pageState) => {
      migrateFilters(pageState.filters);
      migrateContextValues(pageState.queryContext);
    });

    migrateWidgetsWithinDashboard(dashboardState, mutateWidget, {
      dataModels,
      keysOfWidgetPluginsToRemove,
      onError: onErrorWhileMigratingWidget,
    });
  };
