import { ContentRecord } from "@activeviam/activeui-sdk-5.0";
import {
  ErrorReport,
  MigrateWidgetCallback,
  OutcomeCounters,
} from "./migration.types";
import { _addErrorToReport } from "./_addErrorToReport";
import { _getFilesAncestry } from "./_getFilesAncestry";
import { _serializeError } from "./_serializeError";

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
      errorReport,
      counters,
      doesReportIncludeStacks,
    }: {
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

    for (const fileId in widgetsContent) {
      let migratedWidget;
      const { entry } = widgetsContent[fileId];
      const widget = JSON.parse(entry.content);

      try {
        migratedWidget = callback(widget);
        // The widget was fully migrated.
        counters.widgets.success++;
      } catch (error) {
        // The widget could not be migrated at all.
        counters.widgets.failed++;

        const filesAncestry = _getFilesAncestry(widgetsStructure);
        const folderName = filesAncestry[fileId].map(({ name }) => name);
        const folderId = filesAncestry[fileId].map(({ id }) => id);

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
