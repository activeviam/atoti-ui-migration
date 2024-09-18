import { addLegacyBookmarkToUIFolder } from "./addLegacyBookmarkToUIFolder";
import { emptyLegacyUIFolder } from "./emptyLegacyUIFolder";
import { legacyDashboardBookmark } from "./legacyDashboardBookmark";

/**
 * The shortened version of the content of the /ui folder on a Content Server, useful for unit tests.
 */
export const smallLegacyUIFolder = addLegacyBookmarkToUIFolder(
  emptyLegacyUIFolder,
  { "158": legacyDashboardBookmark },
);
