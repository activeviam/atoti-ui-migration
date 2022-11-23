import { ContentRecord, DashboardState } from "@activeviam/activeui-sdk-5.0";
import {
  DashboardErrorReport,
  ErrorReport,
  LegacyDashboardState,
  OutcomeCounters,
} from "./4.3_to_5.0/migration.types";
import _omit from "lodash/omit";
import { _getMapOfFolderIds } from "./4.3_to_5.0/_getMapOfFolderIds";
import _setWith from "lodash/setWith";
import { _getFolderName } from "./4.3_to_5.0/_getFolderName";
import { _serializeError } from "./4.3_to_5.0/_serializeError";

/**
 * Handles the generic logic to migrate dashboards, specifically the errors.
 * `cb` is a generic callback that is meant to handle dashboards migration from one specific version to another.
 * Mutates `migratedUIFolder`, `dashboards`, `counters` and `errorReport`.
 */
export const getMigrateDashboards = ({
  legacyUIFolder,
  migratedUIFolder,
  dashboards,
  counters,
  errorReport,
  doesReportIncludeStacks,
  cb,
}: {
  legacyUIFolder: ContentRecord;
  counters: OutcomeCounters;
  errorReport: ErrorReport;
  doesReportIncludeStacks: boolean;
  dashboards: { [dashboardId: string]: any };
  migratedUIFolder: ContentRecord;
  cb: (
    dashboard: LegacyDashboardState,
  ) => [DashboardState<"serialized">, DashboardErrorReport?];
}): void => {
  const legacyContent =
    legacyUIFolder?.children?.bookmarks?.children?.content?.children!;
  const legacyStructure =
    legacyUIFolder?.children?.bookmarks?.children?.structure!;

  const mapOfFolderIds = _getMapOfFolderIds(legacyStructure);

  for (const fileId in legacyContent) {
    let migratedDashboard;

    const { entry } = legacyContent[fileId];
    const bookmark = JSON.parse(entry.content);
    const folderId = mapOfFolderIds[fileId];

    if (bookmark.value.containerKey === "dashboard") {
      // Ignoring files that do not have a matching entry in `structure`.
      // These files are corrupted and already unreachable to the legacy application.
      if (mapOfFolderIds[fileId] === undefined) {
        counters.dashboards.removed++;

        _setWith(
          errorReport,
          ["dashboards", fileId],
          {
            name: bookmark.name,
            error: {
              message: "Could not find the entry in the structure folder.",
            },
          },
          Object,
        );
      }

      try {
        const [successfullyMigratedDashboard, dashboardErrorReport] =
          cb(bookmark);
        migratedDashboard = successfullyMigratedDashboard;
        if (dashboardErrorReport) {
          // The dashboard was migrated, but errors were thrown on some of its widgets.
          counters.dashboards.partial++;

          // `_set` would normally be used here, however `fileId` could be a numerical string that `_set` would interpret as an index in an array instead of an object key
          // see https://github.com/lodash/lodash/issues/3414#issuecomment-334655702
          // Using `_setWith` is the recommended workaround.
          _setWith(
            errorReport,
            ["dashboards", fileId],
            {
              folderId,
              folderName: _getFolderName(legacyContent, folderId),
              ...dashboardErrorReport,
            },
            Object,
          );
        } else {
          // The dashboard was fully migrated.
          counters.dashboards.success++;
        }
      } catch (error) {
        // The dashboard could not be migrated at all.
        counters.dashboards.failed++;

        // `_set` would normally be used here, however `fileId` could be a numerical string that `_set` would interpret as an index in an array instead of an object key
        // see https://github.com/lodash/lodash/issues/3414#issuecomment-334655702
        // Using `_setWith` is the recommended workaround.
        _setWith(
          errorReport,
          ["dashboards", fileId],
          {
            folderId,
            folderName: _getFolderName(legacyContent, folderId),
            name,
            error: _serializeError(error, {
              doesReportIncludeStacks,
            }),
          },
          Object,
        );
      }

      dashboards[fileId] = migratedDashboard;
      migratedUIFolder.children!.dashboards.children!.content.children![
        fileId
      ] = {
        entry: {
          ...entry,
          content: JSON.stringify(_omit(migratedDashboard, ["name"])),
        },
      };
    }
  }
};
