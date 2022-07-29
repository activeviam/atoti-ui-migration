import { ContentRecord } from "@activeviam/activeui-sdk";
import { getCalculatedMeasures } from "./getCalculatedMeasures";
import { generateId } from "./generateId";

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

  const contentFolder = {
    entry: { isDirectory: true, owners: ["ROLE_USER"], readers: ["ROLE_USER"] },
    children: {},
  };

  const structureFolder = {
    entry: { isDirectory: true, owners: ["ROLE_USER"], readers: ["ROLE_USER"] },
    children: {},
  };

  legacyCalculatedMeasures.forEach((legacyMeasure) => {
    const { owners, readers, expression, formatStringExpression, uniqueName } =
      legacyMeasure;

    const id = generateId();

    contentFolder.children = {
      ...contentFolder.children,
      [id]: {
        entry: {
          owners,
          readers,
          isDirectory: false,
          content: JSON.stringify({
            expression,
            properties: [`FORMAT_STRING=${formatStringExpression}`],
          }),
        },
      },
    };

    structureFolder.children = {
      ...structureFolder.children,
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
    };
  });

  return {
    entry: {
      ...calculatedMeasuresFolder.entry,
    },
    children: {
      content: contentFolder,
      structure: structureFolder,
    },
  };
}
