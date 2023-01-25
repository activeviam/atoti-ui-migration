import { ContentRecord } from "@activeviam/activeui-sdk-5.0";

/**
 * Returns the filters content from the `contentServer` of version `fromVersion`.
 */
export const getFiltersContent = (
  contentServer: ContentRecord,
  fromVersion: string,
): ContentRecord | undefined => {
  let filtersContent;

  switch (fromVersion) {
    case "4.3":
      // In 4.3, all the types of contents are saved in the same flat "/ui/bookmarks/content" folder.
      filtersContent =
        contentServer.children?.ui.children?.bookmarks?.children?.content;
      break;
    default:
      filtersContent =
        contentServer.children?.ui.children?.filters.children?.content;
  }

  return filtersContent;
};
