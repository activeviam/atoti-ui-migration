import { AMetaData, ContentRecord } from "@activeviam/activeui-sdk-5.0";

/**
 * Returns the metadata of a file under `structure`.
 */
export function _getMetaData<MetaData extends AMetaData = AMetaData>(
  structure: ContentRecord,
  pathToParentFolder: string[],
  id: string,
): MetaData {
  const parentFolder = pathToParentFolder.reduce(
    (acc, id) => acc.children![id],
    structure,
  );
  const metadataRecord = parentFolder.children![`${id}_metadata`];
  return JSON.parse(metadataRecord.entry.content);
}
