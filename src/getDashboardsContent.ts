import { ContentRecord } from "@activeviam/activeui-sdk-5.0";

/**
 * Returns the dashboards content from the `contentServer` of version `fromVersion`.
 */
export const getDashboardsContent = (
  contentServer: ContentRecord,
  fromVersion: string,
): ContentRecord | undefined => {
  let dashboardsContent;

  switch (fromVersion) {
    case "4.3":
      // In 4.3, all the types of contents are saved in the same flat "/ui/bookmarks/content" folder.
      dashboardsContent =
        contentServer.children?.ui.children?.bookmarks?.children?.content;
      break;
    default:
      dashboardsContent =
        contentServer.children?.ui.children?.dashboards.children?.content;
  }

  return dashboardsContent;
};
