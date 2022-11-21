import type { LegacyWidgetState } from "../4.3_to_5.0/migration.types";

/**
 * The widgetState of a legacy quick filter widget, useful for unit tests.
 */
export const legacyQuickFilter: LegacyWidgetState = {
  name: "Quick filter",
  type: "container",
  writable: true,
  value: {
    containerKey: "quick-filter",
    body: {
      configuration: {
        displayedAsSelect: false,
        multipleSelection: true,
      },
      filterKey: "explicit",
      levelDetails: {
        cube: "EquityDerivativesCube",
        dimension: "Currency",
        hierarchy: "Currency",
        level: "Currency",
        caption: "Currency",
      },
    },
  },
};
