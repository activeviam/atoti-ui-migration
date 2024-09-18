import { addLegacyBookmarkToUIFolder } from "./addLegacyBookmarkToUIFolder";
import { emptyLegacyUIFolder } from "./emptyLegacyUIFolder";
import { legacyKpiWithInvalidTitle } from "./legacyKpiWithInvalidTitle";

/**
 * Legacy UI folder containing a single kpi bookmark with an invalid kpi title
 */
export const legacyUIFolderWithInvalidKpiTitle = addLegacyBookmarkToUIFolder(
  emptyLegacyUIFolder,
  {
    kpi: legacyKpiWithInvalidTitle,
  },
);
