import {
  deserializeWidgetState,
  deserializeDashboardState,
} from "@activeviam/activeui-sdk-5.0";
import {
  serializeWidgetState,
  serializeDashboardState,
} from "@activeviam/activeui-sdk-5.1";
import { MigrationFunction } from "../migration.types";
import { migrateCalculatedMeasures } from "./calculated-measures/migrateCalculatedMeasures";
import { migrateDashboard } from "./migrateDashboard";
import { migrateSavedFilter } from "./migrateSavedFilter";
import { migrateWidget } from "./migrateWidget";

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
  migrateDashboards(
    migrateDashboard,
    deserializeDashboardState,
    serializeDashboardState,
  );
  migrateSavedWidgets(
    migrateWidget,
    deserializeWidgetState,
    serializeWidgetState,
  );
  migrateSavedFilters(migrateSavedFilter);
};
