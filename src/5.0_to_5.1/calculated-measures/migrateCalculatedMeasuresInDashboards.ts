import {
  ContentEntry,
  ContentRecord,
  CubeName,
  DashboardState,
  DataModel,
  deserializeDashboardState,
  MdxSelect,
  serializeDashboardState,
  WidgetWithQueryState,
} from "@activeviam/activeui-sdk-5.0";
import { produce } from "immer";
import { migrateCalculatedMeasuresInMdx } from "./migrateCalculatedMeasuresInMdx";

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
          const serializedDashboardState: DashboardState<"serialized"> =
            JSON.parse(dashboard.entry.content);
          const deserializedDashboardState = deserializeDashboardState(
            serializedDashboardState,
          );
          const updatedDashboardState = produce(
            deserializedDashboardState,
            (draft) => {
              const dashboardPages = deserializedDashboardState.pages;
              const updatedDashboardPages = produce(dashboardPages, (draft) => {
                for (const pageId in dashboardPages) {
                  const page = dashboardPages[pageId];
                  const updatedWidget: {
                    [widgetId: string]: WidgetWithQueryState;
                  } = produce(page.content, (draft) => {
                    for (const widgetId in page.content) {
                      const mdx: MdxSelect | undefined =
                        page.content[widgetId].query.mdx;
                      if (!mdx) {
                        return;
                      }
                      const {
                        migratedMdx,
                        namesOfCalculatedMeasuresToMigrateInWidget,
                        cubeName,
                      } = migrateCalculatedMeasuresInMdx(
                        mdx,
                        namesOfCalculatedMeasurestoMigrate,
                        dataModel,
                      );

                      namesOfCalculatedMeasuresToMigrateInWidget.forEach(
                        (calculatedMeasureName) => {
                          cubeNames[calculatedMeasureName] = cubeName;
                        },
                      );

                      draft[widgetId].query.mdx = migratedMdx;
                    }
                  });
                  draft[pageId].content = updatedWidget;
                }
              });
              draft.pages = updatedDashboardPages;
            },
          );
          draft.entry.content = JSON.stringify(
            serializeDashboardState(updatedDashboardState),
          );
        });
        draft[dashboardId] = updatedDashboard;
      }
    });
    draft.children!.content.children = updatedAllDashboards;
  });
  return { cubeNames, migratedDashboards };
};
