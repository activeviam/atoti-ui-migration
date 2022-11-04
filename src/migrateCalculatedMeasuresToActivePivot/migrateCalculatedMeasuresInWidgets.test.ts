import { migrateCalculatedMeasuresInWidgets } from "./migrateCalculatedMeasuresInWidgets";
import { widgetsFolder } from "../__test_resources__/aui5.0LegacyTestResources/widgetsFolder";
import { widgetsWithCalculatedMeasuresFrom2Cubes } from "../__test_resources__/aui5.0LegacyTestResources/widgetsFolderWithCalculatedMeasuresFrom2Cubes";
import { dataModelsForTests } from "@activeviam/data-model";
import { getUniqueCalculatedMeasureNames } from "./getUniqueCalculatedMeasureNames";
import { calculatedMeasures } from "../__test_resources__/aui5.0LegacyTestResources/calculatedMeasuresFolder";
import { getCalculatedMeasureIds } from "./getCalculatedMeasureIds";

const dataModel = dataModelsForTests.sandbox;
const namesOfCalculatedMeasurestoMigrate = getUniqueCalculatedMeasureNames(
  calculatedMeasures,
  getCalculatedMeasureIds(calculatedMeasures),
);

describe("migrateCalculatedMeasuresInWidgets", () => {
  it("removes the calculated measure definitions from the MDX of saved widgets and returns the `cubeName` corresponding to the calculated measure name when there is one cube with calculated measures", () => {
    const migratedCalculatedMeasuresInWidgets =
      migrateCalculatedMeasuresInWidgets(
        widgetsFolder,
        dataModel,
        namesOfCalculatedMeasurestoMigrate,
      );

    // `cubeNames` is an object containing all calculated measures used in the provided widgets folder, associated to their cubeName.
    expect(migratedCalculatedMeasuresInWidgets.cubeNames).toStrictEqual({
      "Distinct count city": "EquityDerivativesCube",
      "Log pv.SUM": "EquityDerivativesCube",
      "activeui5 calculated measure": "EquityDerivativesCube",
    });

    // "WITH  Member [Measures].[Distinct count city]..." has been removed from `query.mdx`.
    expect(
      // This is definitely defined, otherwise the snapshot would be empty.
      migratedCalculatedMeasuresInWidgets.migratedWidgetsRecord.children
        ?.content.children!["854"].entry.content,
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

    // This widget contains 2 calculated measures. They are both removed from `query.mdx`.
    expect(
      // This is definitely defined, otherwise the snapshot would be empty.
      migratedCalculatedMeasuresInWidgets.migratedWidgetsRecord.children
        ?.content.children!["0fc"].entry.content,
    ).toMatchInlineSnapshot(`
      Object {
        "mapping": Object {
          "columns": Array [],
          "measures": Array [
            "[Measures].[Log pv.SUM]",
            "[Measures].[Distinct count city]",
          ],
          "rows": Array [
            "[Geography].[City].[City]",
          ],
        },
        "query": Object {
          "mdx": "SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Log pv.SUM], [Measures].[Distinct count city]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
          "updateMode": "once",
        },
        "serverKey": "Ranch 6.0",
      }
    `);
  });

  it("removes the calculated measure definitions from the MDX of saved widgets and returns the `cubeName` corresponding to the calculated measure name when there is more than one cube with calculated measures", () => {
    const migratedCalculatedMeasuresInWidgets =
      migrateCalculatedMeasuresInWidgets(
        widgetsWithCalculatedMeasuresFrom2Cubes,
        dataModel,
        namesOfCalculatedMeasurestoMigrate,
      );

    // `cubeNames` is an object containing all calculated measures used in the provided widgets folder, associated to their cubeName.
    expect(migratedCalculatedMeasuresInWidgets.cubeNames).toStrictEqual({
      "activeui5 calculated measure": "EquityDerivativesCube",
      "pvSum ^ 2": "EquityDerivativesCubeDist",
    });

    // "pvSum ^ 2" is removed from `query.mdx` of a widget using `EquityDerivativesCubeDist`.
    expect(
      // This is definitely defined, otherwise the snapshot would be empty.
      migratedCalculatedMeasuresInWidgets.migratedWidgetsRecord.children
        ?.content.children!["53a"].entry.content,
    ).toMatchInlineSnapshot(`
      Object {
        "mapping": Object {
          "columns": Array [
            "ALL_MEASURES",
          ],
          "measures": Array [
            "[Measures].[pvSum ^ 2]",
          ],
          "rows": Array [
            "[CounterParty].[CounterParty].[CounterPartyGroup]",
          ],
        },
        "query": Object {
          "mdx": "SELECT NON EMPTY {[Measures].[pvSum ^ 2]} ON COLUMNS, NON EMPTY Hierarchize(Descendants({[CounterParty].[CounterParty].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS FROM [EquityDerivativesCubeDist] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
          "updateMode": "once",
        },
        "serverKey": "Ranch 5.11",
      }
    `);

    // "activeui5 calculated measure" is removed from `query.mdx` of a widget using `EquityDerivativesCube`.
    expect(
      // This is definitely defined, otherwise the snapshot would be empty.
      migratedCalculatedMeasuresInWidgets.migratedWidgetsRecord.children
        ?.content.children!["ee7"].entry.content,
    ).toMatchInlineSnapshot(`
      Object {
        "mapping": Object {
          "horizontalSubplots": Array [],
          "sliceBy": Array [
            "[Currency].[Currency].[Currency]",
          ],
          "values": Array [
            "[Measures].[activeui5 calculated measure]",
          ],
          "verticalSubplots": Array [],
        },
        "query": Object {
          "mdx": "SELECT NON EMPTY Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[activeui5 calculated measure]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
          "updateMode": "once",
        },
        "serverKey": "Ranch 6.0",
      }
    `);
  });
});
