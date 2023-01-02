import {
  ContentRecord,
  findContentRecords,
  getMetaData,
} from "@activeviam/activeui-sdk-5.0";
import _mapValues from "lodash/mapValues";

/**
 * Returns the names of the calculated measures to migrate, indexed by the corresponding file ids under /ui/calculated_measures/content.
 */
export function getNamesOfCalculatedMeasuresToMigrateById(
  contentServer: ContentRecord,
): { [id: string]: string } {
  const calculatedMeasuresFolder =
    contentServer.children?.ui?.children?.calculated_measures;

  const { content, structure } = calculatedMeasuresFolder?.children ?? {};
  if (!content?.children || !structure?.children) {
    return {};
  }

  const structureRecords = findContentRecords(
    structure,
    Object.keys(content.children),
  );
  return _mapValues(
    structureRecords,
    ({ node }, id) => getMetaData(node, id).name,
  );
}
