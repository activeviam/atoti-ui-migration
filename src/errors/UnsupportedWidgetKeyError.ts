/**
 * Thrown when a legacy widget's key is not recognized by the migration script.
 */
export class UnsupportedWidgetKeyError extends Error {
  constructor(widgetPluginKey: string) {
    super(`Unsupported widgetKey: "${widgetPluginKey}"`);
  }
}
