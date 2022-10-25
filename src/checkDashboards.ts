import {
  getCalculatedMeasures,
  getCubeName,
  MdxSelect,
  parse,
} from "@activeviam/mdx";
import { auiWidgetFolder } from "./checkWidgets";

export const collectCalculatedMeasures = (
  widgetMdx: string,
): { [cubeName: string]: string } => {
  //console.log(widgetMdx)
  const parsedMdx: MdxSelect = parse(widgetMdx);
  const calculatedMeasuresUsedByWidget = Object.keys(
    getCalculatedMeasures(parsedMdx),
  );
  let cubeName = "";
  if (calculatedMeasuresUsedByWidget.length === 0) {
    return { nothing: "zero" };
  } else {
    cubeName = getCubeName(parsedMdx);
    return {
      [cubeName]: calculatedMeasuresUsedByWidget[0],
    };
  }
};

export const getDashboardsMdx = (dashboards: auiWidgetFolder): any[] => {
  if (!dashboards.children.content.children) {
    return [];
  }
  const dashboardsArray = Object.values(dashboards.children.content.children);
  const dashboardPages = dashboardsArray.map(
    (dashboard) => JSON.parse(dashboard.entry.content).pages,
  );
  //console.log(dashboardPages);
  const widgets = dashboardPages.map((page) => {
    const widgetsList = Object.values(page)
    widgetsList.forEach(widget => {

        console.log(widget.content);
    })
  });
  // console.log(widgets)
  return "abc"
};
