import { ContentRecord } from "@activeviam/activeui-sdk";
import xml2js from "xml2js";
import _cloneDeep from "lodash/cloneDeep";
import { generateId } from "./generateId";

/**
 * Extracts and parses the XML calculated measure objects from the given pivot folder.
 */
const getCalculatedMeasuresFromPivotFolder = async (
  pivotFolder: ContentRecord
): Promise<
  {
    expression: string;
    formatStringExpression: string;
    uniqueName: string;
    id: string;
  }[]
> => {
  const parser = new xml2js.Parser();

  const calculatedMeasures: {
    expression: string;
    formatStringExpression: string;
    uniqueName: string;
    id: string;
  }[] = [];

  if (pivotFolder?.children) {
    await Promise.all(
      Object.values(pivotFolder?.children).map(async ({ children = {} }) => {
        const calculatedMeasureEntries = Object.entries(children);

        const measures = await Promise.all(
          calculatedMeasureEntries.map(async (cmEntry) => {
            const [_, entry] = cmEntry;
            const result = await parser.parseStringPromise(entry.entry.content);
            const id = generateId();

            return { id, ...result.calculatedMember["$"] };
          })
        );

        calculatedMeasures.push(...measures);
      })
    );
  }

  return calculatedMeasures;
};

/**
 * Returns the migrated UI folder, along with the converted saved calculated measures from their location in ActiveUI 4 to their respective location in ActiveUI 5.
 */
export async function migratePivotFolder(
  legacyPivotFolder: ContentRecord,
  migratedUIFolder: ContentRecord
) {
  const entitlements = legacyPivotFolder.children?.entitlements;
  const calculatedMeasuresRoot = entitlements?.children?.cm;
  const migratedUIFolderWithCalculatedMeasures = _cloneDeep(migratedUIFolder);

  const calculatedMeasuresToMigrate = calculatedMeasuresRoot
    ? await getCalculatedMeasuresFromPivotFolder(calculatedMeasuresRoot)
    : undefined;

  const migratedCalculatedMeasuresEntry =
    (migratedUIFolderWithCalculatedMeasures.children &&
      migratedUIFolderWithCalculatedMeasures.children.calculated_measures) || {
      entry: { isDirectory: true },
      children: {
        content: { children: {} },
        structure: { children: {} },
      },
    };

  // The entry for the calculated measures already exists, just add them under children.content and children.structure

  const calculatedMeasuresNames = calculatedMeasuresToMigrate?.map(
    (measure) => ({ [measure.id]: measure.uniqueName })
  );
  const measuresContentEntries = calculatedMeasuresToMigrate
    ? calculatedMeasuresToMigrate
        .map((measure) => {
          return {
            [measure.id]: {
              entry: {
                content: JSON.stringify({
                  expression: measure.expression,
                  properties: [
                    `FORMAT_STRING=${measure.formatStringExpression}`,
                  ],
                }),
                isDirectory: false,
              },
            },
          };
        })
        .reduce((acc, currentCM) => {
          return { ...acc, ...currentCM };
        }, {})
    : {};

  const measuresStructureEntries = (calculatedMeasuresNames || [])
    ?.map((measure) => {
      const [[id, name]] = Object.entries(measure);

      return {
        [id]: {
          entry: {
            isDirectory: true,
          },
          children: {
            [`${id}_metadata`]: {
              entry: {
                content: JSON.stringify({
                  name,
                }),
                isDirectory: false,
              },
            },
          },
        },
      };
    })
    .reduce((acc, currentCM) => {
      return { ...acc, ...currentCM };
    }, {});

  const migratedMeasuresContent =
    // @ts-ignore This is safe to ingore due to the typecheck above that ensures that `migratedCalculatedMeasuresEntry.children` will not be undefined.
    migratedCalculatedMeasuresEntry.children.content;

  const migratedMeasuresStructure =
    // @ts-ignore This is safe to ingore due to the typecheck above that ensures that `migratedCalculatedMeasuresEntry.children` will not be undefined.
    migratedCalculatedMeasuresEntry.children.structure;

  migratedMeasuresStructure.children = {
    ...migratedMeasuresStructure.children,
    ...measuresStructureEntries,
  };

  migratedMeasuresContent.children = {
    ...migratedMeasuresContent.children,
    ...measuresContentEntries,
  };

  migratedUIFolderWithCalculatedMeasures.children = {
    ...migratedUIFolderWithCalculatedMeasures.children,
    calculated_measures: {
      entry: {
        isDirectory: true,
        readers: ["ROLE_USER"],
        owners: ["ROLE_USER"],
        ...(migratedUIFolderWithCalculatedMeasures.children?.calculated_measures
          ?.entry || {}),
      },
      children: {
        content: {
          entry: {
            isDirectory: true,
            readers: ["ROLE_USER"],
            owners: ["ROLE_USER"],
          },
          ...migratedMeasuresContent,
        },
        structure: {
          entry: {
            isDirectory: true,
            readers: ["ROLE_USER"],
            owners: ["ROLE_USER"],
          },
          ...migratedMeasuresStructure,
        },
      },
    },
  };

  return migratedUIFolderWithCalculatedMeasures;
}
