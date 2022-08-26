import type { AWidgetState, DataModel } from "@activeviam/activeui-sdk";
import type { LegacyWidgetState } from "./migration.types";

import { migrateChart } from "./migrateChart";
import { migrateTable } from "./migrateTable";
import { migrateKpi } from "./migrateKpi";
import { migrateQuickFilter } from "./migrateQuickFilter";
import { migrateDrillthrough } from "./migrateDrillthrough";
import { migrateTextEditor } from "./migrateTextEditor";
import { _getLegacyWidgetPluginKey } from "./_getLegacyWidgetPluginKey";
import { UnsupportedWidgetKeyError } from "./errors/UnsupportedWidgetKeyError";
import { TextEditorWidgetMigrationError } from "./errors/TextEditorWidgetMigrationError";

/**
 * Returns the converted widget state, ready to be used in ActiveUI 5.
 * Throws a {@link UnsupportedWidgetKeyError} if the legacy widget is not recognized.
 * Throws a {@link TextEditorWidgetMigrationError} if the legacy widget is a text editor, as this widget is supported by ActiveUI 5 but has to be manually added by developers as an extension.
 */
export function migrateWidget(
  legacyWidgetState: LegacyWidgetState,
  servers: { [serverKey: string]: { dataModel: DataModel; url: string } },
): AWidgetState<"serialized"> {
  const widgetPluginKey = _getLegacyWidgetPluginKey(legacyWidgetState);
  switch (widgetPluginKey) {
    case "chart":
      return migrateChart(legacyWidgetState, servers);
    case "tabular-view":
    case "pivot-table":
      return migrateTable(legacyWidgetState, servers);
    case "featured-values":
      return migrateKpi(legacyWidgetState, servers);
    case "quick-filter":
      return migrateQuickFilter(legacyWidgetState, servers);
    case "drillthrough":
      return migrateDrillthrough(legacyWidgetState, servers);
    case "rich-text-editor":
      throw new TextEditorWidgetMigrationError(
        migrateTextEditor(legacyWidgetState),
      );
    default:
      throw new UnsupportedWidgetKeyError(widgetPluginKey);
  }
}
