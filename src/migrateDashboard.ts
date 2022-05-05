import _omit from "lodash/omit";
import _range from "lodash/range";
import _reduce from "lodash/reduce";
import { produce } from "immer";

import {
  DashboardState,
  DashboardPageState,
  DataModel,
  removeWidget,
  deserializeDashboardState,
  getLayoutPath,
  serializeDashboardState,
} from "@activeviam/activeui-sdk";
import { _flattenLayout, _convertFromLegacyLayout } from "./_flattenLayout";
import { migrateWidget } from "./migrateWidget";

import type {
  LegacyDashboardState,
  LegacyDashboardPage,
} from "./migration.types";
import { isLegacyLayoutLeaf } from "./isLegacyLayoutLeaf";
import { _migrateContextValues } from "./_migrateContextValues";
import { _getLegacyWidgetPluginKey } from "./_getLegacyWidgetPluginKey";

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
  servers: { [serverKey: string]: { dataModel: DataModel; url: string } },
  keysOfWidgetPluginsToRemove?: string[]
): DashboardState<"serialized"> {
  const pages: { [pageKey: string]: DashboardPageState<"serialized"> } = {};
  const body = legacyDashboardState.value.body;

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
        content[dashboardLeafKey] = migrateWidget(widget.bookmark, servers);
      }
    });

    const page: DashboardPageState<"serialized"> = {
      ..._omit(legacyPage, ["content"]),
      content,
      // @ts-expect-error `layout` is filled up below.
      layout: undefined,
      filters: Object.values(legacyPage.filters || {}).flat(),
      queryContext: _migrateContextValues(legacyPage.contextValues),
    };
    const legacyLayout = legacyPage.layout;
    // In ActiveUI 4, the root of a dashboard can be a leaf.
    // This does not happen in ActiveUI 5.
    if (isLegacyLayoutLeaf(legacyLayout)) {
      page.layout = {
        children: [
          {
            leafKey: legacyLayout.ck,
            size: 1,
          },
        ],
        direction: "row",
      };
    } else {
      // @ts-expect-error: converting from one type to the other is difficult to express in TypeScript.
      page.layout = _convertFromLegacyLayout(legacyLayout);
      _flattenLayout(page.layout);
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

  const deserializedDashboard = deserializeDashboardState(dashboard);

  const dashboardWithWidgetsRemoved = produce(
    deserializedDashboard,
    (draft) => {
      draft.pagesOrder.forEach((pageKey) => {
        keysOfLeavesToRemove[pageKey].forEach((leafKey) => {
          const layoutPath = getLayoutPath(
            draft.pages[pageKey].layout,
            leafKey
          );
          draft.pages[pageKey] = removeWidget({
            dashboardState: draft,
            layoutPath,
            leafKey,
            pageKey,
          }).pages[pageKey];
        });
      });
    }
  );

  return serializeDashboardState(dashboardWithWidgetsRemoved);
}
