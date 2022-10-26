import {
  ContentRecord,
  findContentRecords,
  getMetaData,
} from "@activeviam/activeui-sdk";

/**
 * Returns an array containing the unique names of all the calculated measures in an ActiveUI 5.0 folder saved on the content server.
 */
export const getUniqueCalculatedMeasureNames = (
  legacyCalculatedMeasureFolder: ContentRecord,
  ids: string[],
): string[] => {
  const { structure } = legacyCalculatedMeasureFolder.children ?? {};
  const contentRecords = structure ? findContentRecords(structure, ids) : {};

  const uniqueCalculatedMeasureNames = ids.map((id) => {
    const calculatedMeasureName = JSON.parse(
      getMetaData(contentRecords[id].node, id),
    ).name;
    return calculatedMeasureName;
  });

  return uniqueCalculatedMeasureNames;
};
