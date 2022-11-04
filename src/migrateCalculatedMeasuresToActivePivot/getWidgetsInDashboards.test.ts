import { dashboardsContent } from "../__test_resources__/aui5.0LegacyTestResources/dashboardsContent";
import { getWidgetsInDashboards } from "./getWidgetsInDashboards";

describe("getWidgetsInDashboards", () => {
  it("gets all widgets in dashboards", () => {
    expect(getWidgetsInDashboards(dashboardsContent)).toMatchInlineSnapshot(
      `undefined`,
    );
  });
});
