import { DataModel, CubeName, getCube } from "@activeviam/data-model-5.0";
import {
  MdxSelect,
  getCalculatedMeasures,
  getCubeName,
} from "@activeviam/mdx-5.0";
import { removeCalculatedMemberDefinition } from "@activeviam/mdx-5.1";
import _intersection from "lodash/intersection";

/**
 * Removes any calculated measures definitions from an MDX string matching the `namesOfCalculatedMeasuresToMigrate`.
 * Returns the updated MDX string, the names of calculated measures to be migrated from that particular widget and the corresponding cube name.
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
  let updatedMdx: MdxSelect = mdx;
  namesOfCalculatedMeasuresToMigrateInWidget.forEach((calculatedMeasure) => {
    updatedMdx = removeCalculatedMemberDefinition(updatedMdx, {
      dimensionName: "Measures",
      hierarchyName: "Measures",
      namePath: [calculatedMeasure],
      cube: getCube(dataModel, cubeName),
    });
  });

  return {
    cubeName,
    namesOfCalculatedMeasuresToMigrateInWidget,
    migratedMdx: updatedMdx,
  };
};
