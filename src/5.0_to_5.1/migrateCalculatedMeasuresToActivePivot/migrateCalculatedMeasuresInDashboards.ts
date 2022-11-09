import {
  ContentEntry,
  ContentRecord,
  CubeName,
  DashboardState,
  DataModel,
  MdxString,
  WidgetWithQueryState,
} from "@activeviam/activeui-sdk";
import { removeCalculatedMemberDefinitionFromMDXAndGetCubeName } from "./removeCalculatedMemberDefinitionFromMDXAndGetCubeName";
import { produce } from "immer";
import _merge from "lodash/merge";

interface DashboardsFolder {
  entry: ContentEntry;
  children: {
    thumbnails: ContentRecord;
    content: ContentRecord;
    structure: ContentRecord;
  };
}

/**
 * Takes a `ui/dashboards` folder from the content server, removes any calculated member definitions from the MDX and returns a `migratedDashboards` folder.
 * Also returns the cubeName for each calculated measure found.
 */
export const migrateCalculatedMeasuresInDashboards = (
  dashboards: DashboardsFolder,
  dataModel: DataModel,
  namesOfCalculatedMeasurestoMigrate: string[],
): {
  cubeNames: { [measureName: string]: CubeName };
  migratedDashboards: DashboardsFolder;
} => {
  const cubeNames: { [measureName: string]: CubeName } = {};

  const migratedDashboards = produce(dashboards, (draft) => {
    const allDashboards = dashboards.children.content.children ?? {};
    const updatedAllDashboards = produce(allDashboards, (draft) => {
      for (const dashboardId in allDashboards) {
        const dashboard: ContentRecord = allDashboards[dashboardId];
        const updatedDashboard = produce(dashboard, (draft) => {
          const dashboardState: DashboardState = JSON.parse(
            dashboard.entry.content,
          );
          const updatedDashboardState = produce(dashboardState, (draft) => {
            const dashboardPages = dashboardState.pages;
            const updatedDashboardPages = produce(dashboardPages, (draft) => {
              for (const pageId in dashboardPages) {
                const page = dashboardPages[pageId];
                const updatedWidget: {
                  [widgetId: string]: WidgetWithQueryState;
                } = produce(page.content, (draft) => {
                  for (const widgetId in page.content) {
                    const mdx: MdxString | undefined =
                      page.content[widgetId].query.mdx;
                    if (!mdx) {
                      return;
                    }
                    const {
                      stringifiedUpdatedMdx,
                      calculatedMeasuresWithCubeNames,
                    } = removeCalculatedMemberDefinitionFromMDXAndGetCubeName(
                      mdx,
                      namesOfCalculatedMeasurestoMigrate,
                      dataModel,
                    );
                    draft[widgetId].query.mdx = stringifiedUpdatedMdx;
                    _merge(cubeNames, calculatedMeasuresWithCubeNames);
                  }
                });
                draft[pageId].content = updatedWidget;
              }
            });
            draft.pages = updatedDashboardPages;
          });
          draft.entry.content = JSON.stringify(updatedDashboardState);
        });
        draft[dashboardId] = updatedDashboard;
      }
    });
    draft.children!.content.children = updatedAllDashboards;
  });
  return { cubeNames, migratedDashboards };
};
