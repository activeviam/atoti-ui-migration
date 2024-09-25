import { addLegacyBookmarkToUIFolder } from "./addLegacyBookmarkToUIFolder";
import { emptyLegacyUIFolder } from "./emptyLegacyUIFolder";
import { invalidLegacyWidgets } from "./invalidLegacyWidgets";
import { legacyPivotTableBookmark } from "./legacyPivotTableBookmark";

/**
 * Contains three legacy bookmark widgets.
 * 1. Widget with an invalid container container key.
 * 2. Widget with a filter on an invalid hierarchy.
 * 3. A valid widget.
 */
export const legacyUIFolderWithInvalidWidgets = addLegacyBookmarkToUIFolder(
  emptyLegacyUIFolder,
  { ...invalidLegacyWidgets, "777": legacyPivotTableBookmark },
);
