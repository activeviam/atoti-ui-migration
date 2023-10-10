import _keyBy from "lodash/keyBy";
import _mapValues from "lodash/mapValues";
import _omit from "lodash/omit";
import _isArray from "lodash/isArray";
import {
  parse,
  stringify,
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
} from "@activeviam/activeui-sdk-5.0";
import type {
  PlotlyWidgetState,
  DataModel,
  MdxSelect,
  MdxString,
  Query,
  WidgetPlugin,
  SerializedDataVisualizationWidgetMapping,
} from "@activeviam/activeui-sdk-5.0";
import { _getTargetCubeFromServerUrl } from "./_getTargetCubeFromServerUrl";
import { LegacyQuery, _migrateQuery } from "./_migrateQuery";
import { UnsupportedLegacyChartTypeError } from "./errors/UnsupportedLegacyChartTypeError";
import { UnsupportedLegacyQueryUpdateModeError } from "./errors/UnsupportedLegacyQueryUpdateModeError";

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
  "key",
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
 * Does not cater for the potentially missing ALL_MEASURES tile.
 */
function _getMigratedChartMapping(
  legacyMapping: any,
  legacyChartType: string,
  widgetPlugin: WidgetPlugin,
): SerializedDataVisualizationWidgetMapping {
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
 * Returns a new chart mapping corresponding to `mapping` where the ALL_MEASURES tile was added, if applicable.
 * Does not mutate `mapping`.
 */
function _addAllMeasuresToMapping(
  mapping: SerializedDataVisualizationWidgetMapping,
  widgetPlugin: WidgetPlugin,
): SerializedDataVisualizationWidgetMapping {
  const attributes = widgetPlugin.attributes ?? {};
  const doesAlreadyContainTheAllMeasuresTile = Object.values(mapping).some(
    (fields) => fields?.includes("ALL_MEASURES"),
  );

  if (
    !widgetPlugin.doesSupportMeasuresRedirection ||
    doesAlreadyContainTheAllMeasuresTile
  ) {
    // The widget does not support measures redirection (like a scatter plot for instance).
    // Or the legacy mapping already contained the "ALL_MEASURES" tile.
    // => either way, this tile should not be added.
    return mapping;
  }

  const targetAttributeName = Object.keys(attributes).find((attributeName) => {
    const attribute = attributes[attributeName];
    const selectedFields = mapping[attributeName];

    // When widget plugins do not specify a maximum number of fields for one of their attributes,
    // it means that they support an infinity of fields for this attribute.
    const maxNumberOfFields =
      attribute?.maxNumberOfFields === undefined
        ? Infinity
        : attribute?.maxNumberOfFields;

    return (
      attribute?.role === "secondaryOrdinal" &&
      selectedFields.length < Number(maxNumberOfFields)
    );
  });

  if (targetAttributeName === undefined) {
    // `mapping` does not contain a single suitable slot for the ALL_MEASURES tile.
    return mapping;
  }

  return {
    ...mapping,
    [targetAttributeName]: [...mapping[targetAttributeName], "ALL_MEASURES"],
  };
}

/**
 * Returns the converted chart widget state, ready to be used by ActiveUI 5.
 */
export function migrateChart(
  // Legacy widget states are not typed.
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  legacyChartState: any,
  {
    servers,
    shouldUpdateFiltersMdx,
  }: {
    servers: { [serverKey: string]: { dataModel: DataModel; url: string } };
    shouldUpdateFiltersMdx: boolean;
  },
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
    throw new UnsupportedLegacyChartTypeError(type);
  }

  // Legacy charts had their queries stored at a different place than other legacy widgets.
  // TypeScript does not recognize that the legacy query has an `mdx` attribute.
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

  const [
    { query: migratedQuery, filters: extractedFilters, queryContext },
    isUsingUnsupportedUpdateMode,
  ] = _migrateQuery<MdxSelect>({ legacyQuery, cube, shouldUpdateFiltersMdx });

  //  If there is no MDX in the query, the type does not matter: it can be considered a stringified query.
  const query = (
    migratedQuery.mdx
      ? { ...migratedQuery, mdx: stringify(migratedQuery.mdx) }
      : migratedQuery
  ) as Query<MdxString>;

  const filters = extractedFilters.map((filter) => stringify(filter));

  const widgetPlugin = chartPlugins[migratedWidgetKey];

  const mappingDisregardingAllMeasures = _getMigratedChartMapping(
    legacyMapping,
    legacyChartType,
    widgetPlugin,
  );
  const mapping = _addAllMeasuresToMapping(
    mappingDisregardingAllMeasures,
    widgetPlugin,
  );

  const migratedChartState = {
    ...configuration,
    mapping,
    query,
    filters,
    queryContext,
    serverKey,
    name: widgetName,
    widgetKey: migratedWidgetKey,
    ...(!shouldUpdateFiltersMdx && {
      areFiltersDrivenByMdx: true,
    }),
  };

  if (isUsingUnsupportedUpdateMode) {
    throw new UnsupportedLegacyQueryUpdateModeError(migratedChartState);
  }

  return migratedChartState;
}
