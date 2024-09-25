const widgetWithInvalidContainerKey = {
  entry: {
    content:
      '{"description":"Widget with invalid container key","name":"Invalid widget","type":"container","value":{"style":{},"showTitleBar":false,"containerKey":"invalid-container-key","body":{"serverUrl":"","mdx":"SELECT NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube] WHERE [Geography].[City].[ALL].[AllMember].[New York] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{}}}}',
    isDirectory: false,
    owners: ["admin"],
    readers: ["admin"],
    timestamp: 1607879735685,
    lastEditor: "admin",
    canRead: true,
    canWrite: true,
  },
};

const widgetWithFilterOnInvalidHierarchy = {
  entry: {
    content:
      '{"description":"Widget with filter on invalid hierarchy","name":"Invalid widget","type":"container","value":{"style":{},"showTitleBar":false,"containerKey":"pivot-table","body":{"serverUrl":"","mdx":"SELECT NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube] WHERE [Geography].[InvalidHierarchy].[ALL].[AllMember].[Member] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{}}}}',
    isDirectory: false,
    owners: ["admin"],
    readers: ["admin"],
    timestamp: 1607879735685,
    lastEditor: "admin",
    canRead: true,
    canWrite: true,
  },
};

/**
 * Contains two legacy bookmark widgets.
 * 1. Widget with an invalid container container key.
 * 2. Widget with a filter on an invalid hierarchy.
 */
export const invalidLegacyWidgets = {
  "158": widgetWithInvalidContainerKey,
  "1231": widgetWithFilterOnInvalidHierarchy,
};
