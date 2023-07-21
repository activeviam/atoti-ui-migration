import { DashboardState as DashboardState50 } from "@activeviam/activeui-sdk-5.0";
import {
  DashboardState as DashboardState51,
  isWidgetWithQueryState,
} from "@activeviam/activeui-sdk-5.1";
import _forEach from "lodash/forEach";
import { migrateWidgetsWithinDashboard } from "../migrateWidgetsWithinDashboard";
import { MigrateDashboardCallback } from "../migration.types";
import { migrateContextValues } from "./migrateContextValues";
import { migrateFilters } from "./migrateFilters";
import { migrateWidget } from "./migrateWidget";
import { migrateQueryContextToAnalysisHierarchyFilter } from "../cv_to_aa/migrateQueryContextToAnalysisHierarchyFilter";

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
  // @ts-expect-error the dashboard state has been mutated into a 5.1 version already.
  migrateQueryContextToAnalysisHierarchyFilter(dashboardState);

  _forEach(dashboardState.pages, (pageState) => {
    migrateFilters(pageState.filters, { dataModels });
    migrateContextValues(pageState.queryContext);
    // @ts-expect-error the page state has been mutated into a 5.1 version already.
    migrateQueryContextToAnalysisHierarchyFilter(pageState);
  });

  migrateWidgetsWithinDashboard(
    dashboardState,
    (widgetState) => {
      migrateWidget(widgetState, {
        dataModels,
        namesOfCalculatedMeasuresToMigrate,
        measureToCubeMapping,
      });

      if (isWidgetWithQueryState(widgetState)) {
        migrateQueryContextToAnalysisHierarchyFilter(widgetState);
      }
    },
    {
      dataModels,
      keysOfWidgetPluginsToRemove,
      onError: onErrorWhileMigratingWidget,
    },
  );
};
