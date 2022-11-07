import { dataModelsForTests } from "@activeviam/data-model";
import { MdxString } from "@activeviam/mdx";
import { removeCalculatedMemberDefinitionFromMDXAndGetCubeName } from "./removeCalculatedMemberDefinitionFromMDXAndGetCubeName";

const mdxStringWithNoCalculatedMeasures: MdxString =
  "SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS";

const mdxStringWithOneCalculatedMeasure: MdxString =
  'WITH  Member [Measures].[Distinct count city] AS Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY), FORMAT_STRING = "#,###.##"  SELECT NON EMPTY Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT], [Measures].[Distinct count city]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS';

const mdxStringWithTwoCalculatedMeasures: MdxString =
  'WITH  Member [Measures].[Log pv.SUM] AS Log([Measures].[pv.SUM], 10), FORMAT_STRING = "#,###.##"    Member [Measures].[Distinct count city] AS Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY), FORMAT_STRING = "#,###.##"  SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Log pv.SUM], [Measures].[Distinct count city]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS';

const namesOfCalculatedMeasurestoMigrate = [
  "Distinct count city",
  "Exp gamma sum",
  "Log pv.SUM",
  "activeui5 calculated measure",
  "Test calculated measure",
  "pvSum ^ 2",
];

const dataModel = dataModelsForTests.sandbox;

describe("removeCalculatedMemberDefinitionFromMDXAndGetCubeName", () => {
  it("returns `calculatedMeasuresWithCubeNames` as an empty object and does not modify the MDX when there are no calculated measures", () => {
    const removeCalculatedMeasures =
      removeCalculatedMemberDefinitionFromMDXAndGetCubeName(
        mdxStringWithNoCalculatedMeasures,
        namesOfCalculatedMeasurestoMigrate,
        dataModel,
      );
    expect(removeCalculatedMeasures.calculatedMeasuresWithCubeNames).toStrictEqual({});
    expect(removeCalculatedMeasures.stringifiedUpdatedMdx).toEqual(
      mdxStringWithNoCalculatedMeasures,
    );
  });

  it("removes calculated measures from MDX when widget contains a single calculated measure", () => {
    const removeCalculatedMeasures =
      removeCalculatedMemberDefinitionFromMDXAndGetCubeName(
        mdxStringWithOneCalculatedMeasure,
        namesOfCalculatedMeasurestoMigrate,
        dataModel,
      );

    expect(removeCalculatedMeasures.calculatedMeasuresWithCubeNames).toStrictEqual({
      "Distinct count city": "EquityDerivativesCube",
    });

    // "WITH  Member [Measures].[Distinct count city]..." has been removed from the beginning of the MDX string.
    expect(
      removeCalculatedMeasures.stringifiedUpdatedMdx,
    ).toMatchInlineSnapshot(
      `"SELECT NON EMPTY Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT], [Measures].[Distinct count city]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"`,
    );
  });

  it("removes calculated measures from MDX when widget contains two calculated measures", () => {
    const removeCalculatedMeasures =
      removeCalculatedMemberDefinitionFromMDXAndGetCubeName(
        mdxStringWithTwoCalculatedMeasures,
        namesOfCalculatedMeasurestoMigrate,
        dataModel,
      );

    expect(removeCalculatedMeasures.calculatedMeasuresWithCubeNames).toStrictEqual({
      "Distinct count city": "EquityDerivativesCube",
      "Log pv.SUM": "EquityDerivativesCube",
    });

    // Both calculated measure definitions have been removed from the MDX string.
    expect(
      removeCalculatedMeasures.stringifiedUpdatedMdx,
    ).toMatchInlineSnapshot(
      `"SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Log pv.SUM], [Measures].[Distinct count city]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"`,
    );
  });
});
