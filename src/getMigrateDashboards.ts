import { ContentRecord } from "@activeviam/activeui-sdk-5.0";
import { DataModel } from "@activeviam/activeui-sdk-5.1";
import { produce } from "immer";
import { isPartialDashboardErrorReport } from "./isPartialDashboardErrorReport";
import {
  BehaviorOnError,
  PartialDashboardErrorReport,
  ErrorReport,
  MigrateDashboardCallback,
  OutcomeCounters,
} from "./migration.types";
import { WidgetFlaggedForRemovalError } from "./WidgetFlaggedForRemovalError";
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
 * Mutates `contentServer`, `counters` and `errorReport`.
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
      behaviorOnError,
      step,
    }: {
      originalContent: ContentRecord | undefined;
      dataModels: { [serverKey: string]: DataModel };
      keysOfWidgetPluginsToRemove: string[];
      errorReport: ErrorReport;
      counters: OutcomeCounters;
      doesReportIncludeStacks: boolean;
      behaviorOnError: BehaviorOnError;
      step: string;
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
        !isPartialDashboardErrorReport(errorReport.dashboards?.[fileId]) &&
        behaviorOnError !== "keep-going"
      ) {
        return;
      }

      if (!filesAncestry[fileId]) {
        counters.dashboards.removed++;
        _addCorruptFileErrorToReport(errorReport, {
          contentType: "dashboards",
          fileId,
        });
        delete content.children[fileId];
        continue;
      }

      const { entry } = content.children[fileId];
      const dashboard = JSON.parse(entry.content);

      const folderName = filesAncestry[fileId].map(({ name }) => name);
      const folderId = filesAncestry[fileId].map(({ id }) => id);
      const metadata = _getMetaData(structure, folderId, fileId);
      const name = metadata.name!;

      const dashboardErrorReport: PartialDashboardErrorReport = {
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
        if (error instanceof WidgetFlaggedForRemovalError) {
          counters.widgets.removed++;
        }
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

        content.children![fileId].entry.content =
          JSON.stringify(migratedDashboard);

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
            step,
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
          step,
        });

        if (behaviorOnError === "keep-original") {
          // All dashboards that are in `content` were initially in `originalContent`.
          content.children[fileId] = originalContent.children![fileId];
        }
      }
    }
  };
