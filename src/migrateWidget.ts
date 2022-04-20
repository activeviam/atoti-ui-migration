import type { AWidgetState, DataModel } from "@activeviam/activeui-sdk";
import type { LegacyWidgetState } from "./migration.types";

import { migrateChart } from "./migrateChart";
import { migrateTable } from "./migrateTable";
import { migrateKpi } from "./migrateKpi";
import { migrateQuickFilter } from "./migrateQuickFilter";
import { migrateDrillthrough } from "./migrateDrillthrough";
import { migrateTextEditor } from "./migrateTextEditor";
import { _getLegacyWidgetPluginKey } from "./_getLegacyWidgetPluginKey";
import { UnsupportedWidgetError } from "./errors/UnsupportedWidgetError";
import { _migrateUnsupportedWidget } from "./_migrateUnsupportedWidget";

/**
 * Returns the converted widget state, ready to be used in ActiveUI 5.
 */
export function migrateWidget({
  legacyWidgetState,
  servers,
  widgetId,
}: {
  legacyWidgetState: LegacyWidgetState;
  servers: { [serverKey: string]: { dataModel: DataModel; url: string } };
  widgetId?: string;
}): AWidgetState<"serialized"> {
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
      const migratedStateOfUnsupportedWidget =
        _migrateUnsupportedWidget(legacyWidgetState);
      throw new UnsupportedWidgetError({
        widgetPluginKey,
        widgetName: legacyWidgetState.name,
        widgetId,
        migratedStateOfUnsupportedWidget,
      });
  }
}
