import { ContentRecord } from "@activeviam/activeui-sdk-5.0";
import { DataModel } from "@activeviam/activeui-sdk-5.1";
import { produce } from "immer";
import {
  BehaviorOnError,
  DashboardErrorReport,
  ErrorReport,
  MigrateDashboardCallback,
  OutcomeCounters,
} from "./migration.types";
import { _addCorruptFileErrorToReport } from "./_addCorruptFileErrorToReport";
import { _addErrorToReport } from "./_addErrorToReport";
import { _addWidgetErrorToReport } from "./_addWidgetErrorToReport";
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
 * Mutates `contentServer`, `counters`, `errorReport` and `idsOfDashboardsToMigrate`.
 */
export const getMigrateDashboards =
  (
    contentServer: ContentRecord,
    {
      originalContentServer,
      dataModels,
      idsOfDashboardsToMigrate,
      keysOfWidgetPluginsToRemove,
      errorReport,
      counters,
      doesReportIncludeStacks,
      behaviorOnError = "keep-original",
    }: {
      originalContentServer: ContentRecord;
      dataModels: { [serverKey: string]: DataModel };
      idsOfDashboardsToMigrate: Set<string>;
      keysOfWidgetPluginsToRemove: string[];
      errorReport: ErrorReport;
      counters: OutcomeCounters;
      doesReportIncludeStacks: boolean;
      behaviorOnError?: BehaviorOnError;
    },
  ) =>
  <
    FromSerializedDashboardState,
    FromDashboardState,
    ToDashboardState,
    ToSerializedDashboardState,
  >(
    deserialize: (state: FromSerializedDashboardState) => FromDashboardState,
    callback: MigrateDashboardCallback<FromDashboardState, ToDashboardState>,
    serialize: (state: ToDashboardState) => ToSerializedDashboardState,
  ): void => {
    const { content, structure } =
      contentServer.children?.ui.children?.dashboards.children ?? {};
    const originalContent =
      originalContentServer.children?.ui.children?.dashboard.children?.content;

    if (!content?.children || !structure?.children) {
      return;
    }

    const filesAncestry = _getFilesAncestry(structure);

    for (const fileId in content.children) {
      if (idsOfDashboardsToMigrate.has(fileId)) {
        if (!filesAncestry[fileId]) {
          counters.dashboards.removed++;
          _addCorruptFileErrorToReport(errorReport, {
            contentType: "dashboards",
            fileId,
          });
          continue;
        }

        const { entry } = content.children[fileId];
        const dashboard = JSON.parse(entry.content);

        const folderName = filesAncestry[fileId].map(({ name }) => name);
        const folderId = filesAncestry[fileId].map(({ id }) => id);
        const metadata = _getMetaData(structure, folderId, fileId);
        const name = metadata.name!;

        const dashboardErrorReport: DashboardErrorReport = {
          name,
          pages: {},
        };

        const onErrorWhileMigratingWidget = (
          error: unknown,
          {
            pageKey,
            leafKey,
            pageName,
            widgetName,
          }: {
            pageKey: string;
            leafKey: string;
            pageName: string;
            widgetName: string;
          },
        ) => {
          _addWidgetErrorToReport(dashboardErrorReport, error, {
            doesReportIncludeStacks,
            leafKey,
            pageKey,
            pageName,
            widgetName,
          });
        };

        let migratedDashboard;

        try {
          const deserializedDashboard = deserialize(dashboard);
          const deserializedMigratedDashboard = produce(
            deserializedDashboard,
            (draft) =>
              callback(draft as FromDashboardState, {
                dataModels,
                keysOfWidgetPluginsToRemove,
                onErrorWhileMigratingWidget,
              }),
          );
          migratedDashboard = serialize(
            // It is the responsibility of `callback` to mutate a `FromDashboardState` into a `ToDashboardState`.
            deserializedMigratedDashboard as ToDashboardState,
          );

          if (Object.keys(dashboardErrorReport.pages).length > 0) {
            // The migration of some widgets within the dashboard failed.
            counters.dashboards.partial++;
            _addErrorToReport(errorReport, {
              folderName,
              folderId,
              contentType: "dashboards",
              fileErrorReport: dashboardErrorReport,
              fileId,
              name,
            });
          } else {
            // The dashboard was fully migrated.
            counters.dashboards.success++;
          }
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
            name,
          });

          switch (behaviorOnError) {
            case "keep-last-successful-version":
              migratedDashboard = dashboard;
              idsOfDashboardsToMigrate.delete(fileId);
              break;
            case "keep-going":
              migratedDashboard = dashboard;
              break;
            // The default behavior is "keep-original".
            default:
              // All dashboards that are in `content` were initially in `originalContent`.
              migratedDashboard = originalContent!.children![fileId].entry;
              idsOfDashboardsToMigrate.delete(fileId);
          }
        }

        content.children![fileId].entry.content =
          JSON.stringify(migratedDashboard);
      }
    }
  };
