import type { TextEditorWidgetState } from "@activeviam/activeui-sdk";
import type { LegacyWidgetState } from "./migration.types";

/**
 * Returns the converted Text Editor widget state, ready to be used by ActiveUI 5.
 */
export function migrateTextEditor(
  legacyTextEditorState: LegacyWidgetState
): TextEditorWidgetState<"serialized"> {
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
