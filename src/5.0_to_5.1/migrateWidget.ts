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

type OptionsForCalculatedMeasuresRemoval = {
  namesOfCalculatedMeasuresToMigrate: string[];
  measureToCubeMapping: { [measureName: string]: string[] };
};

const emptyObject = {} as const;
type EmptyObject = typeof emptyObject;

/**
 * If calculated measures don't need to be migrated,
 * then the caller does not need to pass options for calculated measures removal.
 */
type Options = OptionsForCalculatedMeasuresRemoval | EmptyObject;

/**
 * Returns whether `options` allows to remove saved calculated measures from the migrated `widgetState`.
 * This is done when migrating a Content Server, but not a notebook.
 */
function shouldMigrateCalculatedMeasures(
  options: Options,
): options is OptionsForCalculatedMeasuresRemoval {
  return (
    "namesOfCalculatedMeasuresToMigrate" in options &&
    "measureToCubeMapping" in options
  );
}

/**
 * Mutates a 5.0 `widgetState` into one usable in 5.1.
 * Also mutates `measureToCubeMapping`.
 */
export const migrateWidget: MigrateWidgetCallback<
  AWidgetState50,
  AWidgetState51,
  Options
> = (widgetState, { dataModels, ...options }) => {
  if (options && shouldMigrateCalculatedMeasures(options)) {
    migrateCalculatedMeasuresInWidget(widgetState, {
      dataModels,
      namesOfCalculatedMeasuresToMigrate:
        options.namesOfCalculatedMeasuresToMigrate,
      measureToCubeMapping: options.measureToCubeMapping,
    });
  }
  const cubeName =
    isWidgetWithQueryState(widgetState) && widgetState.query.mdx
      ? getCubeName(widgetState.query.mdx)
      : undefined;
  const serverKey = isWidgetWithQueryState(widgetState)
    ? widgetState.serverKey
    : undefined;
  migrateFilters(widgetState.filters, {
    dataModels,
    cubeName,
    serverKey,
  });
  migrateContextValues(widgetState.queryContext);

  if (widgetState.widgetKey === "plotly-clustered-column-and-line-chart") {
    widgetState.widgetKey = "plotly-columns-and-lines-chart";
  }
};
