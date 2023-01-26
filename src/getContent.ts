import { ContentRecord, ContentType } from "@activeviam/activeui-sdk-5.0";

/**
 * Returns the content of type `contentType` created with ActiveUI version `fromVersion` on `contentServer`.
 */
export const getContent = (
  contentType: ContentType,
  contentServer: ContentRecord,
  fromVersion: string,
): ContentRecord | undefined => {
  let content;

  switch (fromVersion) {
    case "4.3":
      // In 4.3, all the types of contents are saved in the same flat "/ui/bookmarks/content" folder.
      content =
        contentServer.children?.ui.children?.bookmarks?.children?.content;
      break;
    default:
      content =
        contentServer.children?.ui.children?.[`${contentType}s`].children
          ?.content;
  }

  return content;
};
