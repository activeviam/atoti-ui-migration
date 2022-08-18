import type {
  AWidgetState,
  DataModel,
  MdxSelect,
  TableWidgetState,
} from "@activeviam/activeui-sdk";
import {
  serializeWidgetState,
  deriveMappingFromMdx,
  parse,
  pluginWidgetPivotTable,
  pluginWidgetTable,
  pluginWidgetTreeTable,
} from "@activeviam/activeui-sdk";
import { _getQueryInLegacyWidgetState } from "./_getQueryInLegacyWidgetState";
import { _getTargetCubeFromServerUrl } from "./_getTargetCubeFromServerUrl";
import { _migrateQuery } from "./_migrateQuery";
import { _migrateTableColumnWidths } from "./_migrateTableColumnWidths";

/**
 * Returns the converted table widget state, ready to be used by ActiveUI 5.
 */
export function migrateTable(
  // Legacy widget states are not typed.
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  legacyTableState: any,
  servers: { [serverKey: string]: { dataModel: DataModel; url: string } },
): AWidgetState<"serialized"> {
  const legacyQuery = _getQueryInLegacyWidgetState(legacyTableState);
  const legacyMdx = legacyQuery.mdx
    ? parse<MdxSelect>(legacyQuery.mdx)
    : undefined;

  const serverUrlInLegacyWidgetState = legacyTableState?.value?.body?.serverUrl;
  const { serverKey, cube } = _getTargetCubeFromServerUrl({
    mdx: legacyMdx,
    serverUrl: serverUrlInLegacyWidgetState,
    servers,
  });

  const { query, filters, queryContext } = _migrateQuery<MdxSelect>({
    legacyQuery,
    cube,
  });

  const legacyColumnsGroups =
    legacyTableState.value.body?.configuration?.tabular?.columnsGroups ?? [];
  const legacyCellRenderers =
    legacyTableState.value.body?.configuration?.tabular?.cellRenderers ?? [];
  const widgetPlugin = legacyColumnsGroups.some(
    (columnsGroup: any) => columnsGroup?.cellFactory?.key === "treeCells",
  )
    ? pluginWidgetTreeTable
    : legacyCellRenderers.includes("pivot-layout")
    ? pluginWidgetPivotTable
    : pluginWidgetTable;

  const mapping = deriveMappingFromMdx({
    mdx: query.mdx,
    cube,
    widgetPlugin,
  });

  const legacyColumns =
    legacyTableState.value?.body?.configuration?.tabular?.columns;
  const columnWidths = legacyColumns
    ? _migrateTableColumnWidths({
        legacyColumns,
        mapping,
        cube,
      })
    : {};

  const migratedWidgetState: TableWidgetState = {
    query,
    filters,
    queryContext,
    mapping,
    name: legacyTableState.name,
    serverKey,
    widgetKey: widgetPlugin.key,
    columnWidths,
  };

  return serializeWidgetState(migratedWidgetState);
}
