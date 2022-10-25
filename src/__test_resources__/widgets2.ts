export const widgets2 = {
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
        "326": {
          entry: {
            content:
              '{"mapping":{"rows":["[CounterParty].[CounterParty].[CounterPartyGroup] => [Underlyings].[Products].[ProductType]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS, NON EMPTY Hierarchize(Union(Crossjoin(Hierarchize(Union(Descendants({[CounterParty].[CounterParty].[AllMember]}, 1, SELF_AND_BEFORE), Descendants({[CounterParty].[CounterParty].[AllMember].[HSBC]}, [CounterParty].[CounterParty].[CounterParty]), Descendants({[CounterParty].[CounterParty].[AllMember].[Reed Elsevier]}, [CounterParty].[CounterParty].[CounterParty]))), [Underlyings].[Products].DefaultMember), Crossjoin([CounterParty].[CounterParty].[AllMember].[HSBC].[HSBC Holdings plc], Hierarchize(Descendants({[Underlyings].[Products].[AllMember]}, 1, SELF_AND_BEFORE))))) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1665845447507,
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
        aaa: {
          entry: {
            content:
              '{"mapping":{"rows":["[Time].[HistoricalDates].[AsOfDate]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[Minus2]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY {[Measures].[Minus2]} ON COLUMNS, NON EMPTY [Time].[HistoricalDates].[AsOfDate].Members ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666253490290,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        "89b": {
          entry: {
            content:
              '{"mapping":{"rows":["[Booking].[Desk].[LegalEntity]","[Geography].[City].[City]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]","[Measures].[Distinct count city]"]},"query":{"updateMode":"once","mdx":"WITH  Member [Measures].[Distinct count city] AS Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY), FORMAT_STRING = \\"#,###.##\\"  SELECT NON EMPTY Crossjoin(Hierarchize(Descendants({[Booking].[Desk].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT], [Measures].[Distinct count city]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666257535417,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        "5d3": {
          entry: {
            content:
              '{"mapping":{"rows":["[Geography].[City].[City]","[Trades].[Trades].[TradeId]","[Currency].[Currency].[Currency]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]","[Measures].[pnl.FOREX]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Trades].[Trades].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT], [Measures].[pnl.FOREX]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666172363421,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        ddd: {
          entry: {
            content:
              '{"mapping":{"rows":["[Geography].[City].[City]","[Trades].[Trades].[TradeId]","[Currency].[Currency].[Currency]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]","[Measures].[pnl.FOREX]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Trades].[Trades].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT], [Measures].[pnl.FOREX]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666172213619,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        "65e": {
          entry: {
            content:
              '{"mapping":{"rows":["[Geography].[City].[City]","[Trades].[Trades].[TradeId]","[Currency].[Currency].[Currency]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]","[Measures].[pnl.FOREX]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Trades].[Trades].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT], [Measures].[pnl.FOREX]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666172142321,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        c04: {
          entry: {
            content:
              '{"mapping":{"rows":["[CounterParty].[CounterParty].[CounterPartyGroup]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS, NON EMPTY Hierarchize(Descendants({[CounterParty].[CounterParty].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1665768200666,
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
        d7e: {
          entry: {
            content:
              '{"mapping":{"rows":["[Currency].[Currency].[Currency]","[Booking].[Desk].[LegalEntity] => [Booking].[Desk].[BookId]"],"columns":[],"measures":[]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Hierarchize(Union(Crossjoin(Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Booking].[Desk].[AllMember]}, 1, SELF_AND_BEFORE))), Crossjoin([Currency].[Currency].[AllMember].[GBP], Descendants({[Booking].[Desk].[AllMember].[LegalEntityB]}, [Booking].[Desk].[BusinessUnit])), Crossjoin([Currency].[Currency].[AllMember].[GBP], Descendants({[Booking].[Desk].[AllMember].[LegalEntityB].[BusinessUnitC]}, [Booking].[Desk].[Desk])), Crossjoin([Currency].[Currency].[AllMember].[GBP], Descendants({[Booking].[Desk].[AllMember].[LegalEntityB].[BusinessUnitC].[DeskE]}, [Booking].[Desk].[BookId])))) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666256358154,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        "0bf": {
          entry: {
            content:
              '{"mapping":{"rows":["[Booking].[Desk].[LegalEntity] => [Booking].[Desk].[BookId]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Hierarchize(Union(Descendants({[Booking].[Desk].[AllMember]}, 1, SELF_AND_BEFORE), Descendants({[Booking].[Desk].[AllMember].[LegalEntityB]}, [Booking].[Desk].[BusinessUnit]), Descendants({[Booking].[Desk].[AllMember].[LegalEntityB].[BusinessUnitC]}, [Booking].[Desk].[Desk]), Descendants({[Booking].[Desk].[AllMember].[LegalEntityB].[BusinessUnitC].[DeskD]}, [Booking].[Desk].[BookId]))) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0","queryContext":[]}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666606386952,
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
        "4bf": {
          entry: {
            content:
              '{"mapping":{"rows":["[Geography].[City].[City]","[Trades].[Trades].[TradeId]","[Currency].[Currency].[Currency]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]","[Measures].[pnl.FOREX]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Trades].[Trades].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT], [Measures].[pnl.FOREX]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666171990021,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        "9ee": {
          entry: {
            content:
              '{"mapping":{"rows":["[Booking].[Desk].[LegalEntity]","[Geography].[City].[City]","[Currency].[Currency].[Currency]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]","[Measures].[delta.SUM]","[Measures].[gamma.SUM]"]},"query":{"updateMode":"realTime","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(Descendants({[Booking].[Desk].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT], [Measures].[delta.SUM], [Measures].[gamma.SUM]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666619582302,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        cb7: {
          entry: {
            content:
              '{"mapping":{"rows":["[Currency].[Currency].[Currency]","[Time].[TimeBucket].[Value Date]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[another calculated measure]","[Measures].[contributors.COUNT]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY {[Measures].[another calculated measure], [Measures].[contributors.COUNT]} ON COLUMNS, NON EMPTY Crossjoin(Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Time].[TimeBucket].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0","queryContext":[{"value":"[Underlyings].[Products].[ProductType]","key":"mdx.hiddensubtotals"}]}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666253448628,
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
        "326": {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1665845416073,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            "326_metadata": {
              entry: {
                content:
                  '{"widgetKey":"pivot-table","name":"pivot tables","version":7}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1665845447507,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
        },
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
            "0bf": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666534435336,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
              children: {
                "0bf_metadata": {
                  entry: {
                    content:
                      '{"widgetKey":"pivot-table","name":"New pivot table","version":6}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1666606386952,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
              },
            },
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
        aaa: {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666253490461,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            aaa_metadata: {
              entry: {
                content:
                  '{"name":"dustins widget","widgetKey":"pivot-table","version":1}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666253490461,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
        },
        "89b": {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666257535692,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            "89b_metadata": {
              entry: {
                content:
                  '{"name":"Widget with cm","widgetKey":"pivot-table","version":1}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666257535692,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
        },
        "5d3": {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666172363597,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            "5d3_metadata": {
              entry: {
                content:
                  '{"name":"New pivot table","widgetKey":"pivot-table","version":1}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666172363597,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
        },
        ddd: {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666172213793,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            ddd_metadata: {
              entry: {
                content:
                  '{"name":"New pivot table","widgetKey":"pivot-table","version":1}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666172213793,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
        },
        "65e": {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666172142498,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            "65e_metadata": {
              entry: {
                content:
                  '{"name":"New pivot table","widgetKey":"pivot-table","version":1}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666172142498,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
        },
        c04: {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1665736015752,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            c04_metadata: {
              entry: {
                content:
                  '{"widgetKey":"pivot-table","name":"pivot tables","version":50}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1665768200666,
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
        d7e: {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666256335374,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            d7e_metadata: {
              entry: {
                content:
                  '{"widgetKey":"pivot-table","name":"New pivot table","version":3}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666256358154,
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
        "4bf": {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666171979927,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            "4bf_metadata": {
              entry: {
                content:
                  '{"widgetKey":"pivot-table","name":"New pivot table","version":2}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666171990021,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
        },
        "9ee": {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666619582481,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            "9ee_metadata": {
              entry: {
                content:
                  '{"name":"New pivot table","widgetKey":"pivot-table","version":1}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666619582481,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
        },
        cb7: {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666253448810,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            cb7_metadata: {
              entry: {
                content:
                  '{"name":"new widget","widgetKey":"pivot-table","version":1}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666253448810,
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
