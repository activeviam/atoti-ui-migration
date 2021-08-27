import _mapValues from "lodash/mapValues";
import _omit from "lodash/omit";
import _isArray from "lodash/isArray";

import type {
  PlotlyWidgetState,
  DataModel,
  MdxSelect,
  MdxString,
  Query,
} from "@activeviam/activeui-sdk";
import { parse, stringify } from "@activeviam/activeui-sdk";
import { _getTargetCubeFromServerUrl } from "./_getTargetCubeFromServerUrl";
import { LegacyQuery, _migrateQuery } from "./_migrateQuery";

/**
 * Returns the converted chart widget state, ready to be used by ActiveUI 5.
 */
export function migrateChart(
  // Legacy widget states are not typed.
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  legacyChartState: any,
  servers: { [serverKey: string]: { dataModel: DataModel; url: string } }
): PlotlyWidgetState<"serialized"> {
  const { type: legacyChartType, ...configuration } =
    legacyChartState?.value?.body?.configuration;
  const name = legacyChartState?.name;

  // Legacy charts had their queries stored at a different place than other legacy widgets.
  // TypeScript does not recognize that the legacy query has an `mdx` attribute.
  // eslint-disable-next-line activeui/no-as
  const legacyQuery: LegacyQuery = _omit(legacyChartState?.value?.body?.query, [
    "serverUrl",
  ]) as LegacyQuery;
  const legacyMdx = legacyQuery.mdx
    ? parse<MdxSelect>(legacyQuery.mdx)
    : undefined;

  const serverUrlInLegacyChartState =
    legacyChartState?.value?.body?.query?.serverUrl;
  const { serverKey, cube } = _getTargetCubeFromServerUrl({
    mdx: legacyMdx,
    serverUrl: serverUrlInLegacyChartState,
    servers,
  });

  const {
    query: migratedQuery,
    filters: extractedFilters,
    queryContext,
  } = _migrateQuery<MdxSelect>({ legacyQuery, cube });

  //  If there is no MDX in the query, the type does not matter: it can be considered a stringified query.
  // eslint-disable-next-line activeui/no-as
  const query = (
    migratedQuery.mdx
      ? { ...migratedQuery, mdx: stringify(migratedQuery.mdx) }
      : migratedQuery
  ) as Query<MdxString>;

  const filters = extractedFilters.map((filter) => stringify(filter));

  const type = legacyChartType || "plotly-line-chart";

  if (type.startsWith("plotly-")) {
    return {
      ...configuration,
      name,
      query,
      filters,
      queryContext,
      serverKey,
      widgetKey: type,
    };
  }

  const mapping = _mapValues(
    legacyChartState?.value?.body?.configuration?.mapping,
    (attributeMapping) => {
      return _isArray(attributeMapping.from)
        ? attributeMapping.from
        : [attributeMapping.from];
    }
  );
  const subplots = {
    ...(mapping.row && { horizontalSubplots: mapping.rows }),
    ...(mapping.column && { verticalSubplots: mapping.rows }),
  };

  switch (type) {
    case "combo-line":
      return {
        mapping: {
          xAxis: mapping.x,
          values: mapping.y,
          ...subplots,
        },
        query,
        filters,
        queryContext,
        serverKey,
        name,
        widgetKey: "plotly-line-chart",
      };
    case "combo-line-area":
      return {
        mapping: {
          xAxis: mapping.x,
          values: mapping.y,
          ...subplots,
        },
        query,
        filters,
        queryContext,
        serverKey,
        name,
        widgetKey: "plotly-area-chart",
      };
    case "combo-histogram":
      return {
        mapping: {
          xAxis: mapping.x,
          values: mapping.y,
          ...subplots,
        },
        query,
        filters,
        queryContext,
        serverKey,
        name,
        widgetKey: "plotly-stacked-column-chart",
      };
    case "combo-horizontal-histogram":
      return {
        mapping: {
          yAxis: mapping.y,
          values: mapping.x,
          ...subplots,
        },
        query,
        filters,
        queryContext,
        serverKey,
        name,
        widgetKey: "plotly-stacked-bar-chart",
      };
    case "pie":
      return {
        mapping: {
          values: mapping.angle,
          sliceBy: mapping.color,
          ...subplots,
        },
        query,
        filters,
        queryContext,
        serverKey,
        name,
        widgetKey: "plotly-pie-chart",
      };
    case "scatter":
      return {
        mapping: {
          xValues: mapping.x,
          yValues: mapping.y,
          size: mapping.r,
          color: mapping.color,
          splitBy: mapping.cardinality,
          ...subplots,
        },
        query,
        filters,
        queryContext,
        serverKey,
        name,
        widgetKey: "plotly-scatter-plot",
      };
    default: {
      // eslint-disable-next-line no-console
      console.warn(
        `Unsupported legacy chart type: "${type}". The widget ("${legacyChartState.name}") will be copied as is. It might not work correctly in ActiveUI5.`
      );
      return {
        name: legacyChartState?.name,
        ...legacyChartState?.value?.body,
      };
    }
  }
}
