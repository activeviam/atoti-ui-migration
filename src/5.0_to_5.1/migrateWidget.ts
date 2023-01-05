import { AWidgetState as AWidgetState50 } from "@activeviam/activeui-sdk-5.0";
import { DataModel } from "@activeviam/activeui-sdk-5.1";
import { migrateCalculatedMeasuresInWidget } from "./calculated-measures/migrateCalculatedMeasuresInWidget";

/**
 * Mutates `widgetState` and `measureToCubeMapping`.
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
  // TODO
  // - migrate widget filters (wrap in {mdx})
  // - migrate widget context values (stringify)
}
