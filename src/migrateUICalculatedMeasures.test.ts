import {
  createCMFolderWithinEntitlements,
  getCalculatedMeasuresFromWidgets,
} from "./checkWidgets";
import {
  createAPCalculatedMeasure,
  getCalculatedMeasureIds,
} from "./migrateUICalculatedMeasures";
import { calculatedMeasures } from "./__test_resources__/calculatedMeasures";
import { widgets } from "./__test_resources__/widgets";
import { widgets2 } from "./__test_resources__/widgets2";

const calculatedMeasuresFolder = calculatedMeasures;

describe("migrateUICalculatedMeasures", () => {
  it("getCalculatedMeasureIds", () => {
    expect(getCalculatedMeasureIds(calculatedMeasuresFolder)).toStrictEqual([
      "196",
      "501",
      "585",
      "cef",
      "6b5",
    ]);
  });

  it("createAPCaluclatedMeasure", () => {
    expect(
      createAPCalculatedMeasure(
        calculatedMeasuresFolder,
        "Distinct count city",
        "196",
      ),
    ).toMatchInlineSnapshot(`
      Object {
        "entry": Object {
          "canRead": true,
          "canWrite": true,
          "content": "{\\"className\\":\\"com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription\\",\\"additionalProperties\\":{},\\"uniqueName\\":\\"[Measures].[Distinct count city]\\",\\"expression\\":\\"Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY)\\",\\"formatStringExpression\\":\\"FORMAT_STRING = \\\\\\"#,###.##\\\\\\"\\"}",
          "isDirectory": false,
          "lastEditor": "admin",
          "owners": Array [
            "admin",
          ],
          "readers": Array [
            "admin",
          ],
          "timestamp": 1666091498549,
        },
      }
    `);
  });

  it("gets calculated measures from each widget", () => {
    expect(getCalculatedMeasuresFromWidgets(widgets)).toMatchInlineSnapshot(`
      Object {
        "EquityDerivativesCube": Array [
          "Distinct count city",
        ],
      }
    `);
  });

  it("creates cm folder structure", () => {
    expect(createCMFolderWithinEntitlements(widgets, calculatedMeasures))
      .toMatchInlineSnapshot(`
      Object {
        "EquityDerivativesCube": Object {
          "children": Object {
            "[Measures].[Distinct count city]": Object {
              "entry": Object {
                "canRead": true,
                "canWrite": true,
                "content": "{\\"className\\":\\"com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription\\",\\"additionalProperties\\":{},\\"uniqueName\\":\\"[Measures].[Distinct count city]\\",\\"expression\\":\\"Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY)\\"}",
                "isDirectory": false,
                "lastEditor": "admin",
                "owners": Array [
                  "admin",
                ],
                "readers": Array [
                  "admin",
                ],
                "timestamp": 1666091498549,
              },
            },
          },
          "entry": Object {
            "isDirectory": true,
            "owners": Array [
              "ROLE_USER",
            ],
            "readers": Array [
              "ROLE_USER",
            ],
          },
        },
      }
    `);
  });

  it("creates cm folder structure with widgets with more than 1 cm ", () => {
    expect(createCMFolderWithinEntitlements(widgets2, calculatedMeasures))
      .toMatchInlineSnapshot(`
      Object {
        "EquityDerivativesCube": Object {
          "children": Object {
            "[Measures].[Distinct count city]": Object {
              "entry": Object {
                "canRead": true,
                "canWrite": true,
                "content": "{\\"className\\":\\"com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription\\",\\"additionalProperties\\":{},\\"uniqueName\\":\\"[Measures].[Distinct count city]\\",\\"expression\\":\\"Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY)\\"}",
                "isDirectory": false,
                "lastEditor": "admin",
                "owners": Array [
                  "admin",
                ],
                "readers": Array [
                  "admin",
                ],
                "timestamp": 1666091498549,
              },
            },
            "[Measures].[Log pv.SUM]": Object {
              "entry": Object {
                "canRead": true,
                "canWrite": true,
                "content": "{\\"className\\":\\"com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription\\",\\"additionalProperties\\":{},\\"uniqueName\\":\\"[Measures].[Log pv.SUM]\\",\\"expression\\":\\"Log([Measures].[pv.SUM], 10)\\",\\"formatStringExpression\\":\\"FORMAT_STRING = \\\\\\"#,###.##\\\\\\"\\"}",
                "isDirectory": false,
                "lastEditor": "admin",
                "owners": Array [
                  "admin",
                ],
                "readers": Array [
                  "admin",
                ],
                "timestamp": 1666170634498,
              },
            },
            "[Measures].[activeui5 calculated measure]": Object {
              "entry": Object {
                "canRead": true,
                "canWrite": true,
                "content": "{\\"className\\":\\"com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription\\",\\"additionalProperties\\":{},\\"uniqueName\\":\\"[Measures].[activeui5 calculated measure]\\",\\"expression\\":\\"IIf(IsEmpty([Currency].[Currency].CurrentMember.PrevMember), NULL, ([Measures].[contributors.COUNT], [Currency].[Currency].CurrentMember) - ([Measures].[contributors.COUNT], [Currency].[Currency].CurrentMember.PrevMember))\\",\\"formatStringExpression\\":\\"FORMAT_STRING = \\\\\\"#,###.##%\\\\\\"\\"}",
                "isDirectory": false,
                "lastEditor": "admin",
                "owners": Array [
                  "admin",
                ],
                "readers": Array [
                  "admin",
                ],
                "timestamp": 1666082732801,
              },
            },
          },
          "entry": Object {
            "isDirectory": true,
            "owners": Array [
              "ROLE_USER",
            ],
            "readers": Array [
              "ROLE_USER",
            ],
          },
        },
      }
    `);
  });
});
