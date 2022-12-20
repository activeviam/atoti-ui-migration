import { migrateWidgetsWithinDashboard } from "./migrateWidgetsWithinDashboard";
import { sandboxDataModel } from "@activeviam/data-model-5.1/dist/__test_resources__";

describe("migrateWidgetsWithinDashboard", () => {
  it("mutates each widget in the dashboard by applying the given callback on it", () => {
    const dashboardState = {
      pages: {
        "p-0": {
          name: "My page",
          content: {
            "1": {
              name: "Widget 1",
              widgetKey: "foo",
            },
            "2": {
              name: "Widget 2",
              widgetKey: "bar",
            },
          },
          layout: {
            direction: "row" as const,
            children: [
              { leafKey: "0", size: 0.5 },
              { leafKey: "1", size: 0.5 },
            ],
          },
        },
      },
    };

    migrateWidgetsWithinDashboard(
      dashboardState,
      (widgetState) => {
        widgetState.name += " Suffix";
      },
      {
        dataModels: { sandbox: sandboxDataModel },
        keysOfWidgetPluginsToRemove: [],
        onError: () => {
          // Do nothing.
        },
      },
    );

    expect(dashboardState.pages["p-0"].content).toMatchInlineSnapshot(`
      Object {
        "1": Object {
          "name": "Widget 1 Suffix",
          "widgetKey": "foo",
        },
        "2": Object {
          "name": "Widget 2 Suffix",
          "widgetKey": "bar",
        },
      }
    `);
  });
});
