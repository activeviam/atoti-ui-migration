import _cloneDeep from "lodash/cloneDeep";
import { ContentRecord, ContentType } from "@activeviam/activeui-sdk-5.0";

/**
 * Returns a copy of the content of type `contentType` created with Atoti UI version `atotiUIVersion` on `contentServer`.
 */
export const getContent = (
  contentServer: ContentRecord,
  contentType: ContentType,
  atotiUIVersion: string,
): ContentRecord | undefined => {
  // In 4.3, all the types of contents are saved in the same flat "/ui/bookmarks/content" folder.
  const folderName = atotiUIVersion === "4.3" ? "bookmarks" : `${contentType}s`;
  const content =
    contentServer.children?.ui?.children?.[folderName].children?.content;
  return _cloneDeep(content);
};
