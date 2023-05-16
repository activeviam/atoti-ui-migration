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
 * Also mutates `measureToCubeMapping`.
 */
export const migrateDashboard: MigrateDashboardCallback<
  DashboardState50,
  DashboardState51,
  {
    namesOfCalculatedMeasuresToMigrate: string[];
    measureToCubeMapping: { [measureName: string]: string[] };
  }
> = (
  dashboardState,
  {
    dataModels,
    keysOfWidgetPluginsToRemove,
    onErrorWhileMigratingWidget,
    namesOfCalculatedMeasuresToMigrate,
    measureToCubeMapping,
  },
) => {
  migrateFilters(dashboardState.filters, { dataModels });
  migrateContextValues(dashboardState.queryContext);

  _forEach(dashboardState.pages, (pageState) => {
    migrateFilters(pageState.filters, { dataModels });
    migrateContextValues(pageState.queryContext);
  });

  migrateWidgetsWithinDashboard(
    dashboardState,
    (widgetState) =>
      migrateWidget(widgetState, {
        supportCalculatedMeasuresMigration: true,
        dataModels,
        namesOfCalculatedMeasuresToMigrate,
        measureToCubeMapping,
      }),
    {
      dataModels,
      keysOfWidgetPluginsToRemove,
      onError: onErrorWhileMigratingWidget,
    },
  );
};
