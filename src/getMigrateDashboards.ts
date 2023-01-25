import { ContentRecord } from "@activeviam/activeui-sdk-5.0";
import { DataModel } from "@activeviam/activeui-sdk-5.1";
import { produce } from "immer";
import { isDashboardErrorReport } from "./isDashboardErrorReport";
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
      originalContent,
      dataModels,
      keysOfWidgetPluginsToRemove,
      errorReport,
      counters,
      doesReportIncludeStacks,
      behaviorOnError = "keep-original",
    }: {
      originalContent: ContentRecord | undefined;
      dataModels: { [serverKey: string]: DataModel };
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

    if (!content?.children || !structure?.children || !originalContent) {
      return;
    }

    const filesAncestry = _getFilesAncestry(structure);

    for (const fileId in content.children) {
      if (
        errorReport.dashboards?.[fileId] &&
        !isDashboardErrorReport(errorReport.dashboards?.[fileId]) &&
        behaviorOnError !== "keep-going"
      ) {
        // The migration of this dashboard failed at a previous step.
        // It is is not a partial failure (i.e. an error on the migration of one of its widgets).
        // The behavior on error is not to keep going, hence the migration of this dashboard should not go further.
        return;
      }

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
        const migratedDashboard = serialize(
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
          content.children![fileId].entry.content =
            JSON.stringify(migratedDashboard);
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

        // If the behavior is "keep-last-successful-version" or "keep-going", the dashboard is kept as it is.
        if (behaviorOnError === "keep-original") {
          // All dashboards that are in `content` were initially in `originalContent`.
          content.children[fileId] = originalContent.children![fileId];
        }
      }
    }
  };
