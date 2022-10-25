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
 * Takes a folder of widgets from AUI 5.0 and returns an object containing arrays of all the calculated measure found with the cubeName as the key.
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
  // Create a cube object to add each calculated measure to the corresponding cube
  const cubes: { [cubeName: string]: string[] } = {};
  const widgetsArray = Object.values(widgets.children.content.children);

  // For each widget, find the calculated measures
  widgetsArray.map((widget) => {
    const mdx = JSON.parse(widget.entry.content).query.mdx;
    const parsedMdx: MdxSelect = parse(mdx);

    // The keys are the names of the calculated measures
    // A widget may have more than one calculated measure
    const calculatedMeasuresUsedByWidget = Object.keys(
      getCalculatedMeasures(parsedMdx),
    );
    const cubeName = getCubeName(parsedMdx);

    // If calculated measures are found, add them to the array for the corresponding cube.
    if (calculatedMeasuresUsedByWidget.length !== 0) {
      // If cubes[cubeName] already exists, add calculated measures to existing array, otherwise create new array.
      // Use Set to ensure no duplicates
      cubes[cubeName]
        ? [...new Set(cubes[cubeName].concat(calculatedMeasuresUsedByWidget))]
        : (cubes[cubeName] = [...new Set(calculatedMeasuresUsedByWidget)]);

      // remove calculated member definition from parsedMdx
    }
  });
  return cubes;
};
