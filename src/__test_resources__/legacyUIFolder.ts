import { legacySettingsFolder } from "../legacySettingsFolder";

/**
 * The content of a legacy /ui folder on a Content Server, useful for unit tests.
 */
export const legacyUIFolder = {
  entry: {
    isDirectory: true,
    owners: ["admin"],
    readers: ["admin"],
    timestamp: 1607879725132,
    lastEditor: "admin",
    canRead: true,
    canWrite: true,
  },
  children: {
    bookmarks: {
      entry: {
        isDirectory: true,
        owners: ["ROLE_CS_ROOT"],
        readers: ["ROLE_USER"],
        timestamp: 1607879735685,
        lastEditor: "admin",
        canRead: true,
        canWrite: true,
      },
      children: {
        content: {
          entry: {
            isDirectory: true,
            owners: ["ROLE_USER"],
            readers: ["ROLE_USER"],
            timestamp: 1607879735685,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            e2b: {
              entry: {
                content:
                  '{"name":"AUI4 filter","type":"mdx","value":{"shouldReplace":true,"type":"filter","mdx":"{[Geography].[City].[ALL].[AllMember].[Berlin], [Geography].[City].[ALL].[AllMember].[London]}","cube":"EquityDerivativesCube"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "158": {
              entry: {
                content:
                  '{"name":"hidden grand totals","type":"container","value":{"style":{},"showTitleBar":false,"body":{"pages":[{"content":[{"key":"1","bookmark":{"name":"Untitled Pivot Table","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(DrilldownLevel([Geography].[City].[ALL].[AllMember])), Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember]))) ON ROWS, NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{"mdx.hiddengrandtotals":"1"},"updateMode":"once","ranges":{"row":{"chunkSize":2000,"thresholdPercentage":0.1},"column":{"chunkSize":50,"thresholdPercentage":0.2}},"configuration":{"tabular":{"pinnedHeaderSelector":"member","sortingMode":"non-breaking","addButtonFilter":"numeric","cellRenderers":["tree-layout"],"statisticsShown":true,"columnsGroups":[{"captionProducer":"firstColumn","cellFactory":"kpi-status","selector":"kpi-status"},{"captionProducer":"firstColumn","cellFactory":"lookup","selector":"lookup"},{"captionProducer":"expiry","cellFactory":"expiry","selector":"kpi-expiry"},{"captionProducer":"columnMerge","cellFactory":{"args":{},"key":"treeCells"},"selector":"member"}],"hideAddButton":true,"defaultOptions":{},"expansion":{"automaticExpansion":true}}}},"containerKey":"pivot-table"},"writable":true}},{"key":"2","bookmark":{"name":"Untitled Chart","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"plotly-line-chart","mapping":{"xAxis":["[Currency].[Currency].[Currency]"],"values":["[Measures].[pnl.FOREX]"],"splitBy":["[Booking].[Desk].[LegalEntity]"],"horizontalSubplots":[],"verticalSubplots":[]},"switchedTo":"plotly-clustered-column-chart"},"query":{"serverUrl":"","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(DrilldownLevel([Currency].[Currency])), Hierarchize(DrilldownLevel([Booking].[Desk].[ALL].[AllMember]))) ON ROWS, NON EMPTY [Measures].[pnl.FOREX] ON COLUMNS FROM [EquityDerivativesCube]","contextValues":{},"updateMode":"once"}},"containerKey":"chart"},"writable":true}}],"layout":{"children":{"0":{"ck":"2"},"1":{"ck":"1"}},"direction":"row"},"name":"Page 1","filters":{"EquityDerivativesCube":[]}}]},"containerKey":"dashboard"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "296": {
              entry: {
                content:
                  '{"description":"test file for design","name":"dimensions/PNLs","type":"container","value":{"style":{},"showTitleBar":false,"body":{"pages":[{"content":[{"key":"0","bookmark":{"name":"dimensions/PNLs","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{"row":{"chunkSize":2000,"thresholdPercentage":0.1},"column":{"chunkSize":50,"thresholdPercentage":0.2}},"configuration":{"tabular":{"pinnedHeaderSelector":"member","sortingMode":"non-breaking","addButtonFilter":"numeric","cellRenderers":["tree-layout"],"statisticsShown":true,"columnsGroups":[{"captionProducer":"firstColumn","cellFactory":"kpi-status","selector":"kpi-status"},{"captionProducer":"firstColumn","cellFactory":"lookup","selector":"lookup"},{"captionProducer":"expiry","cellFactory":"expiry","selector":"kpi-expiry"},{"captionProducer":"columnMerge","cellFactory":{"args":{},"key":"treeCells"},"selector":"member"}],"hideAddButton":true,"defaultOptions":{},"columns":[{"key":"c-treeCells-member","width":123}],"expansion":{"automaticExpansion":true}}}},"containerKey":"pivot-table"},"writable":true}}],"layout":{"ck":"0"},"name":"Page 1","filters":{"EquityDerivativesCube":[]}}]},"containerKey":"dashboard"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "310": {
              entry: {
                content:
                  '{"name":"pivot","type":"container","value":{"style":{},"showTitleBar":false,"body":{"pages":[{"content":[{"key":"0","bookmark":{"name":"Untitled Pivot Table","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT NON EMPTY Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])) ON ROWS, NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{"row":{"chunkSize":2000,"thresholdPercentage":0.1},"column":{"chunkSize":50,"thresholdPercentage":0.2}},"configuration":{"tabular":{"pinnedHeaderSelector":"member","sortingMode":"non-breaking","addButtonFilter":"numeric","cellRenderers":["tree-layout"],"statisticsShown":true,"columnsGroups":[{"captionProducer":"firstColumn","cellFactory":"kpi-status","selector":"kpi-status"},{"captionProducer":"firstColumn","cellFactory":"lookup","selector":"lookup"},{"captionProducer":"expiry","cellFactory":"expiry","selector":"kpi-expiry"},{"captionProducer":"columnMerge","cellFactory":{"args":{},"key":"treeCells"},"selector":"member"}],"hideAddButton":true,"defaultOptions":{},"expansion":{"automaticExpansion":true}}}},"containerKey":"pivot-table"},"writable":true}}],"layout":{"ck":"0"},"name":"Page 1","filters":{"EquityDerivativesCube":[]}}]},"containerKey":"dashboard"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "419": {
              entry: {
                content:
                  '{"name":"UI-4917","type":"container","value":{"style":{},"showTitleBar":false,"body":{"pages":[{"content":[{"key":"1","bookmark":{"name":"Should be filtered when you click on the chart","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(DrilldownLevel([Geography].[City].[ALL].[AllMember])), Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember]))) ON ROWS, NON EMPTY {[Measures].[pnl.FOREX], [Measures].[pnl.SUM]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{"row":{"chunkSize":2000,"thresholdPercentage":0.1},"column":{"chunkSize":50,"thresholdPercentage":0.2}},"configuration":{"tabular":{"pinnedHeaderSelector":"member","sortingMode":"non-breaking","addButtonFilter":"numeric","cellRenderers":["tree-layout"],"statisticsShown":true,"columnsGroups":[{"captionProducer":"firstColumn","cellFactory":"kpi-status","selector":"kpi-status"},{"captionProducer":"firstColumn","cellFactory":"lookup","selector":"lookup"},{"captionProducer":"expiry","cellFactory":"expiry","selector":"kpi-expiry"},{"captionProducer":"columnMerge","cellFactory":{"args":{},"key":"treeCells"},"selector":"member"}],"hideAddButton":true,"defaultOptions":{},"expansion":{"automaticExpansion":true}}}},"containerKey":"pivot-table"},"writable":true}},{"key":"2","bookmark":{"name":"Top currencies (click to filter pivot table)","type":"container","value":{"style":{},"showTitleBar":true,"chart.handlers.click":[{"args":{"scope":"only-siblings"},"key":"member-filter"}],"body":{"configuration":{"type":"plotly-line-chart","mapping":{"xAxis":["[Currency].[Currency].[Currency]"],"values":["[Measures].[contributors.COUNT]"],"splitBy":[],"horizontalSubplots":[],"verticalSubplots":[]},"switchedTo":"plotly-clustered-column-chart"},"query":{"serverUrl":"","mdx":"SELECT NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS, NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM (SELECT TopCount(Filter([Currency].[Currency].Levels(1).Members, NOT IsEmpty([Measures].[contributors.COUNT])), 3, [Measures].[contributors.COUNT]) ON COLUMNS FROM [EquityDerivativesCube])","contextValues":{},"updateMode":"once"}},"containerKey":"chart"},"writable":true}}],"layout":{"children":{"0":{"ck":"2"},"1":{"ck":"1"}},"direction":"row"},"name":"Page 1","filters":{"EquityDerivativesCube":[]}}]},"containerKey":"dashboard"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "695": {
              entry: {
                content:
                  '{"name":"Legacy bar chart","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"combo-horizontal-histogram","mapping":{"y":{"from":["[Currency].[Currency].[Currency]"]},"x":{"from":"[Measures].[contributors.COUNT]"}}},"query":{"serverUrl":"","mdx":"SELECT NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS, [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube]","contextValues":{},"updateMode":"once"}},"containerKey":"chart"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "3f3": {
              entry: {
                content: '{"name":"BAM","type":"folder"}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            bed: {
              entry: {
                content:
                  '{"name":"chart tests","type":"container","value":{"style":{},"showTitleBar":false,"body":{"pages":[{"content":[{"key":"0","bookmark":{"name":"Untitled Chart","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"plotly-line-chart","plotly":{"data":{"overridesByTraceKey":{"[Measures].[pnlVega.SUM]":{"name":"Taux de marge","yaxis":"y2"}}},"layout":{"xaxis":{"showticklabels":false,"showgrid":false,"showline":false},"yaxis":{"showticklabels":true,"showline":false},"yaxis2":{"showticklabels":true,"showline":true,"side":"right","range":[-1000,1000],"overlaying":"y"},"margin":{"t":20,"l":20,"r":20,"b":20}}},"mapping":{"xAxis":["[Currency].[Currency].[Currency]"],"values":["[Measures].[pnlDelta.SUM]","[Measures].[pnlVega.SUM]"],"splitBy":[],"horizontalSubplots":[],"verticalSubplots":[]},"switchedTo":"plotly-line-chart"},"query":{"serverUrl":"","mdx":"SELECT NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS, NON EMPTY {[Measures].[pnlDelta.SUM], [Measures].[pnlVega.SUM]} ON COLUMNS FROM [EquityDerivativesCube]","contextValues":{},"updateMode":"once"}},"containerKey":"chart"},"writable":true}},{"key":"1","bookmark":{"name":"Untitled Chart","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"plotly-line-chart","mapping":{"xAxis":["[Currency].[Currency].[Currency]"],"values":["[Measures].[pnlDelta.SUM]","[Measures].[pnl.SUM]"],"splitBy":[],"horizontalSubplots":[],"verticalSubplots":[]},"switchedTo":"plotly-clustered-column-chart"},"query":{"serverUrl":"","mdx":"SELECT NON EMPTY {[Measures].[pnlDelta.SUM], [Measures].[pnl.SUM]} ON COLUMNS, NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS FROM [EquityDerivativesCube]","contextValues":{},"updateMode":"once"}},"containerKey":"chart"},"writable":true}},{"key":"2","bookmark":{"name":"Untitled Chart","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"plotly-line-chart","mapping":{"xAxis":[],"values":[],"splitBy":[],"horizontalSubplots":[],"verticalSubplots":[]}},"query":{"serverUrl":"","mdx":"SELECT FROM [EquityDerivativesCube]","contextValues":{},"updateMode":"once"}},"containerKey":"chart"},"writable":true}}],"layout":{"children":{"0":{"children":{"0":{"ck":"1"},"1":{"ck":"2"}},"size":0.69,"direction":"row"},"1":{"ck":"0","size":0.31}},"direction":"column"},"name":"Page 1","filters":{"EquityDerivativesCube":[]}}]},"containerKey":"dashboard"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "75a": {
              entry: {
                content:
                  '{"name":"MadFilter","type":"mdx","value":{"shouldReplace":true,"type":"filter","mdx":"[Geography].[City].[ALL].[AllMember].[Paris]","cube":"EquityDerivativesCube"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            dec: {
              entry: {
                content:
                  '{"name":"Tabular","type":"container","value":{"style":{},"showTitleBar":false,"body":{"pages":[{"content":[{"key":"0","bookmark":{"name":"Untitled Tabular View","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT NON EMPTY [CounterParty].[CounterParty].[CounterPartyGroup].Members ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{"row":{"chunkSize":2000,"thresholdPercentage":0.1},"column":{"chunkSize":50,"thresholdPercentage":0.2}},"configuration":{"tabular":{"columnsGroups":[{"captionProducer":"firstColumn","cellFactory":"kpi-status","selector":"kpi-status"},{"captionProducer":"firstColumn","cellFactory":"lookup","selector":"lookup"},{"captionProducer":"expiry","cellFactory":"expiry","selector":"kpi-expiry"}],"defaultOptions":{},"hideAddButton":true,"lineNumbers":true,"sortingMode":"breaking","statisticsShown":true,"columnOrder":{"key":"explicit","args":{"orderedColumns":["__lineNumber__","[CounterParty].[CounterParty].[CounterPartyGroup]"]}}}}},"containerKey":"tabular-view"},"writable":true}}],"layout":{"ck":"0"},"name":"Page 1","filters":{"EquityDerivativesCube":[]}}]},"containerKey":"dashboard"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "77d": {
              entry: {
                content:
                  '{"name":"UI-4918","type":"container","value":{"style":{},"showTitleBar":false,"body":{"pages":[{"content":[{"key":"1","bookmark":{"name":"Untitled Chart","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"plotly-line-chart","mapping":{"xAxis":["[Geography].[City].[City]","[Booking].[Desk].[LegalEntity]"],"values":["[Measures].[pnl.SUM]"],"splitBy":[],"horizontalSubplots":[],"verticalSubplots":[]},"switchedTo":"plotly-clustered-column-chart"},"query":{"serverUrl":"","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(DrilldownLevel([Geography].[City].[ALL].[AllMember])), Hierarchize(DrilldownLevel([Booking].[Desk].[ALL].[AllMember]))) ON ROWS, NON EMPTY [Measures].[pnl.SUM] ON COLUMNS FROM [EquityDerivativesCube]","contextValues":{},"updateMode":"once"}},"containerKey":"chart"},"writable":true}}],"layout":{"ck":"1"},"name":"Page 1","filters":{"EquityDerivativesCube":[]}}]},"containerKey":"dashboard"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "41c": {
              entry: {
                content: '{"name":"TBL","type":"folder"}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            eac: {
              entry: {
                content:
                  '{"name":"dimensions/PNLs","type":"container","value":{"style":{},"showTitleBar":false,"body":{"pages":[{"content":[{"key":"0","bookmark":{"name":"dimensions/PNLs","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT NON EMPTY Crossjoin([Geography].[City].[City].Members, {[Measures].[pnl.SUM], [Measures].[pnlVega.SUM], [Measures].[pnlDelta.SUM]}) ON COLUMNS, NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{"row":{"chunkSize":2000,"thresholdPercentage":0.1},"column":{"chunkSize":50,"thresholdPercentage":0.2}},"configuration":{"tabular":{"pinnedHeaderSelector":"member","sortingMode":"non-breaking","addButtonFilter":"numeric","cellRenderers":["tree-layout"],"statisticsShown":true,"columnsGroups":[{"captionProducer":"firstColumn","cellFactory":"kpi-status","selector":"kpi-status"},{"captionProducer":"firstColumn","cellFactory":"lookup","selector":"lookup"},{"captionProducer":"expiry","cellFactory":"expiry","selector":"kpi-expiry"},{"captionProducer":"columnMerge","cellFactory":{"args":{},"key":"treeCells"},"selector":"member"}],"hideAddButton":true,"columnOrder":{"key":"explicit","args":{"orderedColumns":["c-treeCells-member","([Geography].[City].[ALL].[AllMember].[Berlin],[Measures].[pnl.SUM])","([Geography].[City].[ALL].[AllMember].[Berlin],[Measures].[pnlDelta.SUM])","([Geography].[City].[ALL].[AllMember].[Berlin],[Measures].[pnlVega.SUM])","([Geography].[City].[ALL].[AllMember].[Johannesburg],[Measures].[pnl.SUM])","([Geography].[City].[ALL].[AllMember].[Johannesburg],[Measures].[pnlDelta.SUM])","([Geography].[City].[ALL].[AllMember].[Johannesburg],[Measures].[pnlVega.SUM])","([Geography].[City].[ALL].[AllMember].[London],[Measures].[pnl.SUM])","([Geography].[City].[ALL].[AllMember].[London],[Measures].[pnlDelta.SUM])","([Geography].[City].[ALL].[AllMember].[London],[Measures].[pnlVega.SUM])","([Geography].[City].[ALL].[AllMember].[New York],[Measures].[pnl.SUM])","([Geography].[City].[ALL].[AllMember].[New York],[Measures].[pnlDelta.SUM])","([Geography].[City].[ALL].[AllMember].[New York],[Measures].[pnlVega.SUM])","([Geography].[City].[ALL].[AllMember].[Paris],[Measures].[pnl.SUM])","([Geography].[City].[ALL].[AllMember].[Paris],[Measures].[pnlDelta.SUM])","([Geography].[City].[ALL].[AllMember].[Paris],[Measures].[pnlVega.SUM])","([Geography].[City].[ALL].[AllMember].[Tokyo],[Measures].[pnl.SUM])","([Geography].[City].[ALL].[AllMember].[Tokyo],[Measures].[pnlDelta.SUM])","([Geography].[City].[ALL].[AllMember].[Tokyo],[Measures].[pnlVega.SUM])"]}},"defaultOptions":{},"columns":[{"key":"c-treeCells-member","width":123}],"expansion":{"automaticExpansion":true}}}},"containerKey":"pivot-table"},"writable":true}}],"layout":{"ck":"0"},"name":"Page 1","filters":{"EquityDerivativesCube":[]}}]},"containerKey":"dashboard"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            c8a: {
              entry: {
                content:
                  '{"name":"Dashboard with comparison values","type":"container","value":{"style":{},"showTitleBar":false,"body":{"pages":[{"content":[{"key":"1","bookmark":{"name":"Comparison values","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT NON EMPTY Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])) ON ROWS, NON EMPTY [Measures].[pnl.FOREX] ON COLUMNS, {[Booking].[Desk].[ALL].[AllMember].[LegalEntityA], [Booking].[Desk].[ALL].[AllMember].[LegalEntityB]} ON PAGES FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{"row":{"chunkSize":20,"thresholdPercentage":0.1},"column":{"chunkSize":20,"thresholdPercentage":0.1}},"configuration":{"featuredValues":{}}},"containerKey":"featured-values"},"writable":true}}],"layout":{"ck":"1"},"name":"Page 1","filters":{"EquityDerivativesCube":[]}}]},"containerKey":"dashboard"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            e18: {
              entry: {
                content:
                  '{"name":"Legacy pie chart","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"pie","mapping":{"angle":{"from":"[Measures].[contributors.COUNT]"},"color":{"from":["[Currency].[Currency].[Currency]"]}}},"query":{"serverUrl":"","mdx":"SELECT [Measures].[contributors.COUNT] ON COLUMNS, NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS FROM [EquityDerivativesCube]","contextValues":{},"updateMode":"once"}},"containerKey":"chart"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "4aa": {
              entry: {
                content:
                  '{"name":"Comparison values","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT NON EMPTY Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])) ON ROWS, NON EMPTY [Measures].[pnl.FOREX] ON COLUMNS, {[Booking].[Desk].[ALL].[AllMember].[LegalEntityA], [Booking].[Desk].[ALL].[AllMember].[LegalEntityB]} ON PAGES FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{"row":{"chunkSize":20,"thresholdPercentage":0.1},"column":{"chunkSize":20,"thresholdPercentage":0.1}},"configuration":{"featuredValues":{}}},"containerKey":"featured-values"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            afd: {
              entry: {
                content:
                  '{"name":"OME/TEST","type":"container","value":{"style":{},"showTitleBar":false,"body":{"pages":[{"content":[{"key":"0","bookmark":{"name":"Untitled Drillthrough Table","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"DRILLTHROUGH SELECT FROM [EquityDerivativesCube] RETURN MemberValue([City name]), Caption([City name]), MemberValue([BusinessUnit]), Caption([BusinessUnit]), MemberValue([UnderlierValue]), Caption([UnderlierValue])","contextValues":{},"updateMode":"once","configuration":{"drillthrough":{"hideAddButton":true,"lineNumbers":true,"statisticsShown":true,"columnOrder":{"key":"explicit","args":{"orderedColumns":["__lineNumber__","BusinessUnit","City name","UnderlierValue"]}}}}},"containerKey":"drillthrough"},"writable":true}}],"layout":{"ck":"0"},"name":"Page 1","filters":{"EquityDerivativesCube":[]}}]},"containerKey":"dashboard"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            dfa: {
              entry: {
                content:
                  '{"name":"Legacy subplots","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"combo-line","mapping":{"x":{"from":["[Currency].[Currency].[Currency]"]},"y":{"from":"[Measures].[contributors.COUNT]"},"row":{"from":["[Booking].[Desk].[LegalEntity]"]},"column":{"from":["[Geography].[City].[City]"]}}},"query":{"serverUrl":"","mdx":"SELECT NON EMPTY Crossjoin([Geography].[City].[City].Members, [Booking].[Desk].[LegalEntity].Members, [Currency].[Currency].[Currency].Members) ON ROWS, [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube]","contextValues":{},"updateMode":"once"}},"containerKey":"chart"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            cfd: {
              entry: {
                content:
                  '{"name":"Legacy column chart","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"combo-histogram","mapping":{"x":{"from":["[Currency].[Currency].[Currency]"]},"y":{"from":"[Measures].[contributors.COUNT]"}}},"query":{"serverUrl":"","mdx":"SELECT NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS, [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube]","contextValues":{},"updateMode":"once"}},"containerKey":"chart"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "02d": {
              entry: {
                content:
                  '{"name":"Quick filter","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"displayedAsSelect":true},"filterKey":"explicit","levelDetails":{"cube":"EquityDerivativesCube","dimension":"Currency","hierarchy":"Currency","level":"Currency","caption":"Currency"}},"containerKey":"quick-filter"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "34d": {
              entry: {
                content:
                  '{"name":"Legacy line chart","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"combo-line","mapping":{"x":{"from":["[Currency].[Currency].[Currency]"]},"y":{"from":"[Measures].[pnl.SUM]"}}},"query":{"serverUrl":"","mdx":"SELECT NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS, [Measures].[pnl.SUM] ON COLUMNS FROM [EquityDerivativesCube]","contextValues":{},"updateMode":"once"}},"containerKey":"chart"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            abc: {
              entry: {
                content:
                  '{"name":"Pivot table","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT NON EMPTY Hierarchize(DrilldownLevel([Geography].[City].[ALL].[AllMember])) ON ROWS, NON EMPTY Crossjoin(Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])), {[Measures].[pnl.FOREX], [Measures].[pnl.SUM]}) ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{"row":{"chunkSize":2000,"thresholdPercentage":0.1},"column":{"chunkSize":50,"thresholdPercentage":0.2}},"configuration":{"tabular":{"pinnedHeaderSelector":"member","sortingMode":"non-breaking","addButtonFilter":"numeric","cellRenderers":["tree-layout"],"statisticsShown":true,"columnsGroups":[{"captionProducer":"firstColumn","cellFactory":"kpi-status","selector":"kpi-status"},{"captionProducer":"firstColumn","cellFactory":"lookup","selector":"lookup"},{"captionProducer":"expiry","cellFactory":"expiry","selector":"kpi-expiry"},{"captionProducer":"columnMerge","cellFactory":{"args":{},"key":"treeCells"},"selector":"member"}],"hideAddButton":true,"defaultOptions":{},"columns":[{"key":"([Currency].[Currency].[ALL].[AllMember].[EUR],[Measures].[pnl.FOREX])","width":185}],"expansion":{"automaticExpansion":true}}}},"containerKey":"pivot-table"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "3a2": {
              entry: {
                content:
                  '{"name":"mad chart","type":"container","value":{"style":{},"showTitleBar":false,"body":{"pages":[{"content":[{"key":"0","bookmark":{"name":"Untitled Chart","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"plotly-line-chart","mapping":{"xAxis":["[Currency].[Currency].[Currency]"],"values":["[Measures].[contributors.COUNT]"],"splitBy":[],"horizontalSubplots":[],"verticalSubplots":[]},"switchedTo":"plotly-stacked-column-chart"},"query":{"serverUrl":"","mdx":"SELECT NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS, NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube]","contextValues":{},"updateMode":"once"}},"containerKey":"chart"},"writable":true}}],"layout":{"ck":"0"},"name":"Page 1","filters":{"EquityDerivativesCube":[]}}]},"containerKey":"dashboard"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "76c": {
              entry: {
                content:
                  '{"name":"Quick filter Radio","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"displayedAsSelect":false,"multipleSelection":false},"filterKey":"explicit","levelDetails":{"cube":"EquityDerivativesCube","dimension":"Currency","hierarchy":"Currency","level":"Currency","caption":"Currency"}},"containerKey":"quick-filter"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            d67: {
              entry: {
                content:
                  '{"name":"Legacy scatter plot 2","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"scatter","mapping":{"x":{"from":"[Measures].[contributors.COUNT]"},"y":{"from":"[Measures].[pnl.FOREX]"},"cardinality":{"from":["[Currency].[Currency].[Currency]"]},"r":{"from":"[Measures].[pnl.FOREX]"},"color":{"from":["[Booking].[Desk].[LegalEntity]"]}}},"query":{"serverUrl":"","mdx":"SELECT {[Measures].[contributors.COUNT], [Measures].[pnl.FOREX]} ON COLUMNS, NON EMPTY Crossjoin([Currency].[Currency].[Currency].Members, [Booking].[Desk].[LegalEntity].Members) ON ROWS FROM [EquityDerivativesCube]","contextValues":{},"updateMode":"once"}},"containerKey":"chart"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            fba: {
              entry: {
                content:
                  '{"description":"Action should be available with default measure","name":"OpenDrillthrough action","type":"container","value":{"style":{},"showTitleBar":false,"body":{"pages":[{"content":[{"key":"0","bookmark":{"name":"Untitled Pivot Table","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT NON EMPTY Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{"row":{"chunkSize":2000,"thresholdPercentage":0.1},"column":{"chunkSize":50,"thresholdPercentage":0.2}},"configuration":{"tabular":{"pinnedHeaderSelector":"member","sortingMode":"non-breaking","addButtonFilter":"numeric","cellRenderers":["tree-layout"],"statisticsShown":true,"columnsGroups":[{"captionProducer":"firstColumn","cellFactory":"kpi-status","selector":"kpi-status"},{"captionProducer":"firstColumn","cellFactory":"lookup","selector":"lookup"},{"captionProducer":"expiry","cellFactory":"expiry","selector":"kpi-expiry"},{"captionProducer":"columnMerge","cellFactory":{"args":{},"key":"treeCells"},"selector":"member"}],"hideAddButton":true,"defaultOptions":{},"expansion":{"automaticExpansion":true}}}},"containerKey":"pivot-table"},"writable":true}}],"layout":{"ck":"0"},"name":"Page 1","filters":{"EquityDerivativesCube":[]}}]},"containerKey":"dashboard"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "9e3": {
              entry: {
                content:
                  '{"name":"Quick filter Select","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"displayedAsSelect":true,"multipleSelection":false},"filterKey":"explicit","levelDetails":{"cube":"EquityDerivativesCube","dimension":"Currency","hierarchy":"Currency","level":"Currency","caption":"Currency"}},"containerKey":"quick-filter"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            a05: {
              entry: {
                content: '{"description":"pivot","name":"MAD","type":"folder"}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            b06: {
              entry: {
                content:
                  '{"name":"Performance dashboard","type":"container","value":{"style":{},"showTitleBar":false,"body":{"pages":[{"content":[{"key":"1","bookmark":{"name":"Counterparties and currencies","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(DrilldownLevel([CounterParty].[CounterParty].[ALL].[AllMember])), Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember]))) ON ROWS, NON EMPTY {[Measures].[pnlDelta.SUM], [Measures].[pnlVega.SUM]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{"row":{"chunkSize":2000,"thresholdPercentage":0.1},"column":{"chunkSize":50,"thresholdPercentage":0.2}},"configuration":{"tabular":{"pinnedHeaderSelector":"member","sortingMode":"non-breaking","cellRenderers":["pivot-layout"],"statisticsShown":true,"columnsGroups":[{"captionProducer":"firstColumn","cellFactory":"kpi-status","selector":"kpi-status"},{"captionProducer":"firstColumn","cellFactory":"lookup","selector":"lookup"},{"captionProducer":"expiry","cellFactory":"expiry","selector":"kpi-expiry"}],"hideAddButton":true,"defaultOptions":{},"expansion":{"automaticExpansion":true}}}},"containerKey":"pivot-table"},"writable":true}},{"key":"2","bookmark":{"name":"PnL / trade","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT NON EMPTY Hierarchize(DrilldownLevel([Trades].[Trades].[ALL].[AllMember])) ON ROWS, NON EMPTY {[Measures].[pnl.SUM], [Measures].[pnlDelta.SUM], [Measures].[pnlVega.SUM], [Measures].[pv.SUM]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{"row":{"chunkSize":2000,"thresholdPercentage":0.1},"column":{"chunkSize":50,"thresholdPercentage":0.2}},"configuration":{"tabular":{"pinnedHeaderSelector":"member","sortingMode":"non-breaking","addButtonFilter":"numeric","cellRenderers":["tree-layout"],"statisticsShown":true,"columnsGroups":[{"captionProducer":"firstColumn","cellFactory":"kpi-status","selector":"kpi-status"},{"captionProducer":"firstColumn","cellFactory":"lookup","selector":"lookup"},{"captionProducer":"expiry","cellFactory":"expiry","selector":"kpi-expiry"},{"captionProducer":"columnMerge","cellFactory":{"args":{},"key":"treeCells"},"selector":"member"}],"hideAddButton":true,"defaultOptions":{},"columns":[{"key":"c-treeCells-member","width":142}],"expansion":{"automaticExpansion":true}}}},"containerKey":"pivot-table"},"writable":true}},{"key":"3","bookmark":{"name":"Evolution","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"plotly-line-chart","mapping":{"xAxis":["[Time].[TimeBucket].[Value Date]"],"values":["[Measures].[pnlDelta.SUM]","[Measures].[pnlVega.SUM]"],"splitBy":[],"horizontalSubplots":[],"verticalSubplots":[]}},"query":{"serverUrl":"","mdx":"SELECT NON EMPTY {[Measures].[pnlDelta.SUM], [Measures].[pnlVega.SUM]} ON COLUMNS, NON EMPTY [Time].[TimeBucket].[Value Date].Members ON ROWS FROM [EquityDerivativesCube]","contextValues":{},"updateMode":"once"}},"containerKey":"chart"},"writable":true}},{"key":"4","bookmark":{"name":"Select currencies to filter on them","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"displayedAsSelect":true},"filterKey":"explicit","levelDetails":{"cube":"EquityDerivativesCube","dimension":"Currency","hierarchy":"Currency","level":"Currency","caption":"Currency"}},"containerKey":"quick-filter"},"writable":true}},{"key":"5","bookmark":{"name":"London vs New York: PnL","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT {[Geography].[City].[ALL].[AllMember].[London], [Geography].[City].[ALL].[AllMember].[New York]} ON PAGES, NON EMPTY [Measures].[pnl.SUM] ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{"row":{"chunkSize":20,"thresholdPercentage":0.1},"column":{"chunkSize":20,"thresholdPercentage":0.1}},"configuration":{"featuredValues":{}}},"containerKey":"featured-values"},"writable":true}},{"key":"6","bookmark":{"name":"Number of trades / legal entity","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"plotly-stacked-column-chart","mapping":{"xAxis":["[Booking].[Desk].[LegalEntity]"],"values":["[Measures].[contributors.COUNT]"],"stackBy":["[Currency].[Currency].[Currency]"],"horizontalSubplots":[],"verticalSubplots":[]}},"query":{"serverUrl":"","mdx":"SELECT NON EMPTY Crossjoin([Booking].[Desk].[LegalEntity].Members, [Currency].[Currency].[Currency].Members) ON ROWS, NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM (SELECT {[Currency].[Currency].[ALL].[AllMember].[GBP], [Currency].[Currency].[ALL].[AllMember].[USD], [Currency].[Currency].[ALL].[AllMember].[JPY]} ON COLUMNS FROM (SELECT {[Currency].[Currency].[ALL].[AllMember].[GBP], [Currency].[Currency].[ALL].[AllMember].[USD], [Currency].[Currency].[ALL].[AllMember].[JPY]} ON COLUMNS FROM (SELECT {[Currency].[Currency].[ALL].[AllMember].[GBP], [Currency].[Currency].[ALL].[AllMember].[USD], [Currency].[Currency].[ALL].[AllMember].[JPY]} ON COLUMNS FROM [EquityDerivativesCube])))","contextValues":{},"updateMode":"once"}},"containerKey":"chart"},"writable":true}}],"layout":{"children":{"0":{"children":{"0":{"ck":"1","size":0.46},"1":{"children":{"0":{"ck":"6","size":0.56},"1":{"children":{"0":{"ck":"4","size":0.2},"1":{"ck":"5","size":0.8}},"size":0.44,"direction":"column"}},"direction":"row","size":0.54}},"direction":"row"},"1":{"children":{"0":{"ck":"2"},"1":{"ck":"3"}},"direction":"row"}},"direction":"column"},"name":"Page 1","filters":{"EquityDerivativesCube":["{[Currency].[Currency].[ALL].[AllMember].[GBP], [Currency].[Currency].[ALL].[AllMember].[USD], [Currency].[Currency].[ALL].[AllMember].[JPY]}"]}}]},"containerKey":"dashboard"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            a9c: {
              entry: {
                content:
                  '{"name":"Featured values without description","type":"container","value":{"style":{},"showTitleBar":false,"body":{"pages":[{"content":[{"key":"1","bookmark":{"name":"Untitled Featured Values","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT NON EMPTY Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])) ON ROWS, NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{"row":{"chunkSize":20,"thresholdPercentage":0.1},"column":{"chunkSize":20,"thresholdPercentage":0.1}},"configuration":{"featuredValues":{}}},"containerKey":"featured-values"},"writable":true}}],"layout":{"ck":"1"},"name":"Page 1","filters":{"EquityDerivativesCube":[]}}]},"containerKey":"dashboard"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            f06: {
              entry: {
                content:
                  '{"name":"Performance dashboard - 2","type":"container","value":{"style":{},"showTitleBar":false,"body":{"pages":[{"content":[{"key":"1","bookmark":{"name":"Counterparties and currencies","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(DrilldownLevel([CounterParty].[CounterParty].[ALL].[AllMember])), Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember]))) ON ROWS, NON EMPTY {[Measures].[pnlDelta.SUM], [Measures].[pnlVega.SUM]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{"row":{"chunkSize":2000,"thresholdPercentage":0.1},"column":{"chunkSize":50,"thresholdPercentage":0.2}},"configuration":{"tabular":{"pinnedHeaderSelector":"member","sortingMode":"non-breaking","cellRenderers":["pivot-layout"],"statisticsShown":true,"columnsGroups":[{"captionProducer":"firstColumn","cellFactory":"kpi-status","selector":"kpi-status"},{"captionProducer":"firstColumn","cellFactory":"lookup","selector":"lookup"},{"captionProducer":"expiry","cellFactory":"expiry","selector":"kpi-expiry"}],"hideAddButton":true,"defaultOptions":{},"expansion":{"automaticExpansion":true}}}},"containerKey":"pivot-table"},"writable":true}},{"key":"2","bookmark":{"name":"PnL / trade","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT NON EMPTY Hierarchize(DrilldownLevel([Trades].[Trades].[ALL].[AllMember])) ON ROWS, NON EMPTY {[Measures].[pnl.SUM], [Measures].[pnlDelta.SUM], [Measures].[pnlVega.SUM], [Measures].[pv.SUM]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{"row":{"chunkSize":2000,"thresholdPercentage":0.1},"column":{"chunkSize":50,"thresholdPercentage":0.2}},"configuration":{"tabular":{"pinnedHeaderSelector":"member","sortingMode":"non-breaking","addButtonFilter":"numeric","cellRenderers":["tree-layout"],"statisticsShown":true,"columnsGroups":[{"captionProducer":"firstColumn","cellFactory":"kpi-status","selector":"kpi-status"},{"captionProducer":"firstColumn","cellFactory":"lookup","selector":"lookup"},{"captionProducer":"expiry","cellFactory":"expiry","selector":"kpi-expiry"},{"captionProducer":"columnMerge","cellFactory":{"args":{},"key":"treeCells"},"selector":"member"}],"hideAddButton":true,"defaultOptions":{},"columns":[{"key":"c-treeCells-member","width":142}],"expansion":{"automaticExpansion":true}}}},"containerKey":"pivot-table"},"writable":true}},{"key":"3","bookmark":{"name":"Evolution","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"plotly-line-chart","mapping":{"xAxis":["[Time].[TimeBucket].[Value Date]"],"values":["[Measures].[pnlDelta.SUM]","[Measures].[pnlVega.SUM]"],"splitBy":[],"horizontalSubplots":[],"verticalSubplots":[]}},"query":{"serverUrl":"","mdx":"SELECT NON EMPTY {[Measures].[pnlDelta.SUM], [Measures].[pnlVega.SUM]} ON COLUMNS, NON EMPTY [Time].[TimeBucket].[Value Date].Members ON ROWS FROM [EquityDerivativesCube]","contextValues":{},"updateMode":"once"}},"containerKey":"chart"},"writable":true}},{"key":"4","bookmark":{"name":"Select currencies to filter on them","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"displayedAsSelect":true},"filterKey":"explicit","levelDetails":{"cube":"EquityDerivativesCube","dimension":"Currency","hierarchy":"Currency","level":"Currency","caption":"Currency"}},"containerKey":"quick-filter"},"writable":true}},{"key":"5","bookmark":{"name":"London vs New York: PnL","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT {[Geography].[City].[ALL].[AllMember].[London], [Geography].[City].[ALL].[AllMember].[New York]} ON PAGES, NON EMPTY [Measures].[pnl.SUM] ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{"row":{"chunkSize":20,"thresholdPercentage":0.1},"column":{"chunkSize":20,"thresholdPercentage":0.1}},"configuration":{"featuredValues":{}}},"containerKey":"featured-values"},"writable":true}},{"key":"6","bookmark":{"name":"Number of trades / legal entity","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"plotly-stacked-column-chart","mapping":{"xAxis":["[Booking].[Desk].[LegalEntity]"],"values":["[Measures].[contributors.COUNT]"],"stackBy":["[Currency].[Currency].[Currency]"],"horizontalSubplots":[],"verticalSubplots":[]}},"query":{"serverUrl":"","mdx":"SELECT NON EMPTY Crossjoin([Booking].[Desk].[LegalEntity].Members, [Currency].[Currency].[Currency].Members) ON ROWS, NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM (SELECT {[Currency].[Currency].[ALL].[AllMember].[GBP], [Currency].[Currency].[ALL].[AllMember].[USD], [Currency].[Currency].[ALL].[AllMember].[JPY]} ON COLUMNS FROM (SELECT {[Currency].[Currency].[ALL].[AllMember].[GBP], [Currency].[Currency].[ALL].[AllMember].[USD], [Currency].[Currency].[ALL].[AllMember].[JPY]} ON COLUMNS FROM (SELECT {[Currency].[Currency].[ALL].[AllMember].[GBP], [Currency].[Currency].[ALL].[AllMember].[USD], [Currency].[Currency].[ALL].[AllMember].[JPY]} ON COLUMNS FROM [EquityDerivativesCube])))","contextValues":{},"updateMode":"once"}},"containerKey":"chart"},"writable":true}}],"layout":{"children":{"0":{"children":{"0":{"ck":"1","size":0.46},"1":{"children":{"0":{"ck":"6","size":0.56},"1":{"children":{"0":{"ck":"4","size":0.2},"1":{"ck":"5","size":0.8}},"size":0.44,"direction":"column"}},"direction":"row","size":0.54}},"direction":"row"},"1":{"children":{"0":{"ck":"2"},"1":{"ck":"3"}},"direction":"row"}},"direction":"column"},"name":"Page 1","filters":{"EquityDerivativesCube":["{[Currency].[Currency].[ALL].[AllMember].[GBP], [Currency].[Currency].[ALL].[AllMember].[USD], [Currency].[Currency].[ALL].[AllMember].[JPY]}"]}}]},"containerKey":"dashboard"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            a5b: {
              entry: {
                content:
                  '{"name":"Dimensions/PNLs","type":"container","value":{"style":{},"showTitleBar":false,"body":{"pages":[{"content":[{"key":"0","bookmark":{"name":"Dimensions/PNLs","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT NON EMPTY Crossjoin([Geography].[City].[City].Members, {[Measures].[pnl.SUM], [Measures].[pnlDelta.SUM], [Measures].[pnlVega.SUM]}) ON COLUMNS, NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{"row":{"chunkSize":2000,"thresholdPercentage":0.1},"column":{"chunkSize":50,"thresholdPercentage":0.2}},"configuration":{"tabular":{"pinnedHeaderSelector":"member","sortingMode":"non-breaking","addButtonFilter":"numeric","cellRenderers":["tree-layout"],"statisticsShown":true,"columnsGroups":[{"captionProducer":"firstColumn","cellFactory":"kpi-status","selector":"kpi-status"},{"captionProducer":"firstColumn","cellFactory":"lookup","selector":"lookup"},{"captionProducer":"expiry","cellFactory":"expiry","selector":"kpi-expiry"},{"captionProducer":"columnMerge","cellFactory":{"args":{},"key":"treeCells"},"selector":"member"}],"hideAddButton":true,"defaultOptions":{},"columns":[{"key":"c-treeCells-member","width":81}],"expansion":{"automaticExpansion":true}}}},"containerKey":"pivot-table"},"writable":true}}],"layout":{"ck":"0"},"name":"Page 1","filters":{"EquityDerivativesCube":[]}}]},"containerKey":"dashboard"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "1fe": {
              entry: {
                content:
                  '{"name":"Legacy scatter plot","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"scatter","mapping":{"x":{"from":"[Measures].[contributors.COUNT]"},"y":{"from":"[Measures].[pnl.FOREX]"},"cardinality":{"from":["[Currency].[Currency].[Currency]"]}}},"query":{"serverUrl":"","mdx":"SELECT {[Measures].[contributors.COUNT], [Measures].[pnl.FOREX]} ON COLUMNS, NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS FROM [EquityDerivativesCube]","contextValues":{},"updateMode":"once"}},"containerKey":"chart"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            c1a: {
              entry: {
                content:
                  '{"name":"Legacy area chart","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"combo-line-area","mapping":{"x":{"from":["[Currency].[Currency].[Currency]"]},"y":{"from":"[Measures].[contributors.COUNT]"}}},"query":{"serverUrl":"","mdx":"SELECT NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS, [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube]","contextValues":{},"updateMode":"once"}},"containerKey":"chart"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            e5d: {
              entry: {
                content:
                  '{"name":"Quick filter Checkboxes","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"displayedAsSelect":false,"multipleSelection":true},"filterKey":"explicit","levelDetails":{"cube":"EquityDerivativesCube","dimension":"Currency","hierarchy":"Currency","level":"Currency","caption":"Currency"}},"containerKey":"quick-filter"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "0xb": {
              entry: {
                content:
                  '{"name":"Page filters","type":"container","value":{"style":{},"showTitleBar":true,"body":{},"containerKey":"filters"}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            eef: {
              entry: {
                content:
                  '{"name":"1 page, 4 widgets","type":"container","value":{"style":{},"showTitleBar":false,"body":{"pages":[{"content":[{"key":"1","bookmark":{"name":"Tree table","type":"container","writable":true,"value":{"body":{"serverUrl":"http://localhost:9090","mdx":"SELECT NON EMPTY Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])) ON ROWS, NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM (SELECT {[Currency].[Currency].[ALL].[AllMember].[GBP], [Currency].[Currency].[ALL].[AllMember].[JPY], [Currency].[Currency].[ALL].[AllMember].[USD]} ON COLUMNS FROM (SELECT TopCount(Filter([Geography].[City].Levels(1).Members, NOT IsEmpty([Measures].[contributors.COUNT])), 3, [Measures].[contributors.COUNT]) ON COLUMNS FROM [EquityDerivativesCube])) CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{"queriesTimeLimit":60,"mdx.casesensitive":true,"mdx.defaultmembers.[Geography].[City]":"[AllMember].[Berlin]"},"updateMode":"once","ranges":{"row":{"chunkSize":2000,"thresholdPercentage":0.1},"column":{"chunkSize":50,"thresholdPercentage":0.2}},"configuration":{"tabular":{"pinnedHeaderSelector":"member","sortingMode":"non-breaking","addButtonFilter":"numeric","cellRenderers":["tree-layout"],"statisticsShown":true,"columnsGroups":[{"captionProducer":"firstColumn","cellFactory":"kpi-status","selector":"kpi-status"},{"captionProducer":"firstColumn","cellFactory":"lookup","selector":"lookup"},{"captionProducer":"expiry","cellFactory":"expiry","selector":"kpi-expiry"},{"captionProducer":"columnMerge","cellFactory":{"args":{},"key":"treeCells"},"selector":"member"}],"hideAddButton":true,"defaultOptions":{},"expansion":{"automaticExpansion":true},"columns":[{"key":"c-treeCells-member","width":250}]}}},"containerKey":"pivot-table"}}},{"key":"2","bookmark":{"name":"Chart","type":"container","writable":true,"value":{"containerKey":"chart","body":{"configuration":{"type":"plotly-line-chart","plotly":{"data":{"overridesByTraceKey":{"[Measures].[pnlVega.SUM]":{"name":"Taux de marge","yaxis":"y2"}}},"layout":{"xaxis":{"showticklabels":false,"showgrid":false,"showline":false},"yaxis":{"showticklabels":true,"showline":false},"yaxis2":{"showticklabels":true,"showline":true,"side":"right","range":[-1000,1000],"overlaying":"y"},"margin":{"t":20,"l":20,"r":20,"b":20}}},"mapping":{"xAxis":["[Currency].[Currency].[Currency]"],"values":["[Measures].[pnlDelta.SUM]","[Measures].[pnlVega.SUM]"],"splitBy":[],"horizontalSubplots":[],"verticalSubplots":[]},"switchedTo":"plotly-line-chart"},"query":{"serverUrl":"http://localhost:9090","mdx":"SELECT NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS, NON EMPTY {[Measures].[pnlDelta.SUM], [Measures].[pnlVega.SUM]} ON COLUMNS FROM [EquityDerivativesCube]","contextValues":{},"updateMode":"once"}}}}},{"key":"3","bookmark":{"name":"Quick filter","type":"container","writable":true,"value":{"containerKey":"quick-filter","body":{"configuration":{"displayedAsSelect":false,"multipleSelection":true},"filterKey":"explicit","levelDetails":{"cube":"EquityDerivativesCube","dimension":"Currency","hierarchy":"Currency","level":"Currency","caption":"Currency"}}}}},{"key":"4","bookmark":{"name":"Page filters","value":{"containerKey":"filters","showTitleBar":false,"body":{}},"type":"container","writable":false}}],"layout":{"children":{"0":{"size":0.2,"ck":"4"},"1":{"size":0.8,"children":{"0":{"ck":"3","size":0.3},"1":{"children":{"0":{"ck":"1","size":0.4},"1":{"ck":"2","size":0.6}},"direction":"column","size":0.7}},"direction":"column"}},"direction":"row"},"name":"Start page","contextValues":{"EquityDerivativesCube":{"mdx.lightCrossjoin":true},"EquityDerivativesCubeDist":{"mdx.aggressiveFormulaEvaluation":true}}}],"contextValues":{"EquityDerivativesCube":{"queriesTimeLimit":60,"mdx.casesensitive":true,"mdx.defaultmembers.[Geography].[City]":"[AllMember].[Berlin]"},"EquityDerivativesCubeDist":{"mdx.casesensitive":false,"mdx.defaultmembers.[Geography].[City]":"[AllMember].[Paris]"}}},"containerKey":"dashboard"},"writable":true}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
        },
        i18n: {
          entry: {
            isDirectory: true,
            owners: ["ROLE_CS_ROOT"],
            readers: ["ROLE_USER"],
            timestamp: 1607879735685,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            "en-US": {
              entry: {
                isDirectory: true,
                owners: ["ROLE_CS_ROOT"],
                readers: ["ROLE_USER"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "fr-FR": {
              entry: {
                isDirectory: true,
                owners: ["ROLE_CS_ROOT"],
                readers: ["ROLE_USER"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
        },
        structure: {
          entry: {
            isDirectory: true,
            owners: ["ROLE_USER"],
            readers: ["ROLE_USER"],
            timestamp: 1607879735685,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            "0xb": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            eef: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            e2b: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "158": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "419": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "695": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "3f3": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
              children: {
                "77d": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1607879735685,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                b06: {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1607879735685,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                f06: {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1607879735685,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
              },
            },
            bed: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "75a": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            dec: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "41c": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
              children: {
                "296": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1607879735685,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                eac: {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1607879735685,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                a5b: {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1607879735685,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
              },
            },
            c8a: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            e18: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "4aa": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            afd: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            dfa: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            cfd: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "02d": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "34d": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            abc: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "3a2": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "76c": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            d67: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            fba: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "9e3": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            a05: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
              children: {
                "310": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1607879735685,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
              },
            },
            a9c: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "1fe": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            c1a: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            e5d: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
        },
      },
    },
    settings: legacySettingsFolder,
    version: {
      entry: {
        content: '{"package":"4.3.8","contentServerApi":"0.1.0"}',
        isDirectory: false,
        owners: ["ROLE_CS_ROOT"],
        readers: ["ROLE_USER"],
        timestamp: 1607879735685,
        lastEditor: "admin",
        canRead: true,
        canWrite: true,
      },
    },
  },
};
