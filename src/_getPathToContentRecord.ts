import { ContentRecord } from "@activeviam/activeui-sdk";

function accumulatePathToContentRecord({
  tree,
  id,
  path,
}: {
  tree: ContentRecord;
  id: string;
  path: string[];
}): string[] | undefined {
  if (tree.children) {
    for (const childId in tree.children) {
      const child = tree.children[childId];

      if (id === childId) {
        return path;
      } else {
        const foundInChild = accumulatePathToContentRecord({
          tree: child,
          id,
          path: [...path, childId],
        });

        if (foundInChild) {
          return foundInChild;
        }
      }
    }
  }

  return undefined;
}

/**
 * Returns the path to a given record.
 */
export function _getPathToContentRecord(
  tree: ContentRecord,
  id: string,
): string[] {
  const path = accumulatePathToContentRecord({ tree, id, path: [] });
  if (!path) {
    throw new Error(`Unable to get the path of content record "${id}"`);
  }

  return path;
}
