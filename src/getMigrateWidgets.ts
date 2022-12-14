import { ContentRecord } from "@activeviam/activeui-sdk-5.0";
import {
  ErrorReport,
  MigrateFilterCallback,
  OutcomeCounters,
} from "./migration.types";
import { _addErrorToReport } from "./_addErrorToReport";
import { _getFilesAncestry } from "./_getFilesAncestry";
import { _serializeError } from "./_serializeError";

/**
 * Returns a function which can be called to migrate the content of each filter.
 * The migration is meant to be done accordingly to the logic defined in `callback`.
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
      errorReport,
      counters,
      doesReportIncludeStacks,
    }: {
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

    for (const fileId in filtersContent) {
      let migratedFilter;
      const { entry } = filtersContent[fileId];
      const filter = JSON.parse(entry.content);

      try {
        migratedFilter = callback(filter);
        // The filter was fully migrated.
        counters.filters.success++;
      } catch (error) {
        // The filter could not be migrated at all.
        counters.filters.failed++;

        const filesAncestry = _getFilesAncestry(filtersStructure);
        const folderName = filesAncestry[fileId].map(({ name }) => name);
        const folderId = filesAncestry[fileId].map(({ id }) => id);

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
          name: filter.name,
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
