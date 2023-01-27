import _flatMap from "lodash/flatMap";
import { Cube, DataModel } from "@activeviam/activeui-sdk-5.1";

/**
 * Returns a flat list of all the cubes in the input `dataModels`.
 */
export function getAllCubes(dataModels: {
  [serverKey: string]: DataModel;
}): Cube[] {
  return _flatMap(dataModels, (dataModel) =>
    _flatMap(dataModel.catalogs, (catalog) => Object.values(catalog.cubes)),
  );
}
