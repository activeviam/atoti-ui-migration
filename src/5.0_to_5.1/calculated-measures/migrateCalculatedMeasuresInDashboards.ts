import {
  ContentRecord,
  CubeName,
  DashboardState,
  DataModel,
  deserializeDashboardState,
  MdxSelect,
  WidgetWithQueryState,
} from "@activeviam/activeui-sdk-5.0";
import { serializeDashboardState } from "@activeviam/activeui-sdk-5.1";
import { migrateCalculatedMeasuresInMdx } from "./migrateCalculatedMeasuresInMdx";
import { produce } from "immer";
import _uniq from "lodash/uniq";

/**
 * Same as `migrateCalculatedMeasuresInWidgets` but for widgets within saved dashboards.
 */
export const migrateCalculatedMeasuresInDashboards = (
  dashboards: ContentRecord,
  dataModel: DataModel,
  namesOfCalculatedMeasurestoMigrate: string[],
): {
  measureToCubeMapping: { [measureName: string]: CubeName[] };
  migratedDashboards: ContentRecord;
} => {
  const measureToCubeMapping: { [measureName: string]: CubeName[] } = {};

  const migratedDashboards = produce(dashboards, (draft) => {
    // The children property is always defined for the `ui/dashboards` folder.
    const dashboardsContent = draft.children!.content.children ?? {};
    for (const dashboardId in dashboardsContent) {
      const serializedDashboardState: DashboardState<"serialized"> = JSON.parse(
        dashboardsContent[dashboardId].entry.content,
      );
      const deserializedDashboardState = deserializeDashboardState(
        serializedDashboardState,
      );

      const dashboardPages = deserializedDashboardState.pages;
      for (const pageId in dashboardPages) {
        const page = dashboardPages[pageId];
        const updatedWidgets: {
          [widgetId: string]: WidgetWithQueryState;
        } = produce(page.content, (draft) => {
          for (const widgetId in page.content) {
            const mdx: MdxSelect | undefined = page.content[widgetId].query.mdx;
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
                  measureToCubeMapping[calculatedMeasureName]
                    ? _uniq([
                        ...measureToCubeMapping[calculatedMeasureName],
                        cubeName,
                      ])
                    : [cubeName];
              },
            );
            draft[widgetId].query.mdx = migratedMdx;
          }
        });
        dashboardPages[pageId].content = updatedWidgets;
      }
      dashboardsContent[dashboardId].entry.content = JSON.stringify(
        serializeDashboardState(deserializedDashboardState),
      );
    }
    draft.children!.content.children = dashboardsContent;
  });
  return { measureToCubeMapping, migratedDashboards };
};