import _omit from "lodash/omit";
import _range from "lodash/range";
import { produce } from "immer";
import _isEmpty from "lodash/isEmpty";

import {
  DashboardState,
  DashboardPageState,
  DataModel,
  removeWidget,
  deserializeDashboardState,
  getLayoutPath,
  serializeDashboardState,
  Layout,
  AWidgetState,
} from "@activeviam/activeui-sdk-5.0";
import { _flattenLayout, _convertFromLegacyLayout } from "./_flattenLayout";
import { migrateWidget } from "./migrateWidget";

import type {
  LegacyDashboardState,
  LegacyDashboardPage,
} from "./migration.types";
import { PartialDashboardErrorReport } from "../migration.types";
import { isLegacyLayoutLeaf } from "./isLegacyLayoutLeaf";
import { _migrateContextValues } from "./_migrateContextValues";
import { _getLegacyWidgetPluginKey } from "./_getLegacyWidgetPluginKey";
import { PartialMigrationError } from "../PartialMigrationError";
import { WidgetFlaggedForRemovalError } from "../WidgetFlaggedForRemovalError";
import { _addWidgetErrorToReport } from "../_addWidgetErrorToReport";
import { isDisconnectedWidget } from "./isDisconnectedWidget";

/**
 * Returns the converted dashboard state, ready to be used in ActiveUI 5, and an optional error report if any occured on any of the dashboard's widgets.
 * Specifically:
 *    Flattens value and value.body.
 *    Transforms pages contents from arrays to map, to make access to pages and pages state faster.
 *    Transform the pages layouts from a binary tree into a tree of minimal depth, making widgets resizing more natural.
 *
 * Widgets with keys in `keysOfWidgetPluginsToRemove` are not migrated: they are removed from the output ActiveUI 5 dashboard, and the layout is adapted so that siblings take the remaining space.
 *
 * The error report omits `folderId` and `folderName`: these are populated by the caller.
 */
