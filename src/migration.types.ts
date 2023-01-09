import { ContentRecord, DataModel } from "@activeviam/activeui-sdk-5.1";

/**
 * The count of migrated files, per migration outcome.
 */
export type OutcomeCounters = {
  [folderName in
    | "dashboards"
    | "widgets"
    | "filters"
    | "folders"
    | "calculated_measures"]: {
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

/**
 * A function that can be called to migrate a dashboard from one version to another.
 */
export type MigrateDashboardCallback<FromDashboardState, ToDashboardState> = (
  dashboardState: FromDashboardState,
  {
    dataModels,
    keysOfWidgetPluginsToRemove,
    onErrorWhileMigratingWidget,
  }: {
    dataModels: { [serverKey: string]: DataModel };
    keysOfWidgetPluginsToRemove: string[];
    onErrorWhileMigratingWidget: (
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
) => void | ToDashboardState;

/**
 * A function that can be called to migrate a widget from one version to another.
 */
export type MigrateWidgetCallback<FromWidgetState, ToWidgetState> = (
  widgetState: FromWidgetState,
  {
    dataModels,
  }: {
    dataModels: { [serverKey: string]: DataModel };
  },
) => void | ToWidgetState;

/**
 * A function that can be called to migrate a filter from one version to another.
 */
export type MigrateFilterCallback<FromFilterState, ToFilterState> = (
  filterState: FromFilterState,
  {
    dataModels,
  }: {
    dataModels: { [serverKey: string]: DataModel };
  },
) => void | ToFilterState;

export type MigrationFunction<
  FromDashboardState = any,
  ToDashboardState = any,
  FromWidgetState = any,
  ToWidgetState = any,
  FromFilterState = any,
  ToFilterState = any,
> = (
  contentServer: ContentRecord,
  {
    migrateDashboards,
    migrateSavedWidgets,
    migrateSavedFilters,
    dataModels,
    keysOfWidgetPluginsToRemove,
    errorReport,
    counters,
    doesReportIncludeStacks,
  }: {
    migrateDashboards: (
      callback: MigrateDashboardCallback<FromDashboardState, ToDashboardState>,
    ) => void;
    migrateSavedWidgets: (
      callback: MigrateWidgetCallback<FromWidgetState, ToWidgetState>,
    ) => void;
    migrateSavedFilters: (
      callback: MigrateFilterCallback<FromFilterState, ToFilterState>,
    ) => void;
    dataModels: {
      [serverKey: string]: DataModel;
    };
    keysOfWidgetPluginsToRemove: string[];
    errorReport: ErrorReport;
    counters: OutcomeCounters;
    doesReportIncludeStacks: boolean;
  },
) => void;

/**
 * The behavior when an error occurs during the migration of an item.
 * Assuming that the error occurred at step p out of a total of n:
 * - "keep-original": the item is kept untouched.
 * - "keep-last-successful-version": the item obtained after the first p-1 successful steps is kept, and the n-p remaining steps are not applied.
 * - "keep-going": the n-p remaining steps are applied to the corrupt item obtained after the p-th error step.
 */
export type BehaviorOnError =
  | "keep-original"
  | "keep-last-successful-version"
  | "keep-going";
