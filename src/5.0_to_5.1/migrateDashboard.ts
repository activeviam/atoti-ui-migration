import {
  DashboardState as DashboardState50,
  deserializeDashboardState,
} from "@activeviam/activeui-sdk-5.0";
import {
  DashboardState as DashboardState51,
  serializeDashboardState,
} from "@activeviam/activeui-sdk-5.1";
import { MigrateDashboardCallback } from "../migration.types";
import { produce } from "immer";
import { mutateDashboard } from "./mutateDashboard";

/**
 * Returns the 5.1 migrated version of the 5.0 `serializedDashboardState`.
 */
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
