import { migrateSavedCalculatedMeasures } from "./migrateSavedCalculatedMeasures";
import { contentServer } from "../__test_resources__/contentServer";
import { uiCalculatedMeasuresFolder } from "../__test_resources__/uiCalculatedMeasuresFolder";
import { ErrorReport, OutcomeCounters } from "../../migration.types";
import _cloneDeep from "lodash/cloneDeep";
import _fromPairs from "lodash/fromPairs";

const contentServerForTests = _cloneDeep(contentServer);
const errorReport: ErrorReport = {};

contentServerForTests.children!.ui.children = {
  ...contentServerForTests.children!.ui.children,
  calculated_measures: uiCalculatedMeasuresFolder,
};

const counters = _fromPairs(
  ["dashboards", "widgets", "filters", "folders", "calculated_measures"].map(
    (type) => [
      type,
      {
        success: 0,
        partial: 0,
        failed: 0,
        removed: 0,
      },
    ],
  ),
  // _fromPairs returns a Dictionary.
  // In this case, the keys used correspond to the attributes of OutcomeCounters.
) as OutcomeCounters;

const measureToCubeMapping = {
  "Distinct count city": ["EquityDerivativesCube"],
  "Test calculated measure": ["EquityDerivativesCube"],
  "Log pv.SUM": ["EquityDerivativesCube"],
  testo: ["EquityDerivativesCube"],
  "new measure*": ["EquityDerivativesCube"],
  "CM in 2 cubes": ["EquityDerivativesCube", "EquityDerivativesCubeDist"],
};

migrateSavedCalculatedMeasures({
  contentServer: contentServerForTests,
  measureToCubeMapping,
  errorReport,
  counters,
  doesReportIncludeStacks: false,
  step: "5.1 to 5.2",
});

describe("migrateSavedCalculatedMeasures", () => {
  it("migrates the serialized definitions of all calculated measures created with ActiveUI 5.0 and used in a saved dashboard or saved widget, into ones that are natively supported by ActivePivot", () => {
    // `uiCalculatedMeasuresFolder` contains 5 calculated measures.
    // "Exp gamma sum" is not used in any saved widgets or dashboards, it is not migrated.
    expect(counters.calculated_measures.success).toEqual(4);
    expect(counters.calculated_measures.failed).toEqual(1);

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

  it("changes the content of a calculated measure to the format supported by ActivePivot", () => {
    // The `content` property has been updated to contain the properties `className`, `additionalProperties`, `uniqueName`, `expression` and `formatStringExpression`.
    expect(
      contentServerForTests.children!.pivot.children!.entitlements.children!.cm
        .children!.EquityDerivativesCube.children![
        "[Measures].[Distinct count city]"
      ],
    ).toMatchInlineSnapshot(`
      {
        "entry": {
          "canRead": true,
          "canWrite": true,
          "content": "{"className":"com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription","additionalProperties":{},"uniqueName":"[Measures].[Distinct count city]","expression":"Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY)","formatStringExpression":"\\"#,###.##\\""}",
          "isDirectory": false,
          "lastEditor": "admin",
          "owners": [
            "admin",
          ],
          "readers": [
            "admin",
          ],
          "timestamp": 1666091498549,
        },
      }
    `);
  });

  it("adds a calculated measure which can target several cubes to each of the targeted cubes in `pivot/entitlements/cm`", () => {
    // "CM in 2 cubes" is added to `pivot/entitlements/cm` for both `EquityDerivativesCube` and `EquityDerivativesCubeDist`.
    expect(
      contentServerForTests.children!.pivot.children!.entitlements.children!.cm
        .children!.EquityDerivativesCube.children![
        "[Measures].[CM in 2 cubes]"
      ],
    ).toStrictEqual(
      contentServerForTests.children!.pivot.children!.entitlements.children!.cm
        .children!.EquityDerivativesCubeDist.children![
        "[Measures].[CM in 2 cubes]"
      ],
    );
  });

  it("deletes the `ui/calculated_measures` folder", () => {
    expect(
      contentServerForTests.children!.ui.children!.calculated_measures,
    ).toBeUndefined();
  });

  it("adds a warning to the `errorReport` that a calculated measure has not been migrated if it is not used in any saved widgets or dashboards", () => {
    expect(errorReport).toStrictEqual({
      calculated_measures: {
        "501": {
          error: {
            message:
              'Warning: Calculated measure "Exp gamma sum" was not migrated because it is not currently used in any saved widgets or dashboards.',
          },
          folderId: ["a14"],
          folderName: ["New folder"],
          name: "Exp gamma sum",
          step: "5.1 to 5.2",
        },
      },
    });
  });
});
