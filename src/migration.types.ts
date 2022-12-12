import { DashboardState as DashboardState50 } from "@activeviam/activeui-sdk-5.0";
import { DashboardState as DashboardState51 } from "@activeviam/activeui-sdk-5.1";

/**
 * The count of migrated files, per migration outcome.
 */
export type OutcomeCounters = {
  [folderName in "dashboards" | "widgets" | "filters" | "folders"]: {
    [outcome in "success" | "partial" | "failed" | "removed"]: number;
  };
};

/**
 * A generic migration error report for a given file (e.g. a given dashboard, widget, filter, ...).
 */
export interface FileErrorReport {
  // The id of each parent folder, from the root down to the direct parent.
  folderId: string[];
  // The name of each parent folder, from the root down to the direct parent.
  folderName: string[];
  // The name of the file on which the error occurred.
  name: string;
  // The thrown error.
  error: {
    message: string;
    stack?: string[];
  };
}

/**
 * Report of errors that occurred during the migration of a dashboard.
 */
export interface DashboardErrorReport {
  name: string;
  pages: {
    [pageKey: string]: {
      pageName: string;
      widgets: {
        [leafKey: string]: {
          widgetName: string;
          error: {
            message: string;
            stack?: string[];
          };
        };
      };
    };
  };
}

/**
 * Report of errors that occurred during the migration of the /ui folder.
 * Output in `./report.json` if the user activates the `--debug` option.
 */
export interface ErrorReport {
  dashboards?: {
    [
      dashboardId: string
    ]: // If the error was thrown by `migrateDashboard` itself, not an underlying call to `migrateWidget`.
    // This should happen rarely.
    // In this case, the whole outdated dashboard is copied as is.
    | FileErrorReport
      // If the error was thrown by one or several underlying call(s) to `migrateWidget`.
      // This should happen more frequently.
      // In this case, the dashboard is migrated successfully, except for the widgets which threw errors.
      // These failing widgets are copied as is into the new dashboard.
      | DashboardErrorReport;
  };
  widgets?: {
    [widgetId: string]: FileErrorReport;
  };
  filters?: {
    [filterId: string]: FileErrorReport;
  };
  folders?: {
    [folderId: string]: FileErrorReport;
  };
}

type MigrateDashboards50To51 = (
  dashbaordState: DashboardState50,
) => DashboardState51;

/**
 * Callback containing the logic to migrate dashboards from one version to another.
 */
export type MigrateDashboardsCallback = MigrateDashboards50To51;
