import { MigrationFunction } from "../migration.types";
import { migrateDashboard } from "./migrateDashboard";
import { migrateWidget } from "./migrateWidget";

export const migrate_50_to_51: MigrationFunction = (
  contentServer,
  { migrateDashboards, migrateWidgets },
) => {
  // TODO migrate calculated measures
  migrateDashboards(migrateDashboard);
  migrateWidgets(migrateWidget);
};
