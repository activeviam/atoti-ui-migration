import { ContentRecord, WidgetMetaData } from "@activeviam/activeui-sdk-5.0";
import { _getFilesAncestry } from "../_getFilesAncestry";
import { _getMetaData } from "../_getMetaData";

/**
 * Ensures all the saved widgets metadata have a `version` attribute, set to 1 by default.
 * Mutates `contentServer`.
 */
export const migrateSavedWidgetsMetaData = (contentServer: ContentRecord) => {
  const { content: widgetContent, structure: widgetStructure } =
    contentServer.children?.ui.children?.widgets.children ?? {};

  for (const fileId in widgetContent.children) {
    const filesAncestry = _getFilesAncestry(widgetStructure);
    const pathToParentFolder = filesAncestry[fileId].map(({ id }) => id);
    const widgetMetaData = _getMetaData<WidgetMetaData>(
      widgetStructure,
      pathToParentFolder,
      fileId,
    );

    if (widgetMetaData.version === undefined) {
      widgetMetaData.version = 1;

      const metadataRecord = [
        ...pathToParentFolder,
        fileId,
        `${fileId}_metadata`,
      ].reduce((acc, id) => acc.children![id], widgetStructure);

      metadataRecord.entry.content = JSON.stringify(widgetMetaData);
    }
  }
};
