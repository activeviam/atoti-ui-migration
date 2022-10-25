import {
  ContentEntry,
  ContentRecord,
  getCalculatedMeasures,
  getCubeName,
  MdxSelect,
  parse,
} from "@activeviam/activeui-sdk";
import {
  createAPCalculatedMeasure,
  getCalculatedMeasureIds,
  getUniqueCalculatedMeasureNames,
} from "./migrateUICalculatedMeasures";
import { calculatedMeasures } from "./__test_resources__/calculatedMeasures";

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
    // If calculated measures are found, add them to the array for the corresponding cube.
    if (calculatedMeasuresUsedByWidget.length !== 0) {
      const cubeName = getCubeName(parsedMdx);
      if (cubes[cubeName]) {
        cubes[cubeName].push(...calculatedMeasuresUsedByWidget);
      } else {
        cubes[cubeName] = calculatedMeasuresUsedByWidget;
      }

      //To do - remove calculated member definition from parsedMdx
    }
  });
  return cubes;
};

export interface cmFolder {
  [cubeName: string]: { entry: ContentEntry; children: ContentRecord };
}
export const createCMFolder = (widgets: auiWidgetFolder): cmFolder => {

  // Loop over all saved widgets, return all calculated measures, ordered by cube
  const cubes = getCalculatedMeasuresFromWidgets(widgets);
  const cubeNames = Object.keys(cubes);

  // Loop over all saved measures, get their ids and names
  const ids = getCalculatedMeasureIds(calculatedMeasures);
  const names = getUniqueCalculatedMeasureNames(calculatedMeasures, ids);

// Create an empty cm folder
  const cmFolder: cmFolder = {};
  //For each cubeName, add a new object with entry and children properties
  cubeNames.map((cubeName) => {
    cmFolder[cubeName] = {
      //To do - add "entry" to each cube
      entry: {},
      children: {},
    };

    // For each calculated measure in each cube, get the data and add it to the children property
    cubes[cubeName].forEach((calculatedMeasureName) => {
      const index = names.findIndex((name) => name === calculatedMeasureName);
      const calculatedMeasureData = createAPCalculatedMeasure(
        calculatedMeasures,
        names[index],
        ids[index],
      );
      cmFolder[cubeName].children[calculatedMeasureName] =
        calculatedMeasureData;
    });
  });
  return cmFolder;
};
