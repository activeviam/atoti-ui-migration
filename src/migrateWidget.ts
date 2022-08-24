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

/**
 * Returns the converted widget state, ready to be used in ActiveUI 5.
 * Throws {@link WidgetMigrationError} if the legacy widget is not recognized.
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
      return migrateTextEditor(legacyWidgetState);
    default:
      throw new UnsupportedWidgetKeyError(widgetPluginKey);
  }
}
