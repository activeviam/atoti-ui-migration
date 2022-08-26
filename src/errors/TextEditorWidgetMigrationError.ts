import { TextEditorWidgetState } from "@activeviam/activeui-sdk";
import { PartialMigrationError } from "./PartialMigrationError";

/**
 * Thrown after migrating a `rich-text-editor` widget.
 * Indicates that for the migrated widget to work in ActiveUI 5, the `text-editor` plugin must be added to the plugin registry.
 */
export class TextEditorWidgetMigrationError extends PartialMigrationError {
  constructor(migratedWidgetState: TextEditorWidgetState<"serialized">) {
    super(
      "The `text-editor` widget is not part of the plugin registry in the ActiveUI 5 starter. Make sure to add it in your project, see https://activeviam.com/activeui/documentation/latest/docs/tutorial/your-first-custom-widget#extend-activeui.",
      migratedWidgetState,
    );
  }
}
