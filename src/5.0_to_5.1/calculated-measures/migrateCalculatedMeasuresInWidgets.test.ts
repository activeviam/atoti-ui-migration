import { migrateCalculatedMeasuresInWidgets } from "./migrateCalculatedMeasuresInWidgets";
import { uiWidgetsFolder } from "../__test_resources__/uiWidgetsFolder";
import { dataModelsForTests } from "@activeviam/data-model-5.0";

const dataModel = dataModelsForTests.sandbox;

// "pvSum ^ 2" is from cube "EquityDerivativesCubeDist", all others are from "EquityDerivativesCube".
const namesOfCalculatedMeasurestoMigrate = [
  "Distinct count city",
  "Test calculated measure",
  "EXP pnl.Forex",
  "Log pv.SUM",
  "pvSum ^ 2",
];

describe("migrateCalculatedMeasuresInWidgets", () => {
  const { measureToCubeMapping, migratedWidgetsRecord } =
    migrateCalculatedMeasuresInWidgets(
      uiWidgetsFolder,
      dataModel,
      namesOfCalculatedMeasurestoMigrate,
    );

  it("returns a `measureToCubeMapping` object containing the names of all calculated measures used in the `ui/widgets` and `ui/dashboards` folders with their corresponding cube name", () => {
    expect(measureToCubeMapping).toStrictEqual({
      "Distinct count city": "EquityDerivativesCube",
      "EXP pnl.Forex": "EquityDerivativesCube",
      "Log pv.SUM": "EquityDerivativesCube",
      "Test calculated measure": "EquityDerivativesCube",
      "pvSum ^ 2": "EquityDerivativesCubeDist",
    });
  });

  it("does not change a widget record if there are no calculated measures in its MDX query", () => {
    // "7a5" is a widget containing no calculated measures.
    expect(
      migratedWidgetsRecord.children?.content.children!["7a5"],
    ).toStrictEqual(uiWidgetsFolder.children?.content.children!["7a5"]);
  });

  it("does not remove a calculated measure definition from the MDX if it is not on the list of `namesOfCalculatedMeasuresToMigrate`", () => {
    // "ee7" is a widget containing 1 calculated measure which is not on the list of `namesOfCalculatedMeasuresToMigrate`.
    expect(
      migratedWidgetsRecord.children?.content.children!["ee7"],
    ).toStrictEqual(uiWidgetsFolder.children?.content.children!["ee7"]);
  });

  it("removes the calculated measure definition from a widget containing 1 calculated measure", () => {
    expect(
      // "854" is a widget containing 1 calculated measure ("Distinct count city").
      JSON.parse(
        migratedWidgetsRecord.children?.content.children!["854"].entry.content,
      ).query.mdx,
      // "WITH  Member [Measures].[Distinct count city]..." has been removed from the beginning of the MDX string.
    ).toMatchInlineSnapshot(
      `"SELECT NON EMPTY Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT], [Measures].[Distinct count city]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"`,
    );
  });

  it("removes both calculated measure definitions from a widget containing 2 calculated measures", () => {
    expect(
      // "0fc" is a widget containing 2 calculated measures.
      JSON.parse(
        migratedWidgetsRecord.children?.content.children!["0fc"].entry.content,
      ).query.mdx,
    ).toMatchInlineSnapshot(
      `"SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Log pv.SUM], [Measures].[Distinct count city]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"`,
    );
  });

  it("does not change a widget record if there are no calculated measures in its MDX query when the widget is inside a folder", () => {
    // "6bf" is a widget inside a folder containing no calculated measures.
    expect(
      migratedWidgetsRecord.children?.content.children!["6bf"],
    ).toStrictEqual(uiWidgetsFolder.children?.content.children!["6bf"]);
  });

  it("removes the calculated measure definition from a widget inside a folder containing 1 calculated measure", () => {
    // "761" is a widget inside a folder containing 1 calculated measure ("Test calculated measure").
    expect(
      JSON.parse(
        migratedWidgetsRecord.children?.content.children!["761"].entry.content,
      ).query.mdx,
      // "WITH  Member [Measures].[Test calculated measure]..." has been removed from the beginning of the MDX string.
    ).toMatchInlineSnapshot(
      `"SELECT NON EMPTY Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Test calculated measure]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"`,
    );
  });

  it("removes the calculated measure definition from a widget inside a folder containing 1 calculated measure and 1 native measure", () => {
    // "049" is a widget inside a folder containing 1 calculated measure and 1 native measure.
    expect(
      JSON.parse(
        migratedWidgetsRecord.children?.content.children!["049"].entry.content,
      ).query.mdx,
      // "WITH  Member [Measures].[EXP pnl.Forex]..." has been removed from the beginning of the MDX string.
    ).toMatchInlineSnapshot(
      `"SELECT NON EMPTY Hierarchize(Descendants({[Booking].[Desk].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[pnl.SUM], [Measures].[EXP pnl.Forex]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"`,
    );
  });

  it("removes all calculated measure definitions from a widget inside a folder containing multiple calculated measures", () => {
    expect(
      // "3cb" is a widget inside a folder containing multiple calculated measures.
      JSON.parse(
        migratedWidgetsRecord.children?.content.children!["3cb"].entry.content,
      ).query.mdx,
    ).toMatchInlineSnapshot(
      `"SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Log pv.SUM], [Measures].[Distinct count city], [Measures].[EXP pnl.Forex]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"`,
    );
  });
});
