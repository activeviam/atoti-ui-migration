import { LegacyWidgetState } from "../migration.types";

/**
 * The widgetState of a legacy Page Filters widget, useful for unit tests.
 */
export const legacyPageFilters: LegacyWidgetState = {
  name: "Page filters",
  value: {
    containerKey: "filters",
    showTitleBar: false,
    body: {},
  },
  type: "container",
  writable: false,
};
