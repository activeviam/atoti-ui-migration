export const widgetsWithCalculatedMeasuresFrom2Cubes = {
  entry: {
    isDirectory: true,
    owners: ["ROLE_CS_ROOT"],
    readers: ["ROLE_CS_ROOT"],
    timestamp: 1665671376671,
    lastEditor: "_no_user_",
    canRead: true,
    canWrite: true,
  },
  children: {
    content: {
      entry: {
        isDirectory: true,
        owners: ["ROLE_USER"],
        readers: ["ROLE_USER"],
        timestamp: 1665671376671,
        lastEditor: "_no_user_",
        canRead: true,
        canWrite: true,
      },
      children: {
        "53a": {
          entry: {
            content:
              '{"mapping":{"rows":["[CounterParty].[CounterParty].[CounterPartyGroup]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[pvSum ^ 2]"]},"query":{"updateMode":"once","mdx":"WITH  Member [Measures].[pvSum ^ 2] AS [Measures].[pv.SUM] ^ 2, FORMAT_STRING = \\"#,###.##\\"  SELECT NON EMPTY {[Measures].[pvSum ^ 2]} ON COLUMNS, NON EMPTY Hierarchize(Descendants({[CounterParty].[CounterParty].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS FROM [EquityDerivativesCubeDist] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 5.11"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666793334536,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        ee7: {
          entry: {
            content:
              '{"mapping":{"values":["[Measures].[activeui5 calculated measure]"],"sliceBy":["[Currency].[Currency].[Currency]"],"horizontalSubplots":[],"verticalSubplots":[]},"query":{"updateMode":"once","mdx":"WITH  Member [Measures].[activeui5 calculated measure] AS IIf(IsEmpty([Currency].[Currency].CurrentMember.PrevMember), NULL, ([Measures].[contributors.COUNT], [Currency].[Currency].CurrentMember) - ([Measures].[contributors.COUNT], [Currency].[Currency].CurrentMember.PrevMember)), FORMAT_STRING = \\"#,###.##%\\"  SELECT NON EMPTY Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[activeui5 calculated measure]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666702932407,
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
        timestamp: 1665671376671,
        lastEditor: "_no_user_",
        canRead: true,
        canWrite: true,
      },
      children: {
        "53a": {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666793334716,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            "53a_metadata": {
              entry: {
                content:
                  '{"name":"Widget with EquityDerivativesCubeDist CM ","widgetKey":"pivot-table","version":1}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666793334716,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
        },
        ee7: {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666702932589,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            ee7_metadata: {
              entry: {
                content:
                  '{"name":"Pie chart with cm","widgetKey":"plotly-pie-chart","version":1}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666702932589,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
        },
      },
    },
  },
};
