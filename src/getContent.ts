import _cloneDeep from "lodash/cloneDeep";
import { ContentRecord, ContentType } from "@activeviam/activeui-sdk-5.0";

/**
 * Returns the content of type `contentType` created with ActiveUI version `fromVersion` on `contentServer`.
 * Doesn't mutate `contentServer`.
 */
export const getContent = (
  contentServer: ContentRecord,
  contentType: ContentType,
  fromVersion: string,
): ContentRecord | undefined => {
  let content;

  switch (fromVersion) {
    case "4.3":
      // In 4.3, all the types of contents are saved in the same flat "/ui/bookmarks/content" folder.
      content = _cloneDeep(
        contentServer.children?.ui.children?.bookmarks?.children?.content,
      );
      break;
    default:
      content = _cloneDeep(
        contentServer.children?.ui.children?.[`${contentType}s`].children
          ?.content,
      );
  }

  return content;
};
