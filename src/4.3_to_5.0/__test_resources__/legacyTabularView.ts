import type { LegacyWidgetState } from "../migration.types";

/**
 * The widgetState of a legacy tabular view, useful for unit tests.
 */
export const legacyTabularView: LegacyWidgetState = {
  type: "container",
  writable: true,
  name: "Tabular View",
  value: {
    style: {},
    showTitleBar: true,
    body: {
      serverUrl: "",
      mdx: "SELECT NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
      contextValues: {},
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
          ],
          defaultOptions: {},
          hideAddButton: true,
          lineNumbers: true,
          sortingMode: "breaking",
          statisticsShown: true,
          columnOrder: {
            key: "explicit",
            args: {
              orderedColumns: ["[Currency].[Currency].[Currency]"],
            },
          },
          columns: [
            {
              key: "[Currency].[Currency].[Currency]",
              width: 250,
            },
          ],
        },
      },
    },
    containerKey: "tabular-view",
  },
};
