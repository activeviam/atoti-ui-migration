import { ContentRecord } from "@activeviam/activeui-sdk-5.0";
import { DataModel } from "@activeviam/activeui-sdk-5.1";
import { WidgetFlaggedForRemovalError } from "./WidgetFlaggedForRemovalError";
import {
  BehaviorOnError,
  ErrorReport,
  MigrateWidgetCallback,
  OutcomeCounters,
} from "./migration.types";
import { _addErrorToReport } from "./_addErrorToReport";
import { _getFilesAncestry } from "./_getFilesAncestry";
import { _serializeError } from "./_serializeError";
import { _getMetaData } from "./_getMetaData";
import { produce } from "immer";
import { _addCorruptFileErrorToReport } from "./_addCorruptFileErrorToReport";

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
export const getMigrateSavedWidgets =
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
      behaviorOnError: BehaviorOnError;
    },
  ) =>
  <
    FromSerializedWidgetState,
    FromWidgetState,
    ToWidgetState,
    ToSerializedWidgetState,
  >(
    deserialize: (state: FromSerializedWidgetState) => FromWidgetState,
    callback: MigrateWidgetCallback<FromWidgetState, ToWidgetState>,
    serialize: (state: ToWidgetState) => ToSerializedWidgetState,
  ): void => {
    const { content, structure } =
      contentServer.children?.ui.children?.widgets.children ?? {};

    if (!content?.children || !structure?.children || !originalContent) {
      return;
    }

    const filesAncestry = _getFilesAncestry(structure);

    for (const fileId in content.children) {
      if (errorReport.widgets?.[fileId] && behaviorOnError !== "keep-going") {
        return;
      }

      if (!filesAncestry[fileId]) {
        counters.dashboards.removed++;
        _addCorruptFileErrorToReport(errorReport, {
          contentType: "widgets",
          fileId,
        });
        continue;
      }

      const { entry } = content.children[fileId];
      const widget = JSON.parse(entry.content);

      const folderName = filesAncestry[fileId].map(({ name }) => name);
      const folderId = filesAncestry[fileId].map(({ id }) => id);
      const metadata = _getMetaData(structure, folderId, fileId);

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
        delete content.children[fileId];
        const parentFolder = folderId.reduce(
          (acc, id) => acc.children![id],
          structure,
        );
        delete parentFolder.children![fileId];
        continue;
      }

      try {
        const deserializedWidget = deserialize(widget);
        const deserializedMigratedWidget = produce(
          deserializedWidget,
          (draft) =>
            callback(draft as FromWidgetState, {
              dataModels,
            }),
        );
        // It is the responsibility of `callback` to mutate a `FromWidgetState` into a `ToWidgetState`.
        const migratedWidget = serialize(
          deserializedMigratedWidget as ToWidgetState,
        );

        // The widget was successfully migrated.
        content.children![fileId].entry.content =
          JSON.stringify(migratedWidget);
        counters.widgets.success++;
      } catch (error) {
        // The widget could not be migrated.
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
          name: metadata.name!,
        });

        if (behaviorOnError === "keep-original") {
          // All widgets that are in `content` were initially in `originalContent`.
          content.children[fileId] = originalContent.children![fileId];
        }
      }
    }
  };
