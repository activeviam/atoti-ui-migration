import { ContentEntry, ContentRecord } from "@activeviam/activeui-sdk";

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
