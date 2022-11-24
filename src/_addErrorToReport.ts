import { ContentRecord } from "@activeviam/activeui-sdk-5.0";
import _setWith from "lodash/setWith";
import { DashboardErrorReport, ErrorReport } from "./migration.types";
import { _getFolderName } from "./_getFolderName";

/**
 * Adds `fileErrorReport` in `contentType` within the full error report.
 */
export function _addErrorToReport(
  errorReport: ErrorReport,
  {
    contentType,
    legacyContent,
    mapOfFolderIds,
    fileId,
    name,
    fileErrorReport,
  }: {
    contentType: "dashboards" | "widgets" | "filters";
    legacyContent: {
      [childName: string]: ContentRecord<any>;
    };
    mapOfFolderIds: {
      [fileId: string]: string[];
    };
    fileErrorReport:
      | { error: { message: string; stack?: string[] } }
      | DashboardErrorReport;
    fileId: string;
    name: string;
  },
): void {
  const folderId = mapOfFolderIds[fileId];
  // `_set` would normally be used here, however `fileId` could be a numerical string that `_set` would interpret as an index in an array instead of an object key
  // see https://github.com/lodash/lodash/issues/3414#issuecomment-334655702
  // Using `_setWith` is the recommended workaround.
  _setWith(
    errorReport,
    [contentType, fileId],
    {
      folderId,
      folderName: _getFolderName(legacyContent, folderId),
      name,
      ...fileErrorReport,
    },
    Object,
  );
}
