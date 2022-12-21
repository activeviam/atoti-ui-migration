import {
  AWidgetState as AWidgetState50,
  deserializeWidgetState,
} from "@activeviam/activeui-sdk-5.0";
import {
  AWidgetState as AWidgetState51,
  serializeWidgetState,
} from "@activeviam/activeui-sdk-5.1";
import { MigrateWidgetCallback } from "../migration.types";
import { migrateContextValues } from "./migrateContextValues";
import { migrateFilters } from "./migrateFilters";
import { produce } from "immer";

export const migrateWidget: MigrateWidgetCallback<
  AWidgetState50<"serialized">,
  AWidgetState51<"serialized">
> = (serializedWidgetState, { dataModels }) => {
  const widgetState = deserializeWidgetState(serializedWidgetState);

  const migratedWidgetState = produce(widgetState, (draft) => {
    mutateWidget(draft, { dataModels });
  });

  // At the end of the migration, `widgetState` is of type `AWidgetState51`.
  return serializeWidgetState(migratedWidgetState as AWidgetState51);
};

export const mutateWidget: MigrateWidgetCallback<AWidgetState50, void> = (
  deserializedWidgetState,
) => {
  migrateFilters(deserializedWidgetState.filters);
  migrateContextValues(deserializedWidgetState.queryContext);
};
