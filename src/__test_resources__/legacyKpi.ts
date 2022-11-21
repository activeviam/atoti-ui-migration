import type { LegacyWidgetState } from "../4.3_to_5.0/migration.types";

/**
 * The widgetState of a legacy KPI widget, useful for unit tests.
 */
export const legacyKpi: LegacyWidgetState = {
  name: "Untitled Featured Values",
  type: "container",
  value: {
    body: {
      serverUrl: "http://localhost:9090",
      mdx: "SELECT NON EMPTY Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])) ON ROWS, NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
      contextValues: {
        EquityDerivativesCube: {
          queriesTimeLimit: 60,
          "mdx.casesensitive": true,
          "mdx.defaultmembers.[Geography].[City]": "[AllMember].[Berlin]",
        },
      },
      updateMode: "once",
      ranges: {
        row: {
          chunkSize: 20,
          thresholdPercentage: 0.1,
        },
        column: {
          chunkSize: 20,
          thresholdPercentage: 0.1,
        },
      },
      configuration: {
        featuredValues: {},
      },
    },
    containerKey: "featured-values",
  },
  writable: true,
};
