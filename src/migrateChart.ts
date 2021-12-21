import _keyBy from "lodash/keyBy";
import _mapValues from "lodash/mapValues";
import _omit from "lodash/omit";
import _isArray from "lodash/isArray";

import { pluginWidgetPlotlyLineChart } from "@activeviam/plugin-widget-plotly-line";
import { pluginWidgetPlotly100StackedBarChart } from "@activeviam/plugin-widget-plotly-100-stacked-bars";
import { pluginWidgetPlotlyClusteredBarChart } from "@activeviam/plugin-widget-plotly-clustered-bars";
import { pluginWidgetPlotlyRadarChart } from "@activeviam/plugin-widget-plotly-radar";
import { pluginWidgetPlotlyStackedColumnChart } from "@activeviam/plugin-widget-plotly-stacked-columns";
import { pluginWidgetPlotly100StackedColumnChart } from "@activeviam/plugin-widget-plotly-100-stacked-columns";
import { pluginWidgetPlotlyClusteredColumnChart } from "@activeviam/plugin-widget-plotly-clustered-columns";
import { pluginWidgetPlotlyWaterfallChart } from "@activeviam/plugin-widget-plotly-waterfall";
import { pluginWidgetPlotlyPieChart } from "@activeviam/plugin-widget-plotly-pie";
import { pluginWidgetPlotlyStackedBarChart } from "@activeviam/plugin-widget-plotly-stacked-bars";
import { pluginWidgetPlotlyDonutChart } from "@activeviam/plugin-widget-plotly-donut";
import { pluginWidgetPlotlyScatterPlot } from "@activeviam/plugin-widget-plotly-scatter";
import { pluginWidgetPlotlyComboChart } from "@activeviam/plugin-widget-plotly-combo";
import { pluginWidgetPlotlyAreaChart } from "@activeviam/plugin-widget-plotly-area";
import { pluginWidgetPlotly100StackedAreaChart } from "@activeviam/plugin-widget-plotly-100-stacked-area";
import { pluginWidgetPlotlyGaugeChart } from "@activeviam/plugin-widget-plotly-gauge";
import { pluginWidgetPlotlyBulletChart } from "@activeviam/plugin-widget-plotly-bullet";
import { pluginWidgetPlotlyTreeMap } from "@activeviam/plugin-widget-plotly-treemap";
import { pluginWidgetPlotlyStackedAreaChart } from "@activeviam/plugin-widget-plotly-stacked-area";

import type {
  SerializedDataVisualizationWidgetMapping,
  WidgetPlugin,
} from "@activeviam/widget";
import type { PlotlyWidgetState } from "@activeviam/chart";
import type { DataModel } from "@activeviam/data-model";

import { MdxSelect, MdxString, parse, stringify } from "@activeviam/mdx";
import { _getTargetCubeFromServerUrl } from "./_getTargetCubeFromServerUrl";
import { LegacyQuery, _migrateQuery } from "./_migrateQuery";
import type { Query } from "@activeviam/activepivot-client";

const chartPlugins: { [widgetKey: string]: WidgetPlugin<any, any> } = _keyBy(
  [
    pluginWidgetPlotlyLineChart,
    pluginWidgetPlotly100StackedBarChart,
    pluginWidgetPlotlyClusteredBarChart,
    pluginWidgetPlotlyRadarChart,
    pluginWidgetPlotlyStackedColumnChart,
    pluginWidgetPlotly100StackedColumnChart,
    pluginWidgetPlotlyClusteredColumnChart,
    pluginWidgetPlotlyWaterfallChart,
    pluginWidgetPlotlyPieChart,
    pluginWidgetPlotlyStackedBarChart,
    pluginWidgetPlotlyDonutChart,
    pluginWidgetPlotlyScatterPlot,
    pluginWidgetPlotlyComboChart,
    pluginWidgetPlotlyAreaChart,
    pluginWidgetPlotly100StackedAreaChart,
    pluginWidgetPlotlyGaugeChart,
    pluginWidgetPlotlyBulletChart,
    pluginWidgetPlotlyTreeMap,
    pluginWidgetPlotlyStackedAreaChart,
  ],
  "key"
);

/**
 * Returns the key of the ActiveUI 5 widget corresponding to the ActiveUI 4 chart identified by `legacyChartType`.
 * Returns undefined if the migration script is not able to determine which ActiveUI 5 widget the legacy chart should be migrated to.
 */
