import {
  ContentRecord,
  findContentRecords,
} from "@activeviam/activeui-sdk-5.0";
import _map from "lodash/map";
import { _getMetaData } from "../../_getMetaData";

/**
 * Returns the names of the calculated measures to migrate, indexed by the corresponding file ids under /ui/calculated_measures/content.
 */
export function getNamesOfCalculatedMeasuresToMigrate(
  contentServer: ContentRecord,
): string[] {
  const calculatedMeasuresFolder =
    contentServer.children?.ui?.children?.calculated_measures;

  const { content, structure } = calculatedMeasuresFolder?.children ?? {};
  if (!content?.children || !structure?.children) {
    return [];
  }

  const structureRecords = findContentRecords(
    structure,
    Object.keys(content.children),
  );

  return _map(structureRecords, ({ pathToParentFolder }, id) => {
    const metadata = _getMetaData(structure, pathToParentFolder, id);
    // TODO https://support.activeviam.com/jira/browse/UI-8110 Remove the cast when `name` is mandatory in the SDK. 
    return metadata.name!;
  });
}
