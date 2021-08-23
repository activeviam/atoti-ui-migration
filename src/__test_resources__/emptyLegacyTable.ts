import type { LegacyWidgetState } from "../migration.types";

/**
 * The widgetState of an empty legacy table, useful for unit tests.
 */
export const emptyLegacyTable: LegacyWidgetState = {
  name: "Table",
  type: "container",
  writable: true,
  value: {
    body: {
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
        },
      },
    },
    containerKey: "pivot-table",
  },
};
