import { ContentRecord } from "@activeviam/activeui-sdk-5.0";
import _omit from "lodash/omit";
import {
  ErrorReport,
  MigrateDashboardsCallback,
  OutcomeCounters,
} from "./migration.types";
import { _addErrorToReport } from "./_addErrorToReport";
import { _getMapOfFolderIds } from "./_getMapOfFolderIds";
import { _serializeError } from "./_serializeError";

/**
 * Returns a function which can be called to migrate the content of each dashboard.
 * The migration is meant to be done accordingly to the logic defined in `callback`.
 *
 * Some pieces of logic are encapsulated in order to make it easier for the caller:
 * - the logic of traversing and updating files in `/ui/dashboards`
 * - the error handling.
 *
 * Mutates `contentServer`, `counters` and `errorReport`.
 */
export const getMigrateDashboards =
  (
    contentServer: ContentRecord,
    {
      errorReport,
      counters,
      doesReportIncludeStacks,
    }: {
      errorReport: ErrorReport;
      counters: OutcomeCounters;
      doesReportIncludeStacks: boolean;
    },
  ) =>
  (callback: MigrateDashboardsCallback): void => {
    let migratedDashboard;

    const dashboardsContent =
      contentServer.children?.ui.children?.dashboards.children?.content
        .children;
    const dashboardsStructure =
      contentServer.children?.ui.children?.dashboards.children?.structure!;

    const mapOfFolderIds = _getMapOfFolderIds(dashboardsStructure);

    for (const fileId in dashboardsContent) {
      const { entry } = dashboardsContent[fileId];
      const dashboard = JSON.parse(entry.content);

      try {
        migratedDashboard = callback(dashboard);
        // The dashboard was fully migrated.
        counters.dashboards.success++;
      } catch (error) {
        // The dashboard could not be migrated at all.
        counters.dashboards.failed++;

        _addErrorToReport(errorReport, {
          legacyContent: dashboardsContent,
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

      dashboardsContent![fileId] = {
        entry: {
          ...entry,
          content: JSON.stringify(_omit(migratedDashboard, ["name"])),
        },
      };
    }
  };
