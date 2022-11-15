/**
 * A `ui/widgets` folder on the content server created in ActiveUI 5.0.
 */
export const uiWidgetsFolder = {
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
        "049": {
          entry: {
            content:
              '{"mapping":{"xAxis":["[Booking].[Desk].[LegalEntity]"],"values":["[Measures].[pnl.SUM]","[Measures].[EXP pnl.Forex]"],"stackBy":["ALL_MEASURES"],"horizontalSubplots":[],"verticalSubplots":[]},"query":{"updateMode":"once","mdx":"WITH  Member [Measures].[EXP pnl.Forex] AS 10 ^ [Measures].[pnl.FOREX], FORMAT_STRING = \\"#,###.##\\"  SELECT NON EMPTY Hierarchize(Descendants({[Booking].[Desk].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[pnl.SUM], [Measures].[EXP pnl.Forex]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1668521369474,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        "3cb": {
          entry: {
            content:
              '{"mapping":{"rows":["[Geography].[City].[City]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[Log pv.SUM]","[Measures].[Distinct count city]","[Measures].[EXP pnl.Forex]"]},"query":{"updateMode":"once","mdx":"WITH  Member [Measures].[Log pv.SUM] AS Log([Measures].[pv.SUM], 10), FORMAT_STRING = \\"#,###.##\\"    Member [Measures].[Distinct count city] AS Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY), FORMAT_STRING = \\"#,###.##\\"    Member [Measures].[EXP pnl.Forex] AS 10 ^ [Measures].[pnl.FOREX], FORMAT_STRING = \\"#,###.##\\"  SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Log pv.SUM], [Measures].[Distinct count city], [Measures].[EXP pnl.Forex]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1668521240678,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
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
        "6bf": {
          entry: {
            content:
              '{"mapping":{"rows":["[CounterParty].[CounterParty].[CounterPartyGroup]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[delta.SUM]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Hierarchize(Descendants({[CounterParty].[CounterParty].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[delta.SUM]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1668521072607,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        "761": {
          entry: {
            content:
              '{"mapping":{"xAxis":["[Currency].[Currency].[Currency]"],"values":["[Measures].[Test calculated measure]"],"secondaryValues":[],"splitBy":["ALL_MEASURES"],"horizontalSubplots":[],"verticalSubplots":[]},"query":{"updateMode":"once","mdx":"WITH  Member [Measures].[Test calculated measure] AS IIf(IsEmpty(([Currency].[Currency].CurrentMember.Parent, [Measures].[delta.SUM])), NULL, [Measures].[delta.SUM] / ([Currency].[Currency].CurrentMember.Parent, [Measures].[delta.SUM])), FORMAT_STRING = \\"#,###.##%\\"  SELECT NON EMPTY Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Test calculated measure]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1668521154287,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        "7a5": {
          entry: {
            content:
              '{"mapping":{"rows":["[Currency].[Currency].[Currency]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[pnl.SUM]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY {[Measures].[pnl.SUM]} ON COLUMNS, NON EMPTY Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS FROM [EquityDerivativesCubeDist] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 5.11"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1668529175304,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        "854": {
          entry: {
            content:
              '{"mapping":{"rows":["[Currency].[Currency].[Currency]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]","[Measures].[Distinct count city]"]},"query":{"updateMode":"once","mdx":"WITH  Member [Measures].[Distinct count city] AS Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY), FORMAT_STRING = \\"#,###.##\\"  SELECT NON EMPTY Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT], [Measures].[Distinct count city]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin", "ROLE_ADMIN", "ROLE_USER"],
            timestamp: 1666617275251,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        "0fc": {
          entry: {
            content:
              '{"mapping":{"rows":["[Geography].[City].[City]"],"columns":[],"measures":["[Measures].[Log pv.SUM]","[Measures].[Distinct count city]"]},"query":{"updateMode":"once","mdx":"WITH  Member [Measures].[Log pv.SUM] AS Log([Measures].[pv.SUM], 10), FORMAT_STRING = \\"#,###.##\\"    Member [Measures].[Distinct count city] AS Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY), FORMAT_STRING = \\"#,###.##\\"  SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Log pv.SUM], [Measures].[Distinct count city]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666703143431,
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
        "7a5": {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1668529175476,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            "7a5_metadata": {
              entry: {
                content:
                  '{"name":"Widget from EquityDerivativesCubeDist","widgetKey":"pivot-table","version":1}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1668529175476,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
        },
        "854": {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin", "ROLE_ADMIN", "ROLE_USER"],
            timestamp: 1666617275430,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            "854_metadata": {
              entry: {
                content:
                  '{"name":"New pivot table","widgetKey":"pivot-table","version":1}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin", "ROLE_ADMIN", "ROLE_USER"],
                timestamp: 1666617275430,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
        },
        "0fc": {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666703143622,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            "0fc_metadata": {
              entry: {
                content:
                  '{"name":"Pivot table with 2 cms","widgetKey":"pivot-table","version":1}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666703143622,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
        },
        ebf: {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1668520989341,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            "761": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1668521154498,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
              children: {
                "761_metadata": {
                  entry: {
                    content:
                      '{"name":"Currency TestCM","widgetKey":"plotly-line-chart","version":1}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1668521154498,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
              },
            },
            "3cb": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1668521240873,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
              children: {
                "3cb_metadata": {
                  entry: {
                    content:
                      '{"name":"City with CMs","widgetKey":"pivot-table","version":1}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1668521240873,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
              },
            },
            "049": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1668521369669,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
              children: {
                "049_metadata": {
                  entry: {
                    content:
                      '{"name":"Stacked columns","widgetKey":"plotly-stacked-column-chart","version":1}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1668521369669,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
              },
            },
            "6bf": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1668521072796,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
              children: {
                "6bf_metadata": {
                  entry: {
                    content:
                      '{"name":"CounterParty deltaSUM","widgetKey":"pivot-table","version":1}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1668521072796,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
              },
            },
            ebf_metadata: {
              entry: {
                content: '{"isFolder":true,"name":"Nested folder"}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1668520989549,
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
