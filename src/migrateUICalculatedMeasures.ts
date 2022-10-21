import {
  ContentEntry,
  ContentRecord,
  findContentRecords,
  getMetaData,
} from "@activeviam/activeui-sdk";

//entitlements
//cm
//cubeName
//[Measures].[cmName]
// {
//   "className": "com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription",
//   "additionalProperties": {},
//   "uniqueName": "[Measures].[Minus2]",
//   "expression": "Count(Descendants([Currency].[Currency].CurrentMember, [Currency].[Currency].[Currency]), EXCLUDEEMPTY)",
//   "formatStringExpression": "\"#,###.##\""
// }

interface auiCalculatedMeasureFolder {
  entry: ContentEntry;
  children: {
    content: ContentRecord;
    structure: ContentRecord;
  };
}


export const getCalculatedMeasureIds = (
  auiCalculatedMeasureFolder: auiCalculatedMeasureFolder,
): string[] => {
  const calculatedMeasures =
    auiCalculatedMeasureFolder.children?.content.children ?? {};
  return Object.keys(calculatedMeasures);
};

export const getUniqueCalculatedMeasureNames = (
  auiCalculatedMeasureFolder: auiCalculatedMeasureFolder,
): string[] => {
  const { structure } = auiCalculatedMeasureFolder.children;
  const ids = getCalculatedMeasureIds(auiCalculatedMeasureFolder);

  const contentRecords = findContentRecords(structure, ids);

  const calculatedMeasureNames = ids.map((id) => {
    const parsedName = JSON.parse(getMetaData(contentRecords[id].node, id));
    return parsedName.name;
  });

  return calculatedMeasureNames;
};
