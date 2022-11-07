import { DataModel, CubeName, getCube } from "@activeviam/data-model";
import {
  MdxString,
  MdxSelect,
  getCalculatedMeasures,
  getCubeName,
  removeCalculatedMemberDefinition,
  stringify,
} from "@activeviam/mdx";
import { parse } from "@activeviam/activeui-sdk";
import _intersection from "lodash/intersection";

export const removeCalculatedMemberDefinitionFromMDXAndGetCubeName = (
  mdx: MdxString,
  namesOfCalculatedMeasurestoMigrate: string[],
  dataModel: DataModel,
): {
  calculatedMeasuresWithCubeNames: { [measureName: string]: CubeName };
  stringifiedUpdatedMdx: MdxString;
} => {
  const calculatedMeasuresWithCubeNames: { [measureName: string]: CubeName } =
    {};
  const parsedMdx: MdxSelect = parse(mdx);

  const calculatedMeasuresKeysUsedByWidgetToBeMigrated = _intersection(
    // The keys are the names of the calculated measures, a widget may have more than one calculated measure.
    Object.keys(getCalculatedMeasures(parsedMdx)),
    namesOfCalculatedMeasurestoMigrate,
  );

  const cubeName = getCubeName(parsedMdx);

  let updatedMdx: MdxSelect = parsedMdx;
  calculatedMeasuresKeysUsedByWidgetToBeMigrated.forEach(
    (calculatedMeasure) => {
      calculatedMeasuresWithCubeNames[calculatedMeasure] = cubeName;
      updatedMdx = removeCalculatedMemberDefinition(updatedMdx, {
        dimensionName: "Measures",
        hierarchyName: "Measures",
        namePath: [calculatedMeasure],
        cube: getCube(dataModel, cubeName),
      });
    },
  );

  const stringifiedUpdatedMdx = stringify(updatedMdx);
  return { calculatedMeasuresWithCubeNames, stringifiedUpdatedMdx };
};
