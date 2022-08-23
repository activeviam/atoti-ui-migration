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
 * Iterates over `structure` and returns a map of all record ids mapped to their path.
 */
export function _getContentRecordPaths(legacyStructure: ContentRecord): {
  [id: string]: string[];
} {
  const contentRecordToPath: { [id: string]: string[] } = {};

  addChildren(legacyStructure, [], contentRecordToPath);

  return contentRecordToPath;
}
