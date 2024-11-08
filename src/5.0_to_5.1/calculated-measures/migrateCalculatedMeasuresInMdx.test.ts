import { sandboxDataModel } from "@activeviam/data-model-5.1/dist/__test_resources__";
import { MdxSelect, parse, stringify } from "@activeviam/mdx-5.0";
import { migrateCalculatedMeasuresInMdx } from "./migrateCalculatedMeasuresInMdx";

export const mdxSelectWithNoCalculatedMeasures: MdxSelect = parse(`
SELECT 
  NON EMPTY Hierarchize(
    Descendants(
      {
        [Geography].[City].[AllMember]
      },
      1,
      SELF_AND_BEFORE
      )
    ) ON ROWS,
    NON EMPTY {
      [Measures].[contributors.COUNT]
    } ON COLUMNS 
  FROM [EquityDerivativesCube] 
  CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS
`);

const mdxSelectWithOneCalculatedMeasure: MdxSelect = parse(`
  WITH  Member [Measures].[Distinct count city] AS Count(Descendants([Geography].[City].CurrentMember,
     [Geography].[City].[City]), EXCLUDEEMPTY), FORMAT_STRING = "#,###.##"  
    SELECT 
      NON EMPTY Hierarchize(
        Descendants(
          {
            [Currency].[Currency].[AllMember]
          }, 
          1, 
          SELF_AND_BEFORE
          )
        ) ON ROWS, 
        NON EMPTY {
          [Measures].[contributors.COUNT], 
          [Measures].[Distinct count city]
        } ON COLUMNS 
      FROM [EquityDerivativesCube] 
      CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS
`);

export const mdxSelectWithThreeCalculatedMeasures: MdxSelect = parse(`
    WITH  Member [Measures].[Log pv.SUM] AS Log([Measures].[pv.SUM], 10), FORMAT_STRING = "#,###.##"
    Member [Measures].[Distinct count city] AS Count(Descendants([Geography].[City].CurrentMember, 
      [Geography].[City].[City]), EXCLUDEEMPTY), FORMAT_STRING = "#,###.##"
    Member [Measures].[One] AS 1
    SELECT 
      NON EMPTY Hierarchize(
        Descendants(
          {
            [Geography].[City].[AllMember]
          },
          1,
          SELF_AND_BEFORE
          )
        ) ON ROWS,
        NON EMPTY {
          [Measures].[Log pv.SUM],
          [Measures].[Distinct count city],
          [Measures].[One]
        } ON COLUMNS 
      FROM [EquityDerivativesCube] 
      CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS
`);

const mdxSelectWithCalculatedMeasureNotOnList: MdxSelect = parse(`
    WITH  Member [Measures].[pvSum ^ 2] AS [Measures].[pv.SUM] ^ 2, FORMAT_STRING = "#,###.##"
      SELECT 
        NON EMPTY {
          [Measures].[pvSum ^ 2]
        } ON COLUMNS, 
      NON EMPTY Hierarchize(
        Descendants(
          {
            [CounterParty].[CounterParty].[AllMember]
          }, 
          1, 
          SELF_AND_BEFORE
          )
        ) ON ROWS 
      FROM [EquityDerivativesCubeDist] 
      CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS
`);

const namesOfCalculatedMeasuresToMigrate = [
  "Distinct count city",
  "Exp gamma sum",
  "Log pv.SUM",
  "activeui5 calculated measure",
  "Test calculated measure",
  "One",
];

const dataModels = { "Ranch 6.0": sandboxDataModel };

describe("migrateCalculatedMeasuresInMdx", () => {
  it("returns `namesOfCalculatedMeasuresToMigrateInWidget` as an empty array and does not modify the MDX when there are no calculated measures", () => {
    const { cubeName, namesOfMigratedCalulatedMeasures, migratedMdx } =
      migrateCalculatedMeasuresInMdx({
        mdx: mdxSelectWithNoCalculatedMeasures,
        namesOfCalculatedMeasuresToMigrate,
        dataModels,
        serverKey: "Ranch 6.0",
      });

    expect(cubeName).toStrictEqual("EquityDerivativesCube");
    expect(namesOfMigratedCalulatedMeasures).toStrictEqual([]);
    expect(migratedMdx).toStrictEqual(mdxSelectWithNoCalculatedMeasures);
  });

  it("removes matching calculated measure definitions from MDX when the widget contains a single calculated measure", () => {
    const { cubeName, namesOfMigratedCalulatedMeasures, migratedMdx } =
      migrateCalculatedMeasuresInMdx({
        mdx: mdxSelectWithOneCalculatedMeasure,
        namesOfCalculatedMeasuresToMigrate,
        dataModels,
        serverKey: "Ranch 6.0",
      });

    expect(cubeName).toStrictEqual("EquityDerivativesCube");
    expect(namesOfMigratedCalulatedMeasures).toStrictEqual([
      "Distinct count city",
    ]);

    // "WITH  Member [Measures].[Distinct count city]..." has been removed from the beginning of the MDX string.
    expect(stringify(migratedMdx, { indent: true })).toMatchInlineSnapshot(`
      "SELECT
        NON EMPTY Hierarchize(
          Descendants(
            {
              [Currency].[Currency].[AllMember]
            },
            1,
            SELF_AND_BEFORE
          )
        ) ON ROWS,
        NON EMPTY {
          [Measures].[contributors.COUNT],
          [Measures].[Distinct count city]
        } ON COLUMNS
        FROM [EquityDerivativesCube]
        CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"
    `);
  });

  it("removes matching calculated measure definitions from MDX when the widget contains several calculated measures", () => {
    const { cubeName, namesOfMigratedCalulatedMeasures, migratedMdx } =
      migrateCalculatedMeasuresInMdx({
        mdx: mdxSelectWithThreeCalculatedMeasures,
        namesOfCalculatedMeasuresToMigrate,
        dataModels,
        serverKey: "Ranch 6.0",
      });

    expect(cubeName).toStrictEqual("EquityDerivativesCube");
    expect(namesOfMigratedCalulatedMeasures).toStrictEqual([
      "Log pv.SUM",
      "Distinct count city",
      "One",
    ]);

    expect(stringify(migratedMdx, { indent: true })).toMatchInlineSnapshot(`
      "SELECT
        NON EMPTY Hierarchize(
          Descendants(
            {
              [Geography].[City].[AllMember]
            },
            1,
            SELF_AND_BEFORE
          )
        ) ON ROWS,
        NON EMPTY {
          [Measures].[Log pv.SUM],
          [Measures].[Distinct count city],
          [Measures].[One]
        } ON COLUMNS
        FROM [EquityDerivativesCube]
        CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"
    `);
  });

  it("does not remove the definitions of calculated measures that do not match `namesOfCalculatedMeasuresToMigrate`", () => {
    const { cubeName, namesOfMigratedCalulatedMeasures, migratedMdx } =
      migrateCalculatedMeasuresInMdx({
        // mdxSelectWithCalculatedMeasureNotOnList contains [Measures].[pvSum ^ 2], which is not on the list of `namesOfCalculatedMeasuresToMigrate`.
        mdx: mdxSelectWithCalculatedMeasureNotOnList,
        namesOfCalculatedMeasuresToMigrate,
        dataModels,
        serverKey: "Ranch 6.0",
      });

    expect(cubeName).toStrictEqual("EquityDerivativesCubeDist");
    expect(namesOfMigratedCalulatedMeasures).toStrictEqual([]);

    expect(migratedMdx).toStrictEqual(mdxSelectWithCalculatedMeasureNotOnList);
  });
});
