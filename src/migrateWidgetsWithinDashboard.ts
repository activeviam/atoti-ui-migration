import { DataModel, Layout, getLayoutPath } from "@activeviam/activeui-sdk-5.1";
import { _removeWidgetFromPage } from "@activeviam/dashboard-base-5.1";
import _forEach from "lodash/forEach";
import { MigrateWidgetCallback } from "./migration.types";
import { WidgetFlaggedForRemovalError } from "./WidgetFlaggedForRemovalError";

/**
 * Mutates `dashboardState` by calling `callback` on each underlying widget state.
 */
export function migrateWidgetsWithinDashboard<
  FromWidgetState extends { widgetKey: string; name: string },
  FromDashboardState extends {
    pages: {
      [pageKey: string]: {
        name: string;
        content: { [leafKey: string]: FromWidgetState };
        layout: Layout;
      };
    };
  },
>(
  dashboardState: FromDashboardState,
  callback: MigrateWidgetCallback<FromWidgetState, any>,
  {
    dataModels,
    keysOfWidgetPluginsToRemove,
    onError,
  }: {
    dataModels: { [serverKey: string]: DataModel };
    keysOfWidgetPluginsToRemove: string[];
    onError: (
      error: unknown,
      {
        pageKey,
        leafKey,
        pageName,
        widgetName,
      }: {
        pageKey: string;
        leafKey: string;
        pageName: string;
        widgetName: string;
      },
    ) => void;
  },
): void {
  _forEach(dashboardState.pages, (pageState, pageKey) => {
    _forEach(pageState.content, (widgetState, leafKey) => {
      try {
        if (keysOfWidgetPluginsToRemove?.includes(widgetState.widgetKey)) {
          const layoutPath = getLayoutPath(pageState.layout, leafKey);
          _removeWidgetFromPage(pageState, layoutPath, leafKey);
          throw new WidgetFlaggedForRemovalError(widgetState.widgetKey);
        }

        callback(widgetState, { dataModels });
      } catch (e) {
        onError(e, {
          pageKey,
          leafKey,
          pageName: pageState.name,
          widgetName: widgetState.name,
        });
      }
    });
  });
}
