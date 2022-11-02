import {
  AWidgetState,
  ContentEntry,
  ContentRecord,
  CubeName,
  DataModel,
  getCalculatedMeasures,
  getCubeName,
  MdxSelect,
  parse,
  getCube,
} from "@activeviam/activeui-sdk";
import _intersection from "lodash/intersection";
import _mapValues from "lodash/mapValues";

import { removeCalculatedMemberDefinition, stringify } from "@activeviam/mdx";
import produce from "immer";

export interface auiWidgetFolder {
  entry: ContentEntry;
  children: {
    content: ContentRecord;
    structure: ContentRecord;
  };
}

/**
 * Takes as an argument the `/ui/widgets` folder on the content server.
 * Returns an object `cubeNames` whose keys are the names of any calculated measures created in ActiveUI 5.0 that are used in any saved widgets, with the corresponding `cubeName` as a value.
 * @example {
      "calculated measure A": "CubeA",
      "calculated measure B": "CubeB",
    }
 */
export const migrateCalculatedMeasuresInWidgets = (
  widgets: auiWidgetFolder,
  //dataModel: DataModel,
  // TODO pass datamodel
  // TODO pass measure names to remove/migrate
  // namesOfCalculatedMeasurestoMigrate,
): {
  cubeNames: { [measureName: string]: CubeName };
  migratedWidgetsRecord: ContentRecord;
} => {
  // Create an empty object where each calculated measure used in a saved widget will be added as a key with it's cubeName as a value.
  const cubeNames: { [measureName: string]: CubeName } = {};
  const namesOfCalculatedMeasurestoMigrate: string[] = [];
  // For each widget, find the calculated measures.
  const migratedWidgetsRecord = produce(widgets, (draft) => {
    draft.children.content.children = _mapValues(
      widgets.children.content.children,
      (widgetRecord) => {
        const widgetState: AWidgetState = JSON.parse(
          widgetRecord.entry.content,
        );
        const mdx = widgetState.query.mdx;
        console.log(mdx);
        const parsedMdx: MdxSelect = parse(mdx);

        //The keys are the names of the calculated measures, a widget may have more than one calculated measure.
        const calculatedMeasuresKeysUsedByWidgetAndThatNeedToBeMigrated =
          _intersection(
            Object.keys(getCalculatedMeasures(parsedMdx)),
            namesOfCalculatedMeasurestoMigrate,
          );

        const cubeName = getCubeName(parsedMdx);
        const dataModel = {};
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
          draft?.query.mdx = stringifiedUpdatedMdx;
        });
        const updatedRecord = produce(widgetRecord, (draft) => {
          draft.entry.content = updatedWidgetState;
        });
        return updatedRecord;

        // TO DO - remove calculated member definitions from parsedMdx.
      },
    );
  });
  return { cubeNames, migratedWidgetsRecord };
};

// widget record
// const widgetRecord = {
//   entry: {
//     content: '{"widgetKey": "pivot-table", query: {mdx: \'some MDX\'}}',
//   },
// };
// const parsedRecordContent = {
//   widgetKey: "something",
//   query: {
//     mdx: ["MDX STRING"],
//   },
// };
// const parsedMdx = parse("MDX STRING");

// const updatedMdx = someManipulation(parsedMdx);
// const stringifiedUpdatedMdx = stringify(updatedMdx);
// const updatedRecordContent = produce(
//   parsedRecordContent,
//   (draft) => (draft.query.mdx = stringifiedUpdatedMdx),
// );
// const updatedRecord = produce(
//   widgetRecord,
//   (draft) => (draft.content = JSON.stringify(updatedRecordContent)),
// );
