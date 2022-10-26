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
  const calculatedMeasuresByCube: { [cubeName: string]: string[] } = {};
  const widgetsArray = Object.values(widgets.children.content.children);

  // For each widget, find the calculated measures
  widgetsArray.map((widget) => {
    const mdx = JSON.parse(widget.entry.content).query.mdx;
    const parsedMdx: MdxSelect = parse(mdx);

    // The keys are the names of the calculated measures
    // A widget may have more than one calculated measure
    const calculatedMeasuresKeysUsedByWidget = Object.keys(
      getCalculatedMeasures(parsedMdx),
    );
    // If calculated measures are found, add them to the array for the corresponding cube.
    if (calculatedMeasuresKeysUsedByWidget.length !== 0) {
      const cubeName = getCubeName(parsedMdx);
      if (calculatedMeasuresByCube[cubeName]) {
        calculatedMeasuresByCube[cubeName].push(
          ...calculatedMeasuresKeysUsedByWidget,
        );
      } else {
        calculatedMeasuresByCube[cubeName] = calculatedMeasuresKeysUsedByWidget;
      }

      //To do - remove calculated member definition from parsedMdx
    }
  });
  return calculatedMeasuresByCube;
};

export interface cmFolder {
  [cubeName: string]: { entry: ContentEntry; children: ContentRecord };
}

export const createCMFolderWithinEntitlements = (
  widgets: auiWidgetFolder,
  legacyCalculatedMeasuresFolder: ContentRecord,
): cmFolder => {
  // Loop over all saved widgets, return all calculated measures, ordered by cube
  const calculatedMeasuresByCube = getCalculatedMeasuresFromWidgets(widgets);
  const cubeNames = Object.keys(calculatedMeasuresByCube);

  // Loop over all saved measures, get their ids and names
  const ids = getCalculatedMeasureIds(legacyCalculatedMeasuresFolder);
  const existingCalculatedMeasureNames = getUniqueCalculatedMeasureNames(
    legacyCalculatedMeasuresFolder,
    ids,
  );

  // Create an empty cm folder
  const cmFolder: cmFolder = {};

  //For each cubeName, add a new object with entry and children properties
  cubeNames.map((cubeName) => {
    cmFolder[cubeName] = {
      //To do - add "entry" to each cube
      entry: {
        isDirectory: true,
        owners: ["ROLE_USER"],
        readers: ["ROLE_USER"],
      },
      // This is a safe typecast as the children object here will be filled below.
      children: {} as ContentRecord,
    };

    // For each calculated measure in each cube, get the data and add it to the children property
    calculatedMeasuresByCube[cubeName].forEach((calculatedMeasureName) => {
      const index = existingCalculatedMeasureNames.findIndex(
        (name) => name === calculatedMeasureName,
      );

      const quotedMeasureName = `[Measures].[${calculatedMeasureName}]`;
      const calculatedMeasureData = createAPCalculatedMeasure(
        legacyCalculatedMeasuresFolder,
        existingCalculatedMeasureNames[index],
        ids[index],
      );

      if (calculatedMeasureData) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        cmFolder[cubeName].children[quotedMeasureName] = calculatedMeasureData;
      }
    });
  });
  return cmFolder;
};
