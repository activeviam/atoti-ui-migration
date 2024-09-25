import { addLegacyBookmarkToUIFolder } from "./addLegacyBookmarkToUIFolder";
import { emptyLegacyUIFolder } from "./emptyLegacyUIFolder";
import { legacyKpiWithInvalidTitle } from "./legacyKpiWithInvalidTitle";

/**
 * A legacy UI folder containing a single KPI bookmark with an invalid KPI title.
 * Useful for unit tests.
 */
export const legacyUIFolderWithInvalidKpiTitle = addLegacyBookmarkToUIFolder(
  emptyLegacyUIFolder,
  {
    kpi: legacyKpiWithInvalidTitle,
  },
);
