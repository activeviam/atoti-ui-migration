import { ContentRecord } from "@activeviam/activeui-sdk";
import xml2js from "xml2js";

/**
 * Extracts and parses the XML calculated measure objects from the /pivot/entitlements/cm folder.
 */
export const getCalculatedMeasures = async (
  calculatedMeasuresFolder: ContentRecord
): Promise<
  {
    expression: string;
    formatStringExpression: string;
    uniqueName: string;
  }[]
> => {
  const parser = new xml2js.Parser();

  const calculatedMeasures: {
    expression: string;
    formatStringExpression: string;
    uniqueName: string;
  }[] = [];

  if (calculatedMeasuresFolder?.children) {
    await Promise.all(
      Object.values(calculatedMeasuresFolder?.children).map(
        async ({ children = {} }) => {
          const measures = await Promise.all(
            Object.values(children).map(async (cmEntry) => {
              const result = await parser.parseStringPromise(
                cmEntry.entry.content
              );

              return result.calculatedMember["$"];
            })
          );

          calculatedMeasures.push(...measures);
        }
      )
    );
  }

  return calculatedMeasures;
};
