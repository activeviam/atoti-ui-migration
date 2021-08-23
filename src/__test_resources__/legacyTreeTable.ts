import type { LegacyWidgetState } from "../migration.types";

/**
 * The widgetState of a legacy tree table, useful for unit tests.
 */
export const legacyTreeTable: LegacyWidgetState = {
  name: "Tree table",
  type: "container",
  writable: true,
  value: {
    body: {
      serverUrl: "http://localhost:9090",
      mdx:
        "SELECT NON EMPTY Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])) ON ROWS, NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM (SELECT {[Currency].[Currency].[ALL].[AllMember].[GBP], [Currency].[Currency].[ALL].[AllMember].[JPY], [Currency].[Currency].[ALL].[AllMember].[USD]} ON COLUMNS FROM (SELECT TopCount(Filter([Geography].[City].Levels(1).Members, NOT IsEmpty([Measures].[contributors.COUNT])), 3, [Measures].[contributors.COUNT]) ON COLUMNS FROM [EquityDerivativesCube])) CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
      contextValues: {
        queriesTimeLimit: 60,
        "mdx.casesensitive": true,
        "mdx.defaultmembers.[Geography].[City]": "[AllMember].[Berlin]",
      },
      updateMode: "once",
      ranges: {
        row: {
          chunkSize: 2000,
          thresholdPercentage: 0.1,
        },
        column: {
          chunkSize: 50,
          thresholdPercentage: 0.2,
        },
      },
      configuration: {
        tabular: {
          pinnedHeaderSelector: "member",
          sortingMode: "non-breaking",
          addButtonFilter: "numeric",
          cellRenderers: ["tree-layout"],
          statisticsShown: true,
          columnsGroups: [
            {
              captionProducer: "firstColumn",
              cellFactory: "kpi-status",
              selector: "kpi-status",
            },
            {
              captionProducer: "firstColumn",
              cellFactory: "lookup",
              selector: "lookup",
            },
            {
              captionProducer: "expiry",
              cellFactory: "expiry",
              selector: "kpi-expiry",
            },
            {
              captionProducer: "columnMerge",
              cellFactory: {
                args: {},
                key: "treeCells",
              },
              selector: "member",
            },
          ],
          hideAddButton: true,
          defaultOptions: {},
          expansion: {
            automaticExpansion: true,
          },
          columns: [
            {
              key: "c-treeCells-member",
              width: 250,
            },
          ],
        },
      },
    },
    containerKey: "pivot-table",
  },
};
