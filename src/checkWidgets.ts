import {
  ContentEntry,
  ContentRecord,
  getCalculatedMeasures,
  getCubeName,
  MdxSelect,
  parse,
} from "@activeviam/activeui-sdk";

export interface auiWidgetFolder {
  entry: ContentEntry;
  children: {
    content: ContentRecord;
    structure: ContentRecord;
  };
}

export const collectCalculatedMeasures = (
  widgetMdx: string,
): { [cubeName: string]: string[] } | undefined => {
  const parsedMdx: MdxSelect = parse(widgetMdx);
  const calculatedMeasuresUsedByWidget = Object.keys(
    getCalculatedMeasures(parsedMdx),
  );

  const cubeName = getCubeName(parsedMdx);
  if (calculatedMeasuresUsedByWidget.length !== 0) {
    return {
      [cubeName]: calculatedMeasuresUsedByWidget,
    };
  }
  return undefined;
};

export const getWidgetsMdx = (widgets: auiWidgetFolder): any[] => {
  if (!widgets.children.content.children) {
    return [];
  }
  const widgetsArray = Object.values(widgets.children.content.children);
  return widgetsArray.map((widget) => {
    const mdx = JSON.parse(widget.entry.content).query.mdx;
    const cubeName = collectCalculatedMeasures(mdx);
    return cubeName;
  });
};
