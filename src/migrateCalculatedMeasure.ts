interface LegacyCalculatedMeasure {
  expression: string;
  formatStringExpression: string;
  uniqueName: string;
  id: string;
}

/**
 * Returns a converted calculated measure, ready to be used in ActiveUI 5.
 */
export function migrateCalculatedMeasure(
  legacyCalculatedMeasure: LegacyCalculatedMeasure
) {
  return {
    [legacyCalculatedMeasure.id]: {
      entry: {
        isDirectory: false,
        content: JSON.stringify({
          expression: legacyCalculatedMeasure.expression,
          properties: [
            `FORMAT_STRING=${legacyCalculatedMeasure.formatStringExpression}`,
          ],
        }),
        owners: ["ROLE_USER"],
        readers: ["ROLE_USER"],
      },
    },
  };
}
