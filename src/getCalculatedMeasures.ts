import { ContentRecord } from "@activeviam/activeui-sdk";
import xml2js from "xml2js";
import { LegacyCalculatedMeasure } from "./migrateCalculatedMeasure";

/**
 * Extracts and parses the XML calculated measure objects from the /pivot/entitlements/cm folder.
 */
export const getCalculatedMeasures = async (
  calculatedMeasuresFolder: ContentRecord
): Promise<LegacyCalculatedMeasure[]> => {
  const parser = new xml2js.Parser();

  const calculatedMeasures: LegacyCalculatedMeasure[] = [];

  if (calculatedMeasuresFolder?.children) {
    await Promise.all(
      Object.values(calculatedMeasuresFolder?.children).map(
        async ({ children = {} }) => {
          const measures = await Promise.all(
            Object.values(children).map(async (cmEntry) => {
              const result = await parser.parseStringPromise(
                cmEntry.entry.content
              );

              const { owners, readers, isDirectory, canRead, canWrite } =
                cmEntry.entry;

              const calculatedMeasure = {
                owners,
                readers,
                isDirectory,
                canRead,
                canWrite,
                /*
                  xml2js parses the given XML and returns an object of the shape:

                  {
                    calculatedMember: {$: {...}, additionalProperties: {...}}
                  }

                  In this case, the data that is required (`expression`, `formatStringExpression`, and `uniqueName`) lives within the `$` property/
                */
                ...result.calculatedMember["$"],
              };

              return calculatedMeasure;
            })
          );

          calculatedMeasures.push(...measures);
        }
      )
    );
  }

  return calculatedMeasures;
};
