import _cloneDeep from "lodash/cloneDeep";
import { ContentRecord, ContentType } from "@activeviam/activeui-sdk-5.0";

/**
 * Returns a copy of the content of type `contentType` created with ActiveUI version `activeUIVersion` on `contentServer`.
 */
export const getContent = (
  contentServer: ContentRecord,
  contentType: ContentType,
  activeUIVersion: string,
): ContentRecord | undefined => {
  // In 4.3, all the types of contents are saved in the same flat "/ui/bookmarks/content" folder.
  const folderName =
    activeUIVersion === "4.3" ? "bookmarks" : `${contentType}s`;
  const content =
    contentServer.children?.ui?.children?.[folderName].children?.content;
  return _cloneDeep(content);
};
