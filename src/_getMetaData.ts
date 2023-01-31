import { AMetaData, WidgetMetaData } from "@activeviam/activeui-sdk-5.1";
import { ContentRecord } from "@activeviam/activeui-sdk-5.0";

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

  const metaData: MetaData = JSON.parse(metadataRecord.entry.content);

  if (metadataRecord.entry.content.type === "widget") {
    // After checking `type === "widget"` it is safe to cast as WidgetMetaData.
    // eslint-disable-next-line activeui/no-as
    const widgetMetaData = metaData as AMetaData as WidgetMetaData;

    if (widgetMetaData.version === undefined) {
      widgetMetaData.version = 1;
    }
  }
  return metaData;
}
