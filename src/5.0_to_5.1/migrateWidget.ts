import {
  AWidgetState as AWidgetState50,
  getCubeName,
  isWidgetWithQueryState,
} from "@activeviam/activeui-sdk-5.0";
import { AWidgetState as AWidgetState51 } from "@activeviam/activeui-sdk-5.1";
import { MigrateWidgetCallback } from "../migration.types";
import { migrateCalculatedMeasuresInWidget } from "./calculated-measures/migrateCalculatedMeasuresInWidget";
import { migrateContextValues } from "./migrateContextValues";
import { migrateFilters } from "./migrateFilters";

/**
 * Mutates a 5.0 `widgetState` into one usable in 5.1.
 * Also mutates `measureToCubeMapping`.
 */
export const migrateWidget: MigrateWidgetCallback<
  AWidgetState50,
  AWidgetState51,
  {
    namesOfCalculatedMeasuresToMigrate: string[];
    measureToCubeMapping: { [measureName: string]: string[] };
  }
> = (
  widgetState,
  { dataModels, namesOfCalculatedMeasuresToMigrate, measureToCubeMapping },
) => {
  migrateCalculatedMeasuresInWidget(widgetState, {
    dataModels,
    namesOfCalculatedMeasuresToMigrate,
    measureToCubeMapping,
  });

  if (isWidgetWithQueryState(widgetState)) {
    const mdx = widgetState.query.mdx;
    const cubeName = mdx ? getCubeName(mdx) : undefined;
    migrateFilters(widgetState.filters, {
      dataModels,
      cubeName,
      serverKey: widgetState.serverKey,
    });
  }

  migrateContextValues(widgetState.queryContext);
};
