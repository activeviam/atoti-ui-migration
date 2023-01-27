import {
  PartialDashboardErrorReport,
  FileErrorReport,
} from "./migration.types";

/**
 * Asserts whether `fileErrorReport` is a {@link PartialDashboardErrorReport}.
 * Partial dashboard errors are reported when the migration of a dashboard is successful as a whole, but the migration of some widgets within it failed.
 */
export const isPartialDashboardErrorReport = (
  fileErrorReport: FileErrorReport | PartialDashboardErrorReport,
): fileErrorReport is PartialDashboardErrorReport => "pages" in fileErrorReport;
