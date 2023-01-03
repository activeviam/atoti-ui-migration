import { MigrationFunction } from "../migration.types";
import { migrateDashboard } from "./migrateDashboard";
import { migrateWidget } from "./migrateWidget";
import { getNamesOfCalculatedMeasuresToMigrate } from "./calculated-measures/getNamesOfCalculatedMeasuresToMigrate";
import { migrateSavedCalculatedMeasures } from "./calculated-measures/migrateSavedCalculatedMeasures";

export const migrate_50_to_51: MigrationFunction = (
  contentServer,
  {
    migrateDashboards,
    migrateSavedWidgets,
    errorReport,
    counters,
    doesReportIncludeStacks,
  },
) => {
  const namesOfCalculatedMeasuresToMigrate =
    getNamesOfCalculatedMeasuresToMigrate(contentServer);
  // Accumulate the cubes to which the saved calculated measures belong.
  const measureToCubeMapping: { [measureName: string]: string[] } = {};

  migrateDashboards(migrateDashboard);
  migrateSavedWidgets((widgetState, { dataModels }) =>
    migrateWidget(widgetState, {
      dataModels,
      namesOfCalculatedMeasuresToMigrate,
      measureToCubeMapping,
    }),
  );

  migrateSavedCalculatedMeasures({
    contentServer,
    measureToCubeMapping,
    errorReport,
    counters,
    doesReportIncludeStacks,
  });
};
