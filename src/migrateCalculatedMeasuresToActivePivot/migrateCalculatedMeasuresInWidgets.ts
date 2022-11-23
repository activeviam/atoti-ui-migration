import {
  ContentRecord,
  CubeName,
  DataModel,
  MdxSelect,
  WidgetWithQueryState,
} from "@activeviam/activeui-sdk-5.0";
import { MdxString } from "@activeviam/mdx-5.0";
import { migrateCalculatedMeasuresInMdx } from "./migrateCalculatedMeasuresInMdx";
import { produce } from "immer";
import _mapValues from "lodash/mapValues";

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
  cubeNames: { [measureName: string]: CubeName };
  migratedWidgetsRecord: ContentRecord;
} => {
  // Create an empty object where each calculated measure used in a saved widget will be added as a key with its cubeName as a value.
  const cubeNames: { [measureName: string]: CubeName } = {};

  const migratedWidgetsRecord = produce(widgets, (draft) => {
    draft.children!.content.children = _mapValues(
      widgets.children!.content.children,
      (widgetRecord) => {
        const widgetState: WidgetWithQueryState<MdxSelect, "serialized"> =
          JSON.parse(widgetRecord.entry.content);
        const mdx: MdxString | undefined = widgetState.query.mdx;
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
            cubeNames[calculatedMeasureName] = cubeName;
          },
        );

        const updatedWidgetState = produce(widgetState, (draft) => {
          draft.query.mdx = migratedMdx;
        });
        const updatedRecord = produce(widgetRecord, (draft) => {
          draft.entry.content = JSON.stringify(updatedWidgetState);
        });
        return updatedRecord;
      },
    );
  });
  return { cubeNames, migratedWidgetsRecord };
};
