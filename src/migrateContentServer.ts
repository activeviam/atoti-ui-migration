import _fromPairs from "lodash/fromPairs";
import _mapValues from "lodash/mapValues";
import { ContentRecord } from "@activeviam/activeui-sdk-5.1";
import { getIndexedDataModel, DataModel } from "@activeviam/data-model-5.1";
import {
  BehaviorOnError,
  OutcomeCounters,
  MigrationFunction,
} from "./migration.types";
import { getMigrateDashboards } from "./getMigrateDashboards";
import { getMigrateSavedWidgets } from "./getMigrateSavedWidgets";
import { getMigrateSavedFilters } from "./getMigrateSavedFilters";
import { migrate_43_to_50 } from "./4.3_to_5.0";
import { migrate_50_to_51 } from "./5.0_to_5.1";
import { getContent } from "./getContent";
import {
  AtotiUIFromVersion,
  AtotiUIToVersion,
} from "./convertAtotiToAUIVersions";

const migrationSteps: {
  from: string;
  to: string;
  migrate: MigrationFunction;
}[] = [{ from: "5.0", to: "5.1", migrate: migrate_50_to_51 }];

const fromVersions = migrationSteps.map(({ from }) => from);
const toVersions = migrationSteps.map(({ to }) => to);

/**
 * Migrates `contentServer` from an older version of Atoti UI to a more recent one.
 * Also keeps track of the number of migration successes and failures in `counters` and a detailed `errorReport`.
 *
 * Mutates `contentServer`, `errorReport` and `counters`.
 */
export async function migrateContentServer({
  contentServer,
  servers,
  fromVersion,
  toVersion,
  keysOfWidgetPluginsToRemove,
  doesReportIncludeStacks,
  behaviorOnError,
  treeTableColumnWidth,
  shouldUpdateFiltersMdx,
}: {
  contentServer: ContentRecord;
  servers: {
    [serverKey: string]: {
      dataModel: DataModel<"raw">;
      url: string;
    };
  } & { contentServerVersion?: string };
  fromVersion: AtotiUIFromVersion;
  toVersion: AtotiUIToVersion;
  keysOfWidgetPluginsToRemove: string[];
  doesReportIncludeStacks: boolean;
  behaviorOnError: BehaviorOnError;
  treeTableColumnWidth?: [number, number];
  shouldUpdateFiltersMdx: boolean;
}): Promise<{
  counters: OutcomeCounters;
  errorReport: Record<string, unknown>;
}> {
  const originalDashboardsContent = getContent(
    contentServer,
    "dashboard",
    fromVersion,
  );
  const originalWidgetsContent = getContent(
    contentServer,
    "widget",
    fromVersion,
  );
  const originalFiltersContent = getContent(
    contentServer,
    "filter",
    fromVersion,
  );

  const contentServerVersion = servers.contentServerVersion;
  // Later, `servers` is expected to have a structure like `{ [serverKey: string]: { ... } }`.
  // Several functions depending on this structure are applied to it: `_mapKeys`, `_findKey`, etc.
  // Deleting the "contentServerVersion" attribute from it enables those functions still being applied to `servers` without breaking.
  delete servers.contentServerVersion;

  const counters = _fromPairs(
    ["dashboards", "widgets", "filters", "folders", "calculated_measures"].map(
      (type) => [
        type,
        {
          success: 0,
          partial: 0,
          failed: 0,
          removed: 0,
        },
      ],
    ),
    // _fromPairs returns a Dictionary.
    // In this case, the keys used correspond to the attributes of OutcomeCounters.
  ) as OutcomeCounters;
  const errorReport = {};

  // Handle the special case of 4.3 to 5.0 separately, as:
  // - the corresponding migration function has a different signature than all others
  // - in particular, it is the only migration step with async logic
  if (fromVersion === "4.3") {
    await migrate_43_to_50(contentServer, {
      errorReport,
      counters,
      servers,
      keysOfWidgetPluginsToRemove,
      doesReportIncludeStacks,
      shouldUpdateFiltersMdx,
      treeTableColumnWidth,
      // In Atoti UI 4.3 and 5.1+, saved calculated measures are an Atoti Server concept, and are stored under /pivot in the content server.
      // In Atoti UI 5.0, saved calculated measures are an Atoti UI concept, and are stored under /ui in the content server.
      // So it's only when the target version is 5.0 that calculated measures need to be migrated.
      shouldMigrateCalculatedMeasures: toVersion === "5.0",
    });
  }

  const fromVersionIndex =
    fromVersion === "4.3" ? 0 : fromVersions.indexOf(fromVersion);
  const toVersionIndex = toVersions.indexOf(toVersion);

  const dataModels = _mapValues(servers, ({ dataModel }) =>
    getIndexedDataModel(dataModel),
  );

  migrationSteps
    .slice(fromVersionIndex, toVersionIndex + 1)
    .forEach(({ migrate, from, to }) => {
      const step = `${from} to ${to}`;
      const migrateDashboards = getMigrateDashboards(contentServer, {
        originalContent: originalDashboardsContent,
        dataModels,
        keysOfWidgetPluginsToRemove,
        errorReport,
        counters,
        doesReportIncludeStacks,
        behaviorOnError,
        step,
      });

      const migrateSavedWidgets = getMigrateSavedWidgets(contentServer, {
        originalContent: originalWidgetsContent,
        dataModels,
        keysOfWidgetPluginsToRemove,
        errorReport,
        counters,
        doesReportIncludeStacks,
        behaviorOnError,
        step,
      });

      const migrateSavedFilters = getMigrateSavedFilters(contentServer, {
        originalContent: originalFiltersContent,
        dataModels,
        errorReport,
        counters,
        doesReportIncludeStacks,
        behaviorOnError,
        step,
      });

      migrate(contentServer, {
        migrateDashboards,
        migrateSavedWidgets,
        migrateSavedFilters,
        dataModels,
        keysOfWidgetPluginsToRemove,
        errorReport,
        counters,
        doesReportIncludeStacks,
        contentServerVersion,
      });
    });

  return { errorReport, counters };
}
