import { dataModelsForTests } from "@activeviam/data-model-5.0";
import { MdxString } from "@activeviam/mdx-5.0";
import { migrateCalculatedMeasuresInMdx } from "./migrateCalculatedMeasuresInMdx";

const mdxStringWithNoCalculatedMeasures: MdxString =
  "SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS";

const mdxStringWithOneCalculatedMeasure: MdxString =
  'WITH  Member [Measures].[Distinct count city] AS Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY), FORMAT_STRING = "#,###.##"  SELECT NON EMPTY Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT], [Measures].[Distinct count city]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS';

const mdxStringWithTwoCalculatedMeasures: MdxString =
  'WITH  Member [Measures].[Log pv.SUM] AS Log([Measures].[pv.SUM], 10), FORMAT_STRING = "#,###.##"    Member [Measures].[Distinct count city] AS Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY), FORMAT_STRING = "#,###.##"  SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Log pv.SUM], [Measures].[Distinct count city]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS';

const mdxStringWithCalculatedMeasureNotOnList =
  'WITH  Member [Measures].[pvSum ^ 2] AS [Measures].[pv.SUM] ^ 2, FORMAT_STRING = "#,###.##"  SELECT NON EMPTY {[Measures].[pvSum ^ 2]} ON COLUMNS, NON EMPTY Hierarchize(Descendants({[CounterParty].[CounterParty].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS FROM [EquityDerivativesCubeDist] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS';

const namesOfCalculatedMeasurestoMigrate = [
  "Distinct count city",
  "Exp gamma sum",
  "Log pv.SUM",
  "activeui5 calculated measure",
  "Test calculated measure",
];

const dataModel = dataModelsForTests.sandbox;

describe("migrateCalculatedMeasuresInMdx", () => {
  it("returns `namesOfCalculatedMeasuresToMigrateInWidget` as an empty array and does not modify the MDX when there are no calculated measures", () => {
    const {
      cubeName,
      namesOfCalculatedMeasuresToMigrateInWidget,
      migratedMdx,
    } = migrateCalculatedMeasuresInMdx(
      mdxStringWithNoCalculatedMeasures,
      namesOfCalculatedMeasurestoMigrate,
      dataModel,
    );

    expect(cubeName).toStrictEqual("EquityDerivativesCube");
    expect(namesOfCalculatedMeasuresToMigrateInWidget).toStrictEqual([]);
    expect(migratedMdx).toStrictEqual(mdxStringWithNoCalculatedMeasures);
  });

  it("removes calculated measure definition from MDX when widget contains a single calculated measure", () => {
    const {
      cubeName,
      namesOfCalculatedMeasuresToMigrateInWidget,
      migratedMdx,
    } = migrateCalculatedMeasuresInMdx(
      mdxStringWithOneCalculatedMeasure,
      namesOfCalculatedMeasurestoMigrate,
      dataModel,
    );

    expect(cubeName).toStrictEqual("EquityDerivativesCube");
    expect(namesOfCalculatedMeasuresToMigrateInWidget).toStrictEqual([
      "Distinct count city",
    ]);

    // "WITH  Member [Measures].[Distinct count city]..." has been removed from the beginning of the MDX string.
    expect(migratedMdx).toMatchInlineSnapshot(
      `"SELECT NON EMPTY Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT], [Measures].[Distinct count city]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"`,
    );
  });

  it("removes calculated measure definitions from MDX when widget contains two calculated measures", () => {
    const {
      cubeName,
      namesOfCalculatedMeasuresToMigrateInWidget,
      migratedMdx,
    } = migrateCalculatedMeasuresInMdx(
      mdxStringWithTwoCalculatedMeasures,
      namesOfCalculatedMeasurestoMigrate,
      dataModel,
    );

    expect(cubeName).toStrictEqual("EquityDerivativesCube");
    expect(namesOfCalculatedMeasuresToMigrateInWidget).toStrictEqual([
      "Log pv.SUM",
      "Distinct count city",
    ]);

    // Both calculated measure definitions have been removed from the MDX string.
    expect(migratedMdx).toMatchInlineSnapshot(
      `"SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Log pv.SUM], [Measures].[Distinct count city]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"`,
    );
  });

  it("returns the MDX string unchanged if it contains a calculated measure which is not on the list of `namesOfCalculatedMeasuresToMigrate`", () => {
    const {
      cubeName,
      namesOfCalculatedMeasuresToMigrateInWidget,
      migratedMdx,
    } = migrateCalculatedMeasuresInMdx(
      // mdxStringWithCalculatedMeasureNotOnList contains [Measures].[pvSum ^ 2], which is not on the list of `namesOfCalculatedMeasurestoMigrate`.
      mdxStringWithCalculatedMeasureNotOnList,
      namesOfCalculatedMeasurestoMigrate,
      dataModel,
    );

    expect(cubeName).toStrictEqual("EquityDerivativesCubeDist");
    // No calculated measure names are returned.
    expect(namesOfCalculatedMeasuresToMigrateInWidget).toStrictEqual([]);

    // The MDX is unchanged.
    expect(migratedMdx).toStrictEqual(mdxStringWithCalculatedMeasureNotOnList);
  });
});
