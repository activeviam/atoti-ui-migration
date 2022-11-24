import {
  DashboardState as DashboardState50,
  ContentRecord,
} from "@activeviam/activeui-sdk-5.0";
import { DashboardState as DashboardState51 } from "@activeviam/activeui-sdk-5.1";
import _omit from "lodash/omit";
import {
  ErrorReport,
  MigrateFromVersions,
  OutcomeCounters,
} from "./migration.types";
import { _addErrorToReport } from "./_addErrorToReport";
import { _getMapOfFolderIds } from "./_getMapOfFolderIds";
import { _serializeError } from "./_serializeError";

type MigrateDashboardCallback<fromVersion extends MigrateFromVersions> = (
  dashboardState: fromVersion extends "5.0" ? DashboardState50 : any,
) => fromVersion extends "5.0" ? DashboardState51 : any;

/**
 * Handles the generic logic to migrate dashboards, specifically the errors.
 * `cb` is a generic callback that is meant to handle dashboards migration from one specific version to another.
 * Mutates `migratedUIFolder`, `dashboards`, `counters` and `errorReport`.
 */
export const getMigrateDashboards = <fromVersion extends MigrateFromVersions>(
  {
    legacyUIFolder,
    migratedUIFolder,
    errorReport,
    counters,
    doesReportIncludeStacks,
  }: {
    legacyUIFolder: ContentRecord;
    migratedUIFolder: ContentRecord;
    errorReport: ErrorReport;
    counters: OutcomeCounters;
    doesReportIncludeStacks: boolean;
  },
  cb: MigrateDashboardCallback<fromVersion>,
): void => {
  let migratedDashboard;

  const legacyContent =
    legacyUIFolder.children?.dashboards.children?.content.children;
  const legacyStructure =
    legacyUIFolder?.children?.bookmarks?.children?.structure!;

  const mapOfFolderIds = _getMapOfFolderIds(legacyStructure);

  for (const fileId in legacyContent) {
    const { entry } = legacyContent[fileId];
    const dashboard = JSON.parse(entry.content);

    try {
      migratedDashboard = cb(dashboard);
      // The dashboard was fully migrated.
      counters.dashboards.success++;
    } catch (error) {
      // The dashboard could not be migrated at all.
      counters.dashboards.failed++;

      _addErrorToReport(errorReport, {
        legacyContent,
        mapOfFolderIds,
        contentType: "dashboards",
        fileErrorReport: {
          error: _serializeError(error, {
            doesReportIncludeStacks,
          }),
        },
        fileId,
        name: dashboard.name,
      });

      migratedDashboard = dashboard;
    }

    migratedUIFolder.children!.dashboards.children!.content.children![fileId] =
      {
        entry: {
          ...entry,
          content: JSON.stringify(_omit(migratedDashboard, ["name"])),
        },
      };
  }
};