export function migrateDashboard(
  legacyDashboardState: LegacyDashboardState,
  {
    servers,
    keysOfWidgetPluginsToRemove,
    doesReportIncludeStacks,
    shouldUpdateFiltersMdx,
    treeTableColumnWidth,
  }: {
    servers: { [serverKey: string]: { dataModel: DataModel; url: string } };
    keysOfWidgetPluginsToRemove?: string[];
    doesReportIncludeStacks?: boolean;
    shouldUpdateFiltersMdx: boolean;
    treeTableColumnWidth?: [number, number];
  },
): [DashboardState<"serialized">, PartialDashboardErrorReport?] {
  const pages: { [pageKey: string]: DashboardPageState<"serialized"> } = {};
  const keysOfDisconnectedWidgets: { [pageKey: string]: Set<string> } = {};
  const body = legacyDashboardState.value.body;
  const errorReport: PartialDashboardErrorReport = {
    name: legacyDashboardState.name,
    pages: {},
  };
  const keysOfLeavesToRemove: {
    [pageKey: string]: string[];
  } = {};

  body.pages.forEach((legacyPage: LegacyDashboardPage, index: number) => {
    const pageKey = `p-${index}`;
    const content: DashboardPageState<"serialized">["content"] = {};
    const keysOfPageDisconnectedWidgets = new Set<string>();

    legacyPage.content.forEach((widget) => {
      const leafKey = widget.key;
      const widgetPluginKey = _getLegacyWidgetPluginKey(widget.bookmark);
      if (keysOfWidgetPluginsToRemove?.includes(widgetPluginKey)) {
        keysOfLeavesToRemove[pageKey] = [
          ...(keysOfLeavesToRemove[pageKey] ?? []),
          leafKey,
        ];
        // Necessary for the `removeWidget` function called below to work correctly.
        content[leafKey] = {};
        _addWidgetErrorToReport(
          errorReport,
          new WidgetFlaggedForRemovalError(widgetPluginKey),
          {
            doesReportIncludeStacks,
            leafKey,
            pageKey,
            pageName: legacyPage.name,
            widgetName: widget.bookmark.name,
          },
        );
      } else {
        let migratedWidget: AWidgetState<"serialized"> | undefined = undefined;
        try {
          migratedWidget = migrateWidget(widget.bookmark, {
            servers,
            treeTableColumnWidth,
            shouldUpdateFiltersMdx,
          });
          if (isDisconnectedWidget(widget.bookmark)) {
            keysOfPageDisconnectedWidgets.add(leafKey);
          }
        } catch (error) {
          if (error instanceof PartialMigrationError) {
            migratedWidget = error.migratedWidgetState;
          } else {
            migratedWidget = {
              ...widget.bookmark.value.body,
              name: widget.bookmark.name,
              widgetKey: widgetPluginKey,
            };
          }
          _addWidgetErrorToReport(errorReport, error, {
            doesReportIncludeStacks,
            leafKey,
            pageKey,
            pageName: legacyPage.name,
            widgetName: widget.bookmark.name,
          });
        }

        if (migratedWidget) {
          content[leafKey] = migratedWidget;
        }
      }
    });

    const legacyLayout = legacyPage.layout;
    let pageLayout: Layout;

    // In ActiveUI 4, the root of a dashboard can be a leaf.
    // This does not happen in ActiveUI 5.
    if (isLegacyLayoutLeaf(legacyLayout)) {
      pageLayout = {
        children: [
          {
            leafKey: legacyLayout.ck,
            size: 1,
          },
        ],
        direction: "row",
      };
    } else {
      const convertedLayout = _convertFromLegacyLayout(legacyLayout);
      _flattenLayout(convertedLayout);
      pageLayout = convertedLayout as Layout;
    }

    const page: DashboardPageState<"serialized"> = {
      ..._omit(legacyPage, ["content"]),
      content,
      layout: pageLayout,
      filters: Object.values(legacyPage.filters || {}).flat(),
      queryContext: _migrateContextValues(legacyPage.contextValues),
    };

    if (keysOfPageDisconnectedWidgets.size > 0) {
      keysOfDisconnectedWidgets[pageKey] = keysOfPageDisconnectedWidgets;
    }
    pages[pageKey] = page;
  });

  const dashboard: DashboardState<"serialized"> = {
    name: legacyDashboardState.name,
    pages,
    pagesOrder: _range(body.pages.length).map((i) => `p-${i}`),
    filters: Object.values(body.filters || {}).flat(),
    queryContext: _migrateContextValues(body.contextValues),
  };

  // If the dashboard contains a disconnected widget, then move the dashboard filters down to every page.
  // If a given page contains a disconnected widget, then move the page filters down to every connected widget.
  if (!_isEmpty(keysOfDisconnectedWidgets)) {
    const dashboardFilters = dashboard.filters ?? [];
    delete dashboard.filters;

    Object.entries(pages).forEach(([pageKey, page]) => {
      page.filters = [...dashboardFilters, ...(page.filters ?? [])];
      if (
        keysOfDisconnectedWidgets[pageKey] &&
        keysOfDisconnectedWidgets[pageKey].size > 0
      ) {
        const pageFilters = page.filters;
        delete page.filters;

        Object.entries(page.content).forEach(([leafKey, widget]) => {
          if (!keysOfDisconnectedWidgets[pageKey].has(leafKey)) {
            widget.filters = [...pageFilters, ...(widget.filters ?? [])];
          }
        });
      }
    });
  }

  const deserializedDashboard = deserializeDashboardState(dashboard);

  const dashboardWithWidgetsRemoved = produce(
    deserializedDashboard,
    (draft) => {
      Object.keys(keysOfLeavesToRemove).forEach((pageKey) => {
        keysOfLeavesToRemove[pageKey].forEach((leafKey) => {
          const layoutPath = getLayoutPath(
            draft.pages[pageKey].layout,
            leafKey,
          );
          draft.pages[pageKey] = removeWidget({
            dashboardState: draft,
            layoutPath,
            leafKey,
            pageKey,
          }).pages[pageKey];
        });
      });
    },
  );

  return [
    serializeDashboardState(dashboardWithWidgetsRemoved),
    Object.keys(errorReport.pages).length > 0 ? errorReport : undefined,
  ];
}
