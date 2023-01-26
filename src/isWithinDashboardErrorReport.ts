import { DashboardErrorReport, FileErrorReport } from "./migration.types";

/**
 * Asserts whether `fileErrorReport` is a {@link DashboardErrorReport}.
 * Useful to determine whether a dashboard migration error is a partial error.
 */
export const isWithinDashboardErrorReport = (
  fileErrorReport: FileErrorReport | DashboardErrorReport,
): fileErrorReport is DashboardErrorReport => "pages" in fileErrorReport;
