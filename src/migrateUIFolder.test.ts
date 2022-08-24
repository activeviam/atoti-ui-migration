import _map from "lodash/map";
import _some from "lodash/some";
import { migrateUIFolder } from "./migrateUIFolder";
import { smallLegacyUIFolder } from "./__test_resources__/smallLegacyUIFolder";
import { legacyUIFolder } from "./__test_resources__/legacyUIFolder";
import { servers } from "./__test_resources__/servers";
import { ContentRecord } from "@activeviam/activeui-sdk";
import { LegacyDashboardState } from "./migration.types";
import { smallLegacyPivotFolder } from "./__test_resources__/smallLegacyPivotFolder";
import { smallLegacyUIFolderWithInvalidFilter } from "./__test_resources__/smallLegacyUIFolderWithInvalidFilter";

/**
 *  Returns whether `contentRecord` has a descendant with the id `recordId`.
 */
const hasRecord = (contentRecord: ContentRecord, recordId: string): boolean =>
  _some(
    contentRecord.children,
    (child, childId) => childId === recordId || hasRecord(child, recordId),
  );

jest.mock(`./generateId`, () => {
  let counter = 0;
  return {
    generateId: jest.fn(() => {
      const id = `00${counter}`;
      counter += 1;

      return id;
    }),
  };
});

