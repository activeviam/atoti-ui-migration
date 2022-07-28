import { ContentRecord } from "@activeviam/activeui-sdk";
import {
  migrateCalculatedMeasure,
  LegacyCalculatedMeasure,
} from "./migrateCalculatedMeasure";

/**
 * Returns the converted content record tree for the calculted measures, ready to be used in ActiveUI 5.
 */
export function migrateCalculatedMeasures(
  legacyCalculatedMeasures: LegacyCalculatedMeasure[],
  calculatedMeasuresFolder: ContentRecord
): ContentRecord {
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
