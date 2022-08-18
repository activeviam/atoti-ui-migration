import { LegacyWidgetState } from "./migration.types";

/**
 * Returns the widget plugin key from an ActiveUI 4 widget state.
 */
export function _getLegacyWidgetPluginKey(
  legacyWidgetState: LegacyWidgetState,
): string {
  return legacyWidgetState.value.containerKey;
}
