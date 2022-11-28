import _map from "lodash/map";
import _some from "lodash/some";
import _cloneDeep from "lodash/cloneDeep";
import { migrate_43_to_50 } from "./migrate_43_to_50";
import { smallLegacyUIFolder } from "./__test_resources__/smallLegacyUIFolder";
import { legacyUIFolder } from "./__test_resources__/legacyUIFolder";
import { servers } from "./__test_resources__/servers";
import { ContentRecord } from "@activeviam/activeui-sdk-5.0";
import {
  ErrorReport,
  LegacyDashboardState,
  OutcomeCounters,
} from "./migration.types";
import { smallLegacyPivotFolder } from "./__test_resources__/smallLegacyPivotFolder";
import { smallLegacyUIFolderWithInvalidFilter } from "./__test_resources__/smallLegacyUIFolderWithInvalidFilter";
import { smallLegacyUIFolderWithInvalidDashboard } from "./__test_resources__/smallLegacyUIFolderWithInvalidDashboard";
import _fromPairs from "lodash/fromPairs";
import { emptyUIFolder } from "@activeviam/content-server-initialization-5.0";

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

let migratedUIFolder: ContentRecord;
let errorReport: ErrorReport;
let counters: OutcomeCounters;

describe("migrate_43_to_50", () => {
  beforeEach(() => {
    migratedUIFolder = _cloneDeep(emptyUIFolder);
    errorReport = {};
    counters = _fromPairs(
      ["dashboards", "widgets", "filters", "folders"].map((type) => [
        type,
        {
          success: 0,
          partial: 0,
          failed: 0,
          removed: 0,
        },
      ]),
      // _fromPairs returns a Dictionary.
      // In this case, the keys used correspond to the attributes of OutcomeCounters.
    ) as OutcomeCounters;
  });

  it("returns a valid ActiveUI5 /ui folder on a small input", async () => {
    await migrate_43_to_50(smallLegacyUIFolder, {
      migratedUIFolder,
      errorReport,
      counters,
      servers,
      doesReportIncludeStacks: false,
    });
    expect(migratedUIFolder).toMatchSnapshot();
    expect(errorReport).toEqual({});
    expect(counters).toMatchSnapshot();
  });

  it("returns a valid ActiveUI5 /ui folder on a real life input", async () => {
    await migrate_43_to_50(legacyUIFolder, {
      migratedUIFolder,
      errorReport,
      counters,
      servers,
      doesReportIncludeStacks: false,
    });
    expect(migratedUIFolder).toMatchSnapshot();
    expect(errorReport).toMatchSnapshot();
    expect(counters).toMatchSnapshot();
  });

  it("returns a valid ActiveUI5 /ui folder that includes calculated measures when the input includes a pivotFolder", async () => {
    await migrate_43_to_50(legacyUIFolder, {
      migratedUIFolder,
      errorReport,
      counters,
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
    await migrate_43_to_50(legacyUIFolder, {
      migratedUIFolder,
      errorReport,
      counters,
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

  it("returns an error report for dashboards and handles the dashboard id being a number", async () => {
    await migrate_43_to_50(smallLegacyUIFolderWithInvalidDashboard, {
      migratedUIFolder,
      errorReport,
      counters,
      servers,
      doesReportIncludeStacks: false,
    });

    expect(
      migratedUIFolder.children?.dashboards?.children?.content?.children?.[
        "158"
      ],
    ).toMatchInlineSnapshot(`
      Object {
        "entry": Object {
          "canRead": true,
          "canWrite": true,
          "content": "{\\"pages\\":{\\"p-0\\":{\\"layout\\":{\\"children\\":[{\\"leafKey\\":\\"2\\"},{\\"leafKey\\":\\"1\\"}],\\"direction\\":\\"row\\"},\\"name\\":\\"Page 1\\",\\"filters\\":[],\\"content\\":{\\"1\\":{\\"serverUrl\\":\\"\\",\\"mdx\\":\\"SELECT NON EMPTY Crossjoin(Hierarchize(DrilldownLevel([Geography].[City].[ALL].[AllMember])), Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember]))) ON ROWS, NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [foo] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS\\",\\"contextValues\\":{\\"mdx.hiddengrandtotals\\":\\"1\\"},\\"updateMode\\":\\"once\\",\\"ranges\\":{\\"row\\":{\\"chunkSize\\":2000,\\"thresholdPercentage\\":0.1},\\"column\\":{\\"chunkSize\\":50,\\"thresholdPercentage\\":0.2}},\\"configuration\\":{\\"tabular\\":{\\"pinnedHeaderSelector\\":\\"member\\",\\"sortingMode\\":\\"non-breaking\\",\\"addButtonFilter\\":\\"numeric\\",\\"cellRenderers\\":[\\"tree-layout\\"],\\"statisticsShown\\":true,\\"columnsGroups\\":[{\\"captionProducer\\":\\"firstColumn\\",\\"cellFactory\\":\\"kpi-status\\",\\"selector\\":\\"kpi-status\\"},{\\"captionProducer\\":\\"firstColumn\\",\\"cellFactory\\":\\"lookup\\",\\"selector\\":\\"lookup\\"},{\\"captionProducer\\":\\"expiry\\",\\"cellFactory\\":\\"expiry\\",\\"selector\\":\\"kpi-expiry\\"},{\\"captionProducer\\":\\"columnMerge\\",\\"cellFactory\\":{\\"args\\":{},\\"key\\":\\"treeCells\\"},\\"selector\\":\\"member\\"}],\\"hideAddButton\\":true,\\"defaultOptions\\":{},\\"expansion\\":{\\"automaticExpansion\\":true}}},\\"name\\":\\"Untitled Pivot Table\\",\\"widgetKey\\":\\"pivot-table\\"},\\"2\\":{\\"switchedTo\\":\\"plotly-clustered-column-chart\\",\\"mapping\\":{\\"xAxis\\":[\\"[Currency].[Currency].[Currency]\\"],\\"values\\":[\\"[Measures].[pnl.FOREX]\\"],\\"secondaryValues\\":[],\\"splitBy\\":[\\"[Booking].[Desk].[LegalEntity]\\",\\"ALL_MEASURES\\"],\\"horizontalSubplots\\":[],\\"verticalSubplots\\":[]},\\"query\\":{\\"mdx\\":\\"SELECT NON EMPTY Crossjoin(Hierarchize(DrilldownLevel([Currency].[Currency])), Hierarchize(DrilldownLevel([Booking].[Desk].[ALL].[AllMember]))) ON ROWS, NON EMPTY [Measures].[pnl.FOREX] ON COLUMNS FROM [EquityDerivativesCube]\\",\\"updateMode\\":\\"once\\"},\\"filters\\":[],\\"queryContext\\":[],\\"serverKey\\":\\"my-server\\",\\"name\\":\\"Untitled Chart\\",\\"widgetKey\\":\\"plotly-line-chart\\"}},\\"queryContext\\":[]}},\\"pagesOrder\\":[\\"p-0\\"],\\"filters\\":[],\\"queryContext\\":[]}",
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

    expect(counters.dashboards.partial).toEqual(1);
    expect(counters.dashboards.success).toEqual(0);
    expect(errorReport).toMatchInlineSnapshot(`
      Object {
        "dashboards": Object {
          "158": Object {
            "folderId": Array [],
            "folderName": Array [],
            "name": "hidden grand totals",
            "pages": Object {
              "p-0": Object {
                "pageName": "Page 1",
                "widgets": Object {
                  "1": Object {
                    "error": Object {
                      "message": "Cube not found: \\"foo\\". Available cubes are [\\"EquityDerivativesCube\\",\\"EquityDerivativesCubeDist\\"]",
                    },
                    "widgetName": "Untitled Pivot Table",
                  },
                },
              },
            },
          },
        },
      }
    `);
  });

  it("copies invalid filters as-is and reports an error", async () => {
    await migrate_43_to_50(smallLegacyUIFolderWithInvalidFilter, {
      migratedUIFolder,
      errorReport,
      counters,
      servers,
      doesReportIncludeStacks: false,
    });

    expect(
      migratedUIFolder.children?.filters?.children?.content?.children?.["158"],
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
