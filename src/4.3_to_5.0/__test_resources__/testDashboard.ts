import { DashboardState } from "@activeviam/activeui-sdk-5.0";

export const testDashboard: DashboardState<"serialized"> = {
  name: "Test dashboard",
  pages: {
    "p-0": {
      name: "test widget",
      layout: {
        children: [
          {
            children: [
              {
                size: 0.09,
                leafKey: "3",
              },
              {
                size: 0.91,
                leafKey: "1",
              },
            ],
            direction: "column",
          },
          {
            size: 0.2,
            children: [
              {
                size: undefined,
                leafKey: "2",
              },
              {
                size: undefined,
                leafKey: "4",
              },
            ],
            direction: "column",
          },
        ],
        direction: "row",
      },
      content: {
        "1": {
          query: {
            mdx: "SELECT NON EMPTY Crossjoin([As Of Date].[As Of Date].[As Of Date].Members, {[Measures].[HypoPnL]}) ON COLUMNS, NON EMPTY Hierarchize(Crossjoin([Book Structure].[Profit Center].[Profit Center].Members, [Book Structure].[Book].[Book].Members)) ON ROWS FROM [TestCube]",
            updateMode: "once",
          },
          filters: [],
          queryContext: [
            {
              key: "mdx.hiddengrandtotals",
              value: 1,
            },
          ],
          mapping: {
            rows: [
              "[Book Structure].[Profit Center].[Profit Center]",
              "[Book Structure].[Book].[Book]",
            ],
            columns: ["[As Of Date].[As Of Date].[As Of Date]", "ALL_MEASURES"],
            measures: ["[Measures].[HypoPnL]"],
          },
          name: "Pivot Table",
          serverKey: "my-server",
          widgetKey: "table",
          columnWidths: {},
        },
        "2": {},
        "3": {
          name: "Dashboard Filters",
          widgetKey: "filters",
        },
        "4": {
          name: "Mdx Editor",
          widgetKey: "mdx-editor",
        },
      },
      filters: [],
      queryContext: [],
    },
  },
  pagesOrder: ["p-0"],
  filters: [],
  queryContext: [],
};
