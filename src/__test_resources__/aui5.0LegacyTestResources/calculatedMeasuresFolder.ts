export const calculatedMeasures = {
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
        "196": {
          entry: {
            content:
              '{"expression":"Count(Descendants([Geography].[City].CurrentMember, [Geography].[City].[City]), EXCLUDEEMPTY)","properties":["FORMAT_STRING = \\"#,###.##\\""]}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666091498549,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        "501": {
          entry: {
            content:
              '{"expression":"10 ^ [Measures].[gamma.SUM]","properties":["FORMAT_STRING = \\"#,###.####\\""]}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666091548728,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        "585": {
          entry: {
            content:
              '{"expression":"Log([Measures].[pv.SUM], 10)","properties":["FORMAT_STRING = \\"#,###.##\\""]}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666170634498,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        cef: {
          entry: {
            content:
              '{"expression":"IIf(IsEmpty([Currency].[Currency].CurrentMember.PrevMember), NULL, ([Measures].[contributors.COUNT], [Currency].[Currency].CurrentMember) - ([Measures].[contributors.COUNT], [Currency].[Currency].CurrentMember.PrevMember))","properties":["FORMAT_STRING = \\"#,###.##%\\""]}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666082732801,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
        },
        "6b5": {
          entry: {
            content:
              '{"expression":"IIf(IsEmpty(([Currency].[Currency].CurrentMember.Parent, [Measures].[delta.SUM])), NULL, [Measures].[delta.SUM] / ([Currency].[Currency].CurrentMember.Parent, [Measures].[delta.SUM]))","properties":["FORMAT_STRING = \\"#,###.##%\\""]}',
            isDirectory: false,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666091726126,
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
        "196": {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666091498729,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            "196_metadata": {
              entry: {
                content: '{"name":"Distinct count city"}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666091498729,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
        },
        a14: {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666090180504,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            "501": {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666091548914,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
              children: {
                "501_metadata": {
                  entry: {
                    content: '{"name":"Exp gamma sum"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1666091548914,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
              },
            },
            b49: {
              entry: {
                isDirectory: true,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666170592550,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
              children: {
                "585": {
                  entry: {
                    isDirectory: true,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1666170634680,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                  children: {
                    "585_metadata": {
                      entry: {
                        content: '{"name":"Log pv.SUM"}',
                        isDirectory: false,
                        owners: ["admin"],
                        readers: ["admin"],
                        timestamp: 1666170634680,
                        lastEditor: "admin",
                        canRead: true,
                        canWrite: true,
                      },
                    },
                  },
                },
                b49_metadata: {
                  entry: {
                    content: '{"isFolder":true,"name":"Test folder"}',
                    isDirectory: false,
                    owners: ["admin"],
                    readers: ["admin"],
                    timestamp: 1666170592732,
                    lastEditor: "admin",
                    canRead: true,
                    canWrite: true,
                  },
                },
              },
            },
            a14_metadata: {
              entry: {
                content: '{"isFolder":true,"name":"New folder"}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666090180725,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
        },
        cef: {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666082732978,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            cef_metadata: {
              entry: {
                content: '{"name":"activeui5 calculated measure"}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666082732978,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
          },
        },
        "6b5": {
          entry: {
            isDirectory: true,
            owners: ["admin"],
            readers: ["admin"],
            timestamp: 1666091726301,
            lastEditor: "admin",
            canRead: true,
            canWrite: true,
          },
          children: {
            "6b5_metadata": {
              entry: {
                content: '{"name":"Test calculated measure"}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1666091726301,
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
