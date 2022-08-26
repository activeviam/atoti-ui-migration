/**
 * Thrown when a legacy widget's key is flagged for removal by the CLI user, using the --remove-widgets option.
 * In this case, the widget is skipped and does not appear in the migrated UI folder.
 */
export class WidgetFlaggedForRemovalError extends Error {
  constructor(widgetPluginKey: string) {
    super(
      `The key of the widget is flagged for removal: "${widgetPluginKey}".`,
    );
  }
}
