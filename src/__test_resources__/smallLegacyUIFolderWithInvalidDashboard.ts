/**
 * The shortened version of the content of the /ui folder on a Content Server, useful for unit tests.
 * Contains an invalid dashboard whose id is numerical.
 */
export const smallLegacyUIFolderWithInvalidDashboard = {
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
            "158": {
              entry: {
                content:
                  '{"name":"hidden grand totals","type":"container","value":{"style":{},"showTitleBar":false,"body":{"pages":[{"content":[{"key":"1","bookmark":{"name":"Untitled Pivot Table","type":"container","value":{"style":{},"showTitleBar":true,"body":{"serverUrl":"","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(DrilldownLevel([Geography].[City].[ALL].[AllMember])), Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember]))) ON ROWS, NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [foo] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{"mdx.hiddengrandtotals":"1"},"updateMode":"once","ranges":{"row":{"chunkSize":2000,"thresholdPercentage":0.1},"column":{"chunkSize":50,"thresholdPercentage":0.2}},"configuration":{"tabular":{"pinnedHeaderSelector":"member","sortingMode":"non-breaking","addButtonFilter":"numeric","cellRenderers":["tree-layout"],"statisticsShown":true,"columnsGroups":[{"captionProducer":"firstColumn","cellFactory":"kpi-status","selector":"kpi-status"},{"captionProducer":"firstColumn","cellFactory":"lookup","selector":"lookup"},{"captionProducer":"expiry","cellFactory":"expiry","selector":"kpi-expiry"},{"captionProducer":"columnMerge","cellFactory":{"args":{},"key":"treeCells"},"selector":"member"}],"hideAddButton":true,"defaultOptions":{},"expansion":{"automaticExpansion":true}}}},"containerKey":"pivot-table"},"writable":true}},{"key":"2","bookmark":{"name":"Untitled Chart","type":"container","value":{"style":{},"showTitleBar":true,"body":{"configuration":{"type":"plotly-line-chart","mapping":{"xAxis":["[Currency].[Currency].[Currency]"],"values":["[Measures].[pnl.FOREX]"],"splitBy":["[Booking].[Desk].[LegalEntity]"],"horizontalSubplots":[],"verticalSubplots":[]},"switchedTo":"plotly-clustered-column-chart"},"query":{"serverUrl":"","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(DrilldownLevel([Currency].[Currency])), Hierarchize(DrilldownLevel([Booking].[Desk].[ALL].[AllMember]))) ON ROWS, NON EMPTY [Measures].[pnl.FOREX] ON COLUMNS FROM [EquityDerivativesCube]","contextValues":{},"updateMode":"once"}},"containerKey":"chart"},"writable":true}}],"layout":{"children":{"0":{"ck":"2"},"1":{"ck":"1"}},"direction":"row"},"name":"Page 1","filters":{"EquityDerivativesCube":[]}}]},"containerKey":"dashboard"}}',
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
          },
        },
      },
    },
    settings: {
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
