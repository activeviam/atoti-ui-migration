import { ContentRecord } from "@activeviam/activeui-sdk";

/**
 * Returns an array containing the names of each folder identified by their ids in `pathOfIds`.
 */
export function _getFolderPathNames(
  contentTree: { [childId: string]: ContentRecord },
  pathOfIds: string[],
): string[] {
  return pathOfIds.map((folderId) => {
    const folderContentEntry = contentTree?.[folderId]?.entry;

    if (!folderContentEntry) {
      throw new Error(
        `Unable to resolve names of folder for path "${pathOfIds.join(
          ",",
        )}". The folder of id "${folderId}" is missing a content entry`,
      );
    }

    return JSON.parse(folderContentEntry.content).name;
  });
}
