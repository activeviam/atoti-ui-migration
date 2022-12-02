import _cloneDeep from "lodash/cloneDeep";
import _set from "lodash/set";
import _setWith from "lodash/setWith";
import _omit from "lodash/omit";

import {
  ContentRecord,
  DataModel,
  MdxString,
} from "@activeviam/activeui-sdk-5.0";
import { emptyUIFolder } from "@activeviam/content-server-initialization-5.0";

import { migrateDashboard } from "./migrateDashboard";
import { migrateWidget } from "./migrateWidget";
import { migrateFilter } from "./migrateFilter";
import { migrateSettingsFolder } from "./migrateSettingsFolder";
import { _getLegacyWidgetPluginKey } from "./_getLegacyWidgetPluginKey";
import { migrateCalculatedMeasures } from "./migrateCalculatedMeasures";
import {
  ErrorReport,
  OutcomeCounters,
  DashboardErrorReport,
} from "./migration.types";
import { _getFolderName } from "./_getFolderName";
import { _getMapOfFolderIds } from "./_getMapOfFolderIds";
import { _serializeError } from "./_serializeError";
import { PartialMigrationError } from "./errors/PartialMigrationError";
import { WidgetFlaggedForRemovalError } from "./errors/WidgetFlaggedForRemovalError";
import cliProgress from "cli-progress";

const _getFolder = (
  record: ContentRecord | undefined,
  path: string[],
): ContentRecord | undefined =>
  path.reduce<ContentRecord | undefined>(
    (acc, id) => acc?.children?.[id],
    record,
  );

const _ensureFolderExists = ({
  legacyRoot,
  migratedRoot,
  folders,
  path,
}: {
  legacyRoot: ContentRecord;
  migratedRoot: ContentRecord;
  folders: { [folderId: string]: { name: string } };
  path: string[];
}) => {
  for (let i = 0; i < path.length; i++) {
    const pathToFolder = path.slice(0, i + 1);
    const folderId = path[i];
    const legacyFolder = _getFolder(legacyRoot, pathToFolder)!;
    const migratedFolder = _getFolder(migratedRoot, pathToFolder);
    if (migratedFolder === undefined) {
      _set(
        migratedRoot,
        pathToFolder.reduce<string[]>(
          (acc, id) => [...acc, "children", id],
          [],
        ),
        {
          entry: legacyFolder.entry,
          children: {
            [`${folderId}_metadata`]: {
              entry: {
                ...legacyFolder.entry,
                content: JSON.stringify({
                  name: folders[folderId].name,
                  isFolder: true,
                }),
              },
            },
          },
        },
      );
    }
  }
};

/**
 * Adds `metaData` in the structure folder of `contentType` in the migrated UI folder.
 * Mutates `migratedUIFolder`.
 */
function addMetaDataToStructureFolder({
  contentType,
  legacyUIFolder,
  migratedUIFolder,
  metaData,
  folders,
  path,
  record,
  id,
}: {
  contentType: "dashboards" | "widgets" | "filters";
  legacyUIFolder: ContentRecord;
  migratedUIFolder: ContentRecord;
  metaData: any;
  folders: { [folderId: string]: { name: string } };
  path: string[];
  record: ContentRecord<any> & {
    children: {
      [childName: string]: ContentRecord<any>;
    };
  };
  id: string;
}) {
  _ensureFolderExists({
    legacyRoot: legacyUIFolder.children?.bookmarks?.children?.structure!,
    migratedRoot:
      migratedUIFolder.children?.[contentType]?.children?.structure!,
    folders,
    path,
  });
  const folder = _getFolder(migratedUIFolder, [
    contentType,
    "structure",
    ...path,
  ])!;
  folder.children![id] = {
    entry: record.children[id].entry,
    children: {
      [`${id}_metadata`]: {
        entry: {
          ...record.children[id].entry,
          content: JSON.stringify(metaData),
        },
      },
    },
  };
}

const accumulateStructure = ({
  legacyUIFolder,
  migratedUIFolder,
  trees,
  folders,
  path = [],
}: {
  legacyUIFolder: ContentRecord | undefined;
  migratedUIFolder: ContentRecord;
  trees: {
    [contentType: string]: { [id: string]: any };
  };
  folders: { [folderId: string]: { name: string } };
  path?: string[];
}) => {
  const record = _getFolder(legacyUIFolder, [
    "bookmarks",
    "structure",
    ...path,
  ]);
  if (record && legacyUIFolder) {
    for (const id in record.children) {
      let wasMetaDataFound = false;

      for (const contentType of ["dashboards", "widgets", "filters"] as const) {
        if (trees[contentType][id]) {
          const metaData: any =
            contentType === "dashboards"
              ? { name: trees.dashboards[id].name }
              : contentType === "widgets"
              ? {
                  name: trees.widgets[id].name,
                  widgetKey: trees.widgets[id].widgetKey,
                }
              : trees.filters[id].metaData;

          addMetaDataToStructureFolder({
            contentType,
            legacyUIFolder,
            migratedUIFolder,
            metaData,
            folders,
            path,
            // The `children` attribute of `record` is necessarily defined, as it is being iterated over here.
            record: record as ContentRecord<any> & {
              children: { [childName: string]: ContentRecord<any> };
            },
            id,
          });

          wasMetaDataFound = true;
          break;
        }
      }

      if (!wasMetaDataFound) {
        accumulateStructure({
          legacyUIFolder,
          migratedUIFolder,
          trees,
          folders,
          path: [...path, id],
        });
      }
    }
  }
};

