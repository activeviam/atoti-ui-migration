import { ContentRecord } from "@activeviam/activeui-sdk-5.0";

/**
 * Adds the ids and names of all the parents folders of `node`'s children to `accumulator`.
 * Recursively applies the same operation to each of the `node`'s children.
 * Mutates `accumulator`.
 */
function accumulateAncestry(
  node: ContentRecord,
  path: { id: string; name: string }[],
  accumulator: { [id: string]: { id: string; name: string }[] },
) {
  if (node.children) {
    Object.entries(node.children).forEach(([id, child]) => {
      if (!id.endsWith("metadata")) {
        accumulator[id] = path;
        const name = JSON.parse(
          child.children?.[`${id}_metadata`].entry.content,
        ).name;
        accumulateAncestry(child, [...path, { id, name }], accumulator);
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
  const filesAncestry: { [id: string]: { id: string; name: string }[] } = {};

  accumulateAncestry(structure, [], filesAncestry);

  return filesAncestry;
}
