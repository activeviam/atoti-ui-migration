import { ContentRecord } from "@activeviam/activeui-sdk-5.0";
import _omit from "lodash/omit";
import {
  ErrorReport,
  MigrateWidgetsCallback,
  OutcomeCounters,
} from "./migration.types";
import { _addErrorToReport } from "./_addErrorToReport";
import { _getMapOfFolderIds } from "./_getMapOfFolderIds";
import { _serializeError } from "./_serializeError";

/**
 * Returns a function which can be called to migrate the content of each widget.
 * The migration is meant to be done accordingly to the logic defined in `callback`.
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
  (callback: MigrateWidgetsCallback): void => {
    const widgetsContent =
      contentServer.children?.ui.children?.widgets.children?.content.children;
    const widgetsStructure =
      contentServer.children?.ui.children?.widgets.children?.structure!;

    const mapOfFolderIds = _getMapOfFolderIds(widgetsStructure);

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

        _addErrorToReport(errorReport, {
          legacyContent: widgetsContent,
          mapOfFolderIds,
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
          content: JSON.stringify(_omit(migratedWidget, ["name"])),
        },
      };
    }
  };