/**
 * Migrates `contentServer` from a version usable by ActiveUI 4.3 to one usable by ActiveUI 5.0.
 * Also keeps track of the number of migration successes and failures in `counters` and a detailed `errorReport`.
 *
 * Widgets with keys in `keysOfWidgetPluginsToRemove` are not migrated:
 * - for a matching saved ActiveUI 4.3 widget, no ActiveUI 5.0 file is created.
 * - for a saved ActiveUI 4.3 dashboard including a matching widget, the widget is removed from the output ActiveUI 5.0 dashboard, and the layout is adapted so that siblings take the remaining space.
 *
 * Mutates `contentServer`, `errorReport` and `counters`.
 */
export async function migrate_43_to_50(
  contentServer: ContentRecord,
  {
    errorReport,
    counters,
    servers,
    keysOfWidgetPluginsToRemove,
    doesReportIncludeStacks,
  }: {
    errorReport: ErrorReport;
    counters: OutcomeCounters;
    servers: { [serverKey: string]: { dataModel: DataModel; url: string } };
    keysOfWidgetPluginsToRemove?: string[];
    doesReportIncludeStacks: boolean;
  },
): Promise<void> {
  if (contentServer.children?.ui === undefined) {
    throw new Error(
      "Your content server doesn't contain any /ui folder.",
    );
  }

  const legacyUIFolder = _cloneDeep(contentServer.children.ui);
  const migratedUIFolder: ContentRecord = _cloneDeep(emptyUIFolder);

  const dashboards: { [dashboardId: string]: any } = {};
  const widgets: { [widgetId: string]: any } = {};
  const filters: {
    [filterId: string]: {
      content: { mdx: MdxString };
      metaData: { name: string };
    };
  } = {};

  const folders: { [folderId: string]: { name: string } } = {};

  const legacyContent =
    legacyUIFolder?.children?.bookmarks?.children?.content?.children!;
  const legacyStructure =
    legacyUIFolder?.children?.bookmarks?.children?.structure!;

  const mapOfFolderIds = _getMapOfFolderIds(legacyStructure);

  /**
   * Adds `fileErrorReport` in `contentType` within the full error report.
   */
  function addErrorToReport({
    contentType,
    fileId,
    name,
    fileErrorReport,
  }: {
    contentType: "dashboards" | "widgets" | "filters";
    fileErrorReport:
      | { error: { message: string; stack?: string[] } }
      | DashboardErrorReport;
    fileId: string;
    name: string;
  }) {
    const folderId = mapOfFolderIds[fileId];
    // `_set` would normally be used here, however `fileId` could be a numerical string that `_set` would interpret as an index in an array instead of an object key
    // see https://github.com/lodash/lodash/issues/3414#issuecomment-334655702
    // Using `_setWith` is the recommended workaround.
    _setWith(
      errorReport,
      [contentType, fileId],
      {
        folderId,
        folderName: _getFolderName(legacyContent, folderId),
        name,
        ...fileErrorReport,
      },
      Object,
    );
  }

  const numberOfFiles = Object.keys(legacyContent).length;

  const progressBar = new cliProgress.SingleBar({
    format: "Migrating files {bar} | {value}/{total}",
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
    stopOnComplete: true,
    clearOnComplete: true,
  });
  progressBar.start(numberOfFiles, 0);

  for (const fileId in legacyContent) {
    const { entry } = legacyContent[fileId];

    if (entry.content) {
      const bookmark = JSON.parse(entry.content);

      // Ignoring files that do not have a matching entry in `structure`.
      // These files are corrupted and already unreachable to the legacy application.
      if (mapOfFolderIds[fileId] === undefined) {
        const errorReportSection =
          bookmark.type === "folder"
            ? "folders"
            : bookmark.type === "mdx"
            ? "filters"
            : bookmark.value.containerKey === "dashboard"
            ? "dashboards"
            : "widgets";

        counters[errorReportSection].removed++;

        _setWith(
          errorReport,
          [errorReportSection, fileId],
          {
            name: bookmark.name,
            error: {
              message: "Could not find the entry in the structure folder.",
            },
          },
          Object,
        );
      } else {
        if (bookmark.type === "folder") {
          folders[fileId] = { name: bookmark.name };
        } else if (bookmark.type === "mdx") {
          try {
            const migratedFilter = migrateFilter(bookmark);
            filters[fileId] = migratedFilter;
            migratedUIFolder.children!.filters.children!.content.children![
              fileId
            ] = {
              entry: {
                ...entry,
                content: JSON.stringify(migratedFilter.content),
              },
            };
            counters.filters.success++;
          } catch (error) {
            counters.filters.failed++;

            filters[fileId] = {
              content: { mdx: "" },
              metaData: { name: bookmark.name },
            };

            migratedUIFolder.children!.filters.children!.content.children![
              fileId
            ] = {
              entry: {
                ...entry,
                content: JSON.stringify(bookmark),
              },
            };

            addErrorToReport({
              contentType: "filters",
              fileErrorReport: {
                error: _serializeError(error, { doesReportIncludeStacks }),
              },
              fileId,
              name: bookmark.name,
            });
          }
        } else if (bookmark.value.containerKey === "dashboard") {
          let migratedDashboard;

          try {
            const [successfullyMigratedDashboard, dashboardErrorReport] =
              migrateDashboard(bookmark, {
                servers,
                keysOfWidgetPluginsToRemove,
                doesReportIncludeStacks,
              });
            migratedDashboard = successfullyMigratedDashboard;
            if (dashboardErrorReport) {
              // The dashboard was migrated, but errors were thrown on some of its widgets.
              counters.dashboards.partial++;

              addErrorToReport({
                contentType: "dashboards",
                fileErrorReport: dashboardErrorReport,
                fileId,
                name: bookmark.name,
              });
            } else {
              // The dashboard was fully migrated.
              counters.dashboards.success++;
            }
          } catch (error) {
            // The dashboard could not be migrated at all.
            counters.dashboards.failed++;

            addErrorToReport({
              contentType: "dashboards",
              fileErrorReport: {
                error: _serializeError(error, {
                  doesReportIncludeStacks,
                }),
              },
              fileId,
              name: bookmark.name,
            });
            migratedDashboard = bookmark;
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
        } else {
          const legacyWidgetPluginKey = _getLegacyWidgetPluginKey(bookmark);
          if (keysOfWidgetPluginsToRemove?.includes(legacyWidgetPluginKey)) {
            // The widget's plugin key is flagged for removal.
            // Remove the widget instead of migrating it.
            counters.widgets.removed++;
            addErrorToReport({
              contentType: "widgets",
              fileErrorReport: {
                error: _serializeError(
                  new WidgetFlaggedForRemovalError(legacyWidgetPluginKey),
                  { doesReportIncludeStacks },
                ),
              },
              fileId,
              name: bookmark.name,
            });

            continue;
          }

          let migratedWidget = undefined;
          try {
            migratedWidget = migrateWidget(bookmark, servers);
            counters.widgets.success++;
          } catch (error) {
            if (error instanceof PartialMigrationError) {
              counters.widgets.partial++;
              migratedWidget = error.migratedWidgetState;
            } else {
              counters.widgets.failed++;
              // The migration failed.
              // The widget state is copied as-is.
              migratedWidget = {
                ...bookmark.value.body,
                name: bookmark.name,
                widgetKey: legacyWidgetPluginKey,
              };
            }
            addErrorToReport({
              contentType: "widgets",
              fileErrorReport: {
                error: _serializeError(error, { doesReportIncludeStacks }),
              },
              fileId,
              name: bookmark.name,
            });
          }

          if (migratedWidget) {
            widgets[fileId] = migratedWidget;
            migratedUIFolder.children!.widgets.children!.content.children![
              fileId
            ] = {
              entry: {
                ...entry,
                content: JSON.stringify(
                  _omit(migratedWidget, ["name", "widgetKey"]),
                ),
              },
            };
          }
        }
      }
    }
    progressBar.increment();
  }

  accumulateStructure({
    legacyUIFolder,
    migratedUIFolder,
    trees: {
      dashboards,
      widgets,
      filters,
    },
    folders,
  });

  const legacyPivotFolder = contentServer.children?.pivot;

  migratedUIFolder.children = {
    ...migratedUIFolder.children,
    ...(legacyPivotFolder
      ? {
          calculated_measures: await migrateCalculatedMeasures(
            legacyPivotFolder,
          ),
        }
      : {}),
    ...migrateSettingsFolder(legacyUIFolder?.children?.settings),
  };

  contentServer.children.ui = migratedUIFolder;
}
