import {
  DashboardState as DashboardState50,
  deserializeDashboardState,
} from "@activeviam/activeui-sdk-5.0";
import {
  DashboardState as DashboardState51,
  serializeDashboardState,
} from "@activeviam/activeui-sdk-5.1";
import { MigrateDashboardCallback } from "../migration.types";
import { migrateFilters } from "./migrateFilters";
import _forEach from "lodash/forEach";
import { migrateContextValues } from "./migrateContextValues";
import { migrateWidgetsWithinDashboard } from "../migrateWidgetsWithinDashboard";
import { produce } from "immer";
import { mutateWidget } from "./migrateWidget";

export const migrateDashboard: MigrateDashboardCallback<
  DashboardState50<"serialized">,
  DashboardState51<"serialized">
> = (
  serializedDashboardState,
  { dataModels, keysOfWidgetPluginsToRemove, onErrorWhileMigratingWidget },
) => {
  const dashboardState = deserializeDashboardState(serializedDashboardState);

  const migratedDashboardState = produce(dashboardState, (draft) => {
    mutateDashboard(draft, {
      dataModels,
      keysOfWidgetPluginsToRemove,
      onErrorWhileMigratingWidget,
    });
  });

  // At the end of the migration, `dashboardState` is of type `DashboardState51`.
  return serializeDashboardState(migratedDashboardState as DashboardState51);
};

const mutateDashboard: MigrateDashboardCallback<DashboardState50, void> = (
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
