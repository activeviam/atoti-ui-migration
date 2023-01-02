import { MigrationFunction } from "../migration.types";
import { migrateDashboard } from "./migrateDashboard";
import { migrateWidget } from "./migrateWidget";
import { getNamesOfCalculatedMeasuresToMigrateById } from "./calculated-measures/getNamesOfCalculatedMeasuresToMigrate";

export const migrate_50_to_51: MigrationFunction = (
  contentServer,
  { migrateDashboards, migrateSavedWidgets },
) => {
  const namesOfCalculatedMeasuresToMigrateById =
    getNamesOfCalculatedMeasuresToMigrateById(contentServer);
  const namesOfCalculatedMeasuresToMigrate = Object.values(
    namesOfCalculatedMeasuresToMigrateById,
  );
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
};
