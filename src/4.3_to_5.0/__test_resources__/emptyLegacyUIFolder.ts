/**
 * Contains an empty /ui folder of a Content Server, useful for injecting content to be used in unit tests.
 */
export const emptyLegacyUIFolder = {
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
          children: {},
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
          children: {},
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
      children: {
        default: {
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
            preferences: {
              entry: {
                content: '{\n  "allow": [],\n  "deny": [],\n  "map": {}\n}',
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
        },
        roles: {
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
        users: {
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
            user1: {
              entry: {
                isDirectory: true,
                owners: ["user1"],
                readers: ["user1"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
              children: {
                preferences: {
                  entry: {
                    content:
                      '{\n  "map": {\n    "defaultPermissions": {\n      "owners": [\n        "user2"\n      ],\n      "readers": [\n        "user2"\n      ]\n    }\n  }\n}',
                    isDirectory: false,
                    owners: ["user1"],
                    readers: ["user1"],
                    timestamp: 1607879735685,
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
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
              children: {
                preferences: {
                  entry: {
                    content:
                      '{\n  "map": {\n    "tree.search.maxResults": 10,\n    "global.theme": "dark-activeviam",\n    "userFilters.enabled": true,\n    "showLegacyCharts": true,\n    "showLegacyMaps": true,\n    "widgets.Tabular.drillthrough.selectedColumns": {\n      "https://activepivot-ranch.activeviam.com:5900": {\n        "EquityDerivativesCube": [\n          {\n            "functionName": "MemberValue",\n            "columnName": "delta"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "delta"\n          },\n          {\n            "functionName": "MemberValue",\n            "columnName": "gamma"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "gamma"\n          },\n          {\n            "functionName": "MemberValue",\n            "columnName": "pnlVega"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "pnlVega"\n          },\n          {\n            "functionName": "MemberValue",\n            "columnName": "Desk"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "Desk"\n          },\n          {\n            "functionName": "MemberValue",\n            "columnName": "Currency"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "Currency"\n          },\n          {\n            "functionName": "MemberValue",\n            "columnName": "Date"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "Date"\n          },\n          {\n            "columnName": "HostName",\n            "functionName": "MemberValue"\n          },\n          {\n            "columnName": "HostName",\n            "functionName": "Caption"\n          }\n        ],\n        "EquityDerivativesCubeDist": [\n          {\n            "functionName": "MemberValue",\n            "columnName": "BumpedMtmDown"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "BumpedMtmDown"\n          },\n          {\n            "functionName": "MemberValue",\n            "columnName": "ProductQtyMultiplier"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "ProductQtyMultiplier"\n          },\n          {\n            "functionName": "MemberValue",\n            "columnName": "ProductQtyMultiplier"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "ProductQtyMultiplier"\n          },\n          {\n            "functionName": "MemberValue",\n            "columnName": "vega"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "vega"\n          },\n          {\n            "functionName": "MemberValue",\n            "columnName": "rho"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "rho"\n          },\n          {\n            "functionName": "MemberValue",\n            "columnName": "productId"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "productId"\n          },\n          {\n            "functionName": "MemberValue",\n            "columnName": "pnlVega"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "pnlVega"\n          },\n          {\n            "functionName": "MemberValue",\n            "columnName": "pnlDelta"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "pnlDelta"\n          },\n          {\n            "functionName": "MemberValue",\n            "columnName": "pnl"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "pnl"\n          },\n          {\n            "functionName": "MemberValue",\n            "columnName": "gamma"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "gamma"\n          },\n          {\n            "functionName": "MemberValue",\n            "columnName": "delta"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "delta"\n          },\n          {\n            "functionName": "MemberValue",\n            "columnName": "TradeId"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "TradeId"\n          },\n          {\n            "functionName": "MemberValue",\n            "columnName": "ProductQtyMultiplier"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "ProductQtyMultiplier"\n          },\n          {\n            "functionName": "MemberValue",\n            "columnName": "ProductQtyMultiplier"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "ProductQtyMultiplier"\n          },\n          {\n            "functionName": "MemberValue",\n            "columnName": "ProductBaseMtm"\n          },\n          {\n            "functionName": "Caption",\n            "columnName": "ProductBaseMtm"\n          },\n          {\n            "columnName": "ProductQtyMultiplier",\n            "functionName": "MemberValue"\n          },\n          {\n            "columnName": "ProductQtyMultiplier",\n            "functionName": "Caption"\n          }\n        ]\n      }\n    },\n    "defaultPermissions": {\n      "owners": [\n        "admin"\n      ],\n      "readers": [\n        "admin"\n      ]\n    },\n    "project.content-editor.configuration": {\n      "autoSwitchToFieldsOnEmptyWidget": true,\n      "advancedModeDropdownHidden": false,\n      "hideFieldsControls": false,\n      "mdx-common": {\n        "regularModeTab": "filters",\n        "advancedModeEnabled": false,\n        "advancedModeTab": "mdx"\n      }\n    },\n    "user.contextValues": {\n      "EquityDerivativesCube": {},\n      "EquityDerivativesCubeDist": {}\n    },\n    "user.filters": {\n      "EquityDerivativesCube": ["[Geography].[City].[ALL].[AllMember].[Berlin]"],\n      "EquityDerivativesCubeDist": []\n    },\n    "filtering.hierarchyToFilterType.[Geography].[City]": "explicit",\n    "filtering.hierarchyToFilterType.[Currency].[Currency]": "explicit",\n    "filtering.hierarchyToFilterType.[Trades].[Trades]": "topcount",\n    "servers.alias": {\n      "https://activepivot-ranch.activeviam.com:5900": "http://localhost:8080"\n    }\n  }\n}',
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
          },
        },
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
