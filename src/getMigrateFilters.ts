import { ContentRecord } from "@activeviam/activeui-sdk-5.0";
import { DataModel } from "@activeviam/activeui-sdk-5.1";
import { produce } from "immer";
import {
  ErrorReport,
  MigrateFilterCallback,
  OutcomeCounters,
} from "./migration.types";
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
 * Mutates `contentServer`, `counters` and `errorReport`.
 */
export const getMigrateFilters =
  (
    contentServer: ContentRecord,
    {
      dataModels,
      errorReport,
      counters,
      doesReportIncludeStacks,
    }: {
      dataModels: { [serverKey: string]: DataModel };
      errorReport: ErrorReport;
      counters: OutcomeCounters;
      doesReportIncludeStacks: boolean;
    },
  ) =>
  <FromFilterState, ToFilterState>(
    callback: MigrateFilterCallback<FromFilterState, ToFilterState>,
  ): void => {
    const filtersContent =
      contentServer.children?.ui.children?.filters.children?.content.children;
    const filtersStructure =
      contentServer.children?.ui.children?.filters.children?.structure!;
    const filesAncestry = _getFilesAncestry(filtersStructure);

    const migrateFilters = produce(callback);

    for (const fileId in filtersContent) {
      let migratedFilter;
      const { entry } = filtersContent[fileId];
      const filter = JSON.parse(entry.content);

      const folderName = filesAncestry[fileId].map(({ name }) => name);
      const folderId = filesAncestry[fileId].map(({ id }) => id);
      const metadata = _getMetaData(filtersStructure, folderId, fileId);

      try {
        migratedFilter = migrateFilters(filter, { dataModels });
        // The filter was fully migrated.
        counters.filters.success++;
      } catch (error) {
        // The filter could not be migrated at all.
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

        migratedFilter = filter;
      }

      filtersContent![fileId] = {
        entry: {
          ...entry,
          content: JSON.stringify(migratedFilter),
        },
      };
    }
  };