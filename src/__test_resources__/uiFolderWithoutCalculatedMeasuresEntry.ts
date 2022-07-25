/**
 * An already migrated UI folder that is missing an entry for `calculated_measures`.
 * Useful for unit tests.
 */
export const uiFolderWithoutCalculatedMeasuresEntry = {
  entry: {
    isDirectory: true,
    owners: ["ROLE_CS_ROOT"],
    readers: ["ROLE_CS_ROOT"],
  },
  children: {
    filters: {
      entry: {
        isDirectory: true,
        owners: ["ROLE_CS_ROOT"],
        readers: ["ROLE_CS_ROOT"],
      },
      children: {
        content: {
          children: {},
          entry: {
            isDirectory: true,
            owners: ["ROLE_USER"],
            readers: ["ROLE_USER"],
          },
        },
        structure: {
          children: {},
          entry: {
            isDirectory: true,
            owners: ["ROLE_USER"],
            readers: ["ROLE_USER"],
          },
        },
      },
    },
    widgets: {
      entry: {
        isDirectory: true,
        owners: ["ROLE_CS_ROOT"],
        readers: ["ROLE_CS_ROOT"],
      },
      children: {
        content: {
          children: {},
          entry: {
            isDirectory: true,
            owners: ["ROLE_USER"],
            readers: ["ROLE_USER"],
          },
        },
        structure: {
          children: {},
          entry: {
            isDirectory: true,
            owners: ["ROLE_USER"],
            readers: ["ROLE_USER"],
          },
        },
      },
    },
    dashboards: {
      entry: {
        isDirectory: true,
        owners: ["ROLE_CS_ROOT"],
        readers: ["ROLE_CS_ROOT"],
      },
      children: {
        content: {
          children: {
            bef: {
              entry: {
                content:
                  '{"pages":{"p-0":{"layout":{"children":[{"leafKey":"0","size":1}],"direction":"row"},"name":"Page 1","filters":[],"content":{"0":{"query":{"mdx":"SELECT FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","updateMode":"once"},"filters":[],"queryContext":[],"mapping":{"rows":[],"columns":["ALL_MEASURES"],"measures":[]},"name":"Pivot table with calculated measures","serverKey":"my-server","widgetKey":"tree-table","columnWidths":{}}},"queryContext":[]}},"pagesOrder":["p-0"],"filters":[],"queryContext":[]}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1658155953186,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
          entry: {
            isDirectory: true,
            owners: ["ROLE_USER"],
            readers: ["ROLE_USER"],
          },
        },
        structure: {
          children: {
            bef: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1658155953644,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
              children: {
                bef_metadata: {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1658155953644,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                    content: '{"name":"Calculated measures dashboard."}',
                  },
                },
              },
            },
          },
          entry: {
            isDirectory: true,
            owners: ["ROLE_USER"],
            readers: ["ROLE_USER"],
          },
        },
        thumbnails: {
          children: {},
          entry: {
            isDirectory: true,
            owners: ["ROLE_USER"],
            readers: ["ROLE_USER"],
          },
        },
      },
    },
    organization_settings: {
      entry: {
        content: "{}",
        owners: ["ROLE_CS_ROOT"],
        readers: ["ROLE_USER"],
      },
    },
    organization_permissions: {
      entry: {
        isDirectory: false,
        owners: ["ROLE_CS_ROOT"],
        readers: ["ROLE_CS_ROOT"],
        content: "{}",
      },
    },
    user_roles: {
      entry: {
        isDirectory: true,
        owners: ["ROLE_CS_ROOT"],
        readers: ["ROLE_USER"],
      },
    },
    users: {
      entry: {
        isDirectory: true,
        owners: ["ROLE_USER"],
        readers: ["ROLE_USER"],
      },
      children: {
        admin: {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1658155953761,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            settings: {
              entry: {
                content: "{}",
                owners: ["admin"],
                readers: ["admin"],
              },
            },
            activity: {
              entry: {
                content: "{}",
                owners: ["admin"],
                readers: ["admin"],
              },
            },
          },
        },
      },
    },
  },
};
