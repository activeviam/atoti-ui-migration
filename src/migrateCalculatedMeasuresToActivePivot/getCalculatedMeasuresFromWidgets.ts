import {
  ContentEntry,
  ContentRecord,
  getCalculatedMeasures,
  getCubeName,
  MdxSelect,
  parse,
} from "@activeviam/activeui-sdk";

export interface auiWidgetFolder {
  entry: ContentEntry;
  children: {
    content: ContentRecord;
    structure: ContentRecord;
  };
}

/**
 * Takes a folder of saved widgets from AUI 5.0 and returns an object containing an array of the names of all the calculated measures for each cube, with the cubeName as the key.
 * @example {
 *            cubeOne: [calculatedMeasureOne, calculatedMeasureTwo],
 *            cubeTwo: [anotherCalculatedMeasure]
 *           }
 */
export const getCalculatedMeasuresFromWidgets = (
  widgets: auiWidgetFolder,
): { [cubeName: string]: string[] } => {
  if (!widgets.children.content.children) {
    return {};
  }
  // Create an empty object where each calculated measure will be added to the corresponding cube below.
  const calculatedMeasuresByCube: { [cubeName: string]: string[] } = {};

  // For each widget, find the calculated measures.
  const widgetsArray = Object.values(widgets.children.content.children);
  widgetsArray.map((widget) => {
    const mdx = JSON.parse(widget.entry.content).query.mdx;
    const parsedMdx: MdxSelect = parse(mdx);

    // The keys are the names of the calculated measures.
    // A widget may have more than one calculated measure.
    const calculatedMeasuresKeysUsedByWidget = Object.keys(
      getCalculatedMeasures(parsedMdx),
    );

    // TO DO - remove calculated member definitions from parsedMdx.

    // If calculated measures are found, add them to the array for the corresponding cube.
    if (calculatedMeasuresKeysUsedByWidget.length !== 0) {
      const cubeName = getCubeName(parsedMdx);
      // If the `cubeName` is already in the object, push the additional calculated measure names into the array.
      if (calculatedMeasuresByCube[cubeName]) {
        calculatedMeasuresByCube[cubeName].push(
          ...calculatedMeasuresKeysUsedByWidget,
        );
        // Otherwise add a new entry with `cubeName` as the key and the array `calculatedMeasureKeysUsedByWidget` as the value.
      } else {
        calculatedMeasuresByCube[cubeName] = calculatedMeasuresKeysUsedByWidget;
      }
      // Remove any duplicates.
      calculatedMeasuresByCube[cubeName] = [
        ...new Set(calculatedMeasuresByCube[cubeName]),
      ];
    }
  });
  return calculatedMeasuresByCube;
};
