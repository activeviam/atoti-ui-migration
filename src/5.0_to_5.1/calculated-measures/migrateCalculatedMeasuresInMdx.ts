import { DataModel, getTargetCube } from "@activeviam/activeui-sdk-5.1";
import {
  CubeName,
  getCalculatedMeasures,
  getCubeName,
  MdxSelect,
  MdxDrillthrough,
} from "@activeviam/activeui-sdk-5.0";
import {
  removeCalculatedMemberDefinition,
  isMdxDrillthrough,
} from "@activeviam/mdx-5.1";
import _intersection from "lodash/intersection";

/**
 * Removes the definitions of the calculated measures matching `namesOfCalculatedMeasuresToMigrate` from the `WITH` clause of `mdx`.
 * Returns the updated MDX, the names of those calculated measures, and the corresponding cube name.
 */
export const migrateCalculatedMeasuresInMdx = ({
  mdx,
  serverKey,
  dataModels,
  namesOfCalculatedMeasuresToMigrate,
}: {
  mdx: MdxSelect | MdxDrillthrough;
  serverKey?: string;

  dataModels: { [serverKey: string]: DataModel };

  namesOfCalculatedMeasuresToMigrate: string[];
}): {
  cubeName: CubeName;
  namesOfCalculatedMeasuresRemovedFromMdx: string[];
  migratedMdx: MdxSelect | MdxDrillthrough;
} => {
  const namesOfCalculatedMeasuresToMigrateInWidget = _intersection(
    Object.keys(getCalculatedMeasures(mdx)),
    namesOfCalculatedMeasuresToMigrate,
  );

  const cubeName = getCubeName(mdx);
  const { cube } = getTargetCube({ dataModels, serverKey, cubeName });

  const mdxSelect = isMdxDrillthrough(mdx) ? mdx.select : mdx;

  const updatedMdx = namesOfCalculatedMeasuresToMigrateInWidget.reduce(
    (acc, calculatedMeasureName) =>
      removeCalculatedMemberDefinition(acc, {
        dimensionName: "Measures",
        hierarchyName: "Measures",
        calculatedMemberName: calculatedMeasureName,
        cube,
      }),
    mdxSelect,
  );

  return {
    cubeName,
    namesOfCalculatedMeasuresRemovedFromMdx:
      namesOfCalculatedMeasuresToMigrateInWidget,
    migratedMdx: isMdxDrillthrough(mdx)
      ? { ...mdx, select: updatedMdx }
      : updatedMdx,
  };
};
