import _cloneDeep from "lodash/cloneDeep";
import _set from "lodash/set";
import _omit from "lodash/omit";

import type {
  ContentRecord,
  DataModel,
  MdxString,
} from "@activeviam/activeui-sdk";
import { emptyUIFolder } from "@activeviam/content-server-initialization";

import { migrateDashboard } from "./migrateDashboard";
import { migrateWidget } from "./migrateWidget";
import { migrateFilter } from "./migrateFilter";
import { migrateSettingsFolder } from "./migrateSettingsFolder";
import { _getLegacyWidgetPluginKey } from "./_getLegacyWidgetPluginKey";
import { migrateCalculatedMeasures } from "./migrateCalculatedMeasures";
import {
  DashboardMigrationReport,
  MigrationErrorReport,
} from "./migration.types";

const _getFolder = (
  record: ContentRecord | undefined,
  path: string[]
): ContentRecord | undefined =>
  path.reduce<ContentRecord | undefined>(
    (acc, id) => acc?.children?.[id],
    record
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
          []
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
        }
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
  servers: { [serverKey: string]: { dataModel: DataModel; url: string } },
  keysOfWidgetPluginsToRemove?: string[],
  legacyPivotFolder?: ContentRecord
): Promise<[ContentRecord, MigrationErrorReport?]> {
  const migratedUIFolder: ContentRecord = _cloneDeep(emptyUIFolder);
  const migrationErrorReport: MigrationErrorReport = {};

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
    legacyUIFolder?.children?.bookmarks?.children?.content?.children;
  for (const id in legacyContent) {
    const { entry } = legacyContent[id];
    if (entry.content) {
      const bookmark = JSON.parse(entry.content);
      if (bookmark.type === "folder") {
        folders[id] = { name: bookmark.name };
      } else if (bookmark.type === "mdx") {
        try {
          const migratedFilter = migrateFilter(bookmark);
          filters[id] = migratedFilter;
          migratedUIFolder.children!.filters.children!.content.children![id] = {
            entry: {
              ...entry,
              content: JSON.stringify(migratedFilter.content),
            },
          };
        } catch (error) {
          if (!migrationErrorReport.filters) {
            migrationErrorReport.filters = {};
          }

          migrationErrorReport.filters[id] = {
            name: bookmark.name,
            // Even though errors can be anything in theory, in practice they are always expected to be instances of Error.
            errorStack: (error as Error).stack!.split("\n"),
          };
        }
      } else if (bookmark.value.containerKey === "dashboard") {
        let dashboardMigrationWarningReport:
          | DashboardMigrationReport
          | undefined = undefined;
        let dashboardMigrationErrorMessage: string[] | undefined = undefined;

        try {
          const [migratedDashboard, dashboardMigrationReport] =
            migrateDashboard(bookmark, servers, keysOfWidgetPluginsToRemove);
          dashboards[id] = migratedDashboard;
          dashboardMigrationWarningReport = dashboardMigrationReport;
          migratedUIFolder.children!.dashboards.children!.content.children![
            id
          ] = {
            entry: {
              ...entry,
              content: JSON.stringify(_omit(migratedDashboard, ["name"])),
            },
          };
        } catch (error) {
          // Even though errors can be anything in theory, in practice they are always expected to be instances of Error.
          dashboardMigrationErrorMessage = (error as Error).stack!.split("\n");
        }

        if (dashboardMigrationWarningReport || dashboardMigrationErrorMessage) {
          if (!migrationErrorReport.dashboards) {
            migrationErrorReport.dashboards = {};
          }

          migrationErrorReport.dashboards[id] =
            dashboardMigrationWarningReport || {
              name: bookmark.name,
              errorStack: dashboardMigrationErrorMessage,
            };
        }
      } else {
        try {
          if (
            keysOfWidgetPluginsToRemove?.includes(
              _getLegacyWidgetPluginKey(bookmark)
            )
          ) {
            continue;
          }

          const [migratedWidget, widgetMigrationWarning] = migrateWidget(
            bookmark,
            servers
          );
          if (widgetMigrationWarning) {
            _set(migrationErrorReport, ["widgets", id], {
              name: bookmark.name,
              warning: widgetMigrationWarning,
            });
          }
          widgets[id] = migratedWidget;
          migratedUIFolder.children!.widgets.children!.content.children![id] = {
            entry: {
              ...entry,
              content: JSON.stringify(
                _omit(migratedWidget, ["name", "widgetKey"])
              ),
            },
          };
        } catch (error) {
          // Even though errors can be anything in theory, in practice they are always expected to be instances of Error.
          const widgetMigrationErrorStack = (error as Error).stack!.split("\n");
          _set(migrationErrorReport, ["widgets", id], {
            name: bookmark.name,
            errorStack: widgetMigrationErrorStack,
          });
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
            legacyPivotFolder
          ),
        }
      : {}),
    ...migrateSettingsFolder(legacyUIFolder.children?.settings),
  };

  return [
    migratedUIFolder,
    Object.keys(migrationErrorReport).length > 0
      ? migrationErrorReport
      : undefined,
  ];
}
