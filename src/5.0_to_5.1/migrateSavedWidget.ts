import {
  AWidgetState as AWidgetState50,
  deserializeWidgetState,
} from "@activeviam/activeui-sdk-5.0";
import {
  AWidgetState as AWidgetState51,
  serializeWidgetState,
} from "@activeviam/activeui-sdk-5.1";
import { MigrateWidgetCallback } from "../migration.types";
import { produce } from "immer";
import { mutateWidget } from "./mutateWidget";

/**
 * Returns the 5.1 migrated version of the 5.0 `serializedWidgetState`.
 * Used only for saved widgets, not for widgets within dashboards.
 */
export const migrateSavedWidget: MigrateWidgetCallback<
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
