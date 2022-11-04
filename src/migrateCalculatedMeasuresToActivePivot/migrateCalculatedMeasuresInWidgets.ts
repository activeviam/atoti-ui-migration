import {
  ContentEntry,
  ContentRecord,
  CubeName,
  DataModel,
  getCalculatedMeasures,
  getCubeName,
  MdxSelect,
  parse,
  getCube,
  WidgetWithQueryState,
} from "@activeviam/activeui-sdk";
import _intersection from "lodash/intersection";
import _mapValues from "lodash/mapValues";

import {
  MdxString,
  removeCalculatedMemberDefinition,
  stringify,
} from "@activeviam/mdx";
import { produce } from "immer";

export interface auiWidgetFolder {
  entry: ContentEntry;
  children: {
    content: ContentRecord;
    structure: ContentRecord;
  };
}

/**
 * Takes as an argument the `/ui/widgets` folder on the content server and returns `migratedWidgetsRecord` with the calculated member definitions removed from the MDX.
 * Also returns an object `cubeNames` whose keys are the names of any calculated measures created in ActiveUI 5.0 that are used in any saved widgets, with the corresponding `cubeName` as a value.
 * @example {
      "calculated measure A": "CubeA",
      "calculated measure B": "CubeB",
    }
 */
export const migrateCalculatedMeasuresInWidgets = (
  widgets: auiWidgetFolder,
  dataModel: DataModel,
  namesOfCalculatedMeasurestoMigrate: string[],
): {
  cubeNames: { [measureName: string]: CubeName };
  migratedWidgetsRecord: ContentRecord;
} => {
  // Create an empty object where each calculated measure used in a saved widget will be added as a key with its cubeName as a value.
  const cubeNames: { [measureName: string]: CubeName } = {};

  const migratedWidgetsRecord = produce(widgets, (draft) => {
    draft.children.content.children = _mapValues(
      widgets.children.content.children,
      (widgetRecord) => {
        const widgetState: WidgetWithQueryState<MdxSelect, "serialized"> =
          JSON.parse(widgetRecord.entry.content);
        const mdx: MdxString | undefined = widgetState.query.mdx;

        if (!mdx) {
          return widgetRecord;
        }
        const parsedMdx: MdxSelect = parse(mdx);

        // Check for intersection between calculated measures to be migrated and calculated measures used in saved widgets.
        const calculatedMeasuresKeysUsedByWidgetAndThatNeedToBeMigrated =
          _intersection(
            // The keys are the names of the calculated measures, a widget may use more than one calculated measure.
            Object.keys(getCalculatedMeasures(parsedMdx)),
            namesOfCalculatedMeasurestoMigrate,
          );
        console.log(calculatedMeasuresKeysUsedByWidgetAndThatNeedToBeMigrated);
        const cubeName = getCubeName(parsedMdx);

        let updatedMdx: MdxSelect = parsedMdx;
        calculatedMeasuresKeysUsedByWidgetAndThatNeedToBeMigrated.forEach(
          (calculatedMeasure) => {
            cubeNames[calculatedMeasure] = cubeName;
            updatedMdx = removeCalculatedMemberDefinition(updatedMdx, {
              dimensionName: "Measures",
              hierarchyName: "Measures",
              namePath: [calculatedMeasure],
              cube: getCube(dataModel, cubeName),
            });
          },
        );

        const stringifiedUpdatedMdx = stringify(updatedMdx);
        const updatedWidgetState = produce(widgetState, (draft) => {
          draft.query.mdx = stringifiedUpdatedMdx;
        });
        const updatedRecord = produce(widgetRecord, (draft) => {
          draft.entry.content = updatedWidgetState;
        });
        return updatedRecord;
      },
    );
  });
  return { cubeNames, migratedWidgetsRecord };
};
