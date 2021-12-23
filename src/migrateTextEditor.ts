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

  /**
   * Looking for legacy katex inline formulas in the shape of `$content$` and replacing
   * with the aui5 `katex content` notation.
   *
   * Regexp reads as follows:
   * - \$: the '$' character, needs to be escaped within the regexp.
   * - (?<!\$)\$(?!\$):  all '$' character not followed or preceded by another '$' character, with:
   * -- "(?<!\$)" is a "negative lookbehind assertion" for "$";
   * -- "(?!\$)" is a "negative lookahead assertion" for "$"
   * - (.*) capturing group for anything between the single '$'.
   * - /g mandatory global flag when using "replaceAll".
   */
  const textWithInlineKatexFormulasReplaced = (text as string).replace(
    /(?<!\$)\$(?!\$)(.*)(?<!\$)\$(?!\$)/g,
    "`katex $1`"
  );

  /**
   * Looking for legacy katex block formulas in the shape of `$$content$$` and replacing
   * with the aui5
   * ```katex
   * content
   * ```
   * notation.
   *
   * Regexp reads as follows:
   * - \$: the '$' character, needs to be escaped within the regexp.
   * - \${2}: matches 2 '$' characters
   * - (.*) capturing group for anything between the '$$'.
   * - /g mandatory global flag
   * - s flag allowing "." to match new lines.
   */
  const textWithBlickKatexFormulasReplaced =
    textWithInlineKatexFormulasReplaced.replace(
      /\${2}(.*)\${2}/gs,
      "```katex\n$1\n```"
    );

  return {
    name: legacyTextEditorState.name,
    widgetKey: "text-editor",
    displayMode,
    text: textWithBlickKatexFormulasReplaced,
  };
}
