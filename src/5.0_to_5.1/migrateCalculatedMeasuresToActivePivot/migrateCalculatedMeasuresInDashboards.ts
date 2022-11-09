import {
  ContentRecord,
  CubeName,
  DashboardState,
  DataModel,
  MdxString,
  WidgetWithQueryState,
} from "@activeviam/activeui-sdk";
import { removeCalculatedMemberDefinitionFromMDXAndGetCubeName } from "./removeCalculatedMemberDefinitionFromMDXAndGetCubeName";
import { produce } from "immer";

/**
 * To do
 */
export const migrateCalculatedMeasuresInDashboards = (
  dashboards: ContentRecord,
  dataModel: DataModel,
  namesOfCalculatedMeasurestoMigrate: string[],
): {
  cubeNames: { [measureName: string]: CubeName };
  migratedDashboards: ContentRecord;
} => {
  const cubeNames: { [measureName: string]: CubeName } = {};

  const migratedDashboards = produce(dashboards, (draft) => {
    const allDashboards = dashboards.children!.content.children ?? {};
    //console.log(allDashboards);
    const updatedAllDashboards = produce(allDashboards, (draft) => {
      for (const dashboardId in allDashboards) {
        const dashboard: ContentRecord = allDashboards[dashboardId];
        // console.log(dashboard);
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
                    const { stringifiedUpdatedMdx } =
                      removeCalculatedMemberDefinitionFromMDXAndGetCubeName(
                        mdx,
                        namesOfCalculatedMeasurestoMigrate,
                        dataModel,
                      );
                    draft[widgetId].query.mdx = stringifiedUpdatedMdx;
                  }
                });
                draft[pageId].content = updatedWidget;
              }
            });
            draft.pages = updatedDashboardPages;
            //console.log(updatedDashboardPages);
          });
          draft.entry.content = JSON.stringify(updatedDashboardState);
        });
        draft[dashboardId] = updatedDashboard;
        // console.log(updatedDashboard);
      }
    });
    console.log(updatedAllDashboards);
    draft.children!.content.children = updatedAllDashboards;
  });
  return { cubeNames, migratedDashboards };
};
