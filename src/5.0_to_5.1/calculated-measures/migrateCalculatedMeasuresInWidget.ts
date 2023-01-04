import {
  CubeName,
  isWidgetWithQueryState,
  MdxSelect,
  MdxDrillthrough,
  AWidgetState,
} from "@activeviam/activeui-sdk-5.0";
import { DataModel } from "@activeviam/activeui-sdk-5.1";
import { migrateCalculatedMeasuresInMdx } from "./migrateCalculatedMeasuresInMdx";
import _uniq from "lodash/uniq";

/**
 * In ActiveUI 5.0, saved calculated measures live under /ui/calculated_measures, and ActivePivot is not aware of them.
 * In particular, they don't appear in the data model, and they must be added as query-scoped measures to each individual widget referring to them.
 *
 * In ActiveUI 5.1, saved calculated measures are grouped by cube and live under /pivot/entitlements/cm.
 * ActivePivot proxies them and makes them accessible in the data model.
 * So they can be referred to just like any other measure in an MDX query, without the need to add a query-scoped calculated measure definition.
 *
 * Mutates `widgetState` and `measureToCubeMapping`.
 */
export function migrateCalculatedMeasuresInWidget(
  widgetState: AWidgetState,
  {
    dataModels,
    namesOfCalculatedMeasuresToMigrate,
    measureToCubeMapping,
  }: {
    dataModels: { [serverKey: string]: DataModel };
    namesOfCalculatedMeasuresToMigrate: string[];
    measureToCubeMapping: { [measureName: string]: CubeName[] };
  },
): void {
  if (!isWidgetWithQueryState<MdxSelect | MdxDrillthrough>(widgetState)) {
    return;
  }

  const mdx = widgetState.query.mdx;
  if (!mdx) {
    return;
  }

  const { migratedMdx, namesOfCalculatedMeasuresRemovedFromMdx, cubeName } =
    migrateCalculatedMeasuresInMdx({
      mdx,
      serverKey: widgetState.serverKey,
      dataModels,
      namesOfCalculatedMeasuresToMigrate,
    });

  namesOfCalculatedMeasuresRemovedFromMdx.forEach((calculatedMeasureName) => {
    measureToCubeMapping[calculatedMeasureName] = measureToCubeMapping[
      calculatedMeasureName
    ]
      ? _uniq([...measureToCubeMapping[calculatedMeasureName], cubeName])
      : [cubeName];
  });

  widgetState.query.mdx = migratedMdx;
}
