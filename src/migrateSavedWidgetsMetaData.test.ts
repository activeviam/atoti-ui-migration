import _cloneDeep from "lodash/cloneDeep";
import { migrateSavedWidgetsMetaData } from "./5.0_to_5.1/migrateSavedWidgetsMetaData";
import { contentServer as testContentServer } from "./5.0_to_5.1/__test_resources__/contentServer";
import { _getFilesAncestry } from "./_getFilesAncestry";
import { _getMetaData } from "./_getMetaData";
import { WidgetMetaData } from "@activeviam/activeui-sdk-5.1";

describe("migrateSavedWidgetsMetaData", () => {
  it("adds a `version` attribute set to 1 to saved widgets that don't have one", () => {
    const contentServer = _cloneDeep(testContentServer);
    const { content: widgetsContent, structure: widgetsStructure } =
      contentServer.children!.ui.children!.widgets.children!;
    const filesAncestry = _getFilesAncestry(widgetsStructure);

    // "df2" and "663"'s metadata don't have a version.
    ["df2", "663"].forEach((widgetId) => {
      const pathToParentFolder = filesAncestry[widgetId].map(({ id }) => id);
      const metaData = _getMetaData<WidgetMetaData>(
        widgetsStructure,
        pathToParentFolder,
        widgetId,
      );

      expect(metaData.version).toBeUndefined();
    });

    migrateSavedWidgetsMetaData(contentServer);

    // All saved widgets metadata have a version attribute now:
    // - the original one if they had one originally
    // - with the value 1 if they didn't have one previously
    Object.keys(widgetsContent.children!).forEach((widgetId) => {
      const pathToParentFolder = filesAncestry[widgetId].map(({ id }) => id);
      const metaData = _getMetaData<WidgetMetaData>(
        widgetsStructure,
        pathToParentFolder,
        widgetId,
      );

      switch (widgetId) {
        case "df2":
        case "663":
          expect(metaData.version).toBe(1);
          break;
        default:
          const originalWidgetsStructure =
            contentServer.children!.ui.children!.widgets.children!.structure;
          const originalMetaData = _getMetaData<WidgetMetaData>(
            originalWidgetsStructure,
            pathToParentFolder,
            widgetId,
          );

          expect(metaData.version).toBe(originalMetaData.version);
      }
    });
  });
});
