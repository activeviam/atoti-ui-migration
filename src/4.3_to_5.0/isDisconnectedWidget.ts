import { _getLegacyWidgetPluginKey } from "./_getLegacyWidgetPluginKey";
import { LegacyWidgetState } from "./migration.types";

/** Returns whether `legacyWidgetState` is disconnected from the dashboard and page filters. */
export function isDisconnectedWidget(
  legacyWidgetState: LegacyWidgetState,
): boolean {
  const widgetPluginKey = _getLegacyWidgetPluginKey(legacyWidgetState);
  switch (widgetPluginKey) {
    case "chart":
      return legacyWidgetState.value.body?.isConnected === false;
    case "tabular-view":
    case "pivot-table":
      return (
        legacyWidgetState.value.body?.configuration?.tabular?.isConnected ===
        false
      );
    case "featured-values":
      return (
        legacyWidgetState.value.body?.configuration?.featuredValues
          ?.isConnected === false
      );
    case "drillthrough":
      return (
        legacyWidgetState.value.body?.configuration?.drillthrough
          ?.isConnected === false
      );
    default:
      return false;
  }
}
