/**
 * The content entry for a legacy bookmark representing a pivot table.
 */
export const legacyPivotTableBookmark = {
  entry: {
    content:
      '{"description": "Valid widget","name": "Valid widget","type": "container", "value": {"style": {},"showTitleBar": false,"containerKey": "pivot-table","body": {"serverUrl": "","mdx": "SELECT NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube] WHERE [Geography].[City].[ALL].[AllMember].[New York] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues": {},"updateMode": "once", "ranges": {}}}}',
    isDirectory: false,
    owners: ["admin"],
    readers: ["admin"],
    timestamp: 1607879735685,
    lastEditor: "admin",
    canRead: true,
    canWrite: true,
  },
};
