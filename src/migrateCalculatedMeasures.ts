import { ContentRecord } from "@activeviam/activeui-sdk";
import { migrateCalculatedMeasure } from "./migrateCalculatedMeasure";
import { getCalculatedMeasures } from "./getCalculatedMeasures";

/**
 * Returns the converted content record tree for the calculted measures, ready to be used in ActiveUI 5.
 */
export async function migrateCalculatedMeasures(
  legacyPivotFolder: ContentRecord
): Promise<ContentRecord> {
  const entitlements = legacyPivotFolder?.children?.entitlements;
  const calculatedMeasuresFolder = entitlements?.children?.cm!;

  const legacyCalculatedMeasures = calculatedMeasuresFolder
    ? await getCalculatedMeasures(calculatedMeasuresFolder)
    : [];

  const migratedCalculatedMeasures = legacyCalculatedMeasures.map(
    (legacyMeasure) => migrateCalculatedMeasure(legacyMeasure)
  );

  return {
    entry: {
      ...calculatedMeasuresFolder.entry,
    },
    children: {
      content: {
        entry: {
          ...calculatedMeasuresFolder.entry,
        },
        children: migratedCalculatedMeasures.reduce((acc, currentCM) => {
          return { ...acc, ...currentCM.content };
        }, {}),
      },
      structure: {
        entry: {
          ...calculatedMeasuresFolder.entry,
        },
        children: migratedCalculatedMeasures.reduce((acc, currentCM) => {
          return { ...acc, ...currentCM.structure };
        }, {}),
      },
    },
  };
}
