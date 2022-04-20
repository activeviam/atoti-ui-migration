import { AWidgetState } from "@activeviam/activeui-sdk";

/**
 * Error thrown when trying to migrate a widget that is not supported by default in ActiveUI 5.
 */
export class UnsupportedWidgetError extends Error {
  /**
   * The ActiveUI 4 widget plugin key.
   */
  public readonly widgetPluginKey: string;

  /**
   * The widget name as defined in its state.
   */
  public readonly widgetName: string;

  /**
   * The widget file id on the Content Server.
   */
  public readonly widgetId?: string;

  /**
   * An optimistic ActiveUI5-compatible state of the ActiveUI 4 widget plugin whose migration failed because it is not supported by default in ActiveUI 5.
   */
  public readonly migratedStateOfUnsupportedWidget?: AWidgetState<"serialized">;

  constructor({
    widgetPluginKey,
    widgetName,
    widgetId,
    migratedStateOfUnsupportedWidget,
  }: {
    widgetPluginKey: string;
    widgetName: string;
    widgetId?: string;
    migratedStateOfUnsupportedWidget?: AWidgetState<"serialized">;
  }) {
    super(
      `Unsupported widgetKey: "${widgetPluginKey}".\nThe widget "${widgetName}"${
        widgetId ? ` (with id ${widgetId})` : ""
      } will be copied as is and will most likely not work correctly in ActiveUI 5.\nAlternatively, you can remove all widgets of this type by using the --remove-widgets option in the CLI.`
    );
    this.widgetPluginKey = widgetPluginKey;
    this.widgetName = widgetName;
    this.widgetId = widgetId;
    this.migratedStateOfUnsupportedWidget = migratedStateOfUnsupportedWidget;
  }
}
