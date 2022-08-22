/**
 * Thrown when a legacy widget's key is not recognized by the migration script.
 */
export class UnsupportedWidgetKeyError extends Error {
  public widgetPluginKey: string;
  public widgetName: string;
  constructor(widgetPluginKey: string, widgetName: string) {
    super(
      `Unsupported widgetKey: "${widgetPluginKey}". The widget ("${widgetName}") will be copied as is. It will most likely not work correctly in ActiveUI 5. Alternatively, you can remove all widgets of this type by using the --remove-widgets option in the CLI.`,
    );

    this.widgetPluginKey = widgetPluginKey;
    this.widgetName = widgetName;
  }
}
