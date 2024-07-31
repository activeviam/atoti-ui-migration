import { ContentRecord } from "@activeviam/activeui-sdk-5.1";
import { servers } from "./4.3_to_5.0/__test_resources__/servers";
import { smallLegacyPivotFolder } from "./4.3_to_5.0/__test_resources__/smallLegacyPivotFolder";
import { smallLegacyUIFolder } from "./4.3_to_5.0/__test_resources__/smallLegacyUIFolder";
import { migrateContentServer } from "./migrateContentServer";
import _cloneDeep from "lodash/cloneDeep";
import { smallLegacyUIFolderWithInvalidKpiTitle } from "./4.3_to_5.0/__test_resources__/smallLegacyUIFolderWithInvalidKpiTitle";

jest.mock(`./4.3_to_5.0/generateId`, () => {
  let counter = 0;
  return {
    generateId: jest.fn(() => {
      const id = `00${counter}`;
      counter += 1;

      return id;
    }),
  };
});

describe("migrateContentServer", () => {
  it("migrates calculated measures from the /pivot folder to the /ui folder when migrating from 4.3 to 5.0", async () => {
    const contentServer: ContentRecord = {
      children: { ui: smallLegacyUIFolder, pivot: smallLegacyPivotFolder },
      entry: {
        owners: [],
        readers: [],
        isDirectory: true,
        canRead: true,
        canWrite: false,
        lastEditor: "Freddie Mercury",
        timestamp: 0xbeef,
      },
    };

    await migrateContentServer({
      contentServer,
      servers,
      fromVersion: "4.3",
      toVersion: "5.0",
      keysOfWidgetPluginsToRemove: [],
      doesReportIncludeStacks: false,
      shouldUpdateFiltersMdx: true,
      behaviorOnError: "keep-original",
    });

    expect(contentServer.children?.ui.children?.calculated_measures)
      .toMatchInlineSnapshot(`
      {
        "children": {
          "content": {
            "children": {
              "000": {
                "entry": {
                  "content": "{"expression":"IIf(IsEmpty(([Booking].[Desk].CurrentMember.Parent, [Measures].[pnl.SUM])), null, [Measures].[pnl.SUM] / ([Booking].[Desk].CurrentMember.Parent, [Measures].[pnl.SUM]))","properties":["FORMAT_STRING=\\"#,###.##%\\""]}",
                  "isDirectory": false,
                  "owners": [
                    "admin",
                  ],
                  "readers": [
                    "admin",
                  ],
                },
              },
              "001": {
                "entry": {
                  "content": "{"expression":"IIf(IsEmpty(([Currency].[Currency].[ALL].[AllMember], [Measures].[pnl.FOREX])), null, [Measures].[pnl.FOREX] / ([Currency].[Currency].[ALL].[AllMember], [Measures].[pnl.FOREX]))","properties":["FORMAT_STRING=\\"#,###.##%\\""]}",
                  "isDirectory": false,
                  "owners": [
                    "admin",
                  ],
                  "readers": [
                    "admin",
                  ],
                },
              },
              "002": {
                "entry": {
                  "content": "{"expression":"Count(Descendants([CounterParty].[CounterParty].CurrentMember, [CounterParty].[CounterParty].[CounterPartyGroup]), EXCLUDEEMPTY)","properties":["FORMAT_STRING=\\"#,###.##\\""]}",
                  "isDirectory": false,
                  "owners": [
                    "admin",
                  ],
                  "readers": [
                    "admin",
                  ],
                },
              },
            },
            "entry": {
              "isDirectory": true,
              "owners": [
                "ROLE_USER",
              ],
              "readers": [
                "ROLE_USER",
              ],
            },
          },
          "structure": {
            "children": {
              "000": {
                "children": {
                  "000_metadata": {
                    "entry": {
                      "content": "{"name":"[Measures].[third calculated measure]"}",
                      "isDirectory": false,
                      "owners": [
                        "admin",
                      ],
                      "readers": [
                        "admin",
                      ],
                    },
                  },
                },
                "entry": {
                  "isDirectory": true,
                  "owners": [
                    "admin",
                  ],
                  "readers": [
                    "admin",
                  ],
                },
              },
              "001": {
                "children": {
                  "001_metadata": {
                    "entry": {
                      "content": "{"name":"[Measures].[second calculated measure]"}",
                      "isDirectory": false,
                      "owners": [
                        "admin",
                      ],
                      "readers": [
                        "admin",
                      ],
                    },
                  },
                },
                "entry": {
                  "isDirectory": true,
                  "owners": [
                    "admin",
                  ],
                  "readers": [
                    "admin",
                  ],
                },
              },
              "002": {
                "children": {
                  "002_metadata": {
                    "entry": {
                      "content": "{"name":"[Measures].[first calculated measure]"}",
                      "isDirectory": false,
                      "owners": [
                        "admin",
                      ],
                      "readers": [
                        "admin",
                      ],
                    },
                  },
                },
                "entry": {
                  "isDirectory": true,
                  "owners": [
                    "admin",
                  ],
                  "readers": [
                    "admin",
                  ],
                },
              },
            },
            "entry": {
              "isDirectory": true,
              "owners": [
                "ROLE_USER",
              ],
              "readers": [
                "ROLE_USER",
              ],
            },
          },
        },
        "entry": {
          "isDirectory": true,
          "owners": [
            "ROLE_CS_ROOT",
          ],
          "readers": [
            "ROLE_CS_ROOT",
          ],
        },
      }
    `);
  });

  it("does not migrate calculated measures when migrating from 4.3 to > 5.0", async () => {
    const contentServer: ContentRecord = {
      children: { ui: smallLegacyUIFolder, pivot: smallLegacyPivotFolder },
      entry: {
        owners: [],
        readers: [],
        isDirectory: true,
        canRead: true,
        canWrite: false,
        lastEditor: "Freddie Mercury",
        timestamp: 0xbeef,
      },
    };

    const contentServerBeforeMigration = _cloneDeep(contentServer);

    await migrateContentServer({
      contentServer,
      servers,
      fromVersion: "4.3",
      toVersion: "5.1",
      keysOfWidgetPluginsToRemove: [],
      doesReportIncludeStacks: false,
      shouldUpdateFiltersMdx: true,
      behaviorOnError: "keep-original",
    });

    expect(contentServer.children?.pivot).toStrictEqual(
      contentServerBeforeMigration.children?.pivot,
    );
    expect(contentServer.children?.ui.children?.calculated_measures).toBe(
      undefined,
    );
  });

  it("migrates the KPI custom titles while dropping custom titles that could not be successfully migrated", async () => {
    const contentServer: ContentRecord = {
      children: {
        ui: smallLegacyUIFolderWithInvalidKpiTitle,
        pivot: smallLegacyPivotFolder,
      },
      entry: {
        owners: [],
        readers: [],
        isDirectory: true,
        canRead: true,
        canWrite: false,
        lastEditor: "Freddie Mercury",
        timestamp: 0xbeef,
      },
    };

    const contentServerBeforeMigration = _cloneDeep(contentServer);

    await migrateContentServer({
      contentServer,
      servers,
      fromVersion: "4.3",
      toVersion: "5.1",
      keysOfWidgetPluginsToRemove: [],
      doesReportIncludeStacks: false,
      shouldUpdateFiltersMdx: true,
      behaviorOnError: "keep-original",
    });

    const kpiContentBeforeMigration = JSON.parse(
      contentServerBeforeMigration.children?.ui.children?.bookmarks.children
        ?.content.children?.["kpi"].entry.content,
    );

    expect(
      kpiContentBeforeMigration.value.body.configuration["featuredValues"]
        .locations,
    ).toMatchInlineSnapshot(`
      {
        "": {
          "title": "Title with empty tupleKey",
        },
        "[Measures].[contributors.COUNT]": {
          "title": "Custom title for contributors.COUNT",
        },
      }
    `);

    // The widget with id "kpi" contains a custom title referenced with an empty `tupleKey`.
    // Because this is not a valid `tupleKey`, the title is dropped.
    const migratedKpiContent = JSON.parse(
      contentServer.children?.ui.children?.widgets.children?.content.children?.[
        "kpi"
      ].entry.content,
    );

    expect(migratedKpiContent?.titles).toMatchInlineSnapshot(`
      {
        "[Measures].[contributors.COUNT]": "Custom title for contributors.COUNT",
      }
    `);
  });
});
