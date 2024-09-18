/**
 * Content entry representing a legacy dashboard containing a single pivot table.
 * Useful for unit tests.
 */
export const legacyDashboardBookmark = {
  entry: {
    content: `{"name":"hidden grand totals","type":"container","value":{"style":{},"showTitleBar":false,"body":{"pages":[{"content":[{"key":"1","bookmark":{"name":"Untitled Pivot Table","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(DrilldownLevel([Geography].[City].[ALL].[AllMember])), Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember]))) ON ROWS, NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{"mdx.hiddengrandtotals":"1"},"updateMode":"once","ranges":{"row":{"chunkSize":2000,"thresholdPercentage":0.1},"column":{"chunkSize":50,"thresholdPercentage":0.2}},"configuration":{"tabular":{"pinnedHeaderSelector":"member","sortingMode":"non-breaking","addButtonFilter":"numeric","cellRenderers":["tree-layout"],"statisticsShown":true,"columnsGroups":[{"captionProducer":"firstColumn","cellFactory":"kpi-status","selector":"kpi-status"},{"captionProducer":"firstColumn","cellFactory":"lookup","selector":"lookup"},{"captionProducer":"expiry","cellFactory":"expiry","selector":"kpi-expiry"},{"captionProducer":"columnMerge","cellFactory":{"args":{},"key":"treeCells"},"selector":"member"}],"hideAddButton":true,"defaultOptions":{},"expansion":{"automaticExpansion":true}}}},"containerKey":"pivot-table"},"writable":true}},{"key":"2","bookmark":{"name":"Untitled Chart","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"plotly-line-chart","mapping":{"xAxis":["[Currency].[Currency].[Currency]"],"values":["[Measures].[pnl.FOREX]"],"splitBy":["[Booking].[Desk].[LegalEntity]"],"horizontalSubplots":[],"verticalSubplots":[]},"switchedTo":"plotly-clustered-column-chart"},"query":{"serverUrl":"","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(DrilldownLevel([Currency].[Currency])), Hierarchize(DrilldownLevel([Booking].[Desk].[ALL].[AllMember]))) ON ROWS, NON EMPTY [Measures].[pnl.FOREX] ON COLUMNS FROM [EquityDerivativesCube]","contextValues":{},"updateMode":"once"}},"containerKey":"chart"},"writable":true}}],"layout":{"children":{"0":{"ck":"2"},"1":{"ck":"1"}},"direction":"row"},"name":"Page 1","filters":{"EquityDerivativesCube":[]}}]},"containerKey":"dashboard"}}`,
    isDirectory: false,
    owners: ["admin"],
    readers: ["admin"],
    timestamp: 1607879735685,
    lastEditor: "admin",
    canRead: true,
    canWrite: true,
  },
};
