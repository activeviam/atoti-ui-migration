import { MigrationFunction } from "../migration.types";
import { migrateCalculatedMeasures } from "./calculated-measures/migrateCalculatedMeasures";
import { migrateDashboard } from "./migrateDashboard";
import { migrateWidget } from "./migrateWidget";

export const migrate_50_to_51: MigrationFunction = (
  contentServer,
  { migrateDashboards, migrateWidgets, dataModels },
) => {
  console.log("before migrating calculated measures");
  migrateCalculatedMeasures(contentServer, dataModels);
  console.log("before migrating dashboards");
  migrateDashboards(migrateDashboard);
  console.log("before migrating widgets");
  migrateWidgets(migrateWidget);
};
