import { ContentRecord } from "@activeviam/activeui-sdk";

/**
 * Returns the ids of the calculated measures created in ActiveUI 5.0 and saved in the legacy `/ui/calculated_measures` folder on the content server.
 */
export const getCalculatedMeasureIds = (
  legacyCalculatedMeasureFolder: ContentRecord,
): string[] => {
  const calculatedMeasures =
    legacyCalculatedMeasureFolder.children?.content.children ?? {};
  return Object.keys(calculatedMeasures);
};
