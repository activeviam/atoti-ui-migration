import { uiDashboardsFolder } from "../__test_resources__/uiDashboardsFolder";
import { migrateCalculatedMeasuresInDashboards } from "./migrateCalculatedMeasuresInDashboards";
import { sandboxDataModel } from "@activeviam/data-model-5.1/dist/__test_resources__";

const dataModels = { sandbox: sandboxDataModel };

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
  const { migratedDashboards, measureToCubeMapping } =
    migrateCalculatedMeasuresInDashboards(
      uiDashboardsFolder,
      dataModels,
      calculatedMeasureNames,
    );

  it("returns an object containing all the calculated measures used in the `ui/dashboards` folder with their corresponding cube name", () => {
    expect(measureToCubeMapping).toStrictEqual({
      "Distinct count city": ["EquityDerivativesCube"],
      "EXP pnl.Forex": ["EquityDerivativesCube"],
      "Log pv.SUM": ["EquityDerivativesCube"],
      "Test calculated measure": ["EquityDerivativesCube"],
      "activeui5 calculated measure": ["EquityDerivativesCube"],
      "pvSum ^ 2": ["EquityDerivativesCubeDist"],
    });
  });

  it("does not modify the content of an empty dashboard", () => {
    // "8c1" is an empty dashboard.
    expect(migratedDashboards.children!.content.children!["8c1"]).toStrictEqual(
      uiDashboardsFolder.children.content.children["8c1"],
    );

    // "a4f" is an empty dashboard inside a folder.
    expect(migratedDashboards.children!.content.children!["a4f"]).toStrictEqual(
      uiDashboardsFolder.children.content.children["a4f"],
    );
  });

  it("does not modify the content of a dashboard which does not contain calculated measures", () => {
    // "81a" is a dashboard with no calculated measures.
    expect(migratedDashboards.children!.content.children!["81a"]).toStrictEqual(
      uiDashboardsFolder.children.content.children["81a"],
    );

    // "e27" is a dashboard with no calculated measures inside a folder.
    expect(migratedDashboards.children!.content.children!["e27"]).toStrictEqual(
      uiDashboardsFolder.children.content.children["e27"],
    );
  });

  it("removes definitions of calculated measures saved in ActiveUI 5.0 from the `query.mdx` of all widgets from a dashboard with a single page", () => {
    // "b3e" is a dashboard with a single page, containing a single widget, containing a single calculated measure.
    expect(
      uiDashboardsFolder.children.content.children!["b3e"].entry.content,
    ).toContain("WITH  Member [Measures]");
    expect(
      migratedDashboards.children!.content.children!["b3e"].entry.content,
    ).not.toContain("WITH  Member [Measures]");

    // "c83" is a dashboard with a single page with multiple widgets, some of which contain calculated measures.
    expect(
      uiDashboardsFolder.children.content.children!["c83"].entry.content,
    ).toContain("WITH  Member [Measures]");
    expect(
      migratedDashboards.children!.content.children!["c83"].entry.content,
    ).not.toContain("WITH  Member [Measures]");
  });

  it("removes definitions of calculated measures saved in ActiveUI 5.0 from the `query.mdx` of all widgets from a dashboard with multiple pages", () => {
    // "ef0" is a dashboard with multiple pages, some of which contain calculated measures.
    expect(
      uiDashboardsFolder.children.content.children!["ef0"].entry.content,
    ).toContain("WITH  Member [Measures]");
    expect(
      migratedDashboards.children!.content.children!["ef0"].entry.content,
    ).not.toContain("WITH  Member [Measures]");
  });

  it("removes definitions of calculated measures saved in ActiveUI 5.0 from the `query.mdx` of all widgets from a dashboard with multiple pages inside a folder", () => {
    // "a18" is a dashboard inside a folder with multiple pages, some of which contain calculated measures.
    expect(
      uiDashboardsFolder.children.content.children!["a18"].entry.content,
    ).toContain("WITH  Member [Measures]");
    expect(
      migratedDashboards.children!.content.children!["a18"].entry.content,
    ).not.toContain("WITH  Member [Measures]");
  });

  it("does not remove the definition of a calculated measure which is not in the list `calculatedMeasureNames`", () => {
    // "a9e" is a dashboard containing 1 widget with a calculated measure which is not on the list of names of calculated measures to be migrated`.
    expect(migratedDashboards.children!.content.children!["a9e"]).toStrictEqual(
      uiDashboardsFolder.children.content.children["a9e"],
    );
  });

  it("removes definitions of calculated measures saved in ActiveUI 5.0 if their names are included in `calculatedMeasureNames` and does not remove them if they are not", () => {
    // "e54" is a dashboard containing 3 widgets.
    const migratedDashboardState = JSON.parse(
      migratedDashboards.children!.content.children!["e54"].entry.content,
    );
    const initialDashboardState = JSON.parse(
      uiDashboardsFolder.children.content.children!["e54"].entry.content,
    );

    // Widget "0" contains a calculated measure which is not on the list of `calculatedMeasureNames` ("Log City"), the MDX is unchanged.
    expect(migratedDashboardState.pages["p-0"].content["0"]).toStrictEqual(
      initialDashboardState.pages["p-0"].content["0"],
    );

    // Widget "1" contains a calculated measure on the list of `calculatedMeasureNames` ("Log pv.SUM") and another not on the list ("Log City").
    // The calculated measure definition is removed for ("Log pv.SUM") but not ("Log City").
    expect(
      migratedDashboardState.pages["p-0"].content["1"].query.mdx,
    ).toMatchInlineSnapshot(
      `"WITH  Member [Measures].[Log City] AS Log([Geography].[City], 10), FORMAT_STRING = \\"#,###.##\\"  SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Log City], [Measures].[delta.SUM], [Measures].[Log pv.SUM]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"`,
    );

    // Widget "2" contains only a calculated measure on the list of `calculatedMeasureNames`, the calculated measure definition is removed.
    expect(
      migratedDashboardState.pages["p-0"].content["2"].query.mdx,
    ).toMatchInlineSnapshot(
      `"SELECT NON EMPTY Hierarchize(Descendants({[CounterParty].[CounterParty].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Log pv.SUM]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"`,
    );
  });
});
