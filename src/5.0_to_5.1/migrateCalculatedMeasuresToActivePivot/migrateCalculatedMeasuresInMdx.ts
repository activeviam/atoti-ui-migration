import { DataModel, CubeName, getCube } from "@activeviam/data-model-5.0";
import {
  MdxString,
  MdxSelect,
  getCalculatedMeasures,
  getCubeName,
  stringify,
} from "@activeviam/mdx-5.0";
import { removeCalculatedMemberDefinition } from "@activeviam/mdx-5.1";
import { parse } from "@activeviam/activeui-sdk-5.0";
import _intersection from "lodash/intersection";

/**
 * Removes any calculated measures definitions from an MDX string matching the `namesOfCalculatedMeasuresToMigrate`.
 * Returns the updated MDX string, the names of calculated measures to be migrated from that particular widget and the corresponding cube name.
 */
export const migrateCalculatedMeasuresInMdx = (
  mdx: MdxString,
  namesOfCalculatedMeasurestoMigrate: string[],
  dataModel: DataModel,
): {
  cubeName: CubeName;
  namesOfCalculatedMeasuresToMigrateInWidget: string[];
  migratedMdx: MdxString;
} => {
  const parsedMdx: MdxSelect = parse(mdx);

  const namesOfCalculatedMeasuresToMigrateInWidget = _intersection(
    Object.keys(getCalculatedMeasures(parsedMdx)),
    namesOfCalculatedMeasurestoMigrate,
  );

  const cubeName = getCubeName(parsedMdx);

  let updatedMdx: MdxSelect = parsedMdx;
  namesOfCalculatedMeasuresToMigrateInWidget.forEach((calculatedMeasure) => {
    updatedMdx = removeCalculatedMemberDefinition(updatedMdx, {
      dimensionName: "Measures",
      hierarchyName: "Measures",
      namePath: [calculatedMeasure],
      cube: getCube(dataModel, cubeName),
    });
  });

  const migratedMdx = stringify(updatedMdx);
  return {
    cubeName,
    namesOfCalculatedMeasuresToMigrateInWidget,
    migratedMdx,
  };
};
