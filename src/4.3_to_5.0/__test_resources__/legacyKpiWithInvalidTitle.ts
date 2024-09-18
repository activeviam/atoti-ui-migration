/**
 * The content entry for a legacy bookmark representing a KPI widget
 */
export const legacyKpiWithInvalidTitle = {
  entry: {
    content:
      '{"description": "A KPI containing a custom title with an empty tupleKey","name":"KPI","type":"container","value": {"style": {},"showTitleBar": true,"body": {"serverUrl": "","mdx": "SELECT NON EMPTY Hierarchize(AddCalculatedMembers(Descendants({[Geography].[City].[ALL].[AllMember]},1,SELF_AND_BEFORE))) ON ROWS,NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS FROM (SELECT[Geography].[City].[ALL].[AllMember].[New York] ON COLUMNS FROM [EquityDerivativesCube])","contextValues": {},"updateMode": "once","ranges": {"row": {},"column": {}},"configuration": {"featuredValues": {"locations":{"":{"title": "Title with empty tupleKey"},"[Measures].[contributors.COUNT]": {"title": "Custom title for contributors.COUNT"}}}}},"containerKey":"featured-values"},"writable": true}',
    isDirectory: false,
    owners: ["admin"],
    readers: ["admin"],
    timestamp: 1607879735685,
    lastEditor: "admin",
    canRead: true,
    canWrite: true,
  },
};
