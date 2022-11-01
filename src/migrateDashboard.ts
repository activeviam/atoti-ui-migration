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
import { PartialMigrationError } from "./errors/PartialMigrationError";
import { WidgetFlaggedForRemovalError } from "./errors/WidgetFlaggedForRemovalError";

/**
 * Adds `error` to `errorReport`, where `error` was thrown during the migration of a widget within the dashboard.
 * Mutates `errorReport`.
 */
function addWidgetErrorToReport(
  errorReport: DashboardErrorReport,
  error: unknown,
  {
    doesReportIncludeStacks,
    pageKey,
    leafKey,
    pageName,
    widgetName,
  }: {
    doesReportIncludeStacks?: boolean;
    pageKey: string;
    leafKey: string;
    pageName: string;
    widgetName: string;
  },
) {
  if (!errorReport.pages[pageKey]) {
    errorReport.pages[pageKey] = {
      pageName,
      widgets: {},
    };
  }
  errorReport.pages[pageKey].widgets[leafKey] = {
    widgetName,
    error: _serializeError(error, { doesReportIncludeStacks }),
  };
}

/*
    ensure that unexpected elements in the dashboard and page filter objects are removed, this will prevent avoidable migration failures
    Also keep track of what dashboards and pages have had this treatment
    It is expected that this treatment will have no negative impact because the unexpected elements would have been ignored by AUI4 anyway
    but keep track for customer's peace of mind
  */
const sanitiseFilters = (
  filters: any[],
  errorReport: DashboardErrorReport,
  {
    doesReportIncludeStacks,
    pageKey,
    pageName,
  }: {
    doesReportIncludeStacks?: boolean;
    pageKey: string;
    pageName: string;
  },
) => {
  const error: {
    message: string;
    stack?: string[];
  } = {
    message: "Incompatible filters were removed",
  };
  const rejectedFilters: string[] = [];
  const acceptedFilters = filters.filter((element) => {
    if (typeof element === "string") {
      return true;
    } else {
      rejectedFilters.push(
        typeof element === "object" ? JSON.stringify(element) : element,
      );
      return false;
    }
  });
  if (rejectedFilters.length > 0) {
    const sectionKey = pageKey;
    if (!errorReport.pages[sectionKey]) {
      errorReport.pages[sectionKey] = {
        pageName,
        widgets: {},
      };
    }

    if (doesReportIncludeStacks) error.stack = rejectedFilters;

    errorReport.pages[sectionKey].widgets[`All widgets in ${pageName}`] = {
      widgetName: "All widgets",
      error,
    };
  }
  return acceptedFilters;
};

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
  }: {
    servers: { [serverKey: string]: { dataModel: DataModel; url: string } };
    keysOfWidgetPluginsToRemove?: string[];
    doesReportIncludeStacks?: boolean;
  },
): [DashboardState<"serialized">, DashboardErrorReport?] {
  const pages: { [pageKey: string]: DashboardPageState<"serialized"> } = {};
  const body = legacyDashboardState.value.body;
  const errorReport: DashboardErrorReport = {
    name: legacyDashboardState.name,
    pages: {},
  };
  const keysOfLeavesToRemove: {
    [pageKey: string]: string[];
  } = {};

  body.pages.forEach((legacyPage: LegacyDashboardPage, index: number) => {
    const pageKey = `p-${index}`;
    const content: DashboardPageState<"serialized">["content"] = {};
    legacyPage.content.forEach((widget) => {
      const leafKey = widget.key;
      const widgetPluginKey = _getLegacyWidgetPluginKey(widget.bookmark);
      if (keysOfWidgetPluginsToRemove?.includes(widgetPluginKey)) {
        keysOfLeavesToRemove[pageKey] = [
          ...(keysOfLeavesToRemove[pageKey] ?? []),
          leafKey,
        ];
        addWidgetErrorToReport(
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
      }
      let migratedWidget: AWidgetState<"serialized"> | undefined = undefined;
      try {
        migratedWidget = migrateWidget(widget.bookmark, servers);
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
        addWidgetErrorToReport(errorReport, error, {
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
      filters: sanitiseFilters(
        Object.values(legacyPage.filters || {}).flat(),
        errorReport,
        {
          doesReportIncludeStacks,
          pageKey,
          pageName: legacyPage.name,
        },
      ),
      queryContext: _migrateContextValues(legacyPage.contextValues),
    };

    pages[pageKey] = page;
  });

  const dashboard: DashboardState<"serialized"> = {
    name: legacyDashboardState.name,
    pages,
    pagesOrder: _range(body.pages.length).map((i) => `p-${i}`),
    filters: sanitiseFilters(
      Object.values(body.filters || {}).flat(),
      errorReport,
      {
        doesReportIncludeStacks,
        pageKey: "Dashboard level warning",
        pageName: "All pages",
      },
    ),
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
