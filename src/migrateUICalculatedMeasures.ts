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

interface apCalculatedMeasureFolder {
  measureName: {
    className: string;
    additionalProperties: Object;
    uniqueName: string;
    expression: string;
    formatStringExpression: string;
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

  const uniqueCalculatedMeasureNames = ids.map((id) => {
    const calculatedMeasureName = JSON.parse(
      getMetaData(contentRecords[id].node, id),
    ).name;
    return `[Measures].[${calculatedMeasureName}]`;
  });

  return uniqueCalculatedMeasureNames;
};

export const calMesContent = (
  auiCalculatedMeasureFolder: auiCalculatedMeasureFolder,
): any => {
  const ids = getCalculatedMeasureIds(auiCalculatedMeasureFolder);
  const { content } = auiCalculatedMeasureFolder.children;

  const expressions = ids.map((id) => {
    return JSON.parse(content.children![id].entry.content).expression;
  });
  const properties = ids.map((id) => {
    return JSON.parse(content.children![id].entry.content).properties;
  });

  return [expressions, properties];
};

export const getUniqueCalculatedMeasureFolder = (
  calculatedMeasureName: string,
): apCalculatedMeasureFolder => {
  return {
    measureName: {
      className:
        "com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription",
      additionalProperties: {},
      uniqueName: calculatedMeasureName,
      expression: string,
      formatStringExpression: string,
    },
  };
};
