import { ContentRecord } from "@activeviam/activeui-sdk-5.1";
import { servers } from "./4.3_to_5.0/__test_resources__/servers";
import { smallLegacyPivotFolder } from "./4.3_to_5.0/__test_resources__/smallLegacyPivotFolder";
import { smallLegacyUIFolder } from "./4.3_to_5.0/__test_resources__/smallLegacyUIFolder";
import { migrateContentServer } from "./migrateContentServer";
import _cloneDeep from "lodash/cloneDeep";
import { smallLegacyUIFolderWithInvalidWidget } from "./4.3_to_5.0/__test_resources__/smallLegacyUIFolderWithInvalidWidget";

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

  it("keeps the original item untouched, as before the whole migration when the item cannot be migrated due to an error and the `behaviorOnError` flag is set to `keep-original`.", async () => {
    const contentServer: ContentRecord = {
      children: {
        ui: smallLegacyUIFolderWithInvalidWidget,
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

    const savedWidgetContentBeforeMigration =
      contentServerBeforeMigration.children?.ui.children?.bookmarks.children
        ?.content.children?.["158"].entry.content;

    const savedWidgetContentAfterMigration =
      contentServer?.children?.ui?.children?.widgets?.children?.content
        ?.children?.["158"].entry.content;

    // The widget with id "158" has an invalid widget key and its migration will therefore fail.
    // Since `behaviorOnError` is set to "keep-original", the output content still contains the state of this saved widget exactly as it was before the migration.
    expect(savedWidgetContentBeforeMigration).toBe(
      savedWidgetContentAfterMigration,
    );
  });

  it("keeps the 5.0 version of the widget, when migrating from 4.3 to 5.1 with `behaviorOnError` set to `keep-last-successful-version` and the 5.0 to 5.1 step fails", async () => {
    const contentServer: ContentRecord = {
      children: {
        ui: smallLegacyUIFolderWithInvalidWidget,
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
      behaviorOnError: "keep-last-successful-version",
    });

    const savedWidgetContentBeforeMigration =
      contentServerBeforeMigration.children?.ui.children?.bookmarks.children
        ?.content.children?.["1231"].entry.content;

    expect(savedWidgetContentBeforeMigration.filters).not.toBeDefined();

    const savedWidgetContentAfterMigration = JSON.parse(
      contentServer?.children?.ui?.children?.widgets?.children?.content
        ?.children?.["1231"].entry.content,
    );

    expect(savedWidgetContentAfterMigration.filters).toBeDefined();
    expect(savedWidgetContentAfterMigration.filters).not.toHaveLength(0);

    const migratedWidgetFilter = savedWidgetContentAfterMigration.filters[0];

    // The filters in 5.0 are represented as strings.
    expect(typeof migratedWidgetFilter.mdx).toBe("string");
  });
});
