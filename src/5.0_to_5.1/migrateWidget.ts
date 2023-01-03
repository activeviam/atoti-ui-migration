import { AWidgetState as AWidgetState50 } from "@activeviam/activeui-sdk-5.0";
import { DataModel } from "@activeviam/activeui-sdk-5.1";
import { migrateCalculatedMeasuresInWidget } from "./calculated-measures/migrateCalculatedMeasuresInWidget";
import { migrateContextValues } from "./migrateContextValues";
import { migrateFilters } from "./migrateFilters";

/**
 * Mutates a 5.0 `widgetState` into one usable in 5.1.
 * Also mutates `measureToCubeMapping`. 
 */
export function migrateWidget(
  widgetState: AWidgetState50,
  {
    dataModels,
    namesOfCalculatedMeasuresToMigrate,
    measureToCubeMapping,
  }: {
    dataModels: { [serverKey: string]: DataModel };
    namesOfCalculatedMeasuresToMigrate: string[];
    measureToCubeMapping: { [measureName: string]: string[] };
  },
): void {
  migrateCalculatedMeasuresInWidget(widgetState, {
    dataModels,
    namesOfCalculatedMeasuresToMigrate,
    measureToCubeMapping,
  });
  migrateFilters(widgetState.filters);
  migrateContextValues(widgetState.queryContext);
}
