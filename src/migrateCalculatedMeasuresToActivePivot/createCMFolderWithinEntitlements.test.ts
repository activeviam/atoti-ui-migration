import { calculatedMeasures } from "../__test_resources__/aui5.0LegacyTestResources/calculatedMeasuresFolder";
import { widgetsFolder } from "../__test_resources__/aui5.0LegacyTestResources/widgetsFolder";
import { widgetsWithCalculatedMeasuresFrom2Cubes } from "../__test_resources__/aui5.0LegacyTestResources/widgetsFolderWithCalculatedMeasuresFrom2Cubes";
import { createCMFolderWithinEntitlements } from "./createCMFolderWithinEntitlements";

describe("createCMFolderWithinEntitlements", () => {
  it("creates `cm` folder structure when the widgets folder contains one cube with calculated measures", () => {
    expect(createCMFolderWithinEntitlements(widgetsFolder, calculatedMeasures))
      .toMatchInlineSnapshot(`
      Object {
        "EquityDerivativesCube": Object {
          "children": Object {
            "[Measures].[Distinct count city]": Object {
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

  it("creates `cm` folder structure when the widgets folder contains two cubes with calculated measures", () => {
    expect(
      createCMFolderWithinEntitlements(
        widgetsWithCalculatedMeasuresFrom2Cubes,
        calculatedMeasures,
      ),
    ).toMatchInlineSnapshot(`
      Object {
        "EquityDerivativesCube": Object {
          "children": Object {
            "[Measures].[activeui5 calculated measure]": Object {
              "entry": Object {
                "canRead": true,
                "canWrite": true,
                "content": "{\\"className\\":\\"com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription\\",\\"additionalProperties\\":{},\\"uniqueName\\":\\"[Measures].[activeui5 calculated measure]\\",\\"expression\\":\\"IIf(IsEmpty([Currency].[Currency].CurrentMember.PrevMember), NULL, ([Measures].[contributors.COUNT], [Currency].[Currency].CurrentMember) - ([Measures].[contributors.COUNT], [Currency].[Currency].CurrentMember.PrevMember))\\"}",
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
        "EquityDerivativesCubeDist": Object {
          "children": Object {
            "[Measures].[pvSum ^ 2]": Object {
              "entry": Object {
                "canRead": true,
                "canWrite": true,
                "content": "{\\"className\\":\\"com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription\\",\\"additionalProperties\\":{},\\"uniqueName\\":\\"[Measures].[pvSum ^ 2]\\",\\"expression\\":\\"[Measures].[pv.SUM] ^ 2\\",\\"formatStringExpression\\":\\"FORMAT_STRING = \\\\\\"#,###.##\\\\\\"\\"}",
                "isDirectory": false,
                "lastEditor": "admin",
                "owners": Array [
                  "admin",
                ],
                "readers": Array [
                  "admin",
                ],
                "timestamp": 1666793260482,
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
