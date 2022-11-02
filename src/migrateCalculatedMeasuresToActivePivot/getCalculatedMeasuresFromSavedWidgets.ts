import {
  ContentEntry,
  ContentRecord,
  CubeName,
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

/**
 * Takes as an argument the `/ui/widgets` folder on the content server.
 * Returns an object whose keys are the names of any calculated measures created in ActiveUI 5.0 that are used in any saved widgets, with the corresponding `cubeName` as a value.
 * @example {
      "calculated measure A": "CubeA",
      "calculated measure B": "CubeB",
    }
 */
export const getCalculatedMeasuresFromSavedWidgets = (
  widgets: auiWidgetFolder,
): { [measureName: string]: CubeName } => {
  if (!widgets.children.content.children) {
    return {};
  }
  // Create an empty object where each calculated measure used in a saved widget will be added as a key with it's cubeName as a value.
  const cubeNames: { [measureName: string]: CubeName } = {};

  // For each widget, find the calculated measures.
  const widgetsArray = Object.values(widgets.children.content.children);
  widgetsArray.map((widget) => {
    const mdx = JSON.parse(widget.entry.content).query.mdx;
    const parsedMdx: MdxSelect = parse(mdx);

    // The keys are the names of the calculated measures, a widget may have more than one calculated measure.
    const calculatedMeasuresKeysUsedByWidget = Object.keys(
      getCalculatedMeasures(parsedMdx),
    );

    const cubeName = getCubeName(parsedMdx);

    calculatedMeasuresKeysUsedByWidget.forEach((calculatedMeasure) => {
      cubeNames[calculatedMeasure] = cubeName;
    });

    // TO DO - remove calculated member definitions from parsedMdx.
  });
  return cubeNames;
};
