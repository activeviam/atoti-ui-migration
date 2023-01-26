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
  // The version which the item was failed being migrated to.
  failVersion: string;
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
    // In this case, what happens to the whole outdated dashboard is decided by the BehaviorOnError chosen by the user.
    | FileErrorReport
      // If the error was thrown by one or several underlying call(s) to `migrateWidget`.
      // This should happen more frequently.
      // In this case, the dashboard is migrated successfully, except for the widgets which threw errors.
      // These failing widgets are copied as is into the new dashboard.
      | (Omit<FileErrorReport, "error"> & DashboardErrorReport);
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
 * It is called within {@link produce | https://immerjs.github.io/immer/produce}, so it can safely mutate its input `dashboardState`.
 */
export type MigrateDashboardCallback<
  FromDashboardState,
  ToDashboardState,
  Options extends Record<string, unknown> = Record<string, unknown>,
> = (
  dashboardState: FromDashboardState,
  args: {
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
  } & Options,
) => void | ToDashboardState;

/**
 * A function that can be called to migrate a widget from one version to another.
 */
export type MigrateWidgetCallback<
  FromWidgetState,
  ToWidgetState,
  Options extends Record<string, unknown> = Record<string, unknown>,
> = (
  widgetState: FromWidgetState,
  args: {
    dataModels: { [serverKey: string]: DataModel };
  } & Options,
) => void | ToWidgetState;

/**
 * A function that can be called to migrate a filter from one version to another.
 * It is called within {@link produce | https://immerjs.github.io/immer/produce}, so it can safely mutate its input `filterState`.
 */
export type MigrateFilterCallback<
  FromFilterState,
  ToFilterState,
  Options extends Record<string, unknown> = Record<string, unknown>,
> = (
  filterState: FromFilterState,
  args: {
    dataModels: { [serverKey: string]: DataModel };
  } & Options,
) => void | ToFilterState;

export type MigrationFunction<
  FromSerializedDashboardState = any,
  FromDashboardState = any,
  ToDashboardState = any,
  ToSerializedDashboardState = any,
  FromSerializedWidgetState = any,
  FromWidgetState = any,
  ToWidgetState = any,
  ToSerializedWidgetState = any,
  FromSerializedFilterState = any,
  FromFilterState = any,
  ToFilterState = any,
  ToSerializedFilterState = any,
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
      deserialize: (state: FromSerializedDashboardState) => FromDashboardState,
      callback: MigrateDashboardCallback<FromDashboardState, ToDashboardState>,
      serialize: (state: ToDashboardState) => ToSerializedDashboardState,
      toVersion: string,
    ) => void;
    migrateSavedWidgets: (
      deserialize: (state: FromSerializedWidgetState) => FromWidgetState,
      callback: MigrateWidgetCallback<FromWidgetState, ToWidgetState>,
      serialize: (state: ToWidgetState) => ToSerializedWidgetState,
      toVersion: string,
    ) => void;
    migrateSavedFilters: (
      deserialize: (state: FromSerializedFilterState) => FromFilterState,
      callback: MigrateFilterCallback<FromFilterState, ToFilterState>,
      serialize: (state: ToFilterState) => ToSerializedFilterState,
      toVersion: string,
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
 * This has an effect only when migrating through several versions in one go.
 *
 * For example, suppose that you're migrating from 5.0 to 5.3.
 * For each saved item (e.g. a dashboard), three migration steps are applied: 5.0 => 5.1, 5.1 => 5.2, and 5.2 => 5.3.
 * Each of these three steps might fail.
 *
 * More generically, assuming that the error occurred at step p out of a total of n, you can choose one of the following behaviors:
 * - "keep-original": keep the original item untouched, as before the whole migration.
 * - "keep-last-successful-version": keep the version of the item obtained after the first p-1 successful steps.
 * - "keep-going": try to apply the n-p remaining steps to the version of the item obtained after step p, despite the error. Note that the remaining steps are likely to fail too, and in that case the result will be the same as "keep-last-succesful-version".
 *
 * Defaults to "keep-original".
 */
export type BehaviorOnError =
  | "keep-original"
  | "keep-last-successful-version"
  | "keep-going";
