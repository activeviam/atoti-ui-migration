import _omit from "lodash/omit";
import _range from "lodash/range";
import { produce } from "immer";

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
} from "@activeviam/activeui-sdk";
import { _flattenLayout, _convertFromLegacyLayout } from "./_flattenLayout";
import { migrateWidget } from "./migrateWidget";

import type {
  LegacyDashboardState,
  LegacyDashboardPage,
  DashboardErrorReport,
} from "./migration.types";
import { isLegacyLayoutLeaf } from "./isLegacyLayoutLeaf";
import { _migrateContextValues } from "./_migrateContextValues";
import { _getLegacyWidgetPluginKey } from "./_getLegacyWidgetPluginKey";
import { _serializeError } from "./_serializeError";

/**
 * Returns the converted dashboard state, ready to be used in ActiveUI 5.
 * Specifically:
 *    Flattens value and value.body.
 *    Transforms pages contents from arrays to map, to make access to pages and pages state faster.
 *    Transform the pages layouts from a binary tree into a tree of minimal depth, making widgets resizing more natural.
 *
 * Widgets with keys in `keysOfWidgetPluginsToRemove` are not migrated: they are removed from the output ActiveUI 5 dashboard, and the layout is adapted so that siblings take the remaining space.
 */
export function migrateDashboard(
  legacyDashboardState: LegacyDashboardState,
  {
    servers,
    keysOfWidgetPluginsToRemove,
    doesReportIncludeStacks,
  }: {
    servers: { [serverKey: string]: { dataModel: DataModel; url: string } };
    keysOfWidgetPluginsToRemove?: string[];
    doesReportIncludeStacks?: boolean;
  },
): [DashboardState<"serialized">, DashboardErrorReport?] {
  const pages: { [pageKey: string]: DashboardPageState<"serialized"> } = {};
  const body = legacyDashboardState.value.body;
  const errorReport: DashboardErrorReport = {
    pages: {},
  };
  const keysOfLeavesToRemove: {
    [pageKey: string]: string[];
  } = {};

  body.pages.forEach((legacyPage: LegacyDashboardPage, index: number) => {
    const pageKey = `p-${index}`;
    const content: DashboardPageState<"serialized">["content"] = {};
    legacyPage.content.forEach((widget) => {
      const dashboardLeafKey = widget.key;
      const widgetPluginKey = _getLegacyWidgetPluginKey(widget.bookmark);
      if (keysOfWidgetPluginsToRemove?.includes(widgetPluginKey)) {
        keysOfLeavesToRemove[pageKey] = [
          ...(keysOfLeavesToRemove[pageKey] ?? []),
          dashboardLeafKey,
        ];
      } else {
        let migratedWidget: AWidgetState<"serialized"> | undefined = undefined;
        try {
          migratedWidget = migrateWidget(widget.bookmark, servers);
        } catch (error) {
          migratedWidget = {
            ...widget.bookmark.value.body,
            name: widget.bookmark.name,
            widgetKey: widgetPluginKey,
          };

          if (!errorReport.pages[pageKey]) {
            errorReport.pages[pageKey] = {
              pageName: legacyPage.name,
              widgets: {},
            };
          }
          errorReport.pages[pageKey].widgets[dashboardLeafKey] = {
            widgetName: widget.bookmark.name,
            error: _serializeError(error, { doesReportIncludeStacks }),
          };
        }
        if (migratedWidget) {
          content[dashboardLeafKey] = migratedWidget;
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

    pages[pageKey] = page;
  });

  const dashboard: DashboardState<"serialized"> = {
    name: legacyDashboardState.name,
    pages,
    pagesOrder: _range(body.pages.length).map((i) => `p-${i}`),
    filters: Object.values(body.filters || {}).flat(),
    queryContext: _migrateContextValues(body.contextValues),
  };

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
