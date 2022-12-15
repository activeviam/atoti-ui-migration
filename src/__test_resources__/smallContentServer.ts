import { ContentRecord } from "@activeviam/activeui-sdk-5.0";

/**
 * Content server object, useful for tests.
 * Lighter version of `contentServer` in `./contentServer.ts`.
 */
export const smallContentServer: ContentRecord = {
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
            content: "{}",
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
                aca: {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669804710849,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    aca_metadata: {
                      entry: {
                        content: '{"name":"Log City"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669804710849,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "9a7": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669389429060,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "9a7_metadata": {
                      entry: {
                        content: '{"name":"xzvcz"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669389429060,
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
            content: '{"canUseCalculatedMeasures":true}',
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
                        content:
                          '{"isFolder":true,"name":"rosi widgets","version":1}',
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
                          '{"name":"second widget that\'s a quick filter","widgetKey":"quick-filter","version":1}',
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
                              '{"name":"New pivot table test","widgetKey":"pivot-table","version":1}',
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
                    "112": {
                      entry: {
                        content:
                          '{"thumbnail":"data:image/png;base64,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"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin", "ROLE_USER"],
                        timestamp: 1670864251141,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
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
                        "796": {
                          entry: {
                            content:
                              '{"thumbnail":"data:image/png;base64,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"}',
                            isDirectory: false,
                            owners: ["admin"],
                            readers: ["admin"],
                            timestamp: 1670946954359,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                        },
                        c9c: {
                          entry: {
                            content:
                              '{"thumbnail":"data:image/png;base64,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"}',
                            isDirectory: false,
                            owners: ["admin"],
                            readers: ["admin"],
                            timestamp: 1669817918087,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                        },
                      },
                    },
                    "85a": {
                      entry: {
                        content:
                          '{"thumbnail":"data:image/png;base64,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"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670939027861,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                    e11: {
                      entry: {
                        content:
                          '{"thumbnail":"data:image/png;base64,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"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670946927021,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                    "7d7": {
                      entry: {
                        content:
                          '{"thumbnail":"data:image/png;base64,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"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin", "ROLE_USER"],
                        timestamp: 1671015725434,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                    c6a: {
                      entry: {
                        content:
                          '{"thumbnail":"data:image/png;base64,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"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1671012785225,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
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
                "542": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669226749212,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    c07: {
                      entry: {
                        content:
                          '{"thumbnail":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAACMCAYAAABoBdWHAAAAAXNSR0IArs4c6QAAFB5JREFUeF7tnWtsldWexp93d7eb0pZC7YVLkfu1gICIAcWIAWKMl5zESPSMiWLiF/UbMTGZCacnTBjnxDNnzpfz4STGHI9zkESYQR0cDxxQD3JXVGC4VMulWAqFCm2Btrt9J8/arE4PM0rX7l4vm82zkp3u/fZdl/e332evtf7rv/5vEIZhCCUREIGBEngkCIJNAy3E5g98C5O6D4IA3d3dyMvLy1S7VY4IZBsBv8JsaWlBSUkJLl68iCFDhhhBMcXjcfPq7OxEMplEYWEhKLqenh5zjJ+bm5tRVlaGq1evIhaLIT8/H1euXDF/z58/j6qqKpOHn5VEIMcI+BXmwYMHMWjQICPM0tLSXnY8RmE1NjZi6NChRng81tXVZYRKQTc1NeGuu+5CW1ubOdbR0WGEXVRUhLq6OlRUVJi8d9xxR459J7ocEYBfYR46dAjl5eVoaGgwoho8eDBGjBhhhDdy5EicPHnSCJLvKV72gBQgX+fOncP8+fPR3t5uesjW1tbeHpc9J8ti2aNGjdL3KAK5RsCvMDks5VCTf5k4P+RnO0dkr8jhakFBgekVmew8kp8pWg5veT6P2xfPYy/LF4fESiKQYwT8CjPHYOlyRCAqAhJmVKRVjwg4EJAwHWDpVBGIioB/YXKOaOeEUVwV6+P8lPPWm5msrwXn1Uoi4EjArzCPHTuG6upqY3H98ssvMXnyZGOVpUU1k4nLLFu2bMG9996LDz74wFhxKysrMWPGDEyfPh179uwx9bIdu3btwkMPPWQsw3fffbcxIPU30QjF8mfPno0dO3b0WplZHxPr3717N2bOnGnWXC9duoRp06YZZ4jPPvvMnMO6lUTgBgT8CpNi5Holb1LevIlEApcvX8aCBQsy+s0cPXoUZ86cwQ8//GAcEjZu3Gisv8OGDcPLL7+Ms2fP4qOPPjJrnxQp2zRmzBi8+OKLTlZdWpG/+OILnDp1CvX19WZZh2upNTU1Zj2VVmRaoPmjQFFeuHDB/DBwOejDDz/E2LFjzdqskgjcVGFyWGmHcuxt2GNRMPQCymSyw2U7fLQeRqyD9fE4j7Ettk1877rUwnJef/11rFy50pRpE3vdvkNWvrdLO/Z/rP/68zLJQGXlFAF/PaZ1scspXBFcDEXtMryOoEmqInoC/oTJ4SuHermSrOOD7+uhKOlfLKORb9JZXb4/YWb1ZafROFp6acTxLRi6INI45rueNBAoS3QE/Arz8OHDOHLkCJ544oneS2JPyl6BhqCo0rvvvovly5cbA9E333xjDDOca9KxnlbS06dPGwd6OshbF0H2kDQkMQ/bPGXKFDdhcrSwZw9QUgLwWocPBw4fBqqrgYsXgYqK1P/orvjxx8CDDwKFhWgPAgkzqhsje+vxK0wuSVAIXKqgZZTLE9zORWspRRBVeu2117BmzRrwh4LWVFpH33nnHSPG1atX4/vvv++d19Fiy+NcB926davZ5XLnnXfivvvu678wuTRCwZ08CSxeDNTVAbREb9sGNDcDCxemBNrSQudgYO9eYP58YNAgtBcUSJhR3RjZW49fYfK6jx8/bpYqHn30Ubz//vtmN8jSpUvNnsuoEntI9txz5swxPSUttRwyWmcELnnYxOUcto29OufIPIfWW37u91D26tVUcRQde0t+/stfgCVLADpcDBoEdHVxY2rqPB7juUGA9s5OCTOqGyN76/EvzOy9dreWaY7pxktnD4iAP2HmWvifqITJHlvGnwHd1LmQ2Z8wuaBuF/5zgVRUDgIcPnP+LatsLtw1aV+DX2HSdY3hRZYtW2ZaSMMPIxOMGzfOuK9FmSgsWl9p6KFRauHChcZljoYdWl4576SlmEYf2zZaY3kuj9FaOyDPnZYWBFu3GmtsOH06XZJSc0x6JH36KTB+vDl2dfRoCTPKGyM76/IrzL1792LDhg1GmDSc0DJLASxatCjjbnk34svemyFOGGeI/q5cxKd/6wMPPGD8WCdOnGh8Wu3iPs+nME+cOGGWSji8TFuY588j9pvfAFeuIJw7F6isRDh+PIJkEmF5OWIbNiAcN84Yiq7Omydh3ujLzP3/+xXmV199ZYT5/PPPY9OmTb3Bs7gLo7i4OHK8dnhNwXHOyB6Sa5WcD9MSyx8NDiX5nkNJnsM87EF5TtrCZNiUs2dTvSRf3ArGXS3cmsbPly8DDMcZBOgIAgkz8jsj6yr0K0zNMd2/cM0x3ZnlYA5/wqQoc0mYUVll2YPL+JODUnO7JH/CdGtH9p8dlTDlK5v990IELfQvTM4z+7s5mLFjrWU00xfP3tvuduFmZlqLWd/ixYuNdxKNO3xxr6h9/AI9htiD2T2k/fb8YePp2XPwIMBoDZxLlpUBn3+e+jtsGFBenvof55Z032OU+kQC7V1dWsfM9Jd/65XnX5hvvvmmcRTn0sTcuXPNcgnFSlEwRAfd3SgIioXHvvvuOzxIh27wPk1kbD2PRhxGdefSB5dAaJ1966238MYbb+Drr7829dMye+DAARNhgT0kDUBcSqHhh0s8/Rbm9u0pNzz6ytIv9tQpoKYG+O1vUyKsrATa2oDly4ERI4A//hF45BFg7Fi55N16IvLRYr/CtLtLGPpjxYoVxhJLx3Auo1Agjz32mBHq/v37Ta/KyO10dGf8nldeecWIhXGDaMUdaLIbt/s+lIjrrOwhaYW1z1ChaOlk3zfAtPWX7bcwGQPIRjhg73jpUqq3nDUrZYGlJfbCBWDKlNT7Y8eA0aNND6oec6DfdE7k9ytMG0Gdf+02L7sEYUN7UAA8xp6T59mHDdnzKQqfT/bq7wboAc8xObTt+wCka07r5jbq815zzJwQ1kAvwq8wc8lf1v54DJT4jfLLV/ZGhG6L//sTpnxl07uBtI6ZHrccy+VXmNxkzPla32h0UQeA/j9f2IkTCI4cAVpbjfdNuGwZgl27EN5zj3GZM1EFaEXlHsmODgRnzpjjyenT0/L84TybvSDjy9KwZS281grMnvjbb7/ttQbTTVDrmDkmM/fL8StMGnmmTp1qfGQ5d2LkAC5B8D3njbwh6e52//33uzc9jRzBgQOIrVljhBeWlSHYvh3dW7akhDljBnD6NDByJMCN011diP3hDwDd6Soq0PXUU2kLk3FuX3jhBaxfv95Ec+DG7PHjxxu/XKbNmzebRwryxeMSZhpfbm5l8S/MnTt3GqPOk08+aZzG+Zk+p3w2JpcsKMyXXnopGqzNzQgOHQJKSxEyEl1TU8p5nPF4aDnlEgd7Sq4x8rGBjNlTXm7O7a6oSEuYvHb+APHHiKMHXi9HEPxhopWaLGgJ5jEavPhZwozmdsjiWvwKk/MlDuNogbW7NniMnxlXx1pEo4z/02sFNcoLUgv7XOS3yxsUJj8z8T2dzRkwuqcnLWGmjK6hud6+j6W3TvHX3xyaY2axXKJrml9h5pKvrDZKR3dXqibPj3rPJcADXsfsJwytY/YTVG6f5q/HJDc+5IdD2OsdBHjzca5lj9NVju54NIx4T1zop/cNh6kMM0lXuKYmM+80w1oObxlak0Nbhpfk+bEYkuXl/XfJ63sR+/en3O9mzwYOHEiVTW8gRi+gax4T/08jE6P3xWLylfV+E2R9BX6FSVc7zjHpI0tn8Lq6OmMA4YtO5Jx30R2OQuX/GeLSa+IySWNjKqYrw2du3AisWJEKzHz8eEqcDQ3Az34GcCP3738PTJ0KTJuGZHW1uzDXr08J8E9/An73O2DdupTQFy0CTpwAHn449UNA9zwapYqL0T5tmoTp9Sa4JQr3K8x9+/YZ4U2YMAFr1641TutcKhg9erRxIOdaHntNDhPpM/v444+bJRVviWuS7e2pnoq9I586RqGyt6IwKUYKhs+w5M6PzZuNKHl+MpFwF+a+fcDEicDu3SmB8j2tv7QCW8d2Xix7bFqE2WOWl0uY3m6AW6Zgv8JkL0hndVph+XxMipLLAXzxkXx2KEsjER3WuXwQSZAuDlOt9ZW7Pfo+vJaCpYMBezL2btcstskwdBemteyyLg5Xr61b9lp8bcBnWw8DPl+5ImHeMvrx1lC/wvTW7JtQsIw/NwH67VulP2HKVza9u0rrmOlxy7FcfoXJ4SrnjnQzY+JwlT0P55ZRJw6X2R5agBklz25JY2hKDrOtRw7bZbec0XBFAxXbTK+ldKLkGb/cy5cRTp2KgA8X4hOuhw5FwOh8Y8akrL+cd/JvQQE64nF5/kR9c2RffX6FyUgF27dvx7PPPttrkaU4bTSAKHlQiHQo37Ztm7EA03+X3je1tbWmjZz/crmG59FnlfNiburmPJhCZSxcV2EGf/6zcYAP3nsPPatXI/brX5soBeGoUWa+GS5dauaesU2bjEjDESPQMXy4hBnljZGddfkVJp3YeVNzVwV7ziVLlpgoBTU1NcYyG3ViJHiKky6A9E+l0Ljrg8fZYzKaAddTGfiZgqRgh18TCo85C3PnToQTJiDg4/e4fkkjEC3CiYQ5bqzAra2pCO0TJyIcMgQdFRUSZtQ3RvbV51eYvMm5XMLeiTc6eyUOJ+2Wp6h52Hlv3+eC8Bg/U3Q2moK1DHO+R6uy3fDtKkxzfVyK4YsPq+U6Ka29tPT2fQQfl0pswOcwlDCjvjGyrz6/wpSvrPs3LuOPO7MczOFPmLkGS8slufaNZvX1+BUmh60czlbTBS4LEq2sDKNp3QA5RGXb6NPL4SuHtOzl7fMp2XY77GWefkfJu+5aGQKTTwtjPdz6xReH0HSoYPn2WSrW+ULPx8yCm+XmNsGvMOkby5it8+bN610qsVZOzt2qqqoyFje2Pxxp+Pnkk0/M0gdDalIcr776qjFIlXLzdBiazdtsLxOPs70U68yZM9MSJh8xz83hdDekRZhi5FybPxKzZs0yPxI0jvFHgEwmT54sz5/+fJm5fY5fYZIdBcAbko7s7BHYW/DYpEmTzM0e5QNa2XMxcgKHpbTKsi1z5swxEdopSkYR4GP3GOOW7aKoaKnl//gczXR6TIqbdbEcCtz2lDxG6zTbwAgHdhcOfyDUY+a26vpxdf6FyZ6BvRCHjNaqyaUTewP2o5EZO4WioCht8GcKzVpq2TbrUG8fw0dnBAqHIuX/0hEmG8+hKnfQsLdk3SyHPwb2Mxn1tQRLmBn7ym/VgvwL81Ylc3272dtRvL4TPY3Yc0c5kvB9TSrfmYCE6YxMGUTAPwEJ0z9j1SACzgQkTGdkyiAC/glImP4ZqwYRcCYgYTojUwYR8E9AwvTPWDWIgDMBCdMZmTKIgH8CEqZ/xqpBBJwJSJjOyJRBBPwTkDD9M1YNIuBMQMJ0RqYMIuCfgITpn7FqEAFnAhKmMzJlEAH/BCRM/4xVgwg4E5AwnZEpgwj4JyBh+mesGkTAmYCE6YxMGUTAPwEJ0z9j1SACzgQkTGdkyiAC/glImP4ZqwYRcCYgYTojUwYR8E9AwvTPWDWIgDMBCdMZmTKIgH8CEqZ/xqpBBJwJSJjOyJRBBPwTkDD9M1YNIuBMQMJ0RqYMIuCfgITpn7FqEAFnAhKmMzJlEAH/BCRM/4xVgwg4E5AwnZEpgwj4JyBh+mesGkTAmYCE6YxMGUTAPwEJ0z9j1SACzgQkTGdkyiAC/glImP4ZqwYRcCYgYTojUwYR8E9AwvTPWDWIgDMBCdMZmTKIgH8CEqZ/xqpBBJwJSJjOyJRBBPwTkDD9M1YNIuBMQMJ0RqYMIuCfgITpn7FqEAFnAhKmMzJlEAH/BCRM/4xVgwg4E5AwnZEpgwj4JyBh+mesGkTAmYCE6YxMGUTAPwEJ0z9j1SACzgQkTGdkyiAC/glImP4ZqwYRcCYgYTojUwYR8E9AwvTPWDWIgDMBCdMZmTKIgH8CEqZ/xqpBBJwJSJjOyJRBBPwTkDD9M1YNIuBMQMJ0RqYMIuCfgITpn7FqEAFnAhKmMzJlEAH/BCRM/4xVgwg4E5AwnZEpgwj4JyBh+mesGkTAmYCE6YxMGUTAPwEJ0z9j1SACzgQkTGdkyiAC/glImP4ZqwYRcCYgYTojUwYR8E9AwvTPWDWIgDMBCdMZmTKIgH8CEqZ/xqpBBJwJSJjOyJRBBPwTkDD9M1YNIuBMIOPCfMo2ob29/e8SicRj8XjcuVXNzc1Hi4qKJsdisR/NGwTB3oKCgl85F64MIpD9BD4NguBMppoZ9C2oqanpV6WlpSsTiYRz+fX19TsqKysXBMHfFHl9ORuLioqecC5cGUTgNiOQUWFWVVUtuAE/CfM2u8Gy4XIvXbp0R15eXuO1tvyyqKhodTa066fa8KPC/PejwMRhQEcSaGoHBucDk8uAfzsIvDwPeO8wEAuAp2tSxbPHlDCz/eu+PdvX1tZWVVRUZIeZvwiCoPbpp5/+IgzDf4nH4zuSyeTPAczp7u7+h3g8PqOtre0/WltbO4cPH14di8XuSSaTLQAKAVzIy8t7MgiCrwDsTyaTI9etW/efPqj+qDA/+hb44SpQXQLsagQeHg909QBrDwH/tBioawEONwOPTpIwfXwxKjNzBFpbWysLCwubWGIYhr/Iz8+vfeaZZ/61ra3t7wsLC/8RwH/HYrEZYRjuzM/P/6+333773HPPPZdoamoKhwwZMicIgkmxWKy4p6dndmdn5+uJRGJWGIYnKNa1a9d+nrmW/m9JPyrMc5eB8sEA/7Z1AoVxoKwQ+LwBWDwmday1ExhRLGH6+GJUZuYIhGE4uL29/ZfXSvy4uLj44xuVvmrVqnhtbW33qlWrgtra2p4+51MzIQCrHb7PeLpemP88dOjQlQUFBT9pwfn/WlFfX//Xqqqq+zXHzPh3pAJvQwJ/I8DGxsax5eXlo+LxuLMwGxoaLpaWlpb+5IQ2CC6UlJQcug0565JFwImAswCdStfJIiACaRH4H0XxrCPRq/ZbAAAAAElFTkSuQmCC"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670937648227,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                    e7a: {
                      entry: {
                        content:
                          '{"thumbnail":"data:image/png;base64,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"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670847382008,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "737": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAACMCAYAAABoBdWHAAAAAXNSR0IArs4c6QAAEwtJREFUeF7tnQuUVdMfx3/lkRFCUZ5JQlERmrLKq1CRV95EKa2QRGlJhTxqeRSKREitlIhWD1QsSlbkGZVnKiqk8hiEov7r81vrzH9kau7c2ffOufd+91qzZubec/bZ+7P3d//2Pff8fr8Ka9as2bT99tubigiIQHwIVCgoKNi08847x6dFaokIiIBJmJoEIhBDAhJmDAdFTRIBCVNzQARiSEDCjOGgqEnhCfz555+23Xbb2TbbbFOqyr///nubN2+eff3117Z+/Xrbb7/9rEmTJlazZs1S1VPag2MpzI0bN9qmTZtKDbE0nf/nn3+sYsWKVqFChcLTuCY/vK6SXQQ6duxojRs3tquuuqqwY9OnT7cxY8bYQw89ZLvvvvt/Ovzdd99Zv3797IYbbrDDDjvM31+1apUNHDjQzjjjDGvRokXKIJVamB9++KHVqlXLdt11V5/En3zyiR1wwAFWuXLlYI389ttv7ccff7TDDz88WJ2bV/TRRx/5qkc/ovLDDz/4dQ899NCUXVcVlw+BsWPH2scff+zCZP5i/W666SafY5deeqlt/pUhC/ddd91lvXv3th122MGee+45O++88wobP3jwYLv22mv/c16o3pVamJh1OlG/fn23aB988IEdfPDBVp5fuSxatMj23HNP22OPPQq5/PXXX8brjRo1KpaVhBlqCmVOPVi7+fPn26mnnmqff/65Ib569eoV24Fly5bZ888/bz179vT3BwwYYFWrVrWLLrrIf7/wwgu2zz77WH5+fkoAlFqY7777ru22225uLQ866KBCYbJ/p7OsLoiiRo0abvZZkRYsWGA77bST7b///r5qFRUL/yN0to+//fabg8Jq/fLLL/brr7/6+dS5cOFCv96aNWusoKDAt6CVKlWyatWq+XXz8vIcFNAoS5cuNbYiCJbzsOyc8/fff/uigjD5n7q5Tt26df36XJvjv/zyS2/T77//7hZ0xx13TMkAqNJ4EsDg8Ln02GOP9QZOmDDBmjVrZn369LGHH37YVqxY4XPowgsv/E8H7rzzTuvWrZvvxvib7TCl6N8l9TopYR5xxBEuFLYEX331lVtMPiQjDkTLa3vvvbc3ngnPKoUAECbb1Gi/TuMQJsciMMSEGBA5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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670338548360,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "895": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669992866236,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "936": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAACMCAYAAABoBdWHAAAAAXNSR0IArs4c6QAAE0BJREFUeF7tnQm0VdMfx38VMiWVorw8UciQZHiGTIsMy7TMU0WxkHm2kGEhloVlyDxEhqjMUyhTlCEiih6RCgmhR2VK//X5Wed1vX+v1z33nPv2fee712r13rv37LPPb/8+57fPPvu3v41mz569cNlllzUVWUAWCMcCjaqqqhY2a9YsnBapJbKALGACU04gCwRoAYEZYKeoSbKAwJQPyAIBWkBgBtgpapIsEByY//zzj82dO9fSnJD69ddfbaWVVrLGjRtXe8Aff/xhCxcutOWXX15eIQvUuwXyAnPOnDn28ccf27bbbutOjTNPmjTJunXrltiF5FsnIFNyIeP3BQsWWJMmTRbbrvfff9823HBDW2GFFao/nzFjhlFXeXl5YteiimSBuBbIG8xPP/3UeO+52Wab2V9//ZU4mPleyPTp0x3CDh06VB9KuyZMmGBbbLGFwMzXoPp+EBbIG8ypU6facsstZ6uuuqq1atWqGkwAIeIwHASMZZZZxoeFfOe9996zLl26GBEXiKKo9MMPP9gXX3xha665pg9fmzZtau3atfM627RpY3/++aets8469tlnn/nQlmN/+eUXW3311Y0I17FjR/vmm2/8vO3bt7dVVlnFjfrTTz/Z559/buuuu66fnzYTHb/77ju/oRAxiaacl3o6derk9VJPy5YtjWtZbbXV7Ouvv/bv14zGQfScGtGgLRALzK5duzpsOD5Ov8kmm9i4ceMcKpwYADbYYAObNm2aAzx79myH6eeff/ZjAJACmLNmzbKNN97YoaCOjTbayEHs3LmzA7r55pvbBx984L9PnjzZQaEA9Morr+zD6boiJqD+9ttv3i7a+sknnziMgAzYv//+u99saENUH8+gP/74o99EgFtFFiimBWKDidN+++239vfff7uzE4W23HLL6uc6HPzDDz/0YS/DzCiyETmjApjUA3RAAeyAWVlZ6c+tDEfLyso8AlIHz7cRmF999ZUDTnReEphEPyI1baQ966+/voMZPWNyDfPnz68Gk59bt24tGIvphTrX/1kgNpjURATD6SsqKhwihn84NUNAhqCAxHCUqPfuu+969FxvvfX+AybREVgBhOElQ9JoQom6gRRYiWAMTxkqr7322n4+Ii2R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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670577672081,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "989": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670491070254,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "77c": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670316266956,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "13f": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670575639329,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "53c": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAACMCAYAAABoBdWHAAAAAXNSR0IArs4c6QAAD9ZJREFUeF7tXU1sFEcWfm17/Df22M74F7CDDYlNEsCA2UAiEtkKBxAHVhESUpTDSijKXiKtVlqt9rCHvexqD7lHK7QHJOIINlKEcogEEYJEShDBIcErY/6JARtsjG3wD56hV1+xjQl4Zno80zXVPV9JljHTXe/V9943VfX69SvLtm1b2IgAEdCNwIeWZX2SSKhFYuq2B+URAYWAe2KeOXNGysvLJRqNCibSR48eSWNjo9y/f19CoZDqzbIsicfj6vfU1JTU1taq6+7evSvT09NSUlKi7mEjAkQgKQLuiXnu3DmJRCIyNzenfoNk1dXVMjw8rMh648YN9Xt+fl59Nj4+Li+88IIUFRXJ9evXFZmbmpqkoqKCNiECRCA5Au6JmagfEBVEZCMCRCBrCGROzKypwo6IABFwECAx6QtEwEAE3BPzypUr0tra+mQMDx8+VEEeBH7u3Lkj4XBYBYfctAsXLkhbW5vad2IPihaLxWRmZkb9XVxcLIWFhW66UoGlmpoapUumDeOoq6tTgaubN29KQUGBlJaWSnNzs9I1HRmLLfGvXr2q9uX4cdsgF1g72wVgBHzw/8AoHZ0wLuzx0QdiAMuXL1dqwB4vvfSSCtyhT4x92bJlKVWEXrOzsyrmcP78eWlvb095Dy9whYB7Yn711VeqRxgCBISB169fL4cPH5a1a9dKfX29irzCwKkaAkXHjx+Xjo4OFTwaGRmR9957TwYGBuSHH35QjtjV1aV+UrVvvvlGORacfXR0VOnV3d2tCIW/V69enaqLJ5/39vaqANXrr78un3/+uVRVValgV2dnp9Jt586drvvCGPbv3y9lZWVqPCtXrpQNGzaoLxF8yQGvgwcPKvLv2LFDBgcH5Z133lm0f9zf398vFy9elAcPHkhDQ4O89dZbaoxuv8DQ8dDQkMId9urr65O3335bERsRd0TQYc/PPvtM1q1bJ1u2bEk6Vtjp2rVrMjExIVu3bpWffvpJ6YU+2TJGwD0xHVEgJpzBeUTytAogGIxjSsNsishwLhtmIcxOcPxkDY+VQFK/NOgLore0tKhIPFY66czefhlnjvR0R0yQEcsfNiKQbQTwZYSVSb435APgyw4tEom4I2a+g8bxEwGvEQAxsa3DFictYmJzj+Ur9nJYIiKZYHJyUgUM8Df2dthfYh+UKgiA+7Dsxb4L9yLwg0AE9ln4BsUPgh1OcCIZKLjXySxCf5k07H3RH5ZmGB/20liiYa+KJTo+v3fvnrz66qtJxQATBFDwG/sw7OlyvaTOBBev7kUwLFObeaWb7n4RmIPfYTtQU1Pjfsb88ssvVXQShAKgr7zyilqCfPfdd7JixQpFoiNHjshHH32UMrsHAaOenh7l9IiEwtkRCEKA5fLly7JmzRoVVHjzzTdT4oPADwI8IIET4U15U4ILjh07Jr/88osK/kCXXbt2KaBALkSkL126pIIc7777blIRCNb8/PPPcvLkSRWxhH4I1rD9GgHMEEzRfIwJOIUMOfjbtm3b3BPTgRSBDDwaQcj+2QaHXOz/6ZBEgAgkRyBjYhJgIkAEso8AIty3bt1SM2ZXV1f6M2b2VWKPqRDA82EYDCuSIEUwnYSGVOPPh88ZlfWZlRF4wt4dQRLs5d0kcPhliNhT4Tkom6jXJ/m4xGeegJnFST4I0kP8dNMcfWa2tNQlMdOCK1gXg+AmtnTSCk3UPxs6kZjZQNGnfeA5mUkN+uDZ+GLpnSbpqUMXElMHyobKABGc7BKoiGQQOASyTbB/1d3wzBjPxklM7jF1+55R8kBM51kz9nd4ywUZSfh/vO6mu42NjakMKxKTxNTte0bJM20p64BDYpKYRhGFyhABBwHuMTX4ApaJiIBi2cjgRmLAmWCwgA2JqYGYWDIisIHKAEjOf+211zRI9Z8IJhiQmP7zWmqcVwhwxswrc3OwfkGAxPSLpahnXiFAYvrM3EhiP3HihNJ648aNgXrjn3tM7jF9RscFdRHZxXt6KG2SqDqhXweH19nc1iL26xjd6s0Z0y1SAbzO1ONOg/TGzFLdhsRcKnIBuI+ZP+YakcQ01zaeawZiokJhZWWlknX79m1VaR5/o0K87uYcxcCUPKbk6fY9o+SBmKg+iPIkeFv+7NmzKnkd/85FJQGUA0V1RRKTxDSKKLqV4VJWN+Lu5XEp6x4rXkkEtCFAYmqDmoKIgHsESEz3WC35SufZI6rWYx+3ffv2QCUGLBmYZ25kgsECICRmtryK/RCBLCJAYmYRTHZFBLKFAImZLSTZDxHIIgIkZhbB1NEVTkLDaWNIDEAV9iCdjmXaCeQ67JlIBomZS/SXIPvBgwcqgIQqCDhmMEhJ3zjXlOeGPnYKEnMJ5OAtRMBrBEhMrxE2uH9m/phrHBLTXNt4rhmI6RxLAGGzs7MqTxZL5FwcOIz9c3V1NXNluZT13PeNFgBSOgEXELKvr0+dDl5SUqKOstfdeETCAuKcMXV7n0HyuJQ1yBjPqEJimmsbapbHCJCYeWx8Dt1cBEhMTbaZmppSRyScOnVKduzYoUmqv8QwiZ17TO0eG4vFVFU7FMByjmnXroThAhEVLi0tNVxLPepxxtSDM6UQgbQQIDHTgosXEwE9CJCYenDOmpSZmRmVCICH8bW1tU8q3GVNQA47cgqD5VAFY0STmMaYwp0iSPT++uuvpbu7W+1ZkSkTlOZUyQvKeDIZB4mZCXq8lwh4hACJ6RGwfuiWmT/mWonENNc2nmtmGjGdhHoWfOb7mJ47v8kCnCPom5ub1VslSGJHw7511apV2lVnEvsC5JwxtbufOQJNmzEdZDhjcsY0hyU50ASzpImNmVEkpol+SZ2IAGv+6PABLBnHxsZUZbuLFy/Khg0bpKmpSYdoX8nASdnE5bHJuMfU4LrxeFzGx8elrKxMVbhbvXq11NfXa5DsLxHAKBfncpqIEolpolWoU94jQGLmvQsQABMRIDFNtEoSnfBep2VZKpEdleyC9GgBL5LnojqfiS5AYppolSQ6jY6Oyvfffy+dnZ2qzGRDQ4PPRpBYXVYwWMCGxAyMW3MgQUKAxAySNdMci4mZP1imYyWQ743EzGMPMJGYMEeQ9s1LdS8Sc6nIBeA+EBNH+r344otPktjxf9FoVB3xp7sxiZ17TN0+Z6Q8kHBubk4diYDqfTjiD3mq+MlFtTpHF86YzPzRQhhTk8WRkWRiIzFJTBP9kjoRAebK6vKBgYEBdVoyntUhT7alpUWXaN/IYa4s95hanRVLWWTqfPHFF4Ll4+bNm6W9vV2rDn4QdvPmTVm2bJkfVPVcR0ZlPYeYAohA+giQmOljltM7kCsb9MYEAwZ/gu7jHJ9PEeCM6TPDoRL7pUuXpKqqSiUFdHR0+GwEidV1kh0CM6AMBkJiZgAebyUCXiFAYnqFrA/6NTXBAGey5HsjMfPYA5jEbq7xSUxzbeO5ZiCm8+wQ+9X+/n61b62srJS2tjbP5T8rwKmSx5Q8RmW1O59JAkFMnLOJIxGQxA6SOgnsuahW55yPSWKSmAl5AkcNejP1mSiJSWIm5J6pgZGgf1lgfAz+kJhJ/RxJ1dhz4d1EzKD4jb+npqbUy8R4fxDV1evq6pL2g3tRAQ75stPT01JRURGoI9qz9WUBfHLxHmi29M9mPwz+JEETey48zEdrbW1V/96yZYv6DTLiTRG8db979+6kNgEph4eH1fEIly9flp6enpwEV7LpOF70xSp5C6iSmF54GPskAhkiQGJmCKDu27GMDnJDVDgcDgd5iK7GRmK6gokXEQG9CJCYevHOWBqCTUhkdwJTmzZtyrhPUzrA/jsXiQ2mjP9pPUhME62SRCc8ewQ5I5GIivDid1Aazy5h8CcovpzROEyt3sej3vkcMyPH9vvNTGI314JcypprG881AzGdynRIgsAzWTQ85M/FideOLkzJ44zpufObLODZt0tQYhPLSLxdsnz5cu2qIwmjsbGRZ5cIiand+UwSyKWsSdb4tS5cymqwDc4EYXOHAI7hKy8vd3dxgK8iMQNsXA7NvwiQmBpsh+dzQ0NDcvr0aVmzZo2qwl5cXKxBsr9EXLlyRb0swMY9Jn2ACBiJAGdMI82SWKmgJ7Fjj4n3VfO9kZj57gEcv5EIkJhGmiWxUjMzM6oawuDgoCrBsXHjRp+NILG6TGJfwIbE9Jlb49ELHHjVqlWqksLatWt9NoLE6jrJ+YEZUAYDITEzAM/vt5pYCRB7TDZGZfPaB5j5Y675OWOaaxvPNQMxncp0mD2xlESubK7Kezi6MImdM6bnzm+yABDTOfoO72b29fWp8pwozZmLSgJ4u6W5uZlJ7ExiN5k23uvGpaz3GC9VApeyS0Uujfvu3LmTxtX5fSmW0Zix872RmPnuARy/kQiQmBrMgnNQsH9CIvuPP/6okgLeeOMNDZL9JQLPZfF8lo3BHy0+gIgnSk5imYZvwoaGBr5dsgjyPLtkARTOmFqomT0hSMkLckOCAQ8W4owZZB/n2HyMAGdMnxkPBZ9RTW5sbEwlB3R2dvpsBInVHRkZUct8Ns6YvvMBEPLbb79VwaOjR4/K3r17fTeGRAo7VfICM6AMBsIZMwPwcnUrsnMQUEK0N0glSjAmJrE/9ioSM1fsMkAuM38MMEICFUhMc23juWYkpucQL1kAiblk6Px/I4iJpAdUXccyEknsWEpOTExId3e39gEyiX0BchDz1KlT0tXVhRPdPrQs65NEBrFsE9+s1e4+wRGICK/TUK4ESRB1dXWqMsLLL7+cs4EWFRXlTLYpgnHEokO3cDhMYppiGOpBBJ5CgMSkOxABAxEgMQ00ClUiAiQmfYAIGIhASmIOQmnbtmssy6pNNQDbth/ath2yFn9qPG5Z1miqPvg5ESAC8lfLsnoTRmWdD0ZHR/8cjUb/ngqwubm5/lgs1mpZ1nPnqtm2/XFFRcUfU/XBz4kAEUiOwJOCnw4x782KlBWJlDwT3R4YE+mIioCY8Xgcxzc9R0zLsj4uLy8nMel1gUXg9OnTofb29gO2bRfH4/E/fPDBB1OFhYWR3t7eq3v27Kk6dOjQxNODf//998MHDhzAYargmu0WmOeI2TcsMjQlcmZYZFOjyH8GRH63XqStWmRFhMR0CyyvCyYCtm2XxmKxGbwgPzs7+5t9+/Zdt217m2VZ9fF4/FxBQUFPJBL55+TkJP4uKSwsjNq2XREKha7F4/Hffvrpp/9wg8xzxLz/UKTQErlxX+TujEhduUi0TKQsJBIqIDHdgMprgouAbdtFsVjsT/8n5r/37dv3qL29fay/vx/xmYlQKNQ0Pz9/r7Kycn56ejpqWVbYtu1J27arCgoK7IMHD/7XsqyUM+cTYo6MjPy+vr7+L6kgnZubOx+LxVosyypb5Np/hcPhv6Xqg58TASLgco9JoIgAETAHgf8BL5n7Ix3q7y0AAAAASUVORK5CYII="}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670578412347,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "6d4": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670497304579,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "8d4": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669627545844,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "7b4": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670575907173,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "5b9": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669649519139,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "1ed": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669395222185,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                d8d: {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670490910199,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                c2a: {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669628140574,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                b0c: {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670184067261,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "5ad": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAACMCAYAAABoBdWHAAAAAXNSR0IArs4c6QAAHJJJREFUeF7tnQm4TWUXx19FE0WJIqTIPESUJmTOmHkmU8YkRebKlKFSypQkkUhJocxDhhApU+YyZCgqRaHB9/zW923fce+59+59xr3PWet57nOnvd/97rXW/13v3mf910q19cDPF46fvcKoeF8DV5345u07ixZ91Pt3oneQavGu0xfy3JzWXKfY9LQ3HDltTIlcN97zx6kT6z19Izp50YAAs0SOtCbDVaoRL2vg4Clj8uVQYHrZhr5zV2DGiCUVmDFiyP/dhgIzRuypwIwRQyowY8uQCszYsmfUI+aKFSvMtddea+66666Qa/att94yrVu3vjjuTz/9ZL755htToUKFkF8r2gO6CZgjR440Tz/9tEmVKpWoZffu3ebff/81+fLli7aaPHP9qAPTiabmzJljqlataq644v+vkBM6ge94Ckwn2g3fsU6Aefz4cbNmzRpTp06d8E3IAyPbBubPP/9sZs6caQ4dOmSuuuoqM2DAAPPrr7+a4cOHm7///lt+HzVqlOndu7fZsWOH+f333839999v3nvvPdOkSRNRxYEDB8z69evNzp07TYYMGUyHDh3M2rVrzc0332zWrVtnWrZsaf7880/z7rvvmrp165pXX31Vxm7YsKHJnDmzGTRokLnxxhtNv379TJo0aczBgwfNwIED5X+DBw82o0ePNj/++KNp0KCBufPOO81rr71mzp49a06ePCkr+IULFyRili1b1rzzzjtm7969pnr16ua+++7zgKmSn6LTiDlmzBjzzz//mKNHj4rNrrzySjNx4kRz+PBh06JFC7Fz0aJFRc9vvvmmeeaZZ8wHH3xg6tWrJxPZtm2bueaaa0y2bNnMU089Jbr+6KOPTK1atczbb78tO5WpU6eab7/9VmxRpEgRkytXLsN1sVGmTJnErtddd5387bfffhN/YAz8o3bt2qZixYpyrRMnTohvMZe+ffuaDRs2mPnz55tbb71V5sPvDz/8sPgD9sbOefPm9bRNHQETpbVp00YUwY2/9NJLpn379qKABQsWmDx58ogBMAhRDYDg/CVKlLgITECLEnft2mXYWgK8W265RbY7JUuWFPCmS5dOgNqqVSs5b9q0aaZp06bm448/TjZinjlzRhaLCRMmmOeee06A+sQTT4gDfvjhh6ZcuXICzNSpU8v2mQXhk08+ESfCMb0sToEJkDp37izA3L59uzg09kMvc+fOlQULm2CLrVu3mmbNmsli1q5dO1ETumYHU6ZMGbN48WIB89ChQ2XRnDx5silfvryMiZ9YEZPv99xzj7npppvM7NmzTalSpeRcxrjsssvMkiVLTLVq1RJFzJUrV8rimz9/frk29jx27JhZvny5LOAvvviiXJfdU48ePQToXbp08bI57X+OScS0FAEwMSKOT6S05PTp02bz5s3m3LlzYnAAAAiJjlbEZFV78MEHZXUDnKyCAPOGG26QaErEZLUE3ERQBINhPFbJpLayv/zyi0TnTp06meeff17mZa3crKA4FecCTOZ39913y6odK+IUmNY2/4cffhBgYrsqVapIFET++usvwzE5cuQwt912mwCB6Fa8eHH5P8+MAJFoWLp0aQEfUY/Fj/MAHbsbAEXU5Hlz48aNpmbNmjIO0ZedCj5F5MRXkKS2sizwb7zxhiy47JxeeOEFWajxL6I30fizzz6TsVhYuI6XxVHE9AUmD/Lz5s0TkKFoIhVbC1ZhQIGhWblYxS6//PKLwGS7xNYH0LDKshoDzDvuuEO2yoAF4y5btkyiLgoHcN27d5eVFCfJkiXLxRcLRFNWd1ZwtkhEwZdfflm22F27djW9evUSh7j99tvlPIBZoEABs2jRIlkA9u3bd9HZvGzIYIFJFMP5eTG2f/9+U6xYMTNjxgyTNm1aWRTRPwuxBVx0hT0ARdu2bWV3g72JuACTCMujCBGW89g98Qi0adMmuQbgYkwWBf7OTovtMwsBgKtfv778HeEa2bNnN6tXr5YFFZvjO0OGDDHDhg2Treu4ceNkUcZniJr4nZfFNjBDcZNsU62IGYrxdIz/a8ApMKOtOx4tiJgsliqJNaDAjBGv8AIw2Z0QUYmE7JjY0aj410BEgcmWA7E+31KjhE4DXgAmd8uLG4SXPeoHSds/osAMnRvqSAk14BVgquXsaUCBaU9Prj9Kgel6EzmaoALTkbrce7AC0722CWRmCsxAtObCcxSYLjRKEFNSYAahPDedqsD0bw0+2ybJwWuiwPSaxZKYrwJTgRkjrhxbt6HAVGDGlkfHyN0oMBWYMeLKsXUbCsw4BiYULag+JIw3b95csjdiWchSgc4GFcmJkHRfqVIloZrBwiDh2jf52xqLRH9YHNdff72T4f0eGwgwSQqH+QETgyT2WJRQvPzBD+CpwrCCVAFpI9xi++UPDgaHDyYHjAOcyescxpSUC2jgnMJQcSKwJuCBwtaAfQO1zTf9DGYLbBeoblDQoLUBjvTp0zu5zCXHOgUm1Ci4lrBIILXD3ohFCQSY2AOWC9RGBD+Aokiu77333uv3Le+pU6eElmgVBQhWl7aByeo+adIkcTgE7h3E6UaNGgkNB5CSoFywYEGzcOFCiTJfffXVxVovHAu1h2hLZQNuHr4evxNdIMPCWI/EamRXab7A5Of3339fIh/UMniDgI17hCMI2L777jvTuHFj4YOiJ2hT0NRgUUBluvrqq0UH0KUYI2vWrOb8+fOGukfc+549e4QQPmvWLBnH4ijama9TYI4dO9Y89thjcg12QpDLqSDA36HdsVPALkR/Fg1ofegAe2E3/IGFB6oVxGgqGXCvLEII95ozZ047Uw/rMb7AZLfHvULeBmjYj+oIkLpZqPA9yNjQBLEP4MS+LK5Lly4VWiPnYHvsxX1D0O7fv79wfdmBdOvWTXBicYw5lqR9Ii2VGSpXrmxrAbYNTAjMcBxxQgTDsFXzBSZg/OOPP8Rg8DVxTG4G/uOnn34qbAI4e3Au4fhlzJhRCNVwMjkPzp6bxBeYGHj8+PECLJTOQgNRGCPAPeR3Ik+NGjXMiBEjBJgADaNC4oZATsExyODsPtAJFRx4HIAjih4hG6NXxnFK9HUKTDiScChZTNmqAUyqUVjAtOh53DMcW0q4UH2A4xEcGN4miwtOC+8SfcGF5Z6efPJJRwtLuOzuC0x2PwCH+4Uzyv3iw+wWIIwTDVetWiWLL/xgFiOAjK2mTJkiCw/HYB8ojJ9//rmUZQGYfCdiPvDAA7LYEm379OljChUqJAscCyCLMxhhYUtJbAOTgVgRvv76a6lIQEkHSKpMlJsiYvoCk6iIkVl1cEgUADDZDsM6hwjNdo6Vh3ou/M0qHZHSpCP1fxzt2WefFTBiHOZMFGDRYSXlnrds2SL1cFg92d4TbSxgEmExOqVVACl6oMYRf+PZjkWLCMPixGqNUWHmUxbDjvF89eAUmER3HIVFEvIxDsn8WdVZFHyBCbEdEjvOxbMojmcBk3thUeI7NmQBRi8sUG4QX2CyE2Hu3C8LJQDlUYIKDPg1vkwxACIq9iHKWYsowMT2HE+UZSGFugaAwQW7JAIXtaUgbeP3HM/ihY9z3S+//FIWN6JxSuIImCkNFsj/cX6rYJeTrVsg1wrlObDtUTBRE/CGQoiW1MLhZZFTcQpMp+PbOR5aH/Nnu8bzqxskkGdMN8w76sBkO0Dk4MtLwgrLqsuWnMgfCqFmDas5W3yn4gZg8uaSBYvI4xZRYLrFEnE6DzcA042qV2C60SpxNCcFpn9jxywweQbkraKKuzVw9srMttrw4agq7tYAeQJRf8Z0t4q8MzuNmHEWMb3jmvE9UwWmAjO+EeDSu1dgKjBd6prxPS0FpgIzvhHg0rtXYMYpMElNIkcQIZE3pWRzskDo9kQys0r4NeAUmNgSm2JL8l+TK77McaSvWQnq4b+b0F0hZj8usVSEceCjketKPqCVzMz/Segl2ZfcQkvIDSSXEAaDSvg14BSYzIgWhAmT5XFk8mjJ6bQEhgRZPeHo+h1uzcQ8MFEgCbwkaEN1obks1C2SrsmsB5gwR8ioJ9GZjku00lNghtv1/jt+MMCkRyVtCmGE0I3riy++EHYMfSdJyofSpMCMjB2tqzj6HNMCJm3XII3CIMGYVuPX3LlzC7EYGtcrr7wijBIFZmQMGigwYT7ATaTPJZzSwoULC7MEAjWsEtra9ezZU4EZGTNevEpAwASMAA8aF81EH3nkESHQstUFnHD4YPErMCNnzUCBSTSEngbznmayUKDYysLIh4bG/6BzacSMnC3lPc7iXacvlMiR1mT4b4/QZIUXOhCaSRmCOM1zpPUSiIoGPHdCXaJRLS99iLD68iclrYbm/4EAE/vAneQlHT9jV2yHDWHdY2siJsfoy5/Q2MnuKI6AaXdQPS7yGggEmJGfZeSvGBcvfyKvVr2iXQ0oMP1rSoFp14P0uLBoQIGpwAyLY7lpUJ6lrc7HbppXcnM5cia1LdoXH2vFk/BCkjKhXhLptu3k5Y+Xbi6YuVqZLsGMEelzj/6RxhYw4dfGk8AlDkVB7UjqjBdwCkw/GldgRtINw3stBWZ49RvR0RWYEVV3WC+mwAyreiM7uAIzsvoO59UUmOHUboTHVmBGWOFhvFzMA5O3lCSowzqg/PuGDRskRxYZOXKkadiwoXQCo7w8tVapUO1ViQdgUsOWF0HYiUwfqoZTlZ2EdvJkSaekvi01YmkJ4VWJC2BSBp4eFgi9HxICE/oXpf1J1ytevLhXbSk8Ra99XOL0rSyNn8iFJQ2P0v0JgUn/Gdoe8HEDie1elbgAJvQujAQjgR4VCYHJKoshBwwY4ElSreV88QBM7EeiOqwSfxETWh9tDtq0aeNVTMq84wKYRMy+fftKNycoQhCjSVKnbRml/WkuRFI7yoAS5lWJB2D6RkzYJNiMForYle0rEZPeLFQ60IgZWU929DkmzkpExFD06qC9HN2TkPr160u/TNqW0aqMLlK1atWK7N2E8GrxAEw4s3QsYwvLOwGeLY8cOWJq164tCy8tAukns27dOunv6VWJ+YjpVcMEMu94AGYgevHiOQpML1otiTkrMGPHmArM2LFlXLyVjSFzJXsrCswYsrSyS2LHmMouiR1bevJOlI/p32xKlPakO8fOpBWYCszY8eYYuhMFpgIzhtw5dm5FganAjB1vjqE7UWAqMGPIne3dyokTJ4RpkVTjnbFjx5pOnTrZG8wYqde6bds2c/LkScmeIouqVatWl5xPbR7eDs+cOVOKMXPthNenYjrZVkWKFHHcIoHPainWTQI7RZ9Ju6PdBf1JunTpYl5//XWzefNm07lzZ08TEvTlj2239N6Bx44dk0RvUtT8dbzyBSZgwunJd7R+BlCkucFY4WcKLANM0htLliwp+cUcyxfC+XPnzpUK9/yNvFWKadMThnH4G+NQOZ2PA2hD4TRizp4921SvXl0KOiO7d++WsVksoPWtX7/eVKlSxSxYsEC+e1UUmF61nI15A0xygalIDjgTii8waaREhKPhErmo3bp1M8OGDZPGS4AaVgdJ4vv37xcQTJ8+3dSoUUMqn2fJksUcPXrUVKpUycCXJJLRkato0aICTM4hb5UGQOQnA55s2bKZHDlymONnr7RVjMuauwW4QYMGyRiQDvi5QoUKpmXLlgJIGgrNmDHDtGjRwoaW3HmIAtOddgnJrAAmEYqI5U98gUmkw7mJmEuXLpW+H/T/YLvJ9pQeIPzMd9+IybGAA6YOVCx+B5iQzyEuA0yADecVEENypn8M0qxZM5P7rnKOgMkC0qhRIxmT7l5s1aVsYqpUMjaLwEMPPSSLEX/3qigwvWo5G/Nma5mcc9KaEOpUnTp1BHxEOaIOhHFAmT9/fqnwMHjwYKFS8TwJMNmGAjyAmjdv3ovA5DmP3qIFChQwOBbsD7qo8QxoLQIAi2uwrQWgdVs/6QiYzHP48OEyD8ah9ipt99jG0hAK+peXt7CWWRWYNhw8Xg8BRM2bNw/69i2gA6SE4vQZM+jJeGQABaZHDBXJafIMyYuezJkzh6SiA2+HiWz+orcC079lFZiR9Hi9lkZMmz6gwLSpKD0sPBrQiKkRMzye5aJRlSjtImMEORXlYwapQDedrsB0kzWCm4sCMzj9uepsBaarzBHUZBSYQanPXScrMN1lj2Bmo8AMRnsuO1eB6TKDBDEdBWYQynPbqQmBCRuEnixJCSlt5L/aFVLeSPNjXPJpqdNLT5iEQtI7DI8SJUok+h8ORz4rebKk8jltkUASPRlJpOCRtUQOMBlLpB0yF1IL+QyWQt4U9vaqKDC9ajk/804ITIofk8JmsTsSnjJ+/HjToUMH2xoAkDt27JBcWUBHHqyvAEiS3UluR/bt2yfHkKhgyaFDh0yGDBkkz5Wkd6fApCg3ebwkK6xZs0YYLfSbIcWP6vpWru6yZcskd9dr7dItPSkwbbul+w/0B0xoX1Ck/HW+8gUmjkwObL58+SQSkUYHiDp27CjOTjYQ1c737NkjXEq+aE3AMQAWsJIbC+ukbt26ZsuWLaIwwEryOmCFsgVdDHYJ48P+CBaYdP1atWqVXJvW6BYw6W9CVCeh3YuiwPSi1ZKYsz9gsv0kYsIaSS5ikggOeNkaEmlpFUFrCTprLV++3EBuJm+WPi++EZP/sR3etGmT0Lz4nSRytpQW7ev8+fMSuWF+ACQiJjQxaFunTHpbSezcBzJ//nxTvnx5kzp1aomYABIhqZ4IvGLFCmG3kOTOosRC40VRYHrRajaBmdIzJmx/mCC5c+cWHiXf+X3lypXSlpDnRJwcwjOODgsFYBKNzp07J8AiklrAZOsIIK3fiY7bt28XIMHFhOZ1/PhxIVvzHFizZk3z0/mrHQETYjTbaYAOrYxxGJMIDjDp9sWzJTxU5utVUWB61XI2njGDvTWcvHHjxkHzGol20MiaNm2aaEpOt7LB3pNXzldgesVSNuYZqo9LiHo8OzZo0EAiZzDCSxnemlauXFmeNROKAtO/dhWYwXidy84NFTAjeVsKTAVmJP0tKtdSYEZF7WG5qEbMsKhVB7WrAaV9+deU8jHtepAeFxYNKDAVmGFxLB00OA0oMBWYwXmQnh0WDSgwFZhhcSwdNDgNKDDjHJhkqvDWkkLA5G+SOUKaGnmk5G0iXi8SHBxEonN2IMDEdiSxY1NsyJfVzoH/ka7ndYmLlz8kaJOyRd4neZ7kU5IORiFjChL369dPWgLQCKdr165JNuHxurHdOP9AgIk9KUANpY2E+6xZs0qBaaheGzZskGZHXpeYByb5oqNGjTJ9+/a9aKtJkyZJ3uaAAQOkSjjABKR8cZy/hG+vG9qt8w8WmCTIEz3Jv4VdQn5uchxUt+oh4bxiHphnzpwxY8aMMT169BDKEisqWyASnsnfpA3d448/LtvcPn36SCK3SuQ0EAwwR44cKc2K2rZtKxGT5HvSCGNBYh6Y5GpOnDhR+idC2rWACa1p2rRpYtShQ4dKxyiNlJF3aafA5H3A1q1bTbp06SQy5syZUyYN4wU2TNmyZSN/E2G4YswDE50RDXnGBKT0dCRiYmCSqgGrF9OfwuALURnSKTChmbFltXp2Wi96sDHbWn+J8lG5sSAvGhfADFJHenoYNeAUmGGciquGVmC6yhzxNxkFpn+bKzDjDwuuumMFpgLTVQ4ZjsnwDM2zl5fkyJnUtkqLkDgQT0JhNK9V+JPO3ot3nb5QIkdakyExKT6e7HfJvSofM3ZM78UXkpKBpcBM7IQKTAVmNDWgwExC+wrMaLplaK+tETO0+ozqaArMqKo/pBdXYIZUndEdTIEZXf2H8uoKzFBqM8pjJQQmWTKkrdHTw58E2rvEapFAXjFFni3hrfCuXbuk2jpFmansDq2O9Dlf2blzpzlw4ICUtHRaJY/izmvXrhVqF2mWpOcxDtlctEQg84ei0NmzZ5c8Wq+KAtOrlvMzb38tEkjiJ4Utffr0ic7wBeaJEyek0Q9V06luTvsBgFWoUCFpe8D5RYoUSdRUCIDRUgFQcjxFouvXry9jAED+Tlcw2iXQZIif6WHCXDnOKTCpUVutWrWLec0LFy68BJgsRFSIz5gxo6ctq8D0tPkunXxSTYXoFQI4E4ovMIcNGybRj34fgLRdu3ZmwoQJpnXr1pIcvm7dOtOkSRMpBE3EpFUCx9OWj/4gMHdoq7dkyZJEvUuOHDli8ubNK4CkudD3338vhaQB0Z9XZLL1OabVu4RWDnT7soSFgM/P+PyW1n7kPjPfPHnyCP/Wq6LA9KrlbERMAMY2Nm3atCluZektQtMgKgHMmjXL1KtXz8BbZbsIsNkywnUMpKkQAATY9LUE2Gx3rbZ5pWs0cwRM2vCVKlXKZMqUSfqT0DnMdyurETN6Dq0flyShe6cvf2ggC1Bo+MqzoNXOjgjE9hWQNmzYULp+EeGIQKzkbI/Z9tIZjGc5njWJgvzOFpjuYrB3iJJsPRs1amQmT54s0ZfnQyIrQnQteN/DjoDJeYCTeTAukbpw4cJSKoZtNffB7iDhc2303DWwK2vEDExvrjzLKTCTugkiGttVIlLFihWDulciI70ySTHz16vS6TNmUJPx0MkKTA8ZK6WphgqYKV0nlP9XYPrXpgIzlF4W5bEUmFE2QAgvr8AMoTKjPZSyS6JtgdBdX9klodOljhSABpSP6V9pSpQOwJn0lNBpQIGpwAydN+lIIdOAAlOBGTJn0oFCpwEFpgIzdN6kI4VMAwpMBWbInMkrA5GSR8ZOUjJ27FipRG9XaDdBKwJYK9OnTzdlypSRgtm+Yn1kw/9btGiRqA8MGUL9+/eX9D76xDgFJm0t6FfCG+ghQ4ZI4jyFux999FFhmHTv3l2yjsj9zZw5s91bc91x+vLHdSYJ3YRIMCcpnVS5NGnSJBo4UGDSmAlgUTzbV0gknzdvnqHKPbJ3715JKidFzxJSAMm9hZpFHq5TYDIO6Xek/rEwMA6slWLFikkq3uLFi6X9xdy5c03dunVDp8wIj6TAjLDCI3k5gElaHe0FAWdC8QUmUQdHXr16tbAz2rdvL82YevXqJactWrRI+I379++XiEmiO/QrclOJTEePHpVk8vnz58vfASiUMRLoDx48KPmxU6dONaVLlzYDBw4UelnTpk0DAiagg2ECJ5N8XwDKvBmbHjXkyXINL7fjU2BGEikRvhbARIhYJKQnB8w5c+ZILiuRlTaFVatWlaZL8CjhVhLpihcvbg4fPiytDK2IuXTpUgHdxo0bhQbG75zLeEQxIiZjAk6+E2WJmERyQPvrhetsJbFbc+f6nAvVjHn17NnTQAljcaApFBGTpHbmyMLgVVFgetVyNubN1jK5Rkl0y8LR6RWKkxMViWI4NQyOXLlyCbtkxIgR8qzKcxzHk5VCZAQAHGMBk63plClTTMGCBYWnSQQbPXq0NGwaN26c6dixowCUnqT0tCQaH/otlSNg9u7dW9gtLDTlypWTnphZsmSRKA/weYYlYs+YMcM0btzYhpbceYgC0512ccWs2HrSR9RftHUyQV7GEH1btmyZ6LRAnjGdXNurxyowvWq5MM6bujqAiajGM2SwQvRkqwnPM6EoMP1rV4EZrNfp+UFpQIGpwAzKgfTk8GhAgRkevUZrVG2R4EfzsczHjJaj6XWdaUCBqcB05jF6dEQ0oMBUYEbE0fQizjSgwFRgOvMYPToiGlBgKjAj4mh6EWcasA1MWAikmJFuxmdzVAWnYje5nBQHJs+S3Es+Y+Pn5NgYzqYY+aP15U/kda5XvFQD/wEm5mZOXegjagAAAABJRU5ErkJggg=="}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669627786969,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "7ac": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670341452233,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                d0d: {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAACMCAYAAABoBdWHAAAAAXNSR0IArs4c6QAAEs5JREFUeF7tndtzVEUXxRsBUVQCCChGICCGOwJRkEsMQcAXC7S4PPrX+eCLPFBF8QBYEYyAiHITSEAIKCCgXBVBQL767a86NegEmU7DdHdWV01BZk6f6bO61+xz9tp796AbN248ePbZZ52aEBAC6SAw6NatWw+ef/75dEakkQgBIeBETC0CIZAgAn0S8+7du27o0KHu/v37NuzBgwc/1vD//PNPV6sF/uuvv9yQIUPcM888427dumX9Bw0a9Fjfp4OEQIkI9EnMM2fOGDGHDRtmJBk9evRjXf+DBw+qkurcuXOusbHRzlH5f/7+7bff3Isvvmjf9eOPP7pJkyYZUdWEwEBFoE9iXrhwwd27d8/9/fffRtDr1687SDdixAh3584ds2pYuqamJnfq1Ck3atQod/PmTSMln9OHxvGXL182oo0fP9769fT0uHHjxrmrV6+6P/74w0hPP6wtfflOGk4pSKomBAYaAo8k5iuvvOK6urqMXNxmjhw50t2+fduIRnv99dfd8OHD3enTp92YMWOMaBwH+TiG47GE58+ft+MgI2Tj75deesldu3bNbpU5BiJDbIjJDwLn5lhP8IE2MbregY1An8TEakEyb738LSqWjf/z8s+dWMAJEybY8f44/y/9K58X/3lO4PfnrDyO/hyrZ82BvUAH6tVH8cpi6bCAakJACMRBIAox4wxFZxECQsAjIGJqLQiBBBEQMWucFJ598STjsFITAk8KARGzRmRxZt24ccM8zmpC4EkhIGLWiKyIWSNgOjwIgUfKJV988YVbvny5BQegLR44cMA0TSJ00CzRINEb0Tu5xbty5Yp7+eWXgwbyX504N7om1uq1115zv/zyi3mCX3jhhYe6Mq7jx4/bOJqbm+0zgiUIbojRRMwYKOoc/4VAn8SECIcOHTJ9kvA8WktLiwUc7Nq1y02ZMsV98MEH7rPPPnOzZs0yvbOzs9OtWrXKooRaW1ujapBIMr/++qvr7u62IAeIRyDDnDlz3KVLl9yRI0fcihUrLNyPsXz77bdu8uTJjpjfTZs2uU8++cRC/zimP03E7A966vu4CPRJzBMnTphFYtETjYPYj3UiyodAc6J43nzzTbd//3736quvuqNHj1qUDpZp2rRp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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670577016133,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                a82: {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAACMCAYAAABoBdWHAAAAAXNSR0IArs4c6QAAEClJREFUeF7tnVmMVEUYRv9hUVZRRHYRREF2gRB2iApBiBuoiaJEMGBCiO/GN1/kgVcCJsATCShbwBgVFFkERAQVV1Q2EZWRYUcFBMecSmrSDANT3d5bfXvmq4TATNetqnuqTtVf1c3tsvLy8soGDRqYkgiIQHYIlFVUVFTefvvt2WmRWiICImASU4NABDJIQGJmsFPUJBGQmBoDIpBBAhIzg52iJomAxNQYEIEMEpCYGewUNSk9AsePH7f9+/e7P3///bfde++9dvfdd1unTp2sUaNG6VWcZ8kSM09gyh6HwL///mtI1Lx5c2vWrJkl8V77m2++adu3b7fWrVvboEGDXLl79+61w4cPW69evezFF1+0pk2bxrnBWmqpk2JWVlbaxYsX3a03adIkE6CZnZmRGzdufE17Ll++bP/884/ddNNN1rBhw0y0t9iNOHPmjM2ePdsGDBhgL730kt12221XNWnt2rW2YsUKGzlypM2YMcNJdr0E29dee83gPG7cOHeNF/DKlSv2zTff2HvvvWfffvutLVq0KBNjJhExT5486QbWrbfeajfffLPjgxznz5+3S5cuWewPMFDnvn37DOgDBw4s9hhzLD7//HPr0KGDdezY8Zr2HDt2zH7++Wfr0aPHNQOw6I0vUgMYO3PnznXCTZw40a1wPsFr+fLlVlFR4X7/2GOP1Tjh+XG4e/du++CDD+zVV191RRw9etRJetddd1lZWVlVufPmzXOh7aOPPlr0CTIRMb/66is7e/asi9O7dOnibgopGGznzp2z/v37XwUg7b4mDGLGRQjClkISHff777+7EIr7qp64vz/++MPdZ+fOnW9YhcTMvwfgikCMrV27dtkTTzxhgwcPtt9++83eeust17dPPvmkC3WZ+HMFy62Ncbls2TLr3bu3jRkzxr309ttv286dO+2RRx6xESNGVGU/dOiQLVy40F5++WW788478290glckIubXX39tf/31lxOye/fubtYvpphJ8PGrLvfUp0+fa4okQjhw4ICLFPr16ycxk4BeQxlsSdavX28PPvigtWjRwkVgGzdudEK1atWq1lrZPxL2PvXUU1UT6Jo1a4zJ+7vvvrOuXbu6FZdoj9+xag4bNszGjh1ba9lp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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669830081227,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "06a": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670261062435,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                b60: {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670417728540,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                a41: {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670493091089,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "22a": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669711416727,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                c45: {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAACMCAYAAABoBdWHAAAAAXNSR0IArs4c6QAAGoNJREFUeF7tnWlwVcW2x9c5OSGGEAKIBBVRQUAQFTCAODAoiCiPSX2KPquo0i9afrG8HyyH4nLrPX3ea4m3SpFCkSoFB1RUEPExOKAyiCAKYXKIChIjCEISBwycV7/2Lm4uBSa5pjs7e6+uSiVnSO/ea/V/d/d//Xt1KpvNZsWKWcAs8EctcEUqlVr0RyvR/0/5Bia4T6VScvDgQcnJyWmsdls9ZoFGtYD2U62U13v27BF+FxUVSW5ubl3X8wvMvXv3SmFhoezbt09at27tAEXJZDLu58CBA1JTUyP5+fmu0YcOHXLv8Xr37t3Srl07+fnnnyWdTrub+emnn9zv77//XoqLi93/1OMm6zKCfW4WaDQL0Nf3798vbdu2lby8PNc/eb1161b58ccfpW/fvg4TDDC/U/wCs7S0VI477jgHTJ4UWngPYJWXl0ubNm0c8Hjv119/dUAF0BUVFXLuuedKVVWVe++XX35xwC4oKJDPPvtMTjjhBPe/xx9/fKMZ1SoyC/xRC/zwww+uvwNM+nSLFi1k6dKlcv7558uuXbtcvwes/DDobN++3X23ffv2tS/tF5ibNm1yF9yxY4cDVcuWLeXEE090wDvppJPk66+/do3nb26GERAA8sNNDBgwQKqrq90IWVlZeXjEZeSkLuo++eST/6gt7f/NAo1mAaas9O+ysjI588wzpVOnTvLVV1+5WSADDINQhw4d3G9eA2Q+Y8CpVfwCk2kpTwZ+Uxi+ea1rREZFpqs8VWgkRefnvAa0TG/5Pu/rD9/jxvhhSmzFLBAVC9BX6bv0efqvLrV0GUcfrkef9QvMqBjL2mEWaGYWMGA2M4dZc5NhAQNmMvxsd9nMLBAOmMytmXsfLbxxZNynKY1IG4mR1kFnN2UT7drxt4BfYMLGQtAQ8vj888/d79NPP13OOeccx7KuXbtWBg4cKOvWrXMM64cffuheQyGPHDmy3uaHdiZmRJzo3XfflVNPPVW2bNkigwYNcuztkiVLHHHUu3dvRyYRltm5c6cMGzbM/Q90Nu3q0aOHrFixQoYMGeKYMitmgSaygF9gApgnnnjChUKgkLt16+ZCIMRyAASiA0Ih3333nfvOF1984YKvXbt2laFDh9bbJgAe2pnYJjQ1dTDqER966qmnpEuXLvLSSy+5WNLgwYMdOLl+x44d3QPi0Ucfle7du8u4ceNcmIa/+Q2zRvyVeqyYBQJawC8wuRGmhiqh1RCH3iDTRUBCOVoopCGG0OmwXkunoho7gq7mvaNJ+fhO7c/4u7bs16a1DfGEfbcRLOAPmCqxa4RGRqIKHioG0Ei4IpaNOGIg8AdM1DkoeOJSWMMSMDZwxsWj0bkPZnMo3Fg6tWrVCoL0ikwm03x2lzSlKY2tbUrrx/vaABPCE7L0rLPOgnvxC0yYUVT1Y8eOPWxZRlKmhYxATVloW+fOnWXz5s1Op4g0EDIKhvi8885z7YO9hZhi5Oe7FkZpSo/F99oA88svv5RvvvlGzj77bP/AhIndsGGDE67TwenwbOeC5TxCtBvc6rSNBwS/NbTCqMiTi7AJ01bm/QCXaUa/fv0MmMG9lIwLBgcmZuVJ8MYbb8jo0aNlwYIFbjfIiBEjIhEn1AU3c3tAymtGRf6m8D6vlfG1ETMZQAl9l00CzNA36et6tsb0ZVmrNygw45b+R7eqGStrQGpsCwQFJhdT8UBj30hT1KdpTAyYTWH9eF8TrKA0Q73Gxur8/Hx/rCwXQ5K3atUqRwGz1kS3yvsQK7CcCNr1c2R1ZDLgdZ8+fWTx4sUyZswYbx5Bu8v1IHeQ3fFDDIl1pKqDIH00vnTKKae49howvbkksRWDCSIA2u/S6bRfYEKeTJs2zaVSgJkFCIRLEIjTGDSp06dPlwkTJghpSEhUhJAdYK5evdoRRr4K7DBAgy0m9UNJSYkb4Xl4QP4QIiGzAgAGnHxuwPTljWTXGxyYn376qcyZM0euvfZaWb9+vQugMiVkxBw/frxjaBGZjxo1ysVwevXqJbNnz3ZA/fbbb13OFJ9Fp9qM7ICO1/wQw1RJof7WjGc2Yvr0SDLrDg5MW2Mms6PZXTfMAkGBqaNPw5oY3W9rEiUbMaPro+basqDAbK5GOla7LY4ZN49G536CAxOm6YMPPnCsLDlkIVbo4JAq0MKwUJA8ZDSAlWXjMq9hbD/++GO5/PLLvVkPlpjrIccjcTQ6WWSCkFC0lzUnBBBZtCGx+K4pf7y5I9EVBwcmIJw6dapL9UHGdFhZEuJCpBCeQKdKo0jrQdgCLS2pQfj94IMPuh9fBXIJEgpCivy2XJO28Lpnz57usm+++aZ7gMDK8rkB05c3kl1vcGBu27bNhUsmTZokH330kRs1ye1DmITQCOu2l19+2cUrGcF4b8aMGXLDDTe41B+AwmfRrAaM1hrCYaRU3SxpT4htKlNrwPTpjeTWHRyYekiQZlrntaYX0U6u2dr5jPf0ddRIFltjJhc4vu88ODDjpJc1razv7pnc+oMC07Syye1oducNs0BwYMLKovhhTcmRe7qO41AVUlgydSVjADpU1DeQRLxGAQQ7S35XXwWSh3SXHOkHKwsjy/pSz+5ktIcZPu2005yOUY9Pi9oU25d9rN5wFmgSYD788MMunywkCiEHWFkAin6WvzUfLGELEjADFNIrwMjec8893qwDMGkTuWwhf0gGjYHIuED+WQAIETV8+HDHyvbv39+0st68keyKgwMTkD355JOOdYWhZWsLYRJGRg6lZSRatGiRAypAIOHya6+95rKxP/bYY3Lfffd59ZgelMtozYgJwQMTS1iHoiwyhtMjum3E9OqSRFYeHJgE6Al7MDLR+ZXZZLqoybgYrZSpBaC8Jr7IKFX7FGpfHjtWomiuV/tMFduP6csDVm9wYJqI3TqdWaBuCwQFZt3NaV7fsDhm8/JXc2ptcGByQfZkon1lYzLTVxUSkMeVKSxrT4gg1aOyMZnPOByIlJG+iq53uQ7pNGGIaR/TbAQRTF019yyf8Z4pf3x5I9n1NgkwH3nkERcuodMTcoCFZS0JQ4tWFoAATIiiyy67zB2JhzSP/7v//vu9eUxZ2dLSUncNHh60ixAJ1weECxcudIyyssoGTG/uSHTFwYFJyo5Zs2bJJZdc4hhOdmrAfpJmBFYWQmj58uWH45tkLlizZo37jP8lnumzMEpDTjFNZZRmlCS1ie4u4cHBZ4yoPFgMmD69kdy6gwMTVpZzLwngw7aqDpZAPkwtoQemuHR4ppBsvSInECDQpMu+3aVSO70OIRTaokfxqaxQp+AWLvHtkeTVHxyYcTKxkT9x8ma07iUoME0rGy3nW2uia4HgwNRDeiB6IH1gNnXrF9NWpqusPVnD6TpPX6OthTTyVWgP612y8yFkUOaVqStTaaasiBxor64zLX2lL28ku97gwGS9NnPmTAcwQIhonDUnyh4IIMignTt3OoaWjdJDhw6Vt99+22ll+b97773Xm8c41auwsNCJ7El5QipN2qgbtgHqO++849oGQAcMGGBaWW/eSHbFwYHJaDR37lzHcqJB1Xw/jFCa52fjxo0OqICYcMmyZctk8ODBLtEy7KzPAiusx/HRBsgqRmwE7QCTfEWESiCtAK6NmD69kdy6gwOTkYaOz1SVkRLw0bn5gamlkG9H3wOwen4mzKjvwrQV0GmGBa7H1JXXFGWR+R6jqQHTt0eSWX9wYJpWNpkdze66YRYICsyGNS3637ZwSfR91FxbGByYTAGR3DGVZVrL9FRZWQgXmE8+R2xA4yBjOOSHVJe8D/Hiq+j2MqbSur2MdSUA1GPoIYhoC23jPVP++PJGsusNDkwu+Mwzz0iXLl2c5enkMLGEIyBT+BuCCA0t2lUyB0AGQfo8/vjjctttt3nzGNcFbCtWrHAMMQ8FFa+TYpM1JXpdkk4DYjIYGDC9uSPRFQcHJqPfiy++6ATiaFIZIenwAALwQQyhiYUIYoREU0viZxhbUovcfffdXh2G/I82qg5W023yAIHoIfk0J47B1pKXyIDp1R2JrTw4MJm+wrIiECe/D6wsoxJTWmKaAJWREqDyNyMVwgI+I2yhI60vjzHV5oHBtJq28RoQqo5Xj+fTTAYGTF+eSHa9wYEZJ3Mb+RMnb0brXoIC07Sy0XK+tSa6FggOTC6oezCZIjIV1GmhJuPic1Q3rO/YqIwQASIGLStTYF9Fp6lMsZm6akIwprS0g6JMMn/bidK+PGH1BgcmnZxDgzjNi4tD8tDZWWfCysJ2spaEleX0LU7UgpVFEkfay1tvvdWb15SVheAhqTMhHQBJKpQ+ffo4oC5YsMCRPmRYIOWmKX+8uSPRFQcHJkzr/Pnz3cinUjc9OQuhOvpZvgP5w28yryMiByiES26//XavDoP44YEAICGcGM3Xrl3rGGNG91dffVXOOOMMl2cWcBowvbojsZUHBybTVBUY8BsCRUMTxA5hYgmXAExGKEZORjLCFew68c3K8pCorKx0U2fNmMBUWqe2uhNGp9kGzMRix+uNBwemaWW9+tMqj4kFggIzJjY7fBsWLombR6NzP8GByZoNdY3ut9REVvzWhFes8zSzAb95zff1aAVf5oOYYh3JVFbPTmE6y1YvzWDAVJzPGPlprwkMfHkj2fUGByYX5JAg1oqEJ2qzshzjDvhIuIxYHWkc+VzJ69qzZ095/vnn5aabbvLmMWVlFy9e7FhgUp0AQsgnNkcDxHnz5jl5oJ72ZcD05o5EVxwcmJAnr7/+uiNWGIUgVRiRKIQkYEQBJ6QKwOQYPnZ7AOBnn33Wq4hd45SQT4RKIJwoJJ5G2wswaR+jPg8VwGrATDR+vN18cGAyFUQrCyDp5ExhASgNIbZJ4XxKtKpMYwlLoJ0FmHyfUIXPQjt4IBAKAXQUrg9jzMMEUQSF71nCZ5+eSHbdwYEZJ3Mb+RMnb0brXoIC07Sy0XK+tSa6FmgSYOpIA7Opxw7ovkxMVftzzSDAb90i5suc2h7Wj7pBmmvxPmteCoyyJuaiTSYw8OWNZNcbHJiACy0qDCykDwofFY+j8uFv1nQQL2yaZlMyR9+Rh5b8siNHjvTmMd0gzYle5IzVdkH+XHjhhW5N+dBDD8mll17q2g1za8D05o5EVxwcmJA/hCMgUQhHkFuHUYhRiTAEsjsaBWjRzQICmFy0tQCaPLM+CyJ6WFk9q5O2EEZBKwsbO3v2bOnatasjqmBqDZg+vZHcuoMDk61bAI7Rh8wEejgsIynhBwpxTDIXABLinYygAAVW1rdWlmk0QNT8QxiIB4hObWkDjDHf03QjdtpXcgHk686DA9O0sr5cafXGyQJBgYnh9GzJOBgR45nAIA6ejN49BAemglPZ2Nom0SlhbfDWZm0104FvMyo7q9fR4xCUodV2GjB9eyK59QcHJhfkYB7WcLCerNcggpC7obaB9EGbykiE0gaN7OrVq51cj3yvpLP0VdgfylqS9JpIAVkL67GAI0aMcKEdTvui7Xral42YvryR7HqDAxMd7NKlS12nJzwCgQLJAzgBH4wonX3r1q0ugwBAhI0dNGiQTJ061XteWXaWEB6hbTDIGIhTxmCHaTsMMg8UfnNimQEz2QDydffBgUnogx8NQ6gmFhAQkmAaCTBgbdnZQUoR4ouwtO+9955LNeKzwA7zUCBuysODgra3R48ebvTctGmTy/UDK6uH2xor69Mjyaw7ODDjZGbTysbJm9G6l6DAZDSMW7hEN3dHy63WmuZugaDANBF7c+8u1v5QFggOTKZ/5GmF9Kl9cjMkCnsuWeOxMVqF4uyDhBBCW7thwwbp16+fN9uw9qWQKeHKK690+W11zXvVVVc55piTykpKShwry0lkJsnz5o5EVxwcmLCZiNHRxJI4GYACCFhZyB/keICS0AgC9gsuuMCBFSKIRNHXXXedV4fBysLCskGbNtHedevWyejRox0wyaKAoB2GlvYaML26I7GVBwcmO0bo/HRsNKmqQ+VYArKu0yBYWZJvAUa0sZqAmf+FpfVZGMU/+eQTIfk0bDCFEZzXjOqAlCwKjPyEcwyYPr2R3LqDAzNu5I8BM7ng8XnnQYEZJ50sTmHUNFbWZ/dMbt1BgRk3M1scM24ejc79BAcmU9nt27e7/ZWQK0wFaQSqGjLnMaqypqNAAqGf1fSVsKS6Z9OHCZEG0pZZs2Y5kglVEiPi3LlzZcKECa49nDgG6cNa9OKLLzZJng9HWJ2uH2oCcsyRTqevyGQyixrLNKnsEfNXOjSsLEJ1MgEgtYP4Ua0soRSSPQMKmFvCI4jYEY4jLr/jjjsaq21HrQdpIOQTjDFtoABYzYH71ltvuXM6SStieWW9uiLRlQcHJp2aGCBgZOTULAAwrxdddJFbtxGuQCCuwAAofA/QoFP1WXhArFy5UgYOHOhYYZ4r7CghZgkru3z5csfKImTnwWIidp/eSG7dwYEZJ1PbGjNO3ozWvQQFJuvLODGzerCQ7S6JVqeOQ2uCAtO0snHoMnYPISwQHJhckH2O7GVkPccaTVOG6FF3rD+VleVkZxQ4Kt2DzfVVkN9BTsG83njjjW6NC1uMRpfUmoyQfAYbCyHE5m0TGPjyRrLrDQ5MKGA2PLMZmbQhAA2gQqbAwG7evNkxogCWtJWQMBzD16tXL5fB4M477/TqMQgmyCfyxhIq4aHBbySCSkzxHpJC2mvA9OqOxFYeHJiwslyUE71gZdk1QscHDKQRAbi8DxD1gFhGMkavV155RcaPH+/VWVxryZIlMnz4cHfN2gnAGDFhjymM9uh2DZhe3ZHYyoMD07Syie1rduMNsEBQYDL6xImVxXimlW1Ab7Ov1tsCQYFZ71Y1ky9aHLOZOKoZNrNJgKm7Mo5lLxqlpznzHYgW1psh4oWQPzNnzpSbb7758BrzhRdekDFjxrg2oaNlozTqpf79+5vypxl2+ubQ5ODAZI2JrI00kIjB27Zt68IhkD6wnGxShhCCiSV8Qj5XpotskuYIvAceeMCrXQEmxFTtw4u4NlpdHgzbtm1z03GA2bdvXwOmV28kt/LgwKTjExtcv369y6mD7pTXpaWlLn0HbCedHzDAzJLflYwHABdAIHr3WQAcKUzGjRt3eLeL5rUFmDDGFNPK+vSC1R0cmHEyua0x4+TNaN1LUGCaVjZazrfWRNcCQYFpWtnodgRrWbQs0CTArIuVZWRl3XlkYV2HNM5nQQMLC3vNNdcc3o+pGQ0gofhbDxjiECRT/vj0RnLrDg5MSBxO70ITCwtL+kqOv6MhsLSwsiR5hrkdPHiwO8xn1apVjoghs4Fv8gdyirSa5JVVMQQJoCdOnOhYYrIo0G5IItJtGjCTCx6fdx4cmLCtjIZr1651InVYV14THhk7dqxjO9HNcsJW586dXaxw48aNh3ejwOL6LAAO8NEWHhoUkjzzmhETkPLAoJ0kpDZg+vRGcusODkzTyia3s9md198CQYFpWtn6O8a+mWwLBAVm3Extccy4eTQ699MkwKyLla29BxJTsUcSNjaEVhZd7vz58502FjUSZBVZ+jjti/XkwoULXTYD2sQa07LkRaczx6klwYFJ6g5Y2S1btjhWk83IED2sPdGewsrCiJJ7dtiwYS53K4QMInZ0snfddZdX+8PKqgSPdgFA2GBNaUK7eUCYVtarGxJfeXBg0vHp2IATAKCH5fWaNWvk6quvdh2eZNCkGyHFCKlFNOfPjBkz5JZbbvHqNOKYc+bMcSwsWl4YYwT3nJcJS4vAnVESwJIaxUZMr+5IbOXBgRknS9saM07ejNa9BAWmsbLRcr61JroWCApM08pGtyNYy6JlgSYB5pEZCuoyCYSRngqG+sZnQdFDek3OUeHYeaar7MGEiGI9uWzZMsfKsm+UFJem/PHpjeTWHRyYkCYQPeSVpYMTBkGmByvLawiWadOmOb0s4GjTpo2TwkHCAJghQ4Z49VZtVhYNL0DlKEA0urTx/fffl+LiYssr69ULVnlwYO7bt+/wCVqEIzjVC9Bx1B6sLJ1++vTpLmQCIAYMGOCyngNoAEpGdp+FbAmzZ8922RTKy8vdKIngftSoUU5IP2/ePCkpKXHA5EFiI6ZPbyS37uDANK1scjub3Xn9LRAUmJbBoP6OsW8m2wJBgRk3Ux9rQ3fc7tPuJ7wFCC3Sv1SGylHvqVTK31Hv4W/RrmgWiIUFDJixcKPdRNwsYMCMm0ftfmJhAQNmLNxoNxE3Cxgw4+ZRu59YWMCAGQs32k3EzQKNDsz/VAtVV1f/V15e3n/8O3rX3bt3bysoKOh+tHyzWn8qlfqwRYsWf4ubR+x+zAIisjyVSv12nHkjlFTtOioqKv5WVFT0J/KzNrSUlZWt7NChw6A60ovMLygoGNvQuu37ZoGkWaBRgVlcXDyoDgMaMJPWwyJwv/v37z8+Jyen/B9N+UtBQcF/R6BZv9uEYwLzlW0iZ7QV+aVGpKJapGWuSPd2Is+UitxWIvLSFpF0SmTiWb/Vz4hpwIy6u5PZvqqqquKCggKdZv45lUpNmThx4rpsNjs1k8msrKmpuUFE+h48ePDeTCbTu6qq6tXKysoDHTt27JROp/vX1NTsFZF8EdmTk5NzdSqV+lhE1tfU1Jw0d+7c131Y9ZjAfONzkR9+FulUKLK6XOTyLiK/HhJ5bpPI/w4T+WyvyJbdIqO7GTB9OMbqbDwLVFZWdsjPz6+gxmw2++fc3Nwp119//d+rqqruyc/P/x8R2ZxOp3tns9lVubm5//f000/vmjRpUl5FRUW2devWfVOpVLd0Ot3q0KFDfQ4cOPBAXl7eOdls9ivA+txzz61ovJb+s6ZjAnPXjyLtW4rwu+qASH5GpF2+yIodIsNO/e29ygMiJ7YyYPpwjNXZeBbIZrMtq6ur//KPGhe3atVqcV21T548OTNlypSDkydPTk2ZMuVQre+DmayIKHb4u9HLkcD8a5s2bf7UokWLf3m/PlctKyt7r7i4+CJbY9bHWvYds8DvW+BfAFheXn5a+/btT85kMg0G5o4dO/YVFRUV/d7lUqnUnsLCwk3mFLOAWaABwDRjmQXMAtGwwP8D6PpMqleuN2kAAAAASUVORK5CYII="}',
                    isDirectory: false,
                    owners: ["user1"],
                    readers: ["user1", "ROLE_USER"],
                    timestamp: 1669643833941,
                    lastEditor: "user1",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "50a": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670255158611,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "5c4": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["user1"],
                    readers: ["user1"],
                    timestamp: 1669829582623,
                    lastEditor: "user1",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "94a": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAACMCAYAAABoBdWHAAAAAXNSR0IArs4c6QAABldJREFUeF7t3U1vVHUUwOFzpzNtoQmCQmJZiCRA3BjjSwy6UBbE6HfQuMa4c2NcunHnF/CTuCIkulGQRHxpwYXhbaElpQ2J0Je5pk1sLDX29JI5mcDThFXP/57pM/PL0NsSmldef6MNHwQIjJVAI8yxej48GAKbAtvC/Pijc/HnwkLMzc1F0zQxGAzi4qVLcXT2aNx/cD/W14cxXF+PqampWFtfi+ePHYsfr/wU/X4/Tp08EbOzs3Hnzp249MNlvAQIPILAtjA//OD9uH79Rhw6dDBu3LwZS8vLce3ab/Haqy/H3PzVePP06fjl17mYmZmJxbuLcerkyZibn4/V1dU48/Zb0UQT331/MW7dvv0ID8lRAgRSf5V96sCBzUh9ECBQI5AKs+ah2EKAwD8CwvRaIDCGAsIcwyfFQyIgTK8BAmMoIMwxfFI8JAJbYW78bHJ6eopIUmBpyV3qJJWxDgLeMTugOUJg1ALCHLWw6xPoICDMDmiOEBi1gDBHLez6BDoIbIXZ6/ViYqLX4RJP5pHV1bUn8wv3VZcICLMjszA7wjmWEhBmimnnkDA7wjmWEhBmikmYHZkc6yiwFebGP4ze+OMjJzAcDnODpgh0EHBXtgOaIwRGLSDMUQu7PoEOAsLsgOYIgVELCHPUwq5PoIOAu7Id0DaO+HFJRzjHUgLCTDHtHBJmRzjHUgLCTDEJsyOTYx0FhNkRzjtmRzjHUgLbbv74/YKU2eZQ6398yWOZ3LOAu7J7JnOAwOgFhDl6YxsI7FlAmHsmc4DA6AW2/RL76Nc9Phta32Q+Pk/mGH4l7sp2fFLcle0I51hKQJgppp1DwuwI51hKQJgpJmF2ZHKso4AwO8J5x+wI51hKwF3ZFJMhArUCwqz1to1ASkCYKSZDBGoFhFnrbRuBlIAwU0yGCNQKCLPW2zYCKQFhppgMEagVEGatt20EUgLCTDEZIlArIMxab9sIpASEmWIyRKBWQJi13rYRSAkIM8VkiECtgDBrvW0jkBIQZorJEIFaAWHWettGICUgzBSTIQK1AsKs9baNQEpAmCkmQwRqBYRZ620bgZSAMFNMhgjUCgiz1ts2AikBYaaYDBGoFRBmrbdtBFICwkwxGSJQKyDMWm/bCKQEhJliMkSgVkCYtd62EUgJCDPFZIhArYAwa71tI5ASEGaKyRCBWgFh1nrbRiAlIMwUkyECtQLCrPW2jUBKQJgpJkMEagWEWettG4GUgDBTTIYI1AoIs9bbNgIpAWGmmAwRqBUQZq23bQRSAsJMMRkiUCsgzFpv2wikBISZYjJEoFZAmLXethFICQgzxWSIQK2AMGu9bSOQEhBmiskQgVoBYdZ620YgJSDMFJMhArUCwqz1to1ASkCYKSZDBGoFhFnrbRuBlIAwU0yGCNQKCLPW2zYCKQFhppgMEagVEGatt20EUgLCTDEZIlArIMxab9sIpASEmWIyRKBWQJi13rYRSAkIM8VkiECtgDBrvW0jkBIQZorJEIFaAWHWettGICUgzBSTIQK1AsKs9baNQEpAmCkmQwRqBYRZ620bgZSAMFNMhgjUCgiz1ts2AikBYaaYDBGoFRBmrbdtBFICwkwxGSJQKyDMWm/bCKQEhJliMkSgVkCYtd62EUgJCDPFZIhArYAwa71tI5ASEGaKyRCBWgFh1nrbRiAlIMwUkyECtQLCrPW2jUBKQJgpJkMEagWEWettG4GUgDBTTIYI1AoIs9bbNgIpAWGmmAwRqBUQZq23bQRSAsJMMRkiUCsgzFpv2wikBISZYjJEoFZAmLXethFICQgzxWSIQK2AMGu9bSOQEhBmiskQgVoBYdZ620YgJbAR5tWNyabpHWrb4eHdTjURK9E0g40j/zG72Lbtwm7X8HkCBP5fYCuuM2ff/XR5eemL3cCmJid/nhj0j7fD4f6HZ5uIL7+5cP6T3a7h8wQI7DHMdmI61vc9E/17t7afbJqIto3NMCcmjrfRCtOri8CIBHa8Y648/UK0vUGsHnkx1meejWblXuz//evoPViO3oNFYY7oiXBZAv8W2BHm+r7D0az9FStHXoq1gydi8o/LMblwJdr+dDRr94Xp9UOgQGArzLPvvHdu8e7dz3bbOZgczPf7/eeibfc9PNtGfPXthfOf73YNnydAIPk9JigCBMZH4G+tlqs3FadZHQAAAABJRU5ErkJggg=="}',
                    isDirectory: false,
                    owners: ["user1"],
                    readers: ["user1"],
                    timestamp: 1670417152561,
                    lastEditor: "user1",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "98e": {
                  entry: {
                    content:
                      '{"thumbnail":"data:image/png;base64,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"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669804373613,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                fe0: {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin", "ROLE_USER"],
                    timestamp: 1670932365861,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    c5b: {
                      entry: {
                        content:
                          '{"thumbnail":"data:image/png;base64,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"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670953773982,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                    "00c": {
                      entry: {
                        content:
                          '{"thumbnail":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAACMCAYAAABoBdWHAAAAAXNSR0IArs4c6QAAIABJREFUeF7tnXmQVNUVh083YBSTICCyCQpGRFZBiAaJgBiVTYdVgmhAAliWmmj+ICYVK1UmVSbRuMREKBYBURPZgsoisu8gE1wggQiyBxgRcUS2QHfqO+2dNM3MMPPoN31n+twqCuh+7777zrnfPefe1+93IwcOHIhHIhGxYhYwC/hjgUheXl68Vq1a/rTIWmIWMAuIgWmdwCzgoQUMTA+dYk0yCxiY1gfMAh5awMD00CnWJLOAgWl9wCzgoQUMTA+dYk0yCxiY1gfMAh5awMD00CnWJLNAxsDctm2brFu3Tjp37ix16tSR1F8f7dixQ95++225//77pWrVqlnjqZMnT8obb7whbdq0kebNm2fNfduNnmmBtIA5YcIEqVatmtx1111SuXJlvQJg8fnw4cOlQYMG+tmJEyfkz3/+s3a4yy+/XBYsWCC9e/fW71PB3Lx5s0yaNEl++ctfyje/+c2s8Zuz0fe//31p37594PvevXt3gX0vueSSwPXYiZmxQFrAJPLl5ubKfffdJxdffLHE43GZNWuWvPPOO9KvXz/p0qWLRKNROXTokDzzzDMyYsQIueKKK4q943SBeerUKVm0aJF8/vnnOghccMEFmbF0Ca96PmBi9+3bt8uYMWPkq6++kiuvvFKGDRsm1atXL+HV7TBfLJAWMPfs2SNTp06VnJwcadSokRw7dkyeffZZ+cY3viE1atSQu+++W9PR1atXy/Lly+WRRx4RUjZgIY3luP/+97/aqfLz86VKlSoCUNOmTSuImBzP919++aVUqlRJLr30UonFYnLZZZfJRRddpIPBJ598onUyCBCFa9asqecsXrxYjhw5Ih07dpQmTZrIt771rbMi9MGDBzXKUy688EJp2LChXmfnzp1aDxEIqBlQaBv1cp26detK7dq19d+phfZhm7y8PP2KQYvzP/vsM/n2t7+tWQaFtvEZ90I9ZBU33HCD1nv48GG9btOmTQsGFWxBu7744gu9j/r166sdT58+rfYlw8CmS5culXvuucfA9IW2UrQjLWDSQQDz2muvle9973uyf/9+efnll+WWW26RjRs3Sq9evYQfypOa0slJeTdt2iRr164t+A5oP/roI+2wdDYAo/ORygLq+vXrhSjq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"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670257771660,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                    "65f": {
                      entry: {
                        content:
                          '{"thumbnail":"data:image/png;base64,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"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670345189052,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
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
                "422": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once"},"widgetKey":"pivot-table"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670104821814,
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
                "670": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once"},"widgetKey":"pivot-table"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670184323893,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "737": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Underlyings].[Products].[ProductType]","[Booking].[Status].[IsSimulated]","[Geography].[City].[City]","[Time].[TimeBucket].[Value Date]","[Time].[TimeBucketDynamic].[TimeBucketDynamic]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS, NON EMPTY Crossjoin(Hierarchize(Descendants({[Underlyings].[Products].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Booking].[Status].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Geography].[City].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Time].[TimeBucket].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Time].[TimeBucketDynamic].[ALL].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670338548360,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "895": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Geography].[City].[City]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[Log City]"]},"query":{"updateMode":"once","mdx":"WITH  Member [Measures].[Log City] AS Log([Geography].[City], 10), FORMAT_STRING = \\"#,###.##\\"  SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Log City]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669992866186,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "936": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[HostName].[HostName].[HostName]","[Trades].[Trades].[TradeId]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[glagla]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(Descendants({[HostName].[HostName].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Trades].[Trades].[ALL].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS, NON EMPTY {[Measures].[glagla]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0","filters":["{[Currency].[Currency].[ALL].[AllMember].[GBP], [Currency].[Currency].[ALL].[AllMember].[JPY]}"]}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670577671900,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "989": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Currency].[Currency].[Currency]","[Booking].[Status].[IsSimulated]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[gamma.SUM]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY {[Measures].[gamma.SUM]} ON COLUMNS, NON EMPTY Crossjoin(Hierarchize(Descendants({[Currency].[Currency].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Booking].[Status].[ALL].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670491070047,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "6d4": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Time].[HistoricalDates].[AsOfDate]","[Currency].[Currency].[Currency]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[hjkhkhkhjk]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Crossjoin([Time].[HistoricalDates].[AsOfDate].Members, Hierarchize(Descendants({[Currency].[Currency].[ALL].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS, NON EMPTY {[Measures].[hjkhkhkhjk]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670497304408,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "6d7": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once"},"widgetKey":"pivot-table"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670247525871,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "5b9": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once"},"widgetKey":"pivot-table"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669649518958,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                b8b: {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once"},"widgetKey":"pivot-table"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669805345655,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                ce3: {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once"},"widgetKey":"pivot-table"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670241446129,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                c2a: {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once"},"widgetKey":"pivot-table"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669628140300,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                b0c: {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"1":{"widgetKey":"map"}},"layout":{"children":[{"leafKey":"1","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670184067261,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "5ad": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Currency].[Currency].[Currency]","[Booking].[Desk].[LegalEntity] => [Booking].[Desk].[Desk] => [CounterParty].[CounterParty].[CounterPartyGroup]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]","[Measures].[test]","[Measures].[Renamed measure]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Hierarchize(Crossjoin(Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Booking].[Desk].[AllMember]}, 1, SELF_AND_BEFORE)))) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT], [Measures].[test], [Measures].[Renamed measure]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0","name":"new pivot table name","filters":[],"id":"422","version":1,"hasDivergedFromOriginal":true},"1":{"name":"new widget saved","widgetKey":"pivot-table","version":1,"mapping":{"rows":["[Currency].[Currency].[Currency]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]","[Measures].[test]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT], [Measures].[test]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0","filters":[],"id":"422","hasDivergedFromOriginal":true}},"layout":{"children":[{"size":0.5,"leafKey":"0"},{"leafKey":"1","size":0.5}],"direction":"row"},"name":"Page 1"},"p-1":{"name":"Drillthrough on EUR, Johannesburg","content":{"0":{"query":{"updateMode":"once","mdx":"DRILLTHROUGH SELECT FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS RETURN MemberValue([BumpedMtmUp]), Caption([BumpedMtmUp]), MemberValue([BookId]), Caption([BookId]), MemberValue([AsOfDate]), Caption([AsOfDate]), MemberValue([Date]), Caption([Date])"},"widgetKey":"drillthrough-table","serverKey":"Ranch 6.0","filters":["[Measures].[contributors.COUNT]","[Currency].[Currency].[AllMember].[EUR]","[Geography].[City].[AllMember].[Johannesburg]"]}},"layout":{"direction":"column","children":[{"leafKey":"0","size":1}]},"filters":[]},"p-2":{"content":{"0":{"mapping":{"rows":["[Currency].[Currency].[Currency]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0","name":"new pivot table name","filters":[]}},"layout":{"children":[{"size":1,"leafKey":"0"}],"direction":"row"},"name":"Page 1 - Copy"}},"pagesOrder":["p-0","p-2","p-1"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669627786969,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                a82: {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":["[Measures].[a*]"]},"query":{"updateMode":"once","mdx":"WITH  Member [Measures].[a*] AS 1000, FORMAT_STRING = \\"#,###.##\\", CAPTION = \\"a\\"  SELECT NON EMPTY {[Measures].[a*]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669830081040,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "06a": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once"},"widgetKey":"pivot-table"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670261062261,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "22a": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once"},"widgetKey":"pivot-table"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669711416513,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                c45: {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Time].[TimeBucket].[Value Date]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[update.TIMESTAMP]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Hierarchize(Descendants({[Time].[TimeBucket].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[update.TIMESTAMP]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669643887746,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "50a": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Geography].[City].[City]","[CounterParty].[CounterParty].[CounterPartyGroup]","[Time].[HistoricalDates].[AsOfDate]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[Log City]"]},"query":{"updateMode":"once","mdx":"WITH  Member [Measures].[Log City] AS Log([Geography].[City], 10), FORMAT_STRING = \\"#,###.##\\"  SELECT NON EMPTY Crossjoin(Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[CounterParty].[CounterParty].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), [Time].[HistoricalDates].[AsOfDate].Members) ON ROWS, NON EMPTY {[Measures].[Log City]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0","id":"7c7","version":1,"hasDivergedFromOriginal":true,"name":"zer","filters":["[Currency].[Currency].[ALL].[AllMember].[USD]"]},"1":{"name":"zer","widgetKey":"pivot-table","version":1,"mapping":{"rows":["[Geography].[City].[City]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[Log City]"]},"query":{"updateMode":"once","mdx":"WITH  Member [Measures].[Log City] AS Log([Geography].[City], 10), FORMAT_STRING = \\"#,###.##\\"  SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[Log City]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"serverKey":"Ranch 6.0","id":"7c7"},"2":{"widgetKey":"quick-filter","mode":"multi-select","levelCoordinates":{"dimensionName":"Currency","hierarchyName":"Currency","levelName":"Currency"},"serverKey":"Ranch 6.0","cubeName":"EquityDerivativesCube"}},"layout":{"children":[{"children":[{"leafKey":"0","size":0.5},{"leafKey":"2","size":0.5}],"direction":"column","size":0.5},{"leafKey":"1","size":0.5}],"direction":"row"},"name":"Page 1","filters":["{[Currency].[Currency].[ALL].[AllMember].[GBP], [Currency].[Currency].[ALL].[AllMember].[USD]}"]}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670255158611,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "5c4": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":["[Measures].[new measure*]"]},"query":{"updateMode":"once","mdx":"WITH  Member [Measures].[new measure*] AS 6, FORMAT_STRING = \\"#,###.##\\", CAPTION = \\"new measure\\"  SELECT NON EMPTY {[Measures].[new measure*]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0"},"1":{"mapping":{"rows":[],"columns":[],"measures":[]},"query":{"updateMode":"once","mdx":"SELECT FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0"}},"layout":{"children":[{"children":[{"leafKey":"0","size":0.5},{"leafKey":"1","size":0.5}],"direction":"column","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["user1"],
                    readers: ["user1"],
                    timestamp: 1669829582623,
                    lastEditor: "user1",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "98e": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Currency].[Currency].[Currency]","[Geography].[City].[City]"],"columns":[],"measures":[]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(Descendants({[Currency].[Currency].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Geography].[City].[ALL].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0","filters":["[Measures].[contributors.COUNT]"]},"1":{"mapping":{"rows":["[Geography].[City].[City]"],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","filters":["[Currency].[Currency].[ALL].[AllMember].[GBP]"],"serverKey":"Ranch 6.0"}},"layout":{"children":[{"leafKey":"0","size":0.5},{"leafKey":"1","size":0.5}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669804373613,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                e11: {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Currency].[Currency].[Currency]","[Booking].[Desk].[LegalEntity]"],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(Descendants({[Currency].[Currency].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Booking].[Desk].[ALL].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670946927021,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "00c": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Geography].[City].[City]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[pnl.SUM]","[Measures].[CM in 2 cubes]"]},"query":{"updateMode":"once","mdx":"WITH  Member [Measures].[CM in 2 cubes] AS [Measures].[pnl.SUM] ^ 2, FORMAT_STRING = \\"#,###.##\\"  SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[pnl.SUM], [Measures].[CM in 2 cubes]} ON COLUMNS FROM [EquityDerivativesCubeDist] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 5.11","name":"Widget cm cube2","id":"abd","version":1,"hasDivergedFromOriginal":true,"filters":[]},"1":{"mapping":{"rows":["[Geography].[City].[City]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[pnl.SUM]","[Measures].[CM in 2 cubes]"]},"query":{"updateMode":"once","mdx":"WITH  Member [Measures].[CM in 2 cubes] AS [Measures].[pnl.SUM] ^ 2, FORMAT_STRING = \\"#,###.##\\"  SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[pnl.SUM], [Measures].[CM in 2 cubes]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0","name":"Widget cm cube1","id":"9a3","version":1,"hasDivergedFromOriginal":false}},"layout":{"children":[{"children":[{"leafKey":"1","size":0.5},{"size":0.5,"leafKey":"0"}],"direction":"column","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670257771660,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                c5b: {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"values":["[Measures].[pnl.FOREX]"],"sliceBy":["[Currency].[Currency].[Currency]"],"horizontalSubplots":[],"verticalSubplots":[]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Hierarchize(Descendants({[Currency].[Currency].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS, NON EMPTY {[Measures].[pnl.FOREX]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"plotly-pie-chart","serverKey":"Ranch 6.0"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670953773982,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "77c": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Booking].[Desk].[LegalEntity]","[Underlyings].[Products].[ProductType]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS, NON EMPTY Crossjoin(Hierarchize(Descendants({[Booking].[Desk].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Underlyings].[Products].[ALL].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670316266956,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "13f": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Currency].[Currency].[Currency]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS, NON EMPTY Hierarchize(Descendants({[Currency].[Currency].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670575639146,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "53c": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Booking].[Desk].[LegalEntity]","[Time].[TimeBucket].[Value Date]","[Currency].[Currency].[Currency]","[Time].[HistoricalDates].[AsOfDate]","[TargetCurrency].[TargetCurrency].[TargetCurrency]","[Trades].[Trades].[TradeId]","[Booking].[Status].[IsSimulated]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[glagla]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(Descendants({[Booking].[Desk].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Time].[TimeBucket].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Currency].[Currency].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), [Time].[HistoricalDates].[AsOfDate].Members, [TargetCurrency].[TargetCurrency].[TargetCurrency].Members, Hierarchize(Descendants({[Trades].[Trades].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Booking].[Status].[ALL].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS, NON EMPTY {[Measures].[glagla]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0","filters":["[Underlyings].[Products].[ALL].[AllMember].[LISTED]"]}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670578412347,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "65e": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once"},"widgetKey":"pivot-table"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670243581995,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "65f": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Geography].[City].[City]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS, NON EMPTY Hierarchize(Descendants({[Geography].[City].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","name":"Pivot Table","serverKey":"Ranch 6.0"},"1":{"mapping":{"rows":["[Geography].[City].[City]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS, NON EMPTY Hierarchize(Descendants({[Geography].[City].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","name":"Pivot Table","serverKey":"Ranch 6.0","switchedTo":"plotly-line-chart"}},"layout":{"children":[{"leafKey":"0","size":0.5},{"leafKey":"1","size":0.5}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670345189052,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "8d4": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once"},"widgetKey":"pivot-table"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669627545522,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "7b4": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Time].[HistoricalDates].[AsOfDate]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[number of currencies]","[Measures].[hjkhkhkhjk]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY [Time].[HistoricalDates].[AsOfDate].Members ON ROWS, NON EMPTY {[Measures].[number of currencies], [Measures].[hjkhkhkhjk]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670575906992,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                c6a: {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"1":{"mapping":{"rows":["[Time].[TimeBucket].[Value Date]","[Booking].[Status].[IsSimulated]","[Trades].[Trades].[TradeId]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[new name]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY {[Measures].[new name]} ON COLUMNS, NON EMPTY Crossjoin(Hierarchize(Descendants({[Time].[TimeBucket].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Booking].[Status].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Trades].[Trades].[ALL].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"tree-table","serverKey":"Ranch 6.0","filters":[{"mdx":"[CounterParty].[CounterParty].[ALL].[AllMember].[China Life Insurance].[China Life Insurance Company Limited]","isPinned":true},{"mdx":"{[Currency].[Currency].[ALL].[AllMember].[GBP], [Currency].[Currency].[ALL].[AllMember].[USD], [Currency].[Currency].[ALL].[AllMember].[CHF]}","isPinned":true},{"mdx":"{[Geography].[City].[ALL].[AllMember].[Berlin], [Geography].[City].[ALL].[AllMember].[London], [Geography].[City].[ALL].[AllMember].[Paris]}"}]},"3":{"mapping":{"rows":["[Currency].[Currency].[Currency]"],"columns":[],"measures":[]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Hierarchize(Descendants({[Currency].[Currency].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0","filters":[{"mdx":"{[Currency].[Currency].[ALL].[AllMember].[GBP], [Currency].[Currency].[ALL].[AllMember].[JPY]}"}]},"4":{"mapping":{"rows":["[Time].[TimeBucket].[Value Date]","[Booking].[Status].[IsSimulated]","[Trades].[Trades].[TradeId]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[new name]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY {[Measures].[new name]} ON COLUMNS, NON EMPTY Crossjoin(Hierarchize(Descendants({[Time].[TimeBucket].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Booking].[Status].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Trades].[Trades].[ALL].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"tree-table","serverKey":"Ranch 6.0"}},"layout":{"children":[{"children":[{"children":[{"size":0.5,"leafKey":"3"},{"leafKey":"1","size":0.5}],"direction":"column","size":0.7515339999999999},{"leafKey":"4","size":0.25}],"direction":"row","size":1}],"direction":"column"},"name":"Page 1","filters":[]}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1671012785225,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "1ed": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669395222151,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                d8d: {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once"},"widgetKey":"pivot-table"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670490910028,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "7ac": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Currency].[Currency].[Currency]","[TargetCurrency].[TargetCurrency].[TargetCurrency]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS, NON EMPTY Crossjoin(Hierarchize(Descendants({[Currency].[Currency].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), [TargetCurrency].[TargetCurrency].[TargetCurrency].Members) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","filters":["{[Currency].[Currency].[ALL].[AllMember].[GBP], [Currency].[Currency].[ALL].[AllMember].[USD]}"],"serverKey":"Ranch 6.0"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670341452233,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                d0d: {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Time].[HistoricalDates].[AsOfDate]","[Time].[TimeBucket].[Value Date]"],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Crossjoin([Time].[HistoricalDates].[AsOfDate].Members, Hierarchize(Descendants({[Time].[TimeBucket].[ALL].[AllMember]}, 1, SELF_AND_BEFORE))) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670577015950,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                b60: {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Booking].[Status].[IsSimulated]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS, NON EMPTY Hierarchize(Descendants({[Booking].[Status].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0","filters":["{[CounterParty].[CounterParty].[ALL].[AllMember].[BHP Billiton], [CounterParty].[CounterParty].[ALL].[AllMember].[Cosco]}"]}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670417728540,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                a41: {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Time].[HistoricalDates].[AsOfDate]","[TargetCurrency].[TargetCurrency].[TargetCurrency]"],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Crossjoin([Time].[HistoricalDates].[AsOfDate].Members, [TargetCurrency].[TargetCurrency].[TargetCurrency].Members) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670493090896,
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
                d22: {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once"},"widgetKey":"pivot-table"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670105074338,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "94a": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once"},"widgetKey":"pivot-table"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["user1"],
                    readers: ["user1"],
                    timestamp: 1670417152391,
                    lastEditor: "user1",
                    canRead: true,
                    canWrite: true,
                  },
                },
                "7d7": {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"1":{"mapping":{"rows":["[Currency].[Currency].[Currency]","[Booking].[Desk].[LegalEntity] => [Booking].[Desk].[BusinessUnit]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Hierarchize(Union(Crossjoin(Hierarchize(Descendants({[Currency].[Currency].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[Booking].[Desk].[ALL].[AllMember]}, 1, SELF_AND_BEFORE))), Crossjoin([Currency].[Currency].[ALL].[AllMember].[EUR], Descendants({[Booking].[Desk].[ALL].[AllMember].[LegalEntityA]}, [Booking].[Desk].[BusinessUnit])))) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0","filters":[]},"3":{"mapping":{"rows":["[Currency].[Currency].[Currency]","[CounterParty].[CounterParty].[CounterParty]"],"columns":["ALL_MEASURES"],"measures":["[Measures].[contributors.COUNT]"]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Crossjoin(Hierarchize(Descendants({[Currency].[Currency].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)), Hierarchize(Descendants({[CounterParty].[CounterParty].[ALL].[AllMember]}, 2, SELF_AND_BEFORE))) ON ROWS, NON EMPTY {[Measures].[contributors.COUNT]} ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0","filters":[{"mdx":"{[CounterParty].[CounterParty].[ALL].[AllMember].[Cathay], [CounterParty].[CounterParty].[ALL].[AllMember].[HSBC], [CounterParty].[CounterParty].[ALL].[AllMember].[Asahi]}"}]}},"layout":{"children":[{"leafKey":"1","size":0.5},{"leafKey":"3","size":0.5}],"direction":"column"},"name":"Page 1","filters":[{"mdx":"{[Geography].[City].[ALL].[AllMember].[Berlin], [Geography].[City].[ALL].[AllMember].[Johannesburg], [Geography].[City].[ALL].[AllMember].[London], [Geography].[City].[ALL].[AllMember].[New York]}"}]}},"pagesOrder":["p-0"],"filters":[{"mdx":"{[Currency].[Currency].[ALL].[AllMember].[EUR], [Currency].[Currency].[ALL].[AllMember].[ZAR]}"}]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin", "ROLE_USER"],
                    timestamp: 1671015725434,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
                c9c: {
                  entry: {
                    content:
                      '{"pages":{"p-0":{"content":{"0":{"mapping":{"rows":["[Geography].[City].[City]"],"columns":["ALL_MEASURES"],"measures":[]},"query":{"updateMode":"once","mdx":"SELECT NON EMPTY Hierarchize(Descendants({[Geography].[City].[ALL].[AllMember]}, 1, SELF_AND_BEFORE)) ON ROWS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"},"widgetKey":"pivot-table","serverKey":"Ranch 6.0"}},"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1"}},"pagesOrder":["p-0"],"filters":[]}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669817917909,
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
                        c9c: {
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
                            c9c_metadata: {
                              entry: {
                                content: '{"name":"sub dash"}',
                                isDirectory: false,
                                owners: ["admin"],
                                readers: ["admin"],
                                timestamp: 1669817918087,
                                lastEditor: "admin",
                                canRead: true,
                                canWrite: true,
                              },
                            },
                          },
                        },
                      },
                    },
                    e11: {
                      entry: {
                        isDirectory: true,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669300326912,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                      children: {
                        e11_metadata: {
                          entry: {
                            content: '{"name":"Demos"}',
                            isDirectory: false,
                            owners: ["admin"],
                            readers: ["admin"],
                            timestamp: 1670411002223,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                        },
                      },
                    },
                    "7d7": {
                      entry: {
                        isDirectory: true,
                        owners: ["admin"],
                        readers: ["admin", "ROLE_USER"],
                        timestamp: 1669821758311,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                      children: {
                        "7d7_metadata": {
                          entry: {
                            content: '{"name":"Aha"}',
                            isDirectory: false,
                            owners: ["admin"],
                            readers: ["admin", "ROLE_USER"],
                            timestamp: 1669821758314,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                        },
                      },
                    },
                    aec: {
                      entry: {
                        isDirectory: true,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669282262085,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                      children: {
                        aec_metadata: {
                          entry: {
                            content: '{"name":"AAAAAA"}',
                            isDirectory: false,
                            owners: ["admin"],
                            readers: ["admin"],
                            timestamp: 1669901306791,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                        },
                      },
                    },
                    c6a: {
                      entry: {
                        isDirectory: true,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670342373437,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                      children: {
                        c6a_metadata: {
                          entry: {
                            content: '{"name":"A"}',
                            isDirectory: false,
                            owners: ["admin"],
                            readers: ["admin"],
                            timestamp: 1670409680110,
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
                "422": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670104822055,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "422_metadata": {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670104822055,
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
                "542": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669226726042,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "940": {
                      entry: {
                        isDirectory: true,
                        owners: ["admin"],
                        readers: ["admin", "ROLE_USER"],
                        timestamp: 1669817817327,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                      children: {
                        "940_metadata": {
                          entry: {
                            content: '{"isFolder":true,"name":"uno"}',
                            isDirectory: false,
                            owners: ["admin"],
                            readers: ["admin", "ROLE_USER"],
                            timestamp: 1669817817548,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                        },
                        f15: {
                          entry: {
                            isDirectory: true,
                            owners: ["admin"],
                            readers: ["admin", "ROLE_USER"],
                            timestamp: 1669817842804,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                          children: {
                            "2c1": {
                              entry: {
                                isDirectory: true,
                                owners: ["admin"],
                                readers: ["admin", "ROLE_USER"],
                                timestamp: 1669817849098,
                                lastEditor: "admin",
                                canRead: true,
                                canWrite: true,
                              },
                              children: {
                                "980": {
                                  entry: {
                                    isDirectory: true,
                                    owners: ["admin"],
                                    readers: ["admin", "ROLE_USER"],
                                    timestamp: 1669817856465,
                                    lastEditor: "admin",
                                    canRead: true,
                                    canWrite: true,
                                  },
                                  children: {
                                    "575": {
                                      entry: {
                                        isDirectory: true,
                                        owners: ["admin"],
                                        readers: ["admin", "ROLE_USER"],
                                        timestamp: 1669817863784,
                                        lastEditor: "admin",
                                        canRead: true,
                                        canWrite: true,
                                      },
                                      children: {
                                        e3b: {
                                          entry: {
                                            isDirectory: true,
                                            owners: ["admin"],
                                            readers: ["admin", "ROLE_USER"],
                                            timestamp: 1669817892678,
                                            lastEditor: "admin",
                                            canRead: true,
                                            canWrite: true,
                                          },
                                          children: {
                                            e3b_metadata: {
                                              entry: {
                                                content:
                                                  '{"isFolder":true,"name":"ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssiete"}',
                                                isDirectory: false,
                                                owners: ["admin"],
                                                readers: ["admin", "ROLE_USER"],
                                                timestamp: 1669817892852,
                                                lastEditor: "admin",
                                                canRead: true,
                                                canWrite: true,
                                              },
                                            },
                                          },
                                        },
                                        "575_metadata": {
                                          entry: {
                                            content:
                                              '{"isFolder":true,"name":"cinco"}',
                                            isDirectory: false,
                                            owners: ["admin"],
                                            readers: ["admin", "ROLE_USER"],
                                            timestamp: 1669817863958,
                                            lastEditor: "admin",
                                            canRead: true,
                                            canWrite: true,
                                          },
                                        },
                                      },
                                    },
                                    "980_metadata": {
                                      entry: {
                                        content:
                                          '{"isFolder":true,"name":"cuatro"}',
                                        isDirectory: false,
                                        owners: ["admin"],
                                        readers: ["admin", "ROLE_USER"],
                                        timestamp: 1669817856981,
                                        lastEditor: "admin",
                                        canRead: true,
                                        canWrite: true,
                                      },
                                    },
                                  },
                                },
                                "2c1_metadata": {
                                  entry: {
                                    content: '{"isFolder":true,"name":"tres"}',
                                    isDirectory: false,
                                    owners: ["admin"],
                                    readers: ["admin", "ROLE_USER"],
                                    timestamp: 1669817849286,
                                    lastEditor: "admin",
                                    canRead: true,
                                    canWrite: true,
                                  },
                                },
                              },
                            },
                            f15_metadata: {
                              entry: {
                                content: '{"isFolder":true,"name":"dos"}',
                                isDirectory: false,
                                owners: ["admin"],
                                readers: ["admin", "ROLE_USER"],
                                timestamp: 1669817843006,
                                lastEditor: "admin",
                                canRead: true,
                                canWrite: true,
                              },
                            },
                          },
                        },
                      },
                    },
                    a2b: {
                      entry: {
                        isDirectory: true,
                        owners: ["admin"],
                        readers: [
                          "admin",
                          "ROLE_ADMIN",
                          "ROLE_CS_ROOT",
                          "ROLE_USER",
                        ],
                        timestamp: 1669816628199,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                      children: {
                        a2b_metadata: {
                          entry: {
                            content: '{"name":"my dash"}',
                            isDirectory: false,
                            owners: ["admin"],
                            readers: [
                              "admin",
                              "ROLE_ADMIN",
                              "ROLE_CS_ROOT",
                              "ROLE_USER",
                            ],
                            timestamp: 1669916964280,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                        },
                      },
                    },
                    "542_metadata": {
                      entry: {
                        content: '{"isFolder":true,"name":"rosi"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670313897756,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "670": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670184323980,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "670_metadata": {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670184323980,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "737": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670338351263,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "737_metadata": {
                      entry: {
                        content: '{"name":"can this work?"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670338548360,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "895": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669992866236,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "895_metadata": {
                      entry: {
                        content: '{"name":"new dashboard"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669992866236,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "936": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670577672081,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "936_metadata": {
                      entry: {
                        content: '{"name":"somethin (copy) (copy)"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670577672081,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "989": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670491070254,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "989_metadata": {
                      entry: {
                        content: '{"name":"dash"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670491070254,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "77c": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670315981942,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "77c_metadata": {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670316266956,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "13f": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670575639329,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "13f_metadata": {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670575639329,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "53c": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670578089784,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "53c_metadata": {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670578412347,
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
                    timestamp: 1670243582212,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "65e_metadata": {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670243582212,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "6d4": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670497304579,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "6d4_metadata": {
                      entry: {
                        content: '{"name":"new dash (copy)"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670497304579,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "8d4": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669627545844,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "8d4_metadata": {
                      entry: {
                        content: '{"name":"New dashboard (copy)"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669627545844,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "6d7": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670247525959,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "6d7_metadata": {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670247525959,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "7b4": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670575907173,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "7b4_metadata": {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670575907173,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "5b9": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669649519139,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "5b9_metadata": {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669649519139,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                b8b: {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669805345833,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    b8b_metadata: {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669805345833,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "1ed": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669395222185,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "1ed_metadata": {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669395222185,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                ce3: {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670241446359,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    ce3_metadata: {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670241446359,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                d8d: {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670490910199,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    d8d_metadata: {
                      entry: {
                        content: '{"name":"dash-dash"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670490910199,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                c2a: {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669628140574,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    c2a_metadata: {
                      entry: {
                        content: '{"name":"New dashboard (copy)"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669628140574,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                b0c: {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670176476181,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    b0c_metadata: {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670184067261,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "5ad": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669388978671,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "5ad_metadata": {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669627786969,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "7ac": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670341401421,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "7ac_metadata": {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670341452233,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                d0d: {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670577016133,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    d0d_metadata: {
                      entry: {
                        content: '{"name":"yes"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670577016133,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                a82: {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669830081227,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    a82_metadata: {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669830081227,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "06a": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670261062435,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "06a_metadata": {
                      entry: {
                        content: '{"name":"new to save"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670261062435,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                b60: {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670417704829,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    b60_metadata: {
                      entry: {
                        content: '{"name":"dustin - dash"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670417728540,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                a41: {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670493091089,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    a41_metadata: {
                      entry: {
                        content: '{"name":"new"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670493091089,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "22a": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669711416727,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "22a_metadata": {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669711416727,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                c45: {
                  entry: {
                    isDirectory: true,
                    owners: ["user1"],
                    readers: ["user1", "ROLE_USER"],
                    timestamp: 1669643833864,
                    lastEditor: "user1",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    c45_metadata: {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["user1"],
                        readers: ["user1", "ROLE_USER"],
                        timestamp: 1669643833866,
                        lastEditor: "user1",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                d22: {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1670105074578,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    d22_metadata: {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670105074578,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "50a": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669992896177,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "50a_metadata": {
                      entry: {
                        content: '{"name":"another one"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1670255158611,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "5c4": {
                  entry: {
                    isDirectory: true,
                    owners: ["user1"],
                    readers: ["user1"],
                    timestamp: 1669829056992,
                    lastEditor: "user1",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "5c4_metadata": {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["user1"],
                        readers: ["user1"],
                        timestamp: 1669829582623,
                        lastEditor: "user1",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "94a": {
                  entry: {
                    isDirectory: true,
                    owners: ["user1"],
                    readers: ["user1"],
                    timestamp: 1670417152561,
                    lastEditor: "user1",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "94a_metadata": {
                      entry: {
                        content: '{"name":"dustin dashboard"}',
                        isDirectory: false,
                        owners: ["user1"],
                        readers: ["user1"],
                        timestamp: 1670417152561,
                        lastEditor: "user1",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                "98e": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669653843507,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "98e_metadata": {
                      entry: {
                        content: "{}",
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669804373613,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                fe0: {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1669231606538,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    c5b: {
                      entry: {
                        isDirectory: true,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669826982533,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                      children: {
                        c5b_metadata: {
                          entry: {
                            content: "{}",
                            isDirectory: false,
                            owners: ["admin"],
                            readers: ["admin"],
                            timestamp: 1669826982533,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                        },
                      },
                    },
                    "00c": {
                      entry: {
                        isDirectory: true,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669827597384,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                      children: {
                        "00c_metadata": {
                          entry: {
                            content: '{"name":"Same cm 2 cubes"}',
                            isDirectory: false,
                            owners: ["admin"],
                            readers: ["admin"],
                            timestamp: 1670257771660,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                        },
                      },
                    },
                    "65f": {
                      entry: {
                        isDirectory: true,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669281560187,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                      children: {
                        "65f_metadata": {
                          entry: {
                            content: '{"name":"Pivot table"}',
                            isDirectory: false,
                            owners: ["admin"],
                            readers: ["admin"],
                            timestamp: 1670345189052,
                            lastEditor: "admin",
                            canRead: true,
                            canWrite: true,
                          },
                        },
                      },
                    },
                    fe0_metadata: {
                      entry: {
                        content: '{"isFolder":true,"name":"AMC"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1669231606721,
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
