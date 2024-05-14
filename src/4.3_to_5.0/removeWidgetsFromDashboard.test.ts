import {
  AWidgetState,
  deserializeDashboardState,
} from "@activeviam/activeui-sdk-5.0";
import { testDashboard } from "./__test_resources__/testDashboard";
import { removeWidgetsFromDashboard } from "./removeWidgetsFromDashboard";

describe("removeWidgetsFromDashboard", () => {
  it("removes the widgets identified by `keysOfLeavesToRemove` from the dashboard", () => {
    const keysOfWidgetsToRemove = ["filters"];
    const widgetPluginKeysInDashboard: string[] = [];
    const keysOfLeavesToRemove: {
      [pageKey: string]: string[];
    } = {};

    // Safeguard to make sure that the test makes sense: before checking that the key has been removed in the migrated dashboard, check that it's here in the first place in the legacy dashboard.
    Object.values(testDashboard.pages).forEach((page, index) => {
      const pageKey = `p-${index}`;
      Object.values(page.content).forEach((widget: AWidgetState) => {
        if (widgetPluginKeysInDashboard.includes(widget.widgetKey)) {
          keysOfLeavesToRemove[pageKey] = [
            ...(keysOfLeavesToRemove[pageKey] ?? []),
            widget.widgetKey,
          ];
        }
        widgetPluginKeysInDashboard.push(widget.widgetKey);
      });
    });

    expect(widgetPluginKeysInDashboard).toEqual(
      expect.arrayContaining(keysOfWidgetsToRemove),
    );

    const dashboardWithWidgetsRemoved = removeWidgetsFromDashboard(
      deserializeDashboardState(testDashboard),
      keysOfLeavesToRemove,
    );

    const widgetKeysInDashboardAfterRemoval: string[] = [];

    Object.values(dashboardWithWidgetsRemoved.pages).forEach((page) => {
      Object.values(page.content).forEach((widget) => {
        widgetKeysInDashboardAfterRemoval.push(widget.widgetKey);
      });
    });

    widgetKeysInDashboardAfterRemoval.forEach((widgetKey) =>
      expect(!keysOfWidgetsToRemove.includes(widgetKey)),
    );
  });
});
