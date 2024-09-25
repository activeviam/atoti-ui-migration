import { addLegacyBookmarkToUIFolder } from "./addLegacyBookmarkToUIFolder";
import { emptyLegacyUIFolder } from "./emptyLegacyUIFolder";
import { legacyInvalidFilterBookmark } from "./legacyInvalidFilterBookmark";

/**
 * The shortened version of the content of the /ui folder on a Content Server, useful for unit tests.
 * Contains an invalid filter.
 */
export const smallLegacyUIFolderWithInvalidFilter = addLegacyBookmarkToUIFolder(
  emptyLegacyUIFolder,
  { "158": legacyInvalidFilterBookmark },
);
