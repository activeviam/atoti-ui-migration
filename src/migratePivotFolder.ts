import { ContentRecord, DataModel } from "@activeviam/activeui-sdk";
import xml2js from "xml2js";
import { v4 as uuid } from "uuid";
import _cloneDeep from "lodash/cloneDeep";

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
            const id = uuid().substring(24, 27);

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

  console.log({ calculatedMeasuresToMigrate });

  // Now that we have the measures, we need to assign the structure and content for each of them.
  const migratedCalculatedMeasuresEntry =
    migratedUIFolderWithCalculatedMeasures.children?.calculated_measures;

  // The entry for the calculated measures already exists, just add them under children.content and children.structure
  if (
    migratedCalculatedMeasuresEntry &&
    migratedCalculatedMeasuresEntry.children
  ) {
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
      migratedCalculatedMeasuresEntry.children.content;

    const migratedMeasuresStructure =
      migratedCalculatedMeasuresEntry.children.structure;

    // @ts-ignore
    migratedMeasuresStructure.children = {
      ...migratedMeasuresStructure.children,
      ...measuresStructureEntries,
    };

    // @ts-ignore
    migratedMeasuresContent.children = {
      ...migratedMeasuresContent.children,
      ...measuresContentEntries,
    };

    return migratedUIFolderWithCalculatedMeasures;
  }

  return migratedUIFolder;
}
