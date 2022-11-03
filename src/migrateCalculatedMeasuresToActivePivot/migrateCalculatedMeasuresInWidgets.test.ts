import { widgetsWithCalculatedMeasuresFrom2Cubes } from "../__test_resources__/aui5.0LegacyTestResources/widgetsFolderWithCalculatedMeasuresFrom2Cubes";
import { widgetsFolder } from "../__test_resources__/aui5.0LegacyTestResources/widgetsFolder";
import { migrateCalculatedMeasuresInWidgets } from "./migrateCalculatedMeasuresInWidgets";
import { dataModelsForTests } from "@activeviam/data-model";
import { getUniqueCalculatedMeasureNames } from "./getUniqueCalculatedMeasureNames";
import { calculatedMeasures } from "../__test_resources__/aui5.0LegacyTestResources/calculatedMeasuresFolder";
import { getCalculatedMeasureIds } from "./getCalculatedMeasureIds";

const dataModel = dataModelsForTests.sandbox;
const namesOfCalculatedMeasurestoMigrate = getUniqueCalculatedMeasureNames(
  calculatedMeasures,
  getCalculatedMeasureIds(calculatedMeasures),
);

describe("getCalculatedMeasuresFromWidgets", () => {
  it("returns an array of the names of the calculated measures from the saved widgets folder, organized by cube, when there is one cube with calculated measures", () => {
    const migratedCalculatedMeasuresInWidgets =
      migrateCalculatedMeasuresInWidgets(
        widgetsFolder,
        dataModel,
        namesOfCalculatedMeasurestoMigrate,
      );

    // `cubeNames` is an object containing all calculated measures used in the provided widgets folder, associated to their cubeName.
    expect(migratedCalculatedMeasuresInWidgets.cubeNames)
      .toMatchInlineSnapshot(`
      Object {
        "Distinct count city": "EquityDerivativesCube",
        "Log pv.SUM": "EquityDerivativesCube",
        "activeui5 calculated measure": "EquityDerivativesCube",
      }
    `);

    // This is definitely defined, otherwise the snapshot would be empty.
    // "WITH  Member [Measures].[Distinct count city]..." has been removed from `query.mdx`.
    expect(
      migratedCalculatedMeasuresInWidgets.migratedWidgetsRecord.children!
        .content.children!["854"].entry.content,
    ).toMatchInlineSnapshot(`
      Object {
        "mapping": Object {
          "columns": Array [
            "ALL_MEASURES",
          ],
          "measures": Array [
            "[Measures].[contributors.COUNT]",
            "[Measures].[Distinct count city]",
          ],
          "rows": Array [
            "[Currency].[Currency].[Currency]",
          ],
        },
        "query": Object {
          "mdx": "SELECT NON EMPTY Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT], [Measures].[Distinct count city]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
          "updateMode": "once",
        },
        "serverKey": "Ranch 6.0",
      }
    `);
  });

  it("returns an array of the names of the calculated measures from the saved widgets folder, organized by cube, when there is more than one cube with calculated measures", () => {
    const migratedCalculatedMeasuresInWidgets =
      migrateCalculatedMeasuresInWidgets(
        widgetsWithCalculatedMeasuresFrom2Cubes,
        dataModel,
        namesOfCalculatedMeasurestoMigrate,
      );

    expect(migratedCalculatedMeasuresInWidgets.cubeNames).toStrictEqual({
      "activeui5 calculated measure": "EquityDerivativesCube",
      "pvSum ^ 2": "EquityDerivativesCubeDist",
    });
  });

});
