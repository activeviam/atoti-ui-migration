import _cloneDeep from "lodash/cloneDeep";
import _set from "lodash/set";
import _omit from "lodash/omit";

import { ContentRecord, DataModel, MdxString } from "@activeviam/activeui-sdk";
import { emptyUIFolder } from "@activeviam/content-server-initialization";

import { migrateDashboard } from "./migrateDashboard";
import { migrateWidget } from "./migrateWidget";
import { migrateFilter } from "./migrateFilter";
import { migrateSettingsFolder } from "./migrateSettingsFolder";
import { _getLegacyWidgetPluginKey } from "./_getLegacyWidgetPluginKey";
import { migrateCalculatedMeasures } from "./migrateCalculatedMeasures";
import {
  FileErrorReport,
  ErrorReport,
  MigrationReport,
} from "./migration.types";
import { _getFolderPathNames } from "./_getFolderPathNames";
import { _getMapOfFolderIds } from "./_getMapOfFolderIds";
import { _serializeError } from "./_serializeError";

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

const accumulateStructure = ({
  legacyUIFolder,
  migratedUIFolder,
  dashboards,
  widgets,
  filters,
  folders,
  path = [],
}: {
  legacyUIFolder: ContentRecord | undefined;
  migratedUIFolder: ContentRecord;
  dashboards: { [dashboardId: string]: any };
  widgets: { [widgetId: string]: any };
  filters: {
    [filterId: string]: {
      content: { mdx: MdxString };
      metaData: { name: string };
    };
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
      if (dashboards[id] !== undefined) {
        _ensureFolderExists({
          legacyRoot: legacyUIFolder.children?.bookmarks?.children?.structure!,
          migratedRoot:
            migratedUIFolder.children?.dashboards?.children?.structure!,
          folders,
          path,
        });
        const folder = _getFolder(migratedUIFolder, [
          "dashboards",
          "structure",
          ...path,
        ])!;
        folder.children![id] = {
          entry: record.children[id].entry,
          children: {
            [`${id}_metadata`]: {
              entry: {
                ...record.children[id].entry,
                content: JSON.stringify({ name: dashboards[id].name }),
              },
            },
          },
        };
      } else if (widgets[id] !== undefined) {
        _ensureFolderExists({
          legacyRoot: legacyUIFolder.children?.bookmarks?.children?.structure!,
          migratedRoot:
            migratedUIFolder.children?.widgets?.children?.structure!,
          folders,
          path,
        });
        const folder = _getFolder(migratedUIFolder, [
          "widgets",
          "structure",
          ...path,
        ])!;
        folder.children![id] = {
          entry: record.children[id].entry,
          children: {
            [`${id}_metadata`]: {
              entry: {
                ...record.children[id].entry,
                content: JSON.stringify({
                  name: widgets[id].name,
                  widgetKey: widgets[id].widgetKey,
                }),
              },
            },
          },
        };
      } else if (filters[id] !== undefined) {
        _ensureFolderExists({
          legacyRoot: legacyUIFolder.children?.bookmarks?.children?.structure!,
          migratedRoot:
            migratedUIFolder.children?.filters?.children?.structure!,
          folders,
          path,
        });
        const folder = _getFolder(migratedUIFolder, [
          "filters",
          "structure",
          ...path,
        ])!;
        folder.children![id] = {
          entry: record.children[id].entry,
          children: {
            [`${id}_metadata`]: {
              entry: {
                ...record.children[id].entry,
                content: JSON.stringify(filters[id].metaData),
              },
            },
          },
        };
      } else {
        accumulateStructure({
          legacyUIFolder,
          migratedUIFolder,
          dashboards,
          widgets,
          filters,
          folders,
          path: [...path, id],
        });
      }
    }
  }
};

/**
 * Returns the converted UI folder, ready to be used by ActiveUI 5.
 *
 * Widgets with keys in `keysOfWidgetPluginsToRemove` are not migrated:
 * - for a matching saved ActiveUI 4 widget, no ActiveUI 5 file is created.
 * - for a saved ActiveUI 4 dashboard including a matching widget, the widget is removed from the output ActiveUI 5 dashboard, and the layout is adapted so that siblings take the remaining space.
 */
export async function migrateUIFolder(
  legacyUIFolder: ContentRecord,
  {
    servers,
    keysOfWidgetPluginsToRemove,
    legacyPivotFolder,
    doesReportIncludeStacks,
  }: {
    servers: { [serverKey: string]: { dataModel: DataModel; url: string } };
    keysOfWidgetPluginsToRemove?: string[];
    doesReportIncludeStacks: boolean;
    legacyPivotFolder?: ContentRecord;
  },
): Promise<[ContentRecord, MigrationReport, ErrorReport?]> {
  const migratedUIFolder: ContentRecord = _cloneDeep(emptyUIFolder);
  const errorReport: ErrorReport = {};
  const migrationReport: MigrationReport = {
    dashboards: {
      success: 0,
      partial: 0,
      failed: 0,
      removed: 0,
    },
    widgets: {
      success: 0,
      partial: 0,
      failed: 0,
      removed: 0,
    },
    filters: {
      success: 0,
      partial: 0,
      failed: 0,
      removed: 0,
    },
  };

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

  const createFileErrorReport = (
    fileId: string,
    name: string,
    error: unknown,
  ): FileErrorReport => {
    const folderId = mapOfFolderIds[fileId];

    return {
      folderId,
      folderName: _getFolderPathNames(legacyContent, folderId),
      name,
      error: _serializeError(error, { doesReportIncludeStacks }),
    };
  };

  for (const fileId in legacyContent) {
    const { entry } = legacyContent[fileId];
    if (entry.content) {
      const bookmark = JSON.parse(entry.content);
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
          migrationReport.filters.success++;
        } catch (error) {
          migrationReport.filters.failed++;

          const filterErrorReport: FileErrorReport = createFileErrorReport(
            fileId,
            bookmark.name,
            error,
          );

          _set(errorReport, ["filters", fileId], filterErrorReport);
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
            _set(errorReport, ["dashboards", fileId], dashboardErrorReport);
            migrationReport.dashboards.partial++;
          } else {
            // The dashboard was fully migrated.
            migrationReport.dashboards.success++;
          }
        } catch (error) {
          // The dashboard could not be migrated at all.
          migrationReport.dashboards.failed++;
          _set(
            errorReport,
            ["dashboards", fileId],
            createFileErrorReport(fileId, bookmark.name, error),
          );
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
          migrationReport.widgets.removed++;
          continue;
        }

        let migratedWidget = undefined;
        try {
          migratedWidget = migrateWidget(bookmark, servers);
          migrationReport.widgets.success++;
        } catch (error) {
          migrationReport.widgets.failed++;
          // The migration failed.
          // The widget state is copied as-is.
          migratedWidget = {
            ...bookmark.value.body,
            name: bookmark.name,
            widgetKey: legacyWidgetPluginKey,
          };

          _set(
            errorReport,
            ["widgets", fileId],
            createFileErrorReport(fileId, bookmark.name, error),
          );
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

  accumulateStructure({
    legacyUIFolder,
    migratedUIFolder,
    dashboards,
    widgets,
    filters,
    folders,
  });

  migratedUIFolder.children = {
    ...migratedUIFolder.children,
    ...(legacyPivotFolder
      ? {
          calculated_measures: await migrateCalculatedMeasures(
            legacyPivotFolder,
          ),
        }
      : {}),
    ...migrateSettingsFolder(legacyUIFolder.children?.settings),
  };

  return [
    migratedUIFolder,
    migrationReport,
    Object.keys(errorReport).length > 0 ? errorReport : undefined,
  ];
}
