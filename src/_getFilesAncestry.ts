import { ContentRecord } from "@activeviam/activeui-sdk-5.0";

function addChildren(
  node: ContentRecord,
  path: { id: string; name: string }[],
  contentRecordToPath: { [id: string]: { id: string; name: string }[] },
) {
  if (node.children) {
    Object.entries(node.children).forEach(([id, child]) => {
      if (!id.endsWith("metadata")) {
        contentRecordToPath[id] = path;
        const name = JSON.parse(
          child.children?.[`${id}_metadata`].entry.content,
        ).name;
        addChildren(child, [...path, { id, name }], contentRecordToPath);
      }
    });
  }
}

/**
 * Iterates over `structure` and returns a map from file id to the ids and names of the parent folders of the file.
 */
export function _getFilesAncestry(structure: ContentRecord): {
  [fileId: string]: { id: string; name: string }[];
} {
  const mapOfFolderIds: { [id: string]: { id: string; name: string }[] } = {};

  addChildren(structure, [], mapOfFolderIds);

  return mapOfFolderIds;
}
