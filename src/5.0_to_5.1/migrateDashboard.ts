import { DashboardState as DashboardState50 } from "@activeviam/activeui-sdk-5.0";
import { DataModel } from "@activeviam/activeui-sdk-5.1";
import _forEach from "lodash/forEach";
import { migrateWidgetsWithinDashboard } from "../migrateWidgetsWithinDashboard";
import { migrateContextValues } from "./migrateContextValues";
import { migrateFilters } from "./migrateFilters";
import { migrateWidget } from "./migrateWidget";

/**
 * Mutates a 5.0 `dashboardState` into one usable in 5.1.
 */
export const migrateDashboard = (
  dashboardState: DashboardState50,
  {
    dataModels,
    keysOfWidgetPluginsToRemove,
    onErrorWhileMigratingWidget,
    namesOfCalculatedMeasuresToMigrate,
    measureToCubeMapping,
  }: {
    dataModels: { [serverKey: string]: DataModel };
    keysOfWidgetPluginsToRemove: string[];
    onErrorWhileMigratingWidget: (
      error: unknown,
      {
        pageKey,
        leafKey,
        pageName,
        widgetName,
      }: {
        pageKey: string;
        leafKey: string;
        pageName: string;
        widgetName: string;
      },
    ) => void;
    namesOfCalculatedMeasuresToMigrate: string[];
    measureToCubeMapping: { [measureName: string]: string[] };
  },
): void => {
  migrateFilters(dashboardState.filters);
  migrateContextValues(dashboardState.queryContext);

  _forEach(dashboardState.pages, (pageState) => {
    migrateFilters(pageState.filters);
    migrateContextValues(pageState.queryContext);
  });

  migrateWidgetsWithinDashboard(
    dashboardState,
    (widgetState) =>
      migrateWidget(widgetState, {
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
