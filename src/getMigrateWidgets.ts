import { ContentRecord } from "@activeviam/activeui-sdk-5.0";
import { DataModel } from "@activeviam/activeui-sdk-5.1";
import { produce } from "immer";
import { WidgetFlaggedForRemovalError } from "./WidgetFlaggedForRemovalError";
import {
  ErrorReport,
  MigrateWidgetCallback,
  OutcomeCounters,
} from "./migration.types";
import { _addErrorToReport } from "./_addErrorToReport";
import { _getFilesAncestry } from "./_getFilesAncestry";
import { _serializeError } from "./_serializeError";
import { _getMetaData } from "./_getMetaData";

/**
 * Returns a function which can be called to migrate ActiveUI 5+ widgets.
 * The content of each widget is transformed using the `callback` argument.
 *
 * Some pieces of logic are encapsulated in order to make it easier for the caller:
 * - the logic of traversing and updating files in `/ui/widgets`
 * - the error handling.
 *
 * Mutates `contentServer`, `counters` and `errorReport`.
 */
export const getMigrateWidgets =
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
  <FromWidgetState, ToWidgetState>(
    callback: MigrateWidgetCallback<FromWidgetState, ToWidgetState>,
  ): void => {
    const widgetsContent =
      contentServer.children?.ui.children?.widgets.children?.content.children;
    const widgetsStructure =
      contentServer.children?.ui.children?.widgets.children?.structure!;
    const filesAncestry = _getFilesAncestry(widgetsStructure);

    const migrateWidget = produce(callback);

    for (const fileId in widgetsContent) {
      let migratedWidget;
      const { entry } = widgetsContent[fileId];
      const widget = JSON.parse(entry.content);

      const folderName = filesAncestry[fileId].map(({ name }) => name);
      const folderId = filesAncestry[fileId].map(({ id }) => id);
      const metadata = _getMetaData(widgetsStructure, folderId, fileId);

      if (keysOfWidgetPluginsToRemove?.includes(widget.key)) {
        // The widget's plugin key is flagged for removal.
        // Remove the widget instead of migrating it.
        counters.widgets.removed++;
        _addErrorToReport(errorReport, {
          folderName,
          folderId,
          contentType: "widgets",
          fileErrorReport: {
            error: _serializeError(
              new WidgetFlaggedForRemovalError(widget.key),
              { doesReportIncludeStacks },
            ),
          },
          fileId,
          name: metadata.name!,
        });
        continue;
      }

      try {
        migratedWidget = migrateWidget(widget, {
          dataModels,
        });
        // The widget was fully migrated.
        counters.widgets.success++;
      } catch (error) {
        // The widget could not be migrated at all.
        counters.widgets.failed++;

        _addErrorToReport(errorReport, {
          folderName,
          folderId,
          contentType: "widgets",
          fileErrorReport: {
            error: _serializeError(error, {
              doesReportIncludeStacks,
            }),
          },
          fileId,
          name: widget.name,
        });

        migratedWidget = widget;
      }

      widgetsContent![fileId] = {
        entry: {
          ...entry,
          content: JSON.stringify(migratedWidget),
        },
      };
    }
  };
