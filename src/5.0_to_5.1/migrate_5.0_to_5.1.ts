import {
  deserializeWidgetState,
  deserializeDashboardState,
  parse,
} from "@activeviam/activeui-sdk-5.0";
import {
  serializeWidgetState,
  serializeDashboardState,
  stringify,
} from "@activeviam/activeui-sdk-5.1";
import { MigrationFunction } from "../migration.types";
import { migrateDashboard } from "./migrateDashboard";
import { migrateSavedFilter } from "./migrateSavedFilter";
import { migrateWidget } from "./migrateWidget";
import { getNamesOfCalculatedMeasuresToMigrate } from "./calculated-measures/getNamesOfCalculatedMeasuresToMigrate";
import { migrateSavedCalculatedMeasures } from "./calculated-measures/migrateSavedCalculatedMeasures";

export const migrate_50_to_51: MigrationFunction = (
  contentServer,
  {
    migrateDashboards,
    migrateSavedWidgets,
    migrateSavedFilters,
    dataModels,
    errorReport,
    counters,
    doesReportIncludeStacks,
  },
) => {
  const namesOfCalculatedMeasuresToMigrate =
    getNamesOfCalculatedMeasuresToMigrate(contentServer);
  // Accumulate the cubes to which the saved calculated measures belong.
  const measureToCubeMapping: { [measureName: string]: string[] } = {};

  migrateDashboards(
    deserializeDashboardState,
    (
      dashboardState,
      { keysOfWidgetPluginsToRemove, onErrorWhileMigratingWidget },
    ) =>
      migrateDashboard(dashboardState, {
        dataModels,
        keysOfWidgetPluginsToRemove,
        onErrorWhileMigratingWidget,
        namesOfCalculatedMeasuresToMigrate,
        measureToCubeMapping,
      }),
    serializeDashboardState,
  );

  migrateSavedWidgets(
    deserializeWidgetState,
    (widgetState) =>
      migrateWidget(widgetState, {
        dataModels,
        namesOfCalculatedMeasuresToMigrate,
        measureToCubeMapping,
      }),
    serializeWidgetState,
  );

  // Must be called after `migrateDashboards` and `migrateSavedWidgets`, as `measureToCubeMapping` is accumulated during those steps.
  migrateSavedCalculatedMeasures({
    contentServer,
    measureToCubeMapping,
    errorReport,
    counters,
    doesReportIncludeStacks,
  });

  migrateSavedFilters(
    ({ mdx }) => ({
      mdx: parse(mdx),
    }),
    migrateSavedFilter,
    ({ mdx }) => ({ mdx: stringify(mdx) }),
  );
};
