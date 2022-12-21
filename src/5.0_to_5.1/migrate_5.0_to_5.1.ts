import { MigrationFunction } from "../migration.types";
import { migrateDashboard } from "./migrateDashboard";
import { migrateWidget } from "./migrateWidget";

export const migrate_50_to_51: MigrationFunction = (
  contentServer,
  { migrateDashboards, migrateSavedWidgets },
) => {
  // TODO migrate calculated measures
  migrateDashboards(migrateDashboard);
  migrateSavedWidgets(migrateWidget);
};
