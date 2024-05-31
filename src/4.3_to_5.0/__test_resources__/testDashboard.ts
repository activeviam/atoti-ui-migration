import { DashboardState } from "@activeviam/activeui-sdk-5.0";

export const testDashboard: DashboardState<"deserialized"> = {
  name: "Dashboard with multiple widgets",
  pages: {
    "p-0": {
      name: "",
      layout: {
        children: [
          {
            children: [
              {
                size: 0.09,
                leafKey: "3",
              },
              {
                size: 0.455,
                leafKey: "1",
              },
              {
                size: 0.455,
                leafKey: "5",
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
            mdx: `SELECT
              NON EMPTY {
                [Measures].[contributors.COUNT]
              } ON COLUMNS
              FROM [EquityDerivativesCube]`,
            updateMode: "once",
          },
          filters: [],
          queryContext: [],
          mapping: {
            rows: [],
            columns: ["ALL_MEASURES"],
            measures: ["[Measures].[contributors.COUNT]"],
          },
          name: "My first table",
          serverKey: "ap-murex-cube",
          widgetKey: "table",
          columnWidths: {},
        },
        "2": {
          query: {
            mdx: `SELECT
              NON EMPTY {
                [Measures].[contributors.COUNT]
              } ON COLUMNS
              FROM [EquityDerivativesCube]`,
            updateMode: "once",
          },
          filters: [],
          queryContext: [],
          mapping: {
            rows: [],
            columns: ["ALL_MEASURES"],
            measures: ["[Measures].[contributors.COUNT]"],
          },
          name: "my table",
          serverKey: "my server",
          widgetKey: "table",
        },
        "3": {
          query: {
            mdx: `SELECT
              NON EMPTY {
                [Measures].[contributors.COUNT]
              } ON COLUMNS
              FROM [EquityDerivativesCube]`,
            updateMode: "once",
          },
          filters: [],
          queryContext: [],
          mapping: {
            rows: [],
            columns: ["ALL_MEASURES"],
            measures: ["[Measures].[contributors.COUNT]"],
          },
          name: "my table",
          serverKey: "my server",
          widgetKey: "table",
        },
        "4": {
          query: {
            mdx: `SELECT
              NON EMPTY {
                [Measures].[contributors.COUNT]
              } ON COLUMNS
              FROM [EquityDerivativesCube]`,
            updateMode: "once",
          },
          filters: [],
          queryContext: [],
          mapping: {
            rows: [],
            columns: ["ALL_MEASURES"],
            measures: ["[Measures].[contributors.COUNT]"],
          },
          name: "my table",
          serverKey: "my server",
          widgetKey: "table",
        },
        "5": {
          query: {
            mdx: `SELECT
              NON EMPTY {
                [Measures].[contributors.COUNT]
              } ON COLUMNS
              FROM [EquityDerivativesCube]`,
            updateMode: "once",
          },
          filters: [],
          queryContext: [],
          mapping: {
            rows: [],
            columns: ["ALL_MEASURES"],
            measures: ["[Measures].[contributors.COUNT]"],
          },
          name: "my table",
          serverKey: "my server",
          widgetKey: "table",
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
