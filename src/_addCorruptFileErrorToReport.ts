import _setWith from "lodash/setWith";
import { ErrorReport } from "./migration.types";

/**
 * Reports that no entry matching `fileId` was found in the `/ui/${contentType}/structure` folder.
 */
export function _addCorruptFileToReport(
  errorReport: ErrorReport,
  {
    contentType,
    fileId,
    name,
  }: {
    contentType: "dashboards" | "widgets" | "filters" | "calculated_measures";
    fileId: string;
    name?: string;
  },
): void {
  // `_set` would normally be used here, however `fileId` could be a numerical string that `_set` would interpret as an index in an array instead of an object key
  // see https://github.com/lodash/lodash/issues/3414#issuecomment-334655702
  // Using `_setWith` is the recommended workaround.
  _setWith(
    errorReport,
    [contentType, fileId],
    {
      name,
      error: {
        message: `Content file /ui/${contentType}/content/${fileId} is corrupt as it does not have a matching file under /ui/${contentType}/structure.\n It will not be migrated.`,
      },
    },
    Object,
  );
}
