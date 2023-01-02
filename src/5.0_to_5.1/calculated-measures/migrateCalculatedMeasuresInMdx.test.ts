import { sandboxDataModel } from "@activeviam/data-model-5.1/dist/__test_resources__";
import { MdxSelect, parse, stringify } from "@activeviam/mdx-5.0";
import { migrateCalculatedMeasuresInMdx } from "./migrateCalculatedMeasuresInMdx";

const mdxSelectWithNoCalculatedMeasures: MdxSelect = parse(`
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

const mdxSelectWithTwoCalculatedMeasures: MdxSelect = parse(`
    WITH  Member [Measures].[Log pv.SUM] AS Log([Measures].[pv.SUM], 10), FORMAT_STRING = "#,###.##"
    Member [Measures].[Distinct count city] AS Count(Descendants([Geography].[City].CurrentMember, 
      [Geography].[City].[City]), EXCLUDEEMPTY), FORMAT_STRING = "#,###.##"  
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
           [Measures].[Distinct count city]
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
];

const dataModels = { "Ranch 6.0": sandboxDataModel };

describe("migrateCalculatedMeasuresInMdx", () => {
  it("returns `namesOfCalculatedMeasuresToMigrateInWidget` as an empty array and does not modify the MDX when there are no calculated measures", () => {
    const {
      cubeName,
      namesOfCalculatedMeasuresRemovedFromMdx:
        namesOfCalculatedMeasuresToMigrateInWidget,
      migratedMdx,
    } = migrateCalculatedMeasuresInMdx({
      mdx: mdxSelectWithNoCalculatedMeasures,
      namesOfCalculatedMeasuresToMigrate,
      dataModels,
      serverKey: "Ranch 6.0",
    });

    expect(cubeName).toStrictEqual("EquityDerivativesCube");
    expect(namesOfCalculatedMeasuresToMigrateInWidget).toStrictEqual([]);
    expect(migratedMdx).toStrictEqual(mdxSelectWithNoCalculatedMeasures);
  });

  it("removes calculated measure definition from MDX when the widget contains a single calculated measure", () => {
    const {
      cubeName,
      namesOfCalculatedMeasuresRemovedFromMdx:
        namesOfCalculatedMeasuresToMigrateInWidget,
      migratedMdx,
    } = migrateCalculatedMeasuresInMdx({
      mdx: mdxSelectWithOneCalculatedMeasure,
      namesOfCalculatedMeasuresToMigrate,
      dataModels,
      serverKey: "Ranch 6.0",
    });

    expect(cubeName).toStrictEqual("EquityDerivativesCube");
    expect(namesOfCalculatedMeasuresToMigrateInWidget).toStrictEqual([
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

  it("removes calculated measure definitions from MDX when the widget contains two calculated measures", () => {
    const {
      cubeName,
      namesOfCalculatedMeasuresRemovedFromMdx:
        namesOfCalculatedMeasuresToMigrateInWidget,
      migratedMdx,
    } = migrateCalculatedMeasuresInMdx({
      mdx: mdxSelectWithTwoCalculatedMeasures,
      namesOfCalculatedMeasuresToMigrate,
      dataModels,
      serverKey: "Ranch 6.0",
    });

    expect(cubeName).toStrictEqual("EquityDerivativesCube");
    expect(namesOfCalculatedMeasuresToMigrateInWidget).toStrictEqual([
      "Log pv.SUM",
      "Distinct count city",
    ]);

    // Both calculated measure definitions have been removed from the MDX.
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
          [Measures].[Distinct count city]
        } ON COLUMNS
        FROM [EquityDerivativesCube]
        CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"
    `);
  });

  it("returns the MDX unchanged if it contains a calculated measure which is not on the list of `namesOfCalculatedMeasuresToMigrate`", () => {
    const {
      cubeName,
      namesOfCalculatedMeasuresRemovedFromMdx:
        namesOfCalculatedMeasuresToMigrateInWidget,
      migratedMdx,
    } = migrateCalculatedMeasuresInMdx({
      // mdxSelectWithCalculatedMeasureNotOnList contains [Measures].[pvSum ^ 2], which is not on the list of `namesOfCalculatedMeasuresToMigrate`.
      mdx: mdxSelectWithCalculatedMeasureNotOnList,
      namesOfCalculatedMeasuresToMigrate,
      dataModels,
      serverKey: "Ranch 6.0",
    });

    expect(cubeName).toStrictEqual("EquityDerivativesCubeDist");
    // No calculated measure names are returned.
    expect(namesOfCalculatedMeasuresToMigrateInWidget).toStrictEqual([]);

    // The MDX is unchanged.
    expect(migratedMdx).toStrictEqual(mdxSelectWithCalculatedMeasureNotOnList);
  });
});
