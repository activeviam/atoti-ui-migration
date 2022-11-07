export const widgetsFolderWithCalculatedMeasuresFromSingleCube = {
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
        ec9: {
          entry: {
            content:
              '{"mapping":{"rows":["[Geography].[City].[City]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666607385260,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        a0d: {
          entry: {
            content:
              '{"mapping":{"rows":["[HostName].[HostName].[HostName]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[Log pv.SUM]","[Measures].[EXP pnl.Forex]"]},"query":{"updateMode":"once","mdx":"WITH  Member [Measures].[Log pv.SUM] AS Log([Measures].[pv.SUM], 10), FORMAT_STRING = \\"#,###.##\\"    Member [Measures].[EXP pnl.Forex] AS 10 ^ [Measures].[pnl.FOREX], FORMAT_STRING = \\"#,###.##\\"  SELECT NON EMPTY Hierarchize(Descendants({[HostName].[HostName].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Log pv.SUM], [Measures].[EXP pnl.Forex]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666788023599,
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
        "822": {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1665671450177,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            "822_metadata": {
              entry: {
                content: '{"name":"OME","isFolder":true}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666534379318,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            ec9: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666607385441,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
              children: {
                ec9_metadata: {
                  entry: {
                    content:
                      '{"name":"New pivot table","widgetKey":"pivot-table","version":1}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1666607385441,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
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
        a0d: {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666787593637,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            a0d_metadata: {
              entry: {
                content:
                  '{"widgetKey":"pivot-table","name":"Pivot table with 2 cms","version":2}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666788023599,
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
