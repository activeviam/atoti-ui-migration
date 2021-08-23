/**
 * The widgetState of an empty legacy drillthrough, useful for unit tests.
 */
export const emptyLegacyDrillthrough = {
  name: "Untitled Drillthrough Table",
  type: "container",
  value: {
    style: {},
    showTitleBar: true,
    body: {
      configuration: {
        drillthrough: {
          hideAddButton: true,
          lineNumbers: true,
          statisticsShown: true,
        },
      },
    },
    containerKey: "drillthrough",
  },
  writable: true,
};
