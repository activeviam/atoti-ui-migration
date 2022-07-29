import { generateId } from "./generateId";

export interface LegacyCalculatedMeasure {
  expression: string;
  formatStringExpression: string;
  uniqueName: string;
  owners: string[];
  readers: string[];
  isDirectory: boolean;
}

/**
 * Returns a converted calculated measure, ready to be used in ActiveUI 5.
 */
export function migrateCalculatedMeasure(
  legacyCalculatedMeasure: LegacyCalculatedMeasure
) {
  const { owners, readers, uniqueName } = legacyCalculatedMeasure;

  const id = generateId();

  return {
    content: {
      [id]: {
        entry: {
          owners,
          readers,
          isDirectory: false,
          content: JSON.stringify({
            expression: legacyCalculatedMeasure.expression,
            properties: [
              `FORMAT_STRING=${legacyCalculatedMeasure.formatStringExpression}`,
            ],
          }),
        },
      },
    },
    structure: {
      [id]: {
        entry: {
          isDirectory: true,
          owners,
          readers,
        },
        children: {
          [`${id}_metadata`]: {
            entry: {
              content: JSON.stringify({ name: uniqueName }),
              owners,
              readers,
              isDirectory: false,
            },
          },
        },
      },
    },
  };
}
