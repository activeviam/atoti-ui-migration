import { ContentRecord, DashboardState } from "@activeviam/activeui-sdk-5.2";
import { MigrationFunction } from "../migration.types";

/**
 * Removes the obsolete widgets from the content server's saved widgets.
 * Mutates `contentServer`.
 */
function removeObsoleteSavedWidgets(
  contentServer: ContentRecord,
  keysOfWidgetPluginsToRemove: string[],
) {
  let numberOfRemovedSavedWidgets = 0;
  const { content, structure } =
    contentServer.children?.ui.children?.widgets.children ?? {};

  if (!content || !structure || !structure.children || !content.children) {
    return numberOfRemovedSavedWidgets;
  }

  Object.entries(structure.children).forEach(
    ([id, widgetStructureFolderEntry]) => {
      if (!widgetStructureFolderEntry.children) {
        return;
      }

      const widgetMetaDataEntry =
        widgetStructureFolderEntry.children[`${id}_metadata`].entry;
      const widgetMetaDataContent = JSON.parse(widgetMetaDataEntry.content);
      if (
        keysOfWidgetPluginsToRemove.includes(widgetMetaDataContent.widgetKey)
      ) {
        delete content.children![id];
        delete structure.children![id];
        numberOfRemovedSavedWidgets++;
      }
    },
  );

  return numberOfRemovedSavedWidgets;
}

export const migrate_5x_to_6x: MigrationFunction<
  DashboardState<"serialized">,
  DashboardState<"deserialized">,
  DashboardState<"deserialized">,
  DashboardState<"serialized">
> = (
  contentServer,
  { migrateDashboards, keysOfWidgetPluginsToRemove, counters },
) => {
  counters.widgets.removed = removeObsoleteSavedWidgets(
    contentServer,
    keysOfWidgetPluginsToRemove,
  );

  migrateDashboards(
    (dash) => dash as unknown as DashboardState<"deserialized">,
    (dashboardState, { keysOfWidgetPluginsToRemove }) => {
      Object.values(dashboardState.pages).forEach((page) => {
        Object.entries(page.content).forEach(([leafKey, widget]) => {
          if (keysOfWidgetPluginsToRemove.includes(widget.widgetKey)) {
            delete page.content[leafKey];
            counters.widgets.removed++;
          }
        });
      });
    },
    (state) => state as unknown as DashboardState<"serialized">,
  );

  console.log(`Removed ${counters.widgets.removed} obsolete widgets.`);
};
