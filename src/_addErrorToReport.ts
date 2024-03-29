import _setWith from "lodash/setWith";
import { PartialDashboardErrorReport, ErrorReport } from "./migration.types";

/**
 * Adds `fileErrorReport` in `contentType` within the full error report.
 */
export function _addErrorToReport(
  errorReport: ErrorReport,
  {
    contentType,
    folderId,
    folderName,
    fileId,
    name,
    fileErrorReport,
    step,
  }: {
    contentType: "dashboards" | "widgets" | "filters" | "calculated_measures";
    folderId: string[];
    folderName: string[];
    fileErrorReport:
      | { error: { message: string; stack?: string[] } }
      | PartialDashboardErrorReport;
    fileId: string;
    name: string;
    step: string;
  },
): void {
  // `_set` would normally be used here, however `fileId` could be a numerical string that `_set` would interpret as an index in an array instead of an object key
  // see https://github.com/lodash/lodash/issues/3414#issuecomment-334655702
  // Using `_setWith` is the recommended workaround.
  _setWith(
    errorReport,
    [contentType, fileId],
    {
      folderId,
      folderName,
      name,
      step,
      ...fileErrorReport,
    },
    Object,
  );
}
