import { ContentRecord } from "@activeviam/activeui-sdk";

function addChildren(
  node: ContentRecord,
  path: string[],
  contentRecordToPath: { [id: string]: string[] },
) {
  if (node.children) {
    Object.entries(node.children).forEach(([id, child]) => {
      contentRecordToPath[id] = path;
      addChildren(child, [...path, id], contentRecordToPath);
    });
  }
}

/**
 * Iterates over `structure` and returns a map from file id to the ids of the parent folders of the file.
 */
export function _getMapOfFolderIds(structure: ContentRecord): {
  [fileId: string]: string[];
} {
  const mapOfFolderIds: { [id: string]: string[] } = {};

  addChildren(structure, [], mapOfFolderIds);

  return mapOfFolderIds;
}
