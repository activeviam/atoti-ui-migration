import {
  ContentRecord,
  CubeName,
  DataModel,
  deserializeWidgetState,
  isWidgetWithQueryState,
  MdxSelect,
  WidgetWithQueryState,
} from "@activeviam/activeui-sdk-5.0";
import { migrateCalculatedMeasuresInMdx } from "./migrateCalculatedMeasuresInMdx";
import { produce } from "immer";
import _mapValues from "lodash/mapValues";
import { serializeWidgetState } from "@activeviam/activeui-sdk-5.1";
import _uniq from "lodash/uniq";

/**
 * In ActiveUI 5.0, saved calculated measures live under /ui/calculated_measures, and ActivePivot is not aware of them. In particular, they don't appear in the data model, and they must be added as query-scoped measures to each individual widget refering to them.
 *
 * In ActiveUI 5.1, saved calculated measures are grouped by cube and live under /pivot/entitlements/cm. ActivePivot proxies them and makes them accessible in the data model. So they can be referred to just like any other measure in an MDX query, without the need to add a query-scoped calculated measure definition.
 */
export const migrateCalculatedMeasuresInWidgets = (
  widgets: ContentRecord,
  dataModel: DataModel,
  namesOfCalculatedMeasurestoMigrate: string[],
): {
  measureToCubeMapping: { [measureName: string]: CubeName[] };
  migratedWidgetsRecord: ContentRecord;
} => {
  // Create an empty object where each calculated measure used in a saved widget will be added as a key with its cubeName as a value.
  const measureToCubeMapping: { [measureName: string]: CubeName[] } = {};

  const migratedWidgetsRecord = produce(widgets, (draft) => {
    draft.children!.content.children = _mapValues(
      draft.children!.content.children,
      (widgetRecord) => {
        const serializedWidgetState: WidgetWithQueryState<
          MdxSelect,
          "serialized"
        > = JSON.parse(widgetRecord.entry.content);
        const deserializedWidgetState = deserializeWidgetState(
          serializedWidgetState,
        );
        if (isWidgetWithQueryState(deserializedWidgetState)) {
          const mdx: MdxSelect | undefined = deserializedWidgetState.query.mdx;

          if (!mdx) {
            return widgetRecord;
          }

          const {
            migratedMdx,
            namesOfCalculatedMeasuresToMigrateInWidget,
            cubeName,
          } = migrateCalculatedMeasuresInMdx(
            mdx,
            namesOfCalculatedMeasurestoMigrate,
            dataModel,
          );

          namesOfCalculatedMeasuresToMigrateInWidget.forEach(
            (calculatedMeasureName) => {
              measureToCubeMapping[calculatedMeasureName] =
                measureToCubeMapping[calculatedMeasureName]
                  ? _uniq([
                      ...measureToCubeMapping[calculatedMeasureName],
                      cubeName,
                    ])
                  : [cubeName];
            },
          );
          const updatedWidgetState = produce(
            deserializedWidgetState,
            (draft) => {
              draft.query.mdx = migratedMdx;
            },
          );
          const updatedRecord = produce(widgetRecord, (draft) => {
            draft.entry.content = JSON.stringify(
              serializeWidgetState(updatedWidgetState),
            );
          });
          return updatedRecord;
        }
        return widgetRecord;
      },
    );
  });
  return { measureToCubeMapping, migratedWidgetsRecord };
};
