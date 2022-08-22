import type { MdxString } from "@activeviam/activeui-sdk";
import type { LegacyContextValues } from "./_migrateContextValues";

export interface LegacyLayoutLeaf {
  ck: string;
  size?: number;
}

export interface LegacyWidgetState {
  name: string;
  type: "container";
  value: {
    style?: any;
    showTitleBar?: boolean;
    body: any;
    containerKey: string;
  };
  writable?: boolean;
}

/**
 * Legacy dashboard page, supported for compatibility with ActiveUI 4.
 * The legacy part is that the content is an array and not a map (whereas we need to access the widgets it contains all the time).
 */
export interface LegacyDashboardPage {
  content: { bookmark: LegacyWidgetState; key: string }[];
  filters?: { [cubeName: string]: MdxString[] };
  contextValues?: { [cubeName: string]: LegacyContextValues };
  layout: LegacyLayout;
  name: string;
}

/**
 * ActiveUI 4 dashboard page layout.
 * The legacy part is that the tree is binary, leading to an unexpected resizing behaviour.
 */
export interface LegacyLayout {
  children: {
    [key: string]: LegacyLayout | LegacyLayoutLeaf;
  };
  direction: "column" | "row";
  size?: number;
}

/**
 * ActiveUI 4 dashboard state.
 */
export interface LegacyDashboardState {
  name: string;
  type: "container";
  value: {
    containerKey: "dashboard";
    showTitleBar: boolean;
    style: Record<string, unknown>;
    body: {
      pages: LegacyDashboardPage[];
      filters?: { [cubeName: string]: MdxString[] };
      contextValues?: { [cubeName: string]: LegacyContextValues };
    };
  };
  writable: boolean;
}

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

export interface DashboardMigrationReport {
  pages: {
    [pageKey: string]: {
      pageName: string;
      widgets: {
        [leafKey: string]: {
          widgetName: string;
          error: string;
        };
      };
    };
  };
}

export interface MigrationReport {
  dashboards?: {
    [
      dashboardId: string
    ]: // If the error was thrown by `migrateDashboard` itself, not an underlying call to `migrateWidget`.
    // This should happen rarely.
    | FileErrorReport
      // If the error was thrown by one or several underlying call(s) to `migrateWidget`.
      // This should happen more frequently.
      // In this case, the dashboard should be migrated succesfully, except for the widgets which threw errors.
      // These widgets should be copied as is into the new dashboard.
      | DashboardMigrationReport;
  };
  widgets?: {
    [widgetId: string]: FileErrorReport;
  };
  filters?: {
    [filterId: string]: FileErrorReport;
  };
}
