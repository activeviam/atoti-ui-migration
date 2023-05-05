import { ContentRecord } from "@activeviam/activeui-sdk-5.0";
import { DataModel } from "@activeviam/activeui-sdk-5.1";
import { produce } from "immer";
import {
  BehaviorOnError,
  ErrorReport,
  MigrateFilterCallback,
  OutcomeCounters,
} from "./migration.types";
import { _addCorruptFileErrorToReport } from "./_addCorruptFileErrorToReport";
import { _addErrorToReport } from "./_addErrorToReport";
import { _getFilesAncestry } from "./_getFilesAncestry";
import { _getMetaData } from "./_getMetaData";
import { _serializeError } from "./_serializeError";

/**
 * Returns a function which can be called to migrate Atoti UI 5+ filters.
 * The content of each filter is transformed using the `callback` argument.
 *
 * Some pieces of logic are encapsulated in order to make it easier for the caller:
 * - the logic of traversing and updating files in `/ui/filters`
 * - the error handling.
 *
 * Mutates `contentServer`, `counters` and `errorReport`.
 */
export const getMigrateSavedFilters =
  (
    contentServer: ContentRecord,
    {
      originalContent,
      dataModels,
      errorReport,
      counters,
      doesReportIncludeStacks,
      behaviorOnError,
      step,
    }: {
      originalContent: ContentRecord | undefined;
      dataModels: { [serverKey: string]: DataModel };
      errorReport: ErrorReport;
      counters: OutcomeCounters;
      doesReportIncludeStacks: boolean;
      behaviorOnError: BehaviorOnError;
      step: string;
    },
  ) =>
  <
    FromSerializedFilterState,
    FromFilterState,
    ToFilterState,
    ToSerializedFilterState,
  >(
    deserialize: (state: FromSerializedFilterState) => FromFilterState,
    callback: MigrateFilterCallback<FromFilterState, ToFilterState>,
    serialize: (state: ToFilterState) => ToSerializedFilterState,
  ): void => {
    const { content, structure } =
      contentServer.children?.ui.children?.filters.children ?? {};

    if (!content?.children || !structure?.children || !originalContent) {
      return;
    }

    const filesAncestry = _getFilesAncestry(structure);

    for (const fileId in content.children) {
      if (errorReport.filters?.[fileId] && behaviorOnError !== "keep-going") {
        return;
      }

      if (!filesAncestry[fileId]) {
        counters.filters.removed++;
        _addCorruptFileErrorToReport(errorReport, {
          contentType: "filters",
          fileId,
        });
        delete content.children[fileId];
        continue;
      }

      const { entry } = content.children[fileId];
      const filter = JSON.parse(entry.content);

      const folderName = filesAncestry[fileId].map(({ name }) => name);
      const folderId = filesAncestry[fileId].map(({ id }) => id);
      const metadata = _getMetaData(structure, folderId, fileId);

      try {
        const deserializedFilter = deserialize(filter);
        const deserializedMigratedFilter = produce(
          deserializedFilter,
          (draft) => callback(draft as FromFilterState, { dataModels }),
        );
        // It is the responsibility of `callback` to mutate a `FromFilterState` into a `ToFilterState`.
        const migratedFilter = serialize(
          deserializedMigratedFilter as ToFilterState,
        );

        // The filter was successfully migrated.
        content.children![fileId].entry.content =
          JSON.stringify(migratedFilter);
        counters.filters.success++;
      } catch (error) {
        // The filter could not be migrated.
        counters.filters.failed++;

        _addErrorToReport(errorReport, {
          folderName,
          folderId,
          contentType: "filters",
          fileErrorReport: {
            error: _serializeError(error, {
              doesReportIncludeStacks,
            }),
          },
          fileId,
          name: metadata.name!,
          step,
        });

        if (behaviorOnError === "keep-original") {
          // All filters that are in `content` were initially in `originalContent`.
          content.children[fileId] = originalContent.children![fileId];
        }
      }
    }
  };
