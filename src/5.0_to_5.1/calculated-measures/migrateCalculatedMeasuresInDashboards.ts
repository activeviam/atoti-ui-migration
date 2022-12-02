import {
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

/**
 * Same as `migrateCalculatedMeasuresInWidgets` but for widgets within saved dashboards.
 */
export const migrateCalculatedMeasuresInDashboards = (
  dashboards: ContentRecord,
  dataModel: DataModel,
  namesOfCalculatedMeasurestoMigrate: string[],
): {
  measureToCubeMapping: { [measureName: string]: CubeName };
  migratedDashboards: ContentRecord;
} => {
  const measureToCubeMapping: { [measureName: string]: CubeName } = {};

  const migratedDashboards = produce(dashboards, (draft) => {
    // The children property is always defined for the `ui/dashboards` folder.
    const dashboardsContent = dashboards.children!.content.children ?? {};
    const updatedDashboardsContent = produce(dashboardsContent, (draft) => {
      for (const dashboardId in dashboardsContent) {
        const dashboard: ContentRecord = dashboardsContent[dashboardId];
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
                          measureToCubeMapping[calculatedMeasureName] =
                            cubeName;
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
    draft.children!.content.children = updatedDashboardsContent;
  });
  return { measureToCubeMapping, migratedDashboards };
};
