import { ContentRecord } from "@activeviam/activeui-sdk";
import { migrateCalculatedMeasure } from "./migrateCalculatedMeasure";

/**
 * Returns the converted content record tree for the calculted measures, ready to be used in ActiveUI 5.
 */
export function migrateCalculatedMeasures(
  legacyCalculatedMeasures: {
    expression: string;
    formatStringExpression: string;
    uniqueName: string;
    id: string;
  }[]
): ContentRecord {
  return {
    entry: {
      isDirectory: true,
      owners: ["ROLE_USER"],
      readers: ["ROLE_USER"],
    },
    children: {
      content: {
        entry: {
          isDirectory: true,
          owners: ["ROLE_USER"],
          readers: ["ROLE_USER"],
        },
        children: legacyCalculatedMeasures
          .map((legacyMeasure) => migrateCalculatedMeasure(legacyMeasure))
          .reduce((acc, currentCM) => {
            return { ...acc, ...currentCM };
          }, {}),
      },
      structure: {
        entry: {
          isDirectory: true,
          owners: ["ROLE_USER"],
          readers: ["ROLE_USER"],
        },
        children: legacyCalculatedMeasures
          .map((legacyMeasure) => ({
            [legacyMeasure.id]: {
              entry: {
                isDirectory: true,
                owners: ["ROLE_USER"],
                readers: ["ROLE_USER"],
              },
              children: {
                [`${legacyMeasure.id}_metadata`]: {
                  entry: {
                    content: JSON.stringify({
                      name: legacyMeasure.uniqueName,
                    }),
                    owners: ["ROLE_USER"],
                    readers: ["ROLE_USER"],
                    isDirectory: false,
                  },
                },
              },
            },
          }))
          .reduce((acc, currentCM) => {
            return { ...acc, ...currentCM };
          }, {}),
      },
    },
  };
}
