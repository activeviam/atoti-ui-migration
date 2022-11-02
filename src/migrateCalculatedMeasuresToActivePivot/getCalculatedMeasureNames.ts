import {
  ContentRecord,
  findContentRecords,
  getMetaData,
} from "@activeviam/activeui-sdk";

/**
 * Returns the names of the calculated measures created in ActiveUI 5.0 and saved in the legacy `/ui/calculated_measures` folder on the content server.
 */
export const getCalculatedMeasureNames = (
  legacyCalculatedMeasureFolder: ContentRecord,
  ids: string[],
): string[] => {
  const { structure } = legacyCalculatedMeasureFolder.children ?? {};
  const contentRecords = structure ? findContentRecords(structure, ids) : {};

  const calculatedMeasureNames = ids.map((id) => {
    const name = JSON.parse(getMetaData(contentRecords[id].node, id)).name;
    return name;
  });

  return calculatedMeasureNames;
};
