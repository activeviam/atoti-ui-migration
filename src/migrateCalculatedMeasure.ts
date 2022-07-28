import { generateId } from "./generateId";

export interface LegacyCalculatedMeasure {
  expression: string;
  formatStringExpression: string;
  uniqueName: string;
  canRead: boolean;
  canWrite: boolean;
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
  const { canRead, canWrite, owners, readers, uniqueName } =
    legacyCalculatedMeasure;

  const id = generateId();

  return {
    content: {
      [id]: {
        entry: {
          canRead,
          canWrite,
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
          canRead,
          canWrite,
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
              canRead,
              canWrite,
            },
          },
        },
      },
    },
  };
}
