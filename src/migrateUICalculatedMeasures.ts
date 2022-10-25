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

// interface activePivotCalculatedMeasureFolder {
//   className: string;
//   additionalProperties: Record<string, unknown>;
//   uniqueName: string;
//   expression: string;
//   formatStringExpression: string;
// }

// interface activePivotCalculatedMeasureFolder {
//   entry: {
//     content: string;
//     isDirectory: boolean;
//     owners: string[];
//     readers: string[];
//     timestamp: number;
//     lastEditor: string;
//     canRead: boolean;
//     canWrite: boolean;
//   };
// }

export const getCalculatedMeasureIds = (
  auiCalculatedMeasureFolder: auiCalculatedMeasureFolder,
): string[] => {
  const calculatedMeasures =
    auiCalculatedMeasureFolder.children?.content.children ?? {};
  return Object.keys(calculatedMeasures);
};

export const getUniqueCalculatedMeasureNames = (
  auiCalculatedMeasureFolder: auiCalculatedMeasureFolder,
  ids: string[],
): string[] => {
  const { structure } = auiCalculatedMeasureFolder.children;

  const contentRecords = findContentRecords(structure, ids);

  const uniqueCalculatedMeasureNames = ids.map((id) => {
    const calculatedMeasureName = JSON.parse(
      getMetaData(contentRecords[id].node, id),
    ).name;
    return calculatedMeasureName;
  });

  return uniqueCalculatedMeasureNames;
};

export const getUniqueCalculatedMeasureContent = (
  auiCalculatedMeasureFolder: auiCalculatedMeasureFolder,
  name: string,
  id: string,
): string => {
  const { content } = auiCalculatedMeasureFolder.children;
  const expression = JSON.parse(content.children![id].entry.content).expression;
  const properties: string[] = JSON.parse(
    content.children![id].entry.content,
  ).properties;

  const formatStringExpression =
    properties.find((property) => property.startsWith("FORMAT_STRING")) ?? "";

  const calculatedMeasureContent = JSON.stringify({
    className:
      "com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription",
    additionalProperties: {},
    uniqueName: `[Measures].[${name}]`,
    expression: expression,
    formatStringExpression,
  });
  return calculatedMeasureContent;
};

export const createAPCalculatedMeasure = (
  auiCalculatedMeasureFolder: auiCalculatedMeasureFolder,
): { [name: string]: ContentRecord }[] => {
  const ids = getCalculatedMeasureIds(auiCalculatedMeasureFolder);
  const names = getUniqueCalculatedMeasureNames(
    auiCalculatedMeasureFolder,
    ids,
  );

  const { content } = auiCalculatedMeasureFolder.children;

  return names.map((name, index) => {
    const id = ids[index];
    const data = content.children![id];
    data.entry.content = getUniqueCalculatedMeasureContent(
      auiCalculatedMeasureFolder,
      name,
      id,
    );
    return {
      [`[Measures].[${name}]`]: data,
    };
  });
};
