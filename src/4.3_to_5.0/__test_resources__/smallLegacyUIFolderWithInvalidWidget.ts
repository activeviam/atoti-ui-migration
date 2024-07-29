/**
 * The shortened version of the content of the /ui folder on a Content Server, useful for unit tests.
 * Contains an invalid widget whose `containerKey` is not valid.
 */
export const smallLegacyUIFolderWithInvalidWidget = {
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
                  '{"description":"Widget with invalid container key","name":"Invalid widget","type":"container","value":{"style":{},"showTitleBar":false,"containerKey":"invalid-container-key","body":{"serverUrl":"","mdx":"SELECT NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube] WHERE [Geography].[City].[ALL].[AllMember].[New York] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{}}}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "1231": {
              entry: {
                content:
                  '{"description":"Widget with filter on invalid hierarchy","name":"Invalid widget","type":"container","value":{"style":{},"showTitleBar":false,"containerKey":"pivot-table","body":{"serverUrl":"","mdx":"SELECT NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube] WHERE [Geography].[InvalidHierarchy].[ALL].[AllMember].[Member] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues":{},"updateMode":"once","ranges":{}}}}',
                isDirectory: false,
                owners: ["admin"],
                readers: ["admin"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            "777": {
              entry: {
                content:
                  '{"description": "Valid widget","name": "Valid widget","type": "container", "value": {"style": {},"showTitleBar": false,"containerKey": "pivot-table","body": {"serverUrl": "","mdx": "SELECT NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube] WHERE [Geography].[City].[ALL].[AllMember].[New York] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS","contextValues": {},"updateMode": "once", "ranges": {}}}}',
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
            "1231": {
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
            "777": {
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
