import { ContentRecord } from "@activeviam/activeui-sdk-5.1";
import { produce } from "immer";

/**
 * Returns a new `legacyUIFolder` with the given `legacyBookmarksToAdd` added.
 * Useful for creating legacyUIFolders for tests.
 * Does not mutate `legacyUIFolder`.
 */
export function addLegacyBookmarkToUIFolder(
  legacyUIFolder: ContentRecord,
  legacyBookmarksToAdd: { [id: string]: any },
): ContentRecord<any, "response"> {
  const content = legacyUIFolder.children?.bookmarks.children?.content;
  const structure = legacyUIFolder.children?.bookmarks.children?.structure;

  if (!content || !structure) {
    throw new Error(
      "Expected `legacyUIFolder` to contain the `content` and `structure` properties. Please ensure these properties exist",
    );
  }

  return produce(legacyUIFolder, (draftFolder) => {
    const existingBookmarks =
      draftFolder.children!.bookmarks.children!.content!.children || {};

    // Add the bookmark content
    draftFolder.children!.bookmarks.children!.content!.children = {
      ...existingBookmarks,
      ...legacyBookmarksToAdd,
    };

    const keysOfBookmarksToAdd = Object.keys(legacyBookmarksToAdd);

    const bookmarkStructureToAdd = keysOfBookmarksToAdd.reduce(
      (acc: { [key: string]: ContentRecord }, key: string) => {
        acc[key] = {
          entry: {
            isDirectory: true,
            owners: [],
            readers: [],
            timestamp: 1607879735685,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        };
        return acc;
      },
      {},
    );

    const existingStructure =
      draftFolder.children!.bookmarks.children!.structure!.children || {};

    // Add the bookmark structure
    draftFolder.children!.bookmarks.children!.structure!.children = {
      ...existingStructure,
      ...bookmarkStructureToAdd,
    };
  });
}
