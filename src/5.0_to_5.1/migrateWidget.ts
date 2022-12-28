import { AWidgetState as AWidgetState50 } from "@activeviam/activeui-sdk-5.0";
import { MigrateWidgetCallback } from "../migration.types";
import { migrateContextValues } from "./migrateContextValues";
import { migrateFilters } from "./migrateFilters";

/**
 * Migrates the 5.0 `deserializedWidgetState` to a 5.1 widget state.
 * Mutates `deserializedWidgetState`.
 */
export const migrateWidget: MigrateWidgetCallback<AWidgetState50, void> = (
  deserializedWidgetState,
) => {
  migrateFilters(deserializedWidgetState.filters);
  migrateContextValues(deserializedWidgetState.queryContext);
};
