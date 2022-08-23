/**
 * Thrown when a legacy widget's key is not recognized by the migration script.
 */
export class UnsupportedWidgetKeyError extends Error {
  public widgetPluginKey: string;
  public widgetName: string;
  constructor(widgetPluginKey: string, widgetName: string) {
    super(`Unsupported widgetKey: "${widgetPluginKey}"`);

    this.widgetPluginKey = widgetPluginKey;
    this.widgetName = widgetName;
  }
}
