import { dashboardsFolder } from "../__test_resources__/dashboardsFolder";
import { migrateCalculatedMeasuresInDashboards } from "./migrateCalculatedMeasuresInDashboards";
import { dataModelsForTests } from "@activeviam/data-model-5.0";

const dataModel = dataModelsForTests.sandbox;

// "pvSum ^ 2" is from cube "EquityDerivativesCubeDist", all others are from "EquityDerivativesCube".
const calculatedMeasureNames = [
  "Distinct count city",
  "Test calculated measure",
  "EXP pnl.Forex",
  "Log pv.SUM",
  "activeui5 calculated measure",
  "pvSum ^ 2",
];

describe("migrateCalculatedMeasuresInDashboards", () => {
  const { migratedDashboards, cubeNames } =
    migrateCalculatedMeasuresInDashboards(
      dashboardsFolder,
      dataModel,
      calculatedMeasureNames,
    );

  it("returns an object containing all the calculated measures used in the `ui/dashboards` folder with their corresponding cube name", () => {
    expect(cubeNames).toStrictEqual({
      "Distinct count city": "EquityDerivativesCube",
      "EXP pnl.Forex": "EquityDerivativesCube",
      "Log pv.SUM": "EquityDerivativesCube",
      "Test calculated measure": "EquityDerivativesCube",
      "activeui5 calculated measure": "EquityDerivativesCube",
      "pvSum ^ 2": "EquityDerivativesCubeDist",
    });
  });

  it("does not modify the content of an empty dashboard", () => {
    // "8c1" is an empty dashboard at the root.
    expect(migratedDashboards.children.content.children!["8c1"]).toStrictEqual(
      dashboardsFolder.children.content.children["8c1"],
    );

    // "a4f" is an empty dashboard inside a folder.
    expect(migratedDashboards.children.content.children!["a4f"]).toStrictEqual(
      dashboardsFolder.children.content.children["a4f"],
    );
  });

  it("does not modify the content of a dashboard which does not contain calculated measures", () => {
    // "81a" is a dashboard with no calculated measures.
    expect(migratedDashboards.children.content.children!["81a"]).toStrictEqual(
      dashboardsFolder.children.content.children["81a"],
    );

    // "e27" is a dashboard with no calculated measures inside a folder.
    expect(migratedDashboards.children.content.children!["e27"]).toStrictEqual(
      dashboardsFolder.children.content.children["e27"],
    );
  });

  it("removes any calculated measure definitions from the `query.mdx` of all widgets from a dashboard with a single page", () => {
    // "b3e" is a dashboard with a single page, containing a single widget, containing a single calculated measure.
    expect(
      dashboardsFolder.children.content.children!["b3e"].entry.content,
    ).toContain("WITH  Member [Measures]");
    expect(
      migratedDashboards.children.content.children!["b3e"].entry.content,
    ).not.toContain("WITH  Member [Measures]");
    expect(
      JSON.parse(
        migratedDashboards.children.content.children!["b3e"].entry.content,
      ).pages["p-0"].content["0"].query.mdx,
    ).toMatchInlineSnapshot(
      `"SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Distinct count city]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"`,
    );

    // "c83" is a dashboard with a single page with multiple widgets, some of which contain calculated measures.
    expect(
      dashboardsFolder.children.content.children!["c83"].entry.content,
    ).toContain("WITH  Member [Measures]");
    expect(
      migratedDashboards.children.content.children!["c83"].entry.content,
    ).not.toContain("WITH  Member [Measures]");
    expect(
      migratedDashboards.children.content.children!["c83"].entry.content,
    ).toMatchInlineSnapshot(
      `"{\\"pages\\":{\\"p-0\\":{\\"content\\":{\\"0\\":{\\"mapping\\":{\\"rows\\":[\\"[Underlyings].[Products].[ProductType]\\"],\\"columns\\":[\\"ALL_MEASURES\\"],\\"measures\\":[\\"[Measures].[Log pv.SUM]\\"]},\\"query\\":{\\"updateMode\\":\\"once\\",\\"mdx\\":\\"SELECT NON EMPTY {[Measures].[Log pv.SUM]} ON COLUMNS, NON EMPTY Hierarchize(Descendants({[Underlyings].[Products].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS\\"},\\"widgetKey\\":\\"pivot-table\\",\\"serverKey\\":\\"Ranch 6.0\\"},\\"1\\":{\\"mapping\\":{\\"xAxis\\":[\\"[Currency].[Currency].[Currency]\\"],\\"values\\":[\\"[Measures].[activeui5 calculated measure]\\"],\\"secondaryValues\\":[],\\"splitBy\\":[\\"ALL_MEASURES\\"],\\"horizontalSubplots\\":[],\\"verticalSubplots\\":[]},\\"widgetKey\\":\\"plotly-line-chart\\",\\"query\\":{\\"updateMode\\":\\"once\\",\\"mdx\\":\\"SELECT NON EMPTY Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[activeui5 calculated measure]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS\\"},\\"serverKey\\":\\"Ranch 6.0\\"},\\"2\\":{\\"mapping\\":{\\"xAxis\\":[\\"[Time].[HistoricalDates].[AsOfDate]\\"],\\"values\\":[\\"[Measures].[contributors.COUNT]\\"],\\"stackBy\\":[\\"ALL_MEASURES\\"],\\"horizontalSubplots\\":[],\\"verticalSubplots\\":[]},\\"widgetKey\\":\\"plotly-stacked-column-chart\\",\\"query\\":{\\"updateMode\\":\\"once\\",\\"mdx\\":\\"SELECT NON EMPTY [Time].[HistoricalDates].[AsOfDate].Members ON ROWS, NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS\\"},\\"serverKey\\":\\"Ranch 6.0\\"},\\"3\\":{\\"mapping\\":{\\"axis\\":[\\"[Geography].[City].[City]\\"],\\"values\\":[\\"[Measures].[Distinct count city]\\",\\"[Measures].[contributors.COUNT]\\"],\\"splitBy\\":[\\"ALL_MEASURES\\"],\\"horizontalSubplots\\":[],\\"verticalSubplots\\":[]},\\"widgetKey\\":\\"plotly-radar-chart\\",\\"query\\":{\\"updateMode\\":\\"once\\",\\"mdx\\":\\"SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Distinct count city], [Measures].[contributors.COUNT]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS\\"},\\"serverKey\\":\\"Ranch 6.0\\",\\"switchedTo\\":\\"plotly-clustered-bar-chart\\"}},\\"layout\\":{\\"children\\":[{\\"children\\":[{\\"leafKey\\":\\"0\\",\\"size\\":0.5},{\\"leafKey\\":\\"2\\",\\"size\\":0.5}],\\"direction\\":\\"column\\",\\"size\\":0.5},{\\"children\\":[{\\"leafKey\\":\\"1\\",\\"size\\":0.5},{\\"leafKey\\":\\"3\\",\\"size\\":0.5}],\\"direction\\":\\"column\\",\\"size\\":0.5}],\\"direction\\":\\"row\\"},\\"name\\":\\"Page 1\\"}},\\"pagesOrder\\":[\\"p-0\\"],\\"filters\\":[]}"`,
    );
  });

  it("removes any calculated measure definitions from the `query.mdx` of all widgets from a dashboard with multiple pages", () => {
    // "ef0" is a dashboard with multiple pages, some of which contain calculated measures.
    expect(
      dashboardsFolder.children.content.children!["ef0"].entry.content,
    ).toContain("WITH  Member [Measures]");
    expect(
      migratedDashboards.children.content.children!["ef0"].entry.content,
    ).not.toContain("WITH  Member [Measures]");
    expect(
      migratedDashboards.children.content.children!["ef0"].entry.content,
    ).toMatchInlineSnapshot(
      `"{\\"pages\\":{\\"p-0\\":{\\"content\\":{\\"0\\":{\\"mapping\\":{\\"xAxis\\":[\\"[Geography].[City].[City]\\"],\\"values\\":[\\"[Measures].[Distinct count city]\\"],\\"secondaryValues\\":[],\\"splitBy\\":[\\"ALL_MEASURES\\"],\\"horizontalSubplots\\":[],\\"verticalSubplots\\":[]},\\"query\\":{\\"updateMode\\":\\"once\\",\\"mdx\\":\\"SELECT NON EMPTY {[Measures].[Distinct count city]} ON COLUMNS, NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS\\"},\\"widgetKey\\":\\"plotly-line-chart\\",\\"serverKey\\":\\"Ranch 6.0\\"}},\\"layout\\":{\\"children\\":[{\\"leafKey\\":\\"0\\",\\"size\\":1}],\\"direction\\":\\"row\\"},\\"name\\":\\"Page 1\\"},\\"p-1\\":{\\"content\\":{\\"0\\":{\\"mapping\\":{\\"rows\\":[\\"[CounterParty].[CounterParty].[CounterPartyGroup]\\"],\\"columns\\":[\\"ALL_MEASURES\\"],\\"measures\\":[\\"[Measures].[Log pv.SUM]\\"]},\\"query\\":{\\"updateMode\\":\\"once\\",\\"mdx\\":\\"SELECT NON EMPTY Hierarchize(Descendants({[CounterParty].[CounterParty].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Log pv.SUM]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS\\"},\\"widgetKey\\":\\"pivot-table\\",\\"serverKey\\":\\"Ranch 6.0\\"},\\"1\\":{\\"mapping\\":{\\"xAxis\\":[\\"[Booking].[Desk].[LegalEntity]\\"],\\"values\\":[\\"[Measures].[gamma.SUM]\\"],\\"stackBy\\":[\\"ALL_MEASURES\\"],\\"horizontalSubplots\\":[],\\"verticalSubplots\\":[]},\\"widgetKey\\":\\"plotly-stacked-column-chart\\",\\"query\\":{\\"updateMode\\":\\"once\\",\\"mdx\\":\\"SELECT NON EMPTY Hierarchize(Descendants({[Booking].[Desk].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[gamma.SUM]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS\\"},\\"serverKey\\":\\"Ranch 6.0\\"}},\\"layout\\":{\\"children\\":[{\\"leafKey\\":\\"0\\",\\"size\\":0.5},{\\"leafKey\\":\\"1\\",\\"size\\":0.5}],\\"direction\\":\\"row\\"},\\"name\\":\\"Page 2\\"},\\"p-2\\":{\\"content\\":{\\"0\\":{\\"mapping\\":{\\"rows\\":[\\"[Geography].[City].[City]\\"],\\"columns\\":[\\"ALL_MEASURES\\"],\\"measures\\":[\\"[Measures].[pvSum ^ 2]\\"]},\\"query\\":{\\"updateMode\\":\\"once\\",\\"mdx\\":\\"SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[pvSum ^ 2]} ON COLUMNS FROM [EquityDerivativesCubeDist] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS\\"},\\"widgetKey\\":\\"pivot-table\\",\\"serverKey\\":\\"Ranch 5.11\\"}},\\"layout\\":{\\"children\\":[{\\"leafKey\\":\\"0\\",\\"size\\":1}],\\"direction\\":\\"row\\"},\\"name\\":\\"Page 3\\"},\\"p-3\\":{\\"content\\":{\\"0\\":{\\"mapping\\":{\\"rows\\":[\\"[Geography].[City].[City]\\"],\\"columns\\":[],\\"measures\\":[\\"[Measures].[EXP pnl.Forex]\\"]},\\"query\\":{\\"updateMode\\":\\"once\\",\\"mdx\\":\\"SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[EXP pnl.Forex]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS\\"},\\"widgetKey\\":\\"pivot-table\\",\\"serverKey\\":\\"Ranch 6.0\\"}},\\"layout\\":{\\"children\\":[{\\"leafKey\\":\\"0\\",\\"size\\":1}],\\"direction\\":\\"row\\"},\\"name\\":\\"Page 4\\"}},\\"pagesOrder\\":[\\"p-0\\",\\"p-1\\",\\"p-2\\",\\"p-3\\"],\\"filters\\":[]}"`,
    );

    // "a18" is a dashboard inside a folder with multiple pages, some of which contain calculated measures.
    expect(
      dashboardsFolder.children.content.children!["a18"].entry.content,
    ).toContain("WITH  Member [Measures]");
    expect(
      migratedDashboards.children.content.children!["a18"].entry.content,
    ).not.toContain("WITH  Member [Measures]");
    expect(
      migratedDashboards.children.content.children!["a18"].entry.content,
    ).toMatchInlineSnapshot(
      `"{\\"pages\\":{\\"p-0\\":{\\"content\\":{\\"0\\":{\\"mapping\\":{\\"rows\\":[\\"[Geography].[City].[City]\\",\\"[Currency].[Currency].[Currency]\\"],\\"columns\\":[\\"ALL_MEASURES\\"],\\"measures\\":[\\"[Measures].[Test calculated measure]\\"]},\\"query\\":{\\"updateMode\\":\\"once\\",\\"mdx\\":\\"SELECT NON EMPTY Crossjoin(Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS, NON EMPTY {[Measures].[Test calculated measure]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS\\"},\\"widgetKey\\":\\"pivot-table\\",\\"serverKey\\":\\"Ranch 6.0\\"}},\\"layout\\":{\\"children\\":[{\\"leafKey\\":\\"0\\",\\"size\\":1}],\\"direction\\":\\"row\\"},\\"name\\":\\"Page 1\\"},\\"p-1\\":{\\"content\\":{\\"0\\":{\\"mapping\\":{\\"rows\\":[\\"[Underlyings].[Products].[ProductType]\\"],\\"columns\\":[\\"ALL_MEASURES\\"],\\"measures\\":[\\"[Measures].[pvSum ^ 2]\\"]},\\"query\\":{\\"updateMode\\":\\"once\\",\\"mdx\\":\\"SELECT NON EMPTY Hierarchize(Descendants({[Underlyings].[Products].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[pvSum ^ 2]} ON COLUMNS FROM [EquityDerivativesCubeDist] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS\\"},\\"widgetKey\\":\\"pivot-table\\",\\"serverKey\\":\\"Ranch 5.11\\"},\\"1\\":{\\"mapping\\":{\\"rows\\":[\\"[Underlyings].[Products].[ProductType]\\"],\\"columns\\":[\\"ALL_MEASURES\\"],\\"measures\\":[\\"[Measures].[pvSum ^ 2]\\"]},\\"query\\":{\\"updateMode\\":\\"once\\",\\"mdx\\":\\"SELECT NON EMPTY Hierarchize(Descendants({[Underlyings].[Products].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[pvSum ^ 2]} ON COLUMNS FROM [EquityDerivativesCubeDist] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS\\"},\\"widgetKey\\":\\"pivot-table\\",\\"serverKey\\":\\"Ranch 5.11\\",\\"switchedTo\\":\\"kpi\\"}},\\"layout\\":{\\"children\\":[{\\"leafKey\\":\\"0\\",\\"size\\":0.5},{\\"leafKey\\":\\"1\\",\\"size\\":0.5}],\\"direction\\":\\"row\\"},\\"name\\":\\"Page 2\\"},\\"p-2\\":{\\"content\\":{\\"0\\":{\\"mapping\\":{\\"rows\\":[\\"[Booking].[Desk].[LegalEntity]\\"],\\"columns\\":[\\"ALL_MEASURES\\"],\\"measures\\":[\\"[Measures].[Log pv.SUM]\\"]},\\"query\\":{\\"updateMode\\":\\"once\\",\\"mdx\\":\\"SELECT NON EMPTY Hierarchize(Descendants({[Booking].[Desk].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Log pv.SUM]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS\\"},\\"widgetKey\\":\\"pivot-table\\",\\"serverKey\\":\\"Ranch 6.0\\"},\\"1\\":{\\"mapping\\":{\\"rows\\":[\\"[Underlyings].[Underlyings].[UnderlierType]\\"],\\"columns\\":[\\"ALL_MEASURES\\"],\\"measures\\":[\\"[Measures].[pvSum ^ 2]\\"]},\\"query\\":{\\"updateMode\\":\\"once\\",\\"mdx\\":\\"SELECT NON EMPTY {[Measures].[pvSum ^ 2]} ON COLUMNS, NON EMPTY Hierarchize(Descendants({[Underlyings].[Underlyings].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS FROM [EquityDerivativesCubeDist] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS\\"},\\"widgetKey\\":\\"pivot-table\\",\\"serverKey\\":\\"Ranch 5.11\\"}},\\"layout\\":{\\"children\\":[{\\"children\\":[{\\"leafKey\\":\\"0\\",\\"size\\":0.5},{\\"leafKey\\":\\"1\\",\\"size\\":0.5}],\\"direction\\":\\"column\\",\\"size\\":1}],\\"direction\\":\\"row\\"},\\"name\\":\\"Page 3\\"}},\\"pagesOrder\\":[\\"p-0\\",\\"p-1\\",\\"p-2\\"],\\"filters\\":[]}"`,
    );
  });
});
