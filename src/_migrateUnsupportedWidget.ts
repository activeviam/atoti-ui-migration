import { LegacyWidgetState } from "./migration.types";
import { _getLegacyWidgetPluginKey } from "./_getLegacyWidgetPluginKey";

/**
 * Returns the migrated widget state of a widget that is not supported by ActiveUI 5.
 */
export function _migrateUnsupportedWidget(
  legacyWidgetState: LegacyWidgetState
) {
  const widgetPluginKey = _getLegacyWidgetPluginKey(legacyWidgetState);
  return {
    ...legacyWidgetState?.value?.body,
    name: legacyWidgetState?.name,
    widgetKey: widgetPluginKey,
  };
}