describe("migrateUIFolder", () => {
  it("returns a valid ActiveUI5 /ui folder on a small input", async () => {
    const [migratedUIFolder, counters, errorReport] = await migrateUIFolder(
      smallLegacyUIFolder,
      {
        servers,
        doesReportIncludeStacks: false,
      },
    );
    expect(migratedUIFolder).toMatchSnapshot();
    expect(errorReport).toBeUndefined();
    expect(counters).toMatchSnapshot();
  });

  it("returns a valid ActiveUI5 /ui folder on a real life input", async () => {
    const [migratedUIFolder, counters, errorReport] = await migrateUIFolder(
      legacyUIFolder,
      {
        servers,
        doesReportIncludeStacks: false,
      },
    );
    expect(migratedUIFolder).toMatchSnapshot();
    expect(errorReport).toMatchSnapshot();
    expect(counters).toMatchSnapshot();
  });

  it("returns a valid ActiveUI5 /ui folder that includes calculated measures when the input includes a pivotFolder", async () => {
    const [migratedUIFolder] = await migrateUIFolder(legacyUIFolder, {
      servers,
      legacyPivotFolder: smallLegacyPivotFolder,
      doesReportIncludeStacks: false,
    });

    const calculatedMeasuresFolder =
      migratedUIFolder.children?.["calculated_measures"];

    expect(calculatedMeasuresFolder).toMatchSnapshot();
  });

  it("removes the specified widget plugins from the widget bookmarks themselves, and from the content of the dashboard bookmarks", async () => {
    const keysOfWidgetPluginsToRemove = ["filters"];
    const [migratedUIFolder] = await migrateUIFolder(legacyUIFolder, {
      servers,
      keysOfWidgetPluginsToRemove,
      doesReportIncludeStacks: false,
    });

    // In the ActiveUI 4 folder, the file with id `0xb` represents a saved Page Filters widget.
    // It is removed from the ActiveUI 5 UI folder.
    const savedContentInLegacyUIFolder: ContentRecord =
      legacyUIFolder.children!.bookmarks;
    const savedWidgets = migratedUIFolder.children!.widgets;
    expect(hasRecord(savedContentInLegacyUIFolder, "0xb")).toBe(true);
    expect(hasRecord(savedWidgets, "0xb")).toBe(false);

    // In the ActiveUI 4 UI folder, the file with id `eef` represents a saved dashboard which includes a Page Filters widget.
    // This widget is removed from the migrated dashboard in the ActiveUI 5 folder.
    const legacyDashboard: LegacyDashboardState = JSON.parse(
      legacyUIFolder.children!.bookmarks.children!.content.children!.eef.entry
        .content,
    );
    const widgetPluginKeysInLegacyDashboard: string[] = [];
    legacyDashboard.value.body.pages.forEach((page) =>
      page.content.forEach(({ bookmark }) =>
        widgetPluginKeysInLegacyDashboard.push(bookmark.value.containerKey),
      ),
    );
    const migratedDashboard = JSON.parse(
      migratedUIFolder.children!.dashboards.children!.content.children!.eef
        .entry.content,
    );
    const { content, layout } = migratedDashboard.pages["p-0"];
    const widgetPluginKeys = _map(content, ({ widgetKey }) => widgetKey);
    expect(widgetPluginKeysInLegacyDashboard).toEqual(
      expect.arrayContaining(keysOfWidgetPluginsToRemove),
    );
    expect(widgetPluginKeys).toEqual(
      expect.not.arrayContaining(keysOfWidgetPluginsToRemove),
    );
    expect(layout).toMatchInlineSnapshot(`
      Object {
        "children": Array [
          Object {
            "leafKey": "3",
            "size": 0.3,
          },
          Object {
            "leafKey": "1",
            "size": 0.27999999999999997,
          },
          Object {
            "leafKey": "2",
            "size": 0.42,
          },
        ],
        "direction": "column",
      }
    `);
  });

  it("copies invalid filters as-is and reports an error", async () => {
    const [migratedFolder, counters, errorReport] = await migrateUIFolder(
      smallLegacyUIFolderWithInvalidFilter,
      {
        servers,
        doesReportIncludeStacks: true,
      },
    );

    expect(
      migratedFolder.children?.filters?.children?.content?.children?.["158"],
    ).toMatchInlineSnapshot(`
      Object {
        "entry": Object {
          "canRead": true,
          "canWrite": true,
          "content": "{\\"name\\":\\"AUI4 filter\\",\\"type\\":\\"mdx\\",\\"invalidvalue\\":{\\"shouldReplace\\":true,\\"type\\":\\"filter\\",\\"mdx\\":\\"{[Geography].[City].[ALL].[AllMember].[Berlin], [Geography].[City].[ALL].[AllMember].[London]}\\",\\"cube\\":\\"EquityDerivativesCube\\"}}",
          "isDirectory": false,
          "lastEditor": "admin",
          "owners": Array [
            "admin",
          ],
          "readers": Array [
            "admin",
          ],
          "timestamp": 1607879735685,
        },
      }
    `);
    expect(counters.filters.failed).toEqual(1);
    expect(counters.filters.success).toEqual(0);
    expect(errorReport).toMatchInlineSnapshot(`
      Object {
        "filters": Object {
          "158": Object {
            "error": Object {
              "message": "Cannot read properties of undefined (reading 'mdx')",
              "stack": Array [
                "TypeError: Cannot read properties of undefined (reading 'mdx')",
                "    at migrateFilter (C:\\\\dev\\\\activeui-migration\\\\src\\\\migrateFilter.ts:21:40)",
                "    at migrateUIFolder (C:\\\\dev\\\\activeui-migration\\\\src\\\\migrateUIFolder.ts:280:34)",
                "    at Object.<anonymous> (C:\\\\dev\\\\activeui-migration\\\\src\\\\migrateUIFolder.test.ts:135:59)",
                "    at Object.asyncJestTest (C:\\\\dev\\\\activeui-migration\\\\node_modules\\\\jest-jasmine2\\\\build\\\\jasmineAsyncInstall.js:106:37)",
                "    at C:\\\\dev\\\\activeui-migration\\\\node_modules\\\\jest-jasmine2\\\\build\\\\queueRunner.js:45:12",
                "    at new Promise (<anonymous>)",
                "    at mapper (C:\\\\dev\\\\activeui-migration\\\\node_modules\\\\jest-jasmine2\\\\build\\\\queueRunner.js:28:19)",
                "    at C:\\\\dev\\\\activeui-migration\\\\node_modules\\\\jest-jasmine2\\\\build\\\\queueRunner.js:75:41",
                "    at processTicksAndRejections (node:internal/process/task_queues:96:5)",
              ],
            },
            "folderId": Array [],
            "folderName": Array [],
            "name": "AUI4 filter",
          },
        },
      }
    `);
  });
});
