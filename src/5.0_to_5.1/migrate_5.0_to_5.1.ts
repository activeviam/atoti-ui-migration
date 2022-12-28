import { MigrationFunction } from "../migration.types";
import { migrateCalculatedMeasures } from "./calculated-measures/migrateCalculatedMeasures";
import { migrateDashboard } from "./migrateDashboard";
import { migrateSavedFilter } from "./migrateSavedFilter";
import { migrateSavedWidget } from "./migrateSavedWidget";

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
  migrateCalculatedMeasures({
    contentServer,
    dataModels,
    errorReport,
    counters,
    doesReportIncludeStacks,
  });
  migrateDashboards(migrateDashboard);
  migrateSavedWidgets(migrateSavedWidget);
  migrateSavedFilters(migrateSavedFilter);
};
