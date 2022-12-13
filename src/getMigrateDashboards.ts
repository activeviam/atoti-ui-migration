import { ContentRecord } from "@activeviam/activeui-sdk-5.0";
import {
  ErrorReport,
  MigrateDashboardCallback,
  OutcomeCounters,
} from "./migration.types";
import { _addErrorToReport } from "./_addErrorToReport";
import { _getFilesAncestry } from "./_getFilesAncestry";
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
  <FromDashboardState, ToDashboardState>(
    callback: MigrateDashboardCallback<FromDashboardState, ToDashboardState>,
  ): void => {
    let migratedDashboard;

    const dashboardsContent =
      contentServer.children?.ui.children?.dashboards.children?.content
        .children;
    const dashboardsStructure =
      contentServer.children?.ui.children?.dashboards.children?.structure!;

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

        const filesAncestry = _getFilesAncestry(dashboardsStructure);
        const folderName = filesAncestry[fileId].map(({ name }) => name);
        const folderId = filesAncestry[fileId].map(({ id }) => id);

        _addErrorToReport(errorReport, {
          folderName,
          folderId,
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
          content: JSON.stringify(migratedDashboard),
        },
      };
    }
  };
