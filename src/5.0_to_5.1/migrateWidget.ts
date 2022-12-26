import { AWidgetState as AWidgetState50 } from "@activeviam/activeui-sdk-5.0";
import { AWidgetState as AWidgetState51 } from "@activeviam/activeui-sdk-5.1";
import { MigrateWidgetCallback } from "../migration.types";
import { migrateContextValues } from "./migrateContextValues";
import { migrateFilters } from "./migrateFilters";

export const migrateWidget: MigrateWidgetCallback<
  AWidgetState50,
  AWidgetState51
> = (widgetState) => {
  migrateFilters(widgetState.filters);
  migrateContextValues(widgetState.queryContext);
};
