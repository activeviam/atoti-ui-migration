import { getCube } from "@activeviam/activeui-sdk-5.1";
import { CubeName } from "@activeviam/data-model-5.0";
import {
  MdxSelect,
  getCalculatedMeasures,
  getCubeName,
} from "@activeviam/mdx-5.0";
import { removeCalculatedMemberDefinition } from "@activeviam/mdx-5.1";
import { getIndexedDataModel } from "@activeviam/data-model-5.1";
import _intersection from "lodash/intersection";
import { DataModel } from "@activeviam/activeui-sdk-5.0";

/**
 * Removes the definitions of the calculated measures matching `namesOfCalculatedMeasuresToMigrate` from the `WITH` clause of `mdx`.
 * Returns the updated MDX, the names of those calculated measures, and the corresponding cube name.
 */
export const migrateCalculatedMeasuresInMdx = (
  mdx: MdxSelect,
  namesOfCalculatedMeasurestoMigrate: string[],
  dataModel: DataModel,
): {
  cubeName: CubeName;
  namesOfCalculatedMeasuresToMigrateInWidget: string[];
  migratedMdx: MdxSelect;
} => {
  const namesOfCalculatedMeasuresToMigrateInWidget = _intersection(
    Object.keys(getCalculatedMeasures(mdx)),
    namesOfCalculatedMeasurestoMigrate,
  );

  const cubeName = getCubeName(mdx);

  const updatedMdx = namesOfCalculatedMeasuresToMigrateInWidget.reduce(
    (acc, calculatedMeasureName) =>
      removeCalculatedMemberDefinition(acc, {
        dimensionName: "Measures",
        hierarchyName: "Measures",
        calculatedMemberName: calculatedMeasureName,
        cube: getCube(getIndexedDataModel(dataModel), cubeName),
      }),
    mdx,
  );

  return {
    cubeName,
    namesOfCalculatedMeasuresToMigrateInWidget,
    migratedMdx: updatedMdx,
  };
};
