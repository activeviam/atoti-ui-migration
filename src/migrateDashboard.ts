import _omit from "lodash/omit";
import _range from "lodash/range";

import type {
  DashboardState,
  DashboardPageState,
  DataModel
} from "@activeviam/activeui-sdk";
import { _flattenLayout, _convertFromLegacyLayout } from "./_flattenLayout";
import { migrateWidget } from "./migrateWidget";

import type {
  LegacyDashboardState,
  LegacyDashboardPage,
} from "./migration.types";
import { isLegacyLayoutLeaf } from "./isLegacyLayoutLeaf";
import { _migrateContextValues } from "./_migrateContextValues";

/**
 * Returns the converted dashboard state, ready to be used in ActiveUI 5.
 * Specifically:
 *    Flattens value and value.body.
 *    Transforms pages contents from arrays to map, to make access to pages and pages state faster.
 *    Transform the pages layouts from a binary tree into a tree of minimal depth, making widgets resizing more natural.
 */
export function migrateDashboard(
  legacyDashboardState: LegacyDashboardState,
  servers: { [serverKey: string]: { dataModel: DataModel; url: string } },
): DashboardState<"serialized"> {
  const pages: { [pageKey: string]: DashboardPageState<"serialized"> } = {};
  const body = legacyDashboardState.value.body;

  body.pages.forEach((legacyPage: LegacyDashboardPage, index: number) => {
    const content = legacyPage.content.reduce(
      (acc, widget) => ({
        ...acc,
        [widget.key]: migrateWidget(widget.bookmark, servers),
      }),
      {},
    );
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
    pages[`p-${index}`] = page;
  });

  return {
    name: legacyDashboardState.name,
    pages,
    pagesOrder: _range(body.pages.length).map((i) => `p-${i}`),
    filters: Object.values(body.filters || {}).flat(),
    queryContext: _migrateContextValues(body.contextValues),
  };
}
