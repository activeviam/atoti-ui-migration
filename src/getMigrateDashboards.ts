import { ContentRecord } from "@activeviam/activeui-sdk-5.0";
import { DataModel } from "@activeviam/activeui-sdk-5.1";
import { produce } from "immer";
import {
  ErrorReport,
  MigrateDashboardCallback,
  OutcomeCounters,
} from "./migration.types";
import { _addErrorToReport } from "./_addErrorToReport";
import { _getFilesAncestry } from "./_getFilesAncestry";
import { _getMetaData } from "./_getMetaData";
import { _serializeError } from "./_serializeError";

/**
 * Returns a function which can be called to migrate ActiveUI 5+ dashboards.
 * The content of each dashboard is transformed using the `callback` argument.
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
      dataModels,
      keysOfWidgetPluginsToRemove,
      errorReport,
      counters,
      doesReportIncludeStacks,
    }: {
      dataModels: { [serverKey: string]: DataModel };
      keysOfWidgetPluginsToRemove: string[];
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
    const filesAncestry = _getFilesAncestry(dashboardsStructure);
    const migrateDashboard = produce(callback);

    for (const fileId in dashboardsContent) {
      const { entry } = dashboardsContent[fileId];
      const dashboard = JSON.parse(entry.content);

      const folderName = filesAncestry[fileId].map(({ name }) => name);
      const folderId = filesAncestry[fileId].map(({ id }) => id);
      const metadata = _getMetaData(dashboardsStructure, folderId, fileId);

      try {
        migratedDashboard = migrateDashboard(dashboard, {
          dataModels,
          keysOfWidgetPluginsToRemove,
        });
        // The dashboard was fully migrated.
        counters.dashboards.success++;
      } catch (error) {
        // The dashboard could not be migrated at all.
        counters.dashboards.failed++;

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
          name: metadata.name!,
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
