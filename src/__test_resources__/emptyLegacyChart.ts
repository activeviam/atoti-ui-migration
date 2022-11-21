import type { LegacyWidgetState } from "../4.3_to_5.0/migration.types";

/**
 * The widgetState of an empty legacy chart widget, useful for unit tests.
 */
export const emptyLegacyChart: LegacyWidgetState = {
  name: "Untitled Chart",
  type: "container",
  value: {
    style: {},
    showTitleBar: true,
    body: {
      configuration: {},
    },
    containerKey: "chart",
  },
  writable: true,
};
