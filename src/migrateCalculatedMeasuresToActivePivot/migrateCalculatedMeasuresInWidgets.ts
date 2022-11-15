import {
  ContentRecord,
  CubeName,
  DataModel,
  MdxSelect,
  WidgetWithQueryState,
} from "@activeviam/activeui-sdk";
import { MdxString } from "@activeviam/mdx";
import { migrateCalculatedMeasuresInMdx } from "./migrateCalculatedMeasuresInMdx";
import { produce } from "immer";
import _mapValues from "lodash/mapValues";

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
