import { addLegacyBookmarkToUIFolder } from "./addLegacyBookmarkToUIFolder";
import { emptyLegacyUIFolder } from "./emptyLegacyUIFolder";
import { legacyInvalidDashboardBookmark } from "./legacyInvalidDashboardBookmark";

/**
 * The shortened version of the content of the /ui folder on a Content Server, useful for unit tests.
 * Contains an invalid dashboard whose id is numerical.
 */
export const smallLegacyUIFolderWithInvalidDashboard =
  addLegacyBookmarkToUIFolder(emptyLegacyUIFolder, {
    "158": legacyInvalidDashboardBookmark,
  });
