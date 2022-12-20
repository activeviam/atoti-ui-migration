import { AMetaData, ContentRecord } from "@activeviam/activeui-sdk-5.0";

/**
 * Returns the metadata of the file with id `fileId` under `structure`.
 */
export function _getMetaData<MetaData extends AMetaData = AMetaData>(
  structure: ContentRecord,
  pathToParentFolder: string[],
  fileId: string,
): MetaData {
  const metadataRecord = [
    ...pathToParentFolder,
    fileId,
    `${fileId}_metadata`,
  ].reduce((acc, id) => acc.children![id], structure);
  return JSON.parse(metadataRecord.entry.content);
}
