import { getQueryContextValue } from "../cli/bin";
import { MigrationFunction } from "../migration.types";
import { migrateCalculatedMeasures } from "./calculated-measures/migrateCalculatedMeasures";
import { migrateDashboard } from "./migrateDashboard";
import { migrateWidget } from "./migrateWidget";

export const migrate_50_to_51: MigrationFunction = (
  contentServer,
  { migrateDashboards, migrateWidgets, dataModels },
) => {
  migrateCalculatedMeasures(contentServer, dataModels);
  console.log(
    "before migrateDashboards",
    getQueryContextValue(contentServer),
    typeof getQueryContextValue(contentServer),
  );
  migrateDashboards(migrateDashboard);
  console.log(
    "after migrateDashboards",
    getQueryContextValue(contentServer),
    typeof getQueryContextValue(contentServer),
  );
  migrateWidgets(migrateWidget);
  console.log(
    "after migrateWidgets",
    getQueryContextValue(contentServer),
    typeof getQueryContextValue(contentServer),
  );
};
