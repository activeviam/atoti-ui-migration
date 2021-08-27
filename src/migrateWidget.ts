import type { AWidgetState, DataModel } from "@activeviam/activeui-sdk";
import type { LegacyWidgetState } from "./migration.types";

import { migrateChart } from "./migrateChart";
import { migrateTable } from "./migrateTable";
import { migrateKpi } from "./migrateKpi";
import { migrateQuickFilter } from "./migrateQuickFilter";
import { migrateDrillthrough } from "./migrateDrillthrough";
import { migrateTextEditor } from "./migrateTextEditor";

/**
 * Returns the converted widget state, ready to be used in ActiveUI 5.
 */
export function migrateWidget(
  legacyWidgetState: LegacyWidgetState,
  servers: { [serverKey: string]: { dataModel: DataModel; url: string } }
): AWidgetState<"serialized"> {
  switch (legacyWidgetState.value.containerKey) {
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
      // eslint-disable-next-line no-console
      console.warn(
        `Unsupported widgetKey: "${legacyWidgetState.value.containerKey}". The widget ("${legacyWidgetState.name}") will be copied as is. It might not work correctly in ActiveUI5.`
      );
      return {
        name: legacyWidgetState?.name,
        ...legacyWidgetState?.value?.body,
      };
  }
}
