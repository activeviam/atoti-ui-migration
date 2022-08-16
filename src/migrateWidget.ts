import type { AWidgetState, DataModel } from "@activeviam/activeui-sdk";
import type { LegacyWidgetState } from "./migration.types";

import { migrateChart } from "./migrateChart";
import { migrateTable } from "./migrateTable";
import { migrateKpi } from "./migrateKpi";
import { migrateQuickFilter } from "./migrateQuickFilter";
import { migrateDrillthrough } from "./migrateDrillthrough";
import { migrateTextEditor } from "./migrateTextEditor";
import { _getLegacyWidgetPluginKey } from "./_getLegacyWidgetPluginKey";

/**
 * Returns the converted widget state, ready to be used in ActiveUI 5.
 */
export function migrateWidget(
  legacyWidgetState: LegacyWidgetState,
  servers: { [serverKey: string]: { dataModel: DataModel; url: string } }
): [AWidgetState<"serialized">, string?] {
  const widgetPluginKey = _getLegacyWidgetPluginKey(legacyWidgetState);
  switch (widgetPluginKey) {
    case "chart":
      return [migrateChart(legacyWidgetState, servers)];
    case "tabular-view":
    case "pivot-table":
      return [migrateTable(legacyWidgetState, servers)];
    case "featured-values":
      return [migrateKpi(legacyWidgetState, servers)];
    case "quick-filter":
      return [migrateQuickFilter(legacyWidgetState, servers)];
    case "drillthrough":
      return [migrateDrillthrough(legacyWidgetState, servers)];
    case "rich-text-editor":
      return [migrateTextEditor(legacyWidgetState)];
    default:
      return [
        {
          ...legacyWidgetState?.value?.body,
          name: legacyWidgetState?.name,
          widgetKey: widgetPluginKey,
        },
        `Unsupported widgetKey: "${widgetPluginKey}". The widget ("${legacyWidgetState.name}") will be copied as is. It will most likely not work correctly in ActiveUI 5. Alternatively, you can remove all widgets of this type by using the --remove-widgets option in the CLI.`,
      ];
  }
}
