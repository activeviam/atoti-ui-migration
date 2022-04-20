import { DashboardState } from "@activeviam/activeui-sdk";

/**
 * Error thrown when trying to migrate a dashboard containing widget plugins that are not supported by default in ActiveUI 5.
 * It is useful to aggregate several {@link UnsupportedWidgetError} into a single error.
 */
export class UnsupportedWidgetsInDashboardError extends Error {
  /**
   * The dashboard name.
   */
  public readonly dashboardName: string;

  /**
   * The dashboard file id on the Content Server.
   */
  public readonly dashboardId?: string;

  /**
   * An optimistic ActiveUI5-compatible state of the ActiveUI 4 dashboard containing widget plugins whose migration failed because they are not supported by default in ActiveUI 5.
   */
  public readonly migratedStateOfDashboardWithUnsupportedWidgets?: DashboardState<"serialized">;

  constructor({
    dashboardName,
    dashboardId,
    migratedStateOfDashboardWithUnsupportedWidgets,
    unsupportedWidgets,
  }: {
    dashboardName: string;
    dashboardId?: string;
    migratedStateOfDashboardWithUnsupportedWidgets?: DashboardState<"serialized">;
    unsupportedWidgets: {
      [pageKey: string]: { [widgetPluginKey: string]: string[] };
    };
  }) {
    super(
      `Found unsupported widgets while migrating dashboard "${dashboardName}"${
        dashboardId ? ` (with id ${dashboardId})` : ""
      }:\n${JSON.stringify(
        unsupportedWidgets,
        null,
        2
      )}.\nThe widgets will be copied as is and will most likely not work in ActiveUI 5.\nAlternatively, you can use the --remove-widgets CLI option to remove them.`
    );
    this.dashboardName = dashboardName;
    this.dashboardId = dashboardId;
    this.migratedStateOfDashboardWithUnsupportedWidgets =
      migratedStateOfDashboardWithUnsupportedWidgets;
  }
}
