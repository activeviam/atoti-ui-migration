import { auiWidgetFolder } from "./migrateCalculatedMeasuresInWidgets";
import _flatMap from "lodash/flatMap";
import { MdxSelect } from "@activeviam/mdx";

/**
 * To do
 */
export const getWidgetsInDashboards = (
  dashboardsContent: auiWidgetFolder,
): void => {
  
  const dashboards = Object.values(
    dashboardsContent.children.content.children!,
  );
  //console.log(dashboards[0]);
  const dashboardContentRecords = dashboards.map((dashboard) =>
    JSON.parse(dashboard.entry.content),
  );
  console.log(dashboardContentRecords[0]);

  // Array of pages, each page is an object containing content, layout and name
  const dashboardPages = _flatMap(dashboardContentRecords, (contentRecord) =>
    Object.values(contentRecord.pages),
  );

  //console.log(dashboardPages);

  const pageContent = _flatMap(dashboardPages, (page) => page.content);

  //console.log(pageContent);

  const widgetState = _flatMap(pageContent, (content) =>
    Object.values(content),
  );

  //console.log(widgetState);

  widgetState.forEach((widget) => {
    if (!widget.query?.mdx) {
      return
    } else {
      const mdx: MdxSelect = widget.query.mdx;
    }
  });

  // const widgets = dashboardPages.map((page) => page.content);
  // console.log(widgets[0]);
};

// const dashboardPages = dashboardContentRecords.map((dashboardContentRecord) =>
//   _flatMap(Object.values(dashboardContentRecord.pages), (el) =>
//     Object.values(el.content),
//   ),
// );
