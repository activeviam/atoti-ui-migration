import { ContentRecord } from "@activeviam/activeui-sdk";

/**
 * Returns an array containing the ids of all the calculated measures in an ActiveUI 5.0 folder saved on the content server.
 */
export const getCalculatedMeasureIds = (
  legacyCalculatedMeasureFolder: ContentRecord,
): string[] => {
  const calculatedMeasures =
    legacyCalculatedMeasureFolder.children?.content.children ?? {};
  return Object.keys(calculatedMeasures);
};
