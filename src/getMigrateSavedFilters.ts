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
 * Returns a function which can be called to migrate ActiveUI 5+ filters.
 * The content of each filter is transformed using the `callback` argument.
 *
 * Some pieces of logic are encapsulated in order to make it easier for the caller:
 * - the logic of traversing and updating files in `/ui/filters`
 * - the error handling.
 *
 * Mutates `contentServer`, `counters`, `errorReport` and `idsOfFiltersToMigrate`.
 */
export const getMigrateSavedFilters =
  (
    contentServer: ContentRecord,
    {
      originalContentServer,
      idsOfFiltersToMigrate,
      dataModels,
      errorReport,
      counters,
      doesReportIncludeStacks,
      behaviorOnError = "keep-original",
    }: {
      originalContentServer: ContentRecord;
      idsOfFiltersToMigrate: Set<string>;
      dataModels: { [serverKey: string]: DataModel };
      errorReport: ErrorReport;
      counters: OutcomeCounters;
      doesReportIncludeStacks: boolean;
      behaviorOnError?: BehaviorOnError;
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
    const originalContent =
      originalContentServer.children?.ui.children?.filters.children?.content;

    if (!content?.children || !structure?.children) {
      return;
    }

    const filesAncestry = _getFilesAncestry(structure);

    for (const fileId in content.children) {
      if (idsOfFiltersToMigrate.has(fileId)) {
        if (!filesAncestry[fileId]) {
          counters.dashboards.removed++;
          _addCorruptFileErrorToReport(errorReport, {
            contentType: "filters",
            fileId,
          });
          continue;
        }

        const { entry } = content.children[fileId];
        const filter = JSON.parse(entry.content);

        const folderName = filesAncestry[fileId].map(({ name }) => name);
        const folderId = filesAncestry[fileId].map(({ id }) => id);
        const metadata = _getMetaData(structure, folderId, fileId);

        let migratedFilter;

        try {
          const deserializedFilter = deserialize(filter);
          const deserializedMigratedFilter = produce(
            deserializedFilter,
            (draft) => callback(draft as FromFilterState, { dataModels }),
          );
          // It is the responsibility of `callback` to mutate a `FromFilterState` into a `ToFilterState`.
          migratedFilter = serialize(
            deserializedMigratedFilter as ToFilterState,
          );

          // The filter was successfully migrated.
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
          });

          switch (behaviorOnError) {
            case "keep-last-successful-version":
              migratedFilter = filter;
              idsOfFiltersToMigrate.delete(fileId);
              break;
            case "keep-going":
              migratedFilter = filter;
              break;
            // The default behavior is "keep-original".
            default:
              // All filters that are in `content` were initially in `originalContent`.
              migratedFilter = originalContent!.children![fileId].entry;
              idsOfFiltersToMigrate.delete(fileId);
          }
        }

        content.children![fileId].entry.content =
          JSON.stringify(migratedFilter);
      }
    }
  };
