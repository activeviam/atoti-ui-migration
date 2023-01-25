import { ContentRecord } from "@activeviam/activeui-sdk-5.0";

/**
 * Returns the widgets content from the `contentServer` of version `fromVersion`.
 */
export const getWidgetsContent = (
  contentServer: ContentRecord,
  fromVersion: string,
): ContentRecord | undefined => {
  let widgetsContent;

  switch (fromVersion) {
    case "4.3":
      // In 4.3, all the types of contents are saved in the same flat "/ui/bookmarks/content" folder.
      widgetsContent =
        contentServer.children?.ui.children?.bookmarks?.children?.content;
      break;
    default:
      widgetsContent =
        contentServer.children?.ui.children?.widgets.children?.content;
  }

  return widgetsContent;
};
