import { migrateCalculatedMeasures } from "./migrateCalculatedMeasures";
import { dataModelsForTests } from "@activeviam/data-model-5.0";
import { contentServer } from "../__test_resources__/contentServer";
import { uiCalculatedMeasuresFolder } from "../__test_resources__/uiCalculatedMeasuresFolder";
import { uiDashboardsFolder } from "../__test_resources__/uiDashboardsFolder";
import { uiWidgetsFolder } from "../__test_resources__/uiWidgetsFolder";
import _cloneDeep from "lodash/cloneDeep";

const dataModel = dataModelsForTests.sandbox;

const contentServerForTests = _cloneDeep(contentServer);

contentServerForTests.children!.ui.children = {
  ...contentServerForTests.children!.ui.children,
  calculated_measures: uiCalculatedMeasuresFolder,
  dashboards: uiDashboardsFolder,
  widgets: uiWidgetsFolder,
};
migrateCalculatedMeasures(contentServerForTests, dataModel);

describe("migrateCalculatedMeasures", () => {
  it("Mutates `contentServerForTests` by migrating calculated measures and removing calculated measure definitions from saved widgets and saved dashboards", () => {
    expect(contentServerForTests).toMatchSnapshot();
  });

  it("Migrates the serialized definitions of all calculated measures created with ActiveUI 5.0 and used in a saved dashboard or saved widget, into ones that are natively supported by ActivePivot", () => {
    // `uiCalculatedMeasuresFolder` contains 5 calculated measures.
    // "Exp gamma sum" is not used in any saved widgets or dashboards, it is not migrated.
    // "CM in 2 cubes" is used in both `EquityDerivativesCube` and `EquityDerivativesCubeDist`.
    // All others are only used in `EquityDerivativesCube`.
    // "Log pv.SUM" is inside a folder.
    // "testo" and "new measure*" are already present in the `pivot/entitlements/cm` folder.
    expect(
      Object.keys(
        contentServerForTests.children!.pivot.children!.entitlements.children!
          .cm.children!.EquityDerivativesCube.children!,
      ),
    ).toStrictEqual([
      "[Measures].[testo]",
      "[Measures].[new measure*]",
      "[Measures].[Distinct count city]",
      "[Measures].[Log pv.SUM]",
      "[Measures].[CM in 2 cubes]",
      "[Measures].[Test calculated measure]",
    ]);

    expect(
      Object.keys(
        contentServerForTests.children!.pivot.children!.entitlements.children!
          .cm.children!.EquityDerivativesCubeDist.children!,
      ),
    ).toStrictEqual(["[Measures].[CM in 2 cubes]"]);
  });

  it("removes definitions of calculated measures saved in `ui/children/calculated_measures` from saved dashboards", () => {
    // Saved dashboard "b3e" contains calculated measure "Distinct count city".
    expect(
      contentServerForTests.children!.ui.children!.dashboards.children!.content
        .children!["b3e"].entry.content,
    ).not.toContain("WITH  Member [Measures]");
  });

  it("does not remove definitions of calculated measures from saved dashboards if they are not saved in `ui/children/calculated_measures`", () => {
    // Saved dashboard "a9e" contains a calculated measure that is not saved in `ui/children/calculated_measures`.
    expect(
      contentServerForTests.children!.ui.children!.dashboards.children!.content
        .children!["a9e"].entry.content,
    ).toContain("WITH  Member [Measures].[Log City]");
  });

  it("removes definitions of calculated measures saved in `ui/children/calculated_measures` from saved widgets", () => {
    // Saved widget "854" contains calculated measure "Distinct count city".
    expect(
      contentServerForTests.children!.ui.children!.widgets.children!.content
        .children!["854"].entry.content,
    ).not.toContain("WITH  Member [Measures]");
  });

  it("does not remove definitions of calculated measures from saved widgets if they are not saved in `ui/children/calculated_measures`", () => {
    // Saved dashboard "a9e" contains a calculated measure that is not saved in `ui/children/calculated_measures`.
    expect(
      contentServerForTests.children!.ui.children!.widgets.children!.content
        .children!["ee7"].entry.content,
    ).toContain("WITH  Member [Measures].[activeui5 calculated measure]");
  });

  it("deletes the `ui/calculated_measures` folder", () => {
    expect(
      contentServerForTests.children!.ui.children!.calculated_measures,
    ).toBeUndefined();
  });
});