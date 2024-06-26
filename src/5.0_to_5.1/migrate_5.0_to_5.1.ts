import {
  parse,
  deserializeDashboardState,
  deserializeWidgetState,
} from "@activeviam/activeui-sdk-5.0";
import {
  serializeWidgetState,
  serializeDashboardState,
  serializeFilter,
} from "@activeviam/activeui-sdk-5.1";
import { MigrationFunction } from "../migration.types";
import { migrateDashboard } from "./migrateDashboard";
import { migrateSavedFilter } from "./migrateSavedFilter";
import { migrateWidget } from "./migrateWidget";
import { getNamesOfCalculatedMeasuresToMigrate } from "./calculated-measures/getNamesOfCalculatedMeasuresToMigrate";
import { migrateSavedCalculatedMeasures } from "./calculated-measures/migrateSavedCalculatedMeasures";
import { migrateSavedWidgetsMetaData } from "./migrateSavedWidgetsMetaData";
import { migrateSettings } from "./migrateSettings";
import { migrateUserActivity } from "./migrateUserActivity";

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
    contentServerVersion,
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
    step: "5.0 to 5.1",
    contentServerVersion,
    dataModels,
  });

  migrateSavedFilters(
    ({ mdx }) => ({
      mdx: parse(mdx),
    }),
    ({ mdx }) => migrateSavedFilter({ mdx }, { dataModels }),
    serializeFilter,
  );

  migrateSavedWidgetsMetaData(contentServer);

  migrateSettings(contentServer);

  migrateUserActivity(contentServer, dataModels);
};
