import { ContentEntry, ContentRecord } from "@activeviam/activeui-sdk";
import { createAPCalculatedMeasure } from "./createAPCalculatedMeasure";
import { getCalculatedMeasureIds } from "./getCalculatedMeasureIds";
import { getUniqueCalculatedMeasureNames } from "./getUniqueCalculatedMeasureNames";
import {
  auiWidgetFolder,
  getCalculatedMeasuresFromWidgets,
} from "./getCalculatedMeasuresFromWidgets";

export interface cmFolder {
  [cubeName: string]: { entry: ContentEntry; children: ContentRecord };
}

/**
 * Returns the `cm` folder containing calculated measures organized by cube, that will be used inside the `pivot/entitlements` folder.
 */
export const createCMFolderWithinEntitlements = (
  widgets: auiWidgetFolder,
  legacyCalculatedMeasuresFolder: ContentRecord,
): cmFolder => {
  // Get all calculated measures used in saved widgets, organized by cube.
  const calculatedMeasuresByCube = getCalculatedMeasuresFromWidgets(widgets);
  const cubeNames = Object.keys(calculatedMeasuresByCube);

  // TO DO - Get all calculated measures from saved dashboards.

  // Loop over all saved measures in the aui 5.0 `calculated_measures` folder, get their ids and names.
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
      entry: {
        isDirectory: true,
        owners: ["ROLE_USER"],
        readers: ["ROLE_USER"],
      },
      // This is a safe typecast as the children object here will be filled below.
      children: {} as ContentRecord,
    };

    // For each calculated measure in each cube, get the data and add it to the children property.
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
