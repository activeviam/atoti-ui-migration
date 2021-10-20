import type { LegacyWidgetState } from "./migration.types";
import { TextEditorWidgetState } from "@activeviam/plugin-widget-text-editor";

/**
 * Returns the converted Text Editor widget state, ready to be used by ActiveUI 5.
 */
export function migrateTextEditor(
  legacyTextEditorState: LegacyWidgetState
): TextEditorWidgetState<"serialized"> {
  // eslint-disable-next-line no-console
  console.warn(
    "The `text-editor` widget is not part of the plugin registry in the ActiveUI 5 starter.\nMake sure to add it in your project.\n See https://activeviam.com/activeui/documentation/5.0.3/docs/tutorial/yourFirstCustomWidget#extend-activeui."
  );
  const { content: text, editingMode } =
    legacyTextEditorState.value?.body ?? {};
  const displayMode = editingMode === "edit" ? "edit" : "view";
  return {
    name: legacyTextEditorState.name,
    widgetKey: "text-editor",
    displayMode,
    text,
  };
}
