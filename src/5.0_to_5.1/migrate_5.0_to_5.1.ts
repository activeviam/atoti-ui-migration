import { MigrationFunction } from "../migration.types";
import { migrateCalculatedMeasures } from "./calculated-measures/migrateCalculatedMeasures";
import { migrateDashboard } from "./migrateDashboard";
import { migrateWidget } from "./migrateWidget";

export const migrate_50_to_51: MigrationFunction = (
  contentServer,
  {
    migrateDashboards,
    migrateSavedWidgets,
    dataModels,
    errorReport,
    counters,
    doesReportIncludeStacks,
  },
) => {
  migrateCalculatedMeasures({
    contentServer,
    dataModels,
    errorReport,
    counters,
    doesReportIncludeStacks,
  });
  migrateDashboards(migrateDashboard);
  migrateSavedWidgets(migrateWidget);
};