function _getMigratedWidgetKey(legacyChartType: string): string | undefined {
  if (legacyChartType.startsWith("plotly-")) {
    return legacyChartType;
  }

  switch (legacyChartType) {
    case "combo-line":
      return "plotly-line-chart";
    case "combo-line-area":
      return "plotly-area-chart";
    case "combo-histogram":
      return "plotly-stacked-column-chart";
    case "combo-horizontal-histogram":
      return "plotly-stacked-bar-chart";
    case "pie":
      return "plotly-pie-chart";
    case "scatter":
      return "plotly-scatter-plot";
    default: {
      return undefined;
    }
  }
}

/**
 * Returns the mapping of the ActiveUI 5 widget, corresponding to `legacyMapping`.
 * Returns undefined if the migration script is not able to determine which ActiveUI 5 widget the legacy chart should be migrated to.
 */
function _getMigratedChartMapping(
  legacyMapping: any,
  legacyChartType: string
): SerializedDataVisualizationWidgetMapping {
  const migratedWidgetKey = _getMigratedWidgetKey(legacyChartType);

  if (migratedWidgetKey === undefined) {
    return legacyMapping;
  }

  const widgetPlugin = chartPlugins[migratedWidgetKey];
  const emptyMapping: SerializedDataVisualizationWidgetMapping = {};

  Object.keys(widgetPlugin.attributes ?? {}).forEach((attributeName) => {
    emptyMapping[attributeName] = [];
  });

  if (legacyChartType.startsWith("plotly-")) {
    return {
      ...emptyMapping,
      ...legacyMapping,
    };
  }

  const flattenedMapping = _mapValues(legacyMapping, (attributeMapping) => {
    return _isArray(attributeMapping.from)
      ? attributeMapping.from
      : [attributeMapping.from];
  });

  const commonMapping = {
    ...emptyMapping,
    horizontalSubplots: flattenedMapping.rows ?? [],
    verticalSubplots: flattenedMapping.columns ?? [],
  };

  switch (legacyChartType) {
    case "combo-line":
      return {
        ...commonMapping,
        xAxis: flattenedMapping.x,
        values: flattenedMapping.y,
      };
    case "combo-line-area":
      return {
        ...commonMapping,
        xAxis: flattenedMapping.x,
        values: flattenedMapping.y,
      };
    case "combo-histogram":
      return {
        ...commonMapping,
        xAxis: flattenedMapping.x,
        values: flattenedMapping.y,
      };
    case "combo-horizontal-histogram":
      return {
        ...commonMapping,
        yAxis: flattenedMapping.y,
        values: flattenedMapping.x,
      };
    case "pie":
      return {
        ...commonMapping,
        values: flattenedMapping.angle,
        sliceBy: flattenedMapping.color,
      };
    case "scatter":
      return {
        ...commonMapping,
        xValues: flattenedMapping.x,
        yValues: flattenedMapping.y,
        size: flattenedMapping.r,
        color: flattenedMapping.color,
        splitBy: flattenedMapping.cardinality,
      };
    default: {
      return legacyMapping;
    }
  }
}

/**
 * Returns the converted chart widget state, ready to be used by ActiveUI 5.
 */
export function migrateChart(
  // Legacy widget states are not typed.
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  legacyChartState: any,
  servers: { [serverKey: string]: { dataModel: DataModel; url: string } }
): PlotlyWidgetState<"serialized"> {
  const widgetName = legacyChartState?.name;
  const {
    type,
    mapping: legacyMapping,
    ...configuration
  } = legacyChartState?.value?.body?.configuration;
  const legacyChartType = type || "plotly-line-chart";

  const migratedWidgetKey = _getMigratedWidgetKey(legacyChartType);

  if (migratedWidgetKey === undefined) {
    // eslint-disable-next-line no-console
    console.warn(
      `Unsupported legacy chart type: "${type}". The widget ("${legacyChartState.name}") will be copied as is. It might not work correctly in ActiveUI5.`
    );

    return legacyChartState;
  }

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

  const mapping = _getMigratedChartMapping(legacyMapping, legacyChartType);

  return {
    ...configuration,
    mapping,
    query,
    filters,
    queryContext,
    serverKey,
    name: widgetName,
    widgetKey: migratedWidgetKey,
  };
}
