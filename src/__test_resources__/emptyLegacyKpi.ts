import type { LegacyWidgetState } from "../4.3_to_5.0/migration.types";

/**
 * The widgetState of an empty legacy KPI widget, useful for unit tests.
 */
export const emptyLegacyKpi: LegacyWidgetState = {
  name: "Untitled Featured Values",
  type: "container",
  value: {
    body: {
      serverUrl: "",
      mdx: "",
      configuration: {
        featuredValues: {},
      },
    },
    containerKey: "featured-values",
  },
  writable: true,
};
