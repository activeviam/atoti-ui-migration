import { ContentRecord } from "@activeviam/activeui-sdk-5.0";

/**
 * Content server object, useful for tests.
 */
export const contentServer: ContentRecord = {
  children: {
    branches: {
      entry: {
        isDirectory: true,
        owners: ["ROLE_CS_ROOT"],
        readers: ["ROLE_CS_ROOT"],
        timestamp: 1669226473908,
        lastEditor: "_no_user_",
        canRead: true,
        canWrite: true,
      },
      children: {
        __default__: {
          entry: {
            content: '{"owners":["ROLE_ADMIN"],"readers":["__ALL_USERS__"]}',
            isDirectory: false,
            owners: ["ROLE_CS_ROOT"],
            readers: ["ROLE_CS_ROOT"],
            timestamp: 1669226473947,
            lastEditor: "_no_user_",
            canRead: true,
            canWrite: true,
          },
        },
        master: {
          entry: {
            content: '{"owners":["ROLE_ADMIN"],"readers":["__ALL_USERS__"]}',
            isDirectory: false,
            owners: ["ROLE_CS_ROOT"],
            readers: ["ROLE_CS_ROOT"],
            timestamp: 1669226473953,
            lastEditor: "_no_user_",
            canRead: true,
            canWrite: true,
          },
        },
      },
    },
    pivot: {
      entry: {
        isDirectory: true,
        owners: ["ROLE_CS_ROOT"],
        readers: ["ROLE_CS_ROOT"],
        timestamp: 1669226475037,
        lastEditor: "_no_user_",
        canRead: true,
        canWrite: true,
      },
      children: {
        entitlements: {
          entry: {
            isDirectory: true,
            owners: ["ROLE_CS_ROOT"],
            readers: ["ROLE_CS_ROOT"],
            timestamp: 1669226475074,
            lastEditor: "_no_user_",
            canRead: true,
            canWrite: true,
          },
          children: {
            cv: {
              entry: {
                isDirectory: true,
                owners: ["ROLE_CS_ROOT"],
                readers: ["ROLE_CS_ROOT"],
                timestamp: 1669226475074,
                lastEditor: "_no_user_",
                canRead: true,
                canWrite: true,
              },
            },
            kpi: {
              entry: {
                isDirectory: true,
                owners: ["ROLE_USER"],
                readers: ["ROLE_USER"],
                timestamp: 1669226475129,
                lastEditor: "_no_user_",
                canRead: true,
                canWrite: true,
              },
            },
            cm: {
              entry: {
                isDirectory: true,
                owners: ["ROLE_USER"],
                readers: ["ROLE_USER"],
                timestamp: 1669226475106,
                lastEditor: "_no_user_",
                canRead: true,
                canWrite: true,
              },
              children: {
                EquityDerivativesCube: {
                  entry: {
                    isDirectory: true,
                    owners: ["ROLE_USER"],
                    readers: ["ROLE_USER"],
                    timestamp: 1669281586947,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "[Measures].[testo]": {
                      entry: {
                        content:
                          '{"className":"com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription","uniqueName":"[Measures].[testo]","expression":"44","formatStringExpression":"\\"#,###.##\\"","additionalProperties":{}}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669828830372,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                    "[Measures].[new measure*]": {
                      entry: {
                        content:
                          '{"className":"com.quartetfs.biz.pivot.definitions.impl.CalculatedMemberDescription","uniqueName":"[Measures].[new measure*]","caption":"new measure","expression":"6","formatStringExpression":"\\"#,###.##\\"","additionalProperties":{}}',
                        isDirectory: false,
                        owners: ["user1"],
                        readers: ["user1"],
                        timestamp: 1669829591275,
                        lastEditor: "user1",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        config: {
          entry: {
            isDirectory: true,
            owners: ["ROLE_CS_ROOT"],
            readers: ["ROLE_CS_ROOT"],
            timestamp: 1669226475062,
            lastEditor: "_no_user_",
            canRead: true,
            canWrite: true,
          },
        },
        apcs_version: {
          entry: {
            content: "3",
            isDirectory: false,
            owners: ["ROLE_CS_ROOT"],
            readers: ["ROLE_CS_ROOT"],
            timestamp: 1669226475050,
            lastEditor: "_no_user_",
            canRead: true,
            canWrite: true,
          },
        },
      },
    },
    ui: {
      entry: {
        isDirectory: true,
        owners: ["ROLE_CS_ROOT"],
        readers: ["ROLE_CS_ROOT"],
        timestamp: 1669226473767,
        lastEditor: "_no_user_",
        canRead: true,
        canWrite: true,
      },
      children: {
        organization_settings: {
          entry: {
            content:
              '{"userFilters.areEnabled": false, "userQueryContext.isEnabled": true, "calculatedMeasures.areEnabled": false, "theme": "light-activeviam", "homePageLayout": "list"}',
            isDirectory: false,
            owners: ["ROLE_CS_ROOT"],
            readers: ["ROLE_USER"],
            timestamp: 1669912818156,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        calculated_measures: {
          entry: {
            isDirectory: true,
            owners: ["ROLE_CS_ROOT"],
            readers: ["ROLE_CS_ROOT"],
            timestamp: 1669226473767,
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
                timestamp: 1669226473767,
                lastEditor: "_no_user_",
                canRead: true,
                canWrite: true,
              },
              children: {
                "1d3": {
                  entry: {
                    content:
                      '{"expression":"[Measures].[pnl.SUM] ^ 2","properties":["FORMAT_STRING = \\"#,###.##\\""]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669827289146,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "4a8": {
                  entry: {
                    content:
                      '{"expression":"Log([Measures].[pv.SUM], 10)","properties":["FORMAT_STRING = \\"#,###.##\\""]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669805699068,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "5m9": {
                  entry: {
                    content:
                      '{"expression":"1","properties":["FORMAT_STRING = \\"#,###.##\\""]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669827289146,
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
                timestamp: 1669226473767,
                lastEditor: "_no_user_",
                canRead: true,
                canWrite: true,
              },
              children: {
                "1d3": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669827289319,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "1d3_metadata": {
                      entry: {
                        content: '{"name":"CM in 2 cubes"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669827289319,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "4a8": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669805699247,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "4a8_metadata": {
                      entry: {
                        content: '{"name":"Log pv.SUM"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669805699247,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "2sp": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669817887106,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "5m9": {
                      entry: {
                        isDirectory: true,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669805695656,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                      children: {
                        "5m9_metadata": {
                          entry: {
                            content: '{"name":"One"}',
                            isDirectory: false,
                            owners: ["admin"],
                            readers: ["admin"],
                            timestamp: 1669805695656,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                        },
                      },
                    },
                    "2sp_metadata": {
                      entry: {
                        content: '{"isFolder":true,"name":"cm folder"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669817887286,
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
        },
        filters: {
          entry: {
            isDirectory: true,
            owners: ["ROLE_CS_ROOT"],
            readers: ["ROLE_CS_ROOT"],
            timestamp: 1669226473767,
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
                timestamp: 1669226473767,
                lastEditor: "_no_user_",
                canRead: true,
                canWrite: true,
              },
              children: {
                "239": {
                  entry: {
                    content:
                      '{"mdx":"{[Currency].[Currency].[ALL].[AllMember].[USD], [Currency].[Currency].[ALL].[AllMember].[GBP]}"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670340588116,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "526": {
                  entry: {
                    content:
                      '{"mdx":"[Geography].[City].[ALL].[AllMember].[Berlin]"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670340750269,
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
                timestamp: 1669226473767,
                lastEditor: "_no_user_",
                canRead: true,
                canWrite: true,
              },
              children: {
                "239": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670340588304,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "239_metadata": {
                      entry: {
                        content: '{"name":"Currency: 2 selected"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670340588304,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "526": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670340750462,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "526_metadata": {
                      entry: {
                        content: '{"name":"new filter"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670340750462,
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
        },
        organization_permissions: {
          entry: {
            content:
              '{"canUseUserQueryContext": false, "canManageContent": true, "canShare": true}',
            isDirectory: false,
            owners: ["ROLE_CS_ROOT"],
            readers: ["ROLE_USER"],
            timestamp: 1669391820334,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        user_roles: {
          entry: {
            isDirectory: true,
            owners: ["ROLE_CS_ROOT"],
            readers: ["ROLE_CS_ROOT"],
            timestamp: 1669226473767,
            lastEditor: "_no_user_",
            canRead: true,
            canWrite: true,
          },
          children: {
            ROLE_USER: {
              entry: {
                isDirectory: true,
                owners: ["ROLE_CS_ROOT"],
                readers: ["ROLE_USER"],
                timestamp: 1669226473767,
                lastEditor: "_no_user_",
                canRead: true,
                canWrite: true,
              },
              children: {
                permissions: {
                  entry: {
                    content: '{"canShare":true}',
                    isDirectory: false,
                    owners: ["ROLE_CS_ROOT"],
                    readers: ["ROLE_USER"],
                    timestamp: 1669226473767,
                    lastEditor: "_no_user_",
                    canRead: true,
                    canWrite: true,
                  },
                },
              },
            },
          },
        },
        widgets: {
          entry: {
            isDirectory: true,
            owners: ["ROLE_CS_ROOT"],
            readers: ["ROLE_CS_ROOT"],
            timestamp: 1669226473767,
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
                timestamp: 1669226473767,
                lastEditor: "_no_user_",
                canRead: true,
                canWrite: true,
              },
              children: {
                "953": {
                  entry: {
                    content:
                      '{"mode":"multi-select","levelCoordinates":{"dimensionName":"Geography","hierarchyName":"City","levelName":"City"},"serverKey":"Ranch 6.0","cubeName":"EquityDerivativesCube"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670254121976,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                a43: {
                  entry: {
                    content:
                      '{"mapping":{"values":["[Measures].[contributors.COUNT]"],"sliceBy":["[Geography].[City].[City]"],"horizontalSubplots":[],"verticalSubplots":[]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669227346302,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                df2: {
                  entry: {
                    content:
                      '{"mapping":{"rows":["[CounterParty].[CounterParty].[CounterPartyGroup]"],"columns":["[Currency].[Currency].[Currency]","ALL_MEASURES"],"measures":["[Measures].[gamma.SUM]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Hierarchize(Descendants({[CounterParty].[CounterParty].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY Crossjoin(Hierarchize(Descendants({[Currency].[Currency].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), {[Measures].[gamma.SUM]}) ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669977433906,
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
                timestamp: 1669643793921,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
              children: {
                "663": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669227167567,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "663_metadata": {
                      entry: {
                        content: '{"isFolder":true,"name":"rosi widgets"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670853357104,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                    a43: {
                      entry: {
                        isDirectory: true,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669227346474,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                      children: {
                        a43_metadata: {
                          entry: {
                            content:
                              '{"name":"i like pie","widgetKey":"plotly-pie-chart","version":1}',
                            isDirectory: false,
                            owners: ["admin"],
                            readers: ["admin"],
                            timestamp: 1669227346474,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                        },
                      },
                    },
                  },
                },
                "953": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670254122152,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "953_metadata": {
                      entry: {
                        content:
                          '{"name":"second widget that\'s a quick filter","widgetKey":"quick-filter","version":2}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670254122152,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                a75: {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669901798385,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    df2: {
                      entry: {
                        isDirectory: true,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669977434098,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                      children: {
                        df2_metadata: {
                          entry: {
                            content:
                              '{"name":"New pivot table test","widgetKey":"pivot-table"}',
                            isDirectory: false,
                            owners: ["admin"],
                            readers: ["admin"],
                            timestamp: 1670833579577,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                        },
                      },
                    },
                    a75_metadata: {
                      entry: {
                        content:
                          '{"isFolder":true,"name":"Dumpster not a fire","version":1}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670968317025,
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
        },
        dashboards: {
          entry: {
            isDirectory: true,
            owners: ["ROLE_CS_ROOT"],
            readers: ["ROLE_CS_ROOT"],
            timestamp: 1669226473767,
            lastEditor: "_no_user_",
            canRead: true,
            canWrite: true,
          },
          children: {
            thumbnails: {
              entry: {
                isDirectory: true,
                owners: ["ROLE_USER"],
                readers: ["ROLE_USER"],
                timestamp: 1669226473767,
                lastEditor: "_no_user_",
                canRead: true,
                canWrite: true,
              },
              children: {
                "346": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin", "ROLE_USER"],
                    timestamp: 1669901737219,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "14f": {
                      entry: {
                        content:
                          '{"thumbnail":"data:image/png;base64,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"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670334665557,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                    "31b": {
                      entry: {
                        isDirectory: true,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669817918087,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                      children: {
                        "241": {
                          entry: {
                            content:
                              '{"thumbnail":"data:image/png;base64,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"}',
                            isDirectory: false,
                            owners: ["admin"],
                            readers: ["admin"],
                            timestamp: 1669817950113,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                        },
                        "478": {
                          entry: {
                            content:
                              '{"thumbnail":"data:image/png;base64,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"}',
                            isDirectory: false,
                            owners: ["admin"],
                            readers: ["admin"],
                            timestamp: 1669821833579,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                        },
                      },
                    },
                  },
                },
                "387": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669634909632,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "524": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670233011449,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
              },
            },
            content: {
              entry: {
                isDirectory: true,
                owners: ["ROLE_USER"],
                readers: ["ROLE_USER"],
                timestamp: 1669226473767,
                lastEditor: "_no_user_",
                canRead: true,
                canWrite: true,
              },
              children: {
                "241": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once"},"widgetKey":"pivot-table"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669817949937,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "387": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once"},"widgetKey":"pivot-table"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669634909321,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "478": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Geography].[City].[City]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[Log City]","[Measures].[delta.SUM]"]},"query":{"updateMode":"once","mdx":"WITH  Member [Measures].[Log City] AS Log([Geography].[City], 10), FORMAT_STRING = \\"#,###.##\\"  SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Log City], [Measures].[delta.SUM]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0"},"1":{"mapping":{"xAxis":["[Geography].[City].[City]"],"values":["[Measures].[Log City]","[Measures].[delta.SUM]","[Measures].[Log pv.SUM]"],"stackBy":["ALL_MEASURES"],"horizontalSubplots":[],"verticalSubplots":[]},"query":{"updateMode":"once","mdx":"WITH  Member [Measures].[Log City] AS Log([Geography].[City], 10), FORMAT_STRING = \\"#,###.##\\"    Member [Measures].[Log pv.SUM] AS Log([Measures].[pv.SUM], 10), FORMAT_STRING = \\"#,###.##\\"  SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Log City], [Measures].[delta.SUM], [Measures].[Log pv.SUM]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"plotly-stacked-column-chart","serverKey":"Ranch 6.0"},"2":{"mapping":{"values":["[Measures].[Log pv.SUM]"],"sliceBy":["[CounterParty].[CounterParty].[CounterPartyGroup]"],"horizontalSubplots":[],"verticalSubplots":[]},"widgetKey":"plotly-pie-chart","query":{"updateMode":"once","mdx":"WITH  Member [Measures].[Log pv.SUM] AS Log([Measures].[pv.SUM], 10), FORMAT_STRING = \\"#,###.##\\"  SELECT NON EMPTY Hierarchize(Descendants({[CounterParty].[CounterParty].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Log pv.SUM]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0"}},"layout":{"children":[{"children":[{"leafKey":"0","size":0.5},{"leafKey":"2","size":0.5}],"direction":"column","size":0.5},{"leafKey":"1","size":0.5}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669821833400,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "524": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Currency].[Currency].[Currency]","[Time].[HistoricalDates].[AsOfDate]"],"columns":[],"measures":[]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(Descendants({[Currency].[Currency].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), [Time].[HistoricalDates].[AsOfDate].Members) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670233011449,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "14f": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Time].[HistoricalDates].[AsOfDate]","[Booking].[Desk].[LegalEntity]","[CounterParty].[CounterParty].[CounterPartyGroup]"],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Crossjoin([Time].[HistoricalDates].[AsOfDate].Members, Hierarchize(Descendants({[Booking].[Desk].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[CounterParty].[CounterParty].[ALL].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0","queryContext":[{"key":"mdx.casesensitive","value":"false"}],"filters":[]},"1":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once"},"widgetKey":"pivot-table"}},"layout":{"children":[{"leafKey":"0","size":0.249034},{"leafKey":"1","size":0.7509659999999999}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670334665557,
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
                timestamp: 1669643641198,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
              children: {
                "346": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin", "ROLE_USER"],
                    timestamp: 1669901737178,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "346_metadata": {
                      entry: {
                        content: '{"isFolder":true,"name":"MAD"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin", "ROLE_USER"],
                        timestamp: 1669901737180,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                    "14f": {
                      entry: {
                        isDirectory: true,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669285685624,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                      children: {
                        "14f_metadata": {
                          entry: {
                            content: '{"name":"Too many columns"}',
                            isDirectory: false,
                            owners: ["admin"],
                            readers: ["admin"],
                            timestamp: 1670334665557,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                        },
                      },
                    },
                    "31b": {
                      entry: {
                        isDirectory: true,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669817887106,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                      children: {
                        "241": {
                          entry: {
                            isDirectory: true,
                            owners: ["admin"],
                            readers: ["admin"],
                            timestamp: 1669817950113,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                          children: {
                            "241_metadata": {
                              entry: {
                                content: '{"name":"dfgfsdg"}',
                                isDirectory: false,
                                owners: ["admin"],
                                readers: ["admin"],
                                timestamp: 1669817950113,
                                lastEditor: "admin",
                                canRead: true,
                                canWrite: true,
                              },
                            },
                          },
                        },
                        "478": {
                          entry: {
                            isDirectory: true,
                            owners: ["admin"],
                            readers: ["admin"],
                            timestamp: 1669821833579,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                          children: {
                            "478_metadata": {
                              entry: {
                                content: '{"name":"Dashboard test  (copy)"}',
                                isDirectory: false,
                                owners: ["admin"],
                                readers: ["admin"],
                                timestamp: 1669821833579,
                                lastEditor: "admin",
                                canRead: true,
                                canWrite: true,
                              },
                            },
                          },
                        },
                        "31b_metadata": {
                          entry: {
                            content: '{"isFolder":true,"name":"lil mad"}',
                            isDirectory: false,
                            owners: ["admin"],
                            readers: ["admin"],
                            timestamp: 1669817887286,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                        },
                      },
                    },
                  },
                },
                "387": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669634909632,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "387_metadata": {
                      entry: {
                        content: '{"name":"New dashboard (copy)"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669634909632,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "524": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670232929446,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "524_metadata": {
                      entry: {
                        content: '{"name":"new new"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670233011449,
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
        },
        users: {
          entry: {
            isDirectory: true,
            owners: ["ROLE_USER"],
            readers: ["ROLE_USER"],
            timestamp: 1669226473767,
            lastEditor: "_no_user_",
            canRead: true,
            canWrite: true,
          },
          children: {
            user2: {
              entry: {
                isDirectory: true,
                owners: ["user2"],
                readers: ["user2"],
                timestamp: 1669651748128,
                lastEditor: "user2",
                canRead: true,
                canWrite: true,
              },
              children: {
                activity: {
                  entry: {
                    content:
                      '{"recentlyOpenedDashboards":[{"id":"e54","lastOpened":1670589758805},{"id":"7d7","lastOpened":1669821874599}],"userFilters":[],"userQueryContext":[]}',
                    isDirectory: false,
                    owners: ["user2"],
                    readers: ["user2"],
                    timestamp: 1670589758929,
                    lastEditor: "user2",
                    canRead: true,
                    canWrite: true,
                  },
                },
                permissions: {
                  entry: {
                    content: '{"canShare":true}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669391209111,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
              },
            },
            admin: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1669226699232,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
              children: {
                settings: {
                  entry: {
                    content:
                      '{"homePageLayout":"list","calculatedMeasures.areEnabled":false,"userFilters.areEnabled":true,"smartFiltering.ignoredHierarchies":["[Underlyings].[Products]"]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1671018210905,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                activity: {
                  entry: {
                    content:
                      '{"recentlyOpenedDashboards":[{"id":"1c9","lastOpened":1671024572978},{"id":"c05","lastOpened":1671024515384},{"id":"b99","lastOpened":1671023711562},{"id":"bd8","lastOpened":1671023708821},{"id":"c07","lastOpened":1671023580734},{"id":"fdb","lastOpened":1671022213315},{"id":"b00","lastOpened":1671018021780},{"id":"3c4","lastOpened":1671016928010},{"id":"a9e","lastOpened":1671015748391},{"id":"7d7","lastOpened":1671015719292}],"userFilters":[],"userQueryContext":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1671024573022,
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
    },
  },
  entry: {
    isDirectory: true,
    owners: ["ROLE_CS_ROOT"],
    readers: ["ROLE_CS_ROOT"],
    timestamp: 1669226473908,
    lastEditor: "_no_user_",
    canRead: true,
    canWrite: true,
  },
};
