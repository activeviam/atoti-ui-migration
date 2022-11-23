import type { ContentRecord } from "@activeviam/activeui-sdk-5.0";

const defaultPreferences = {
  allow: [],
  deny: [],
  map: {
    "global.theme": "light-activeviam",
    "global.locale": "en-US",
  },
};

const user1Preferences = {
  allow: [],
  deny: [],
  map: {
    "userFilters.enabled": true,
  },
};

const user1Permissions = {
  map: {
    "userFilters.enabled": false,
  },
};

const roleUserPreferences = {
  allow: [],
  deny: [],
  map: {
    "tree.search.maxResults": 7,
  },
};

const adminPreferences = {
  map: {
    "tree.search.maxResults": 10,
    "global.theme": "dark-activeviam",
    "userFilters.enabled": true,
    showLegacyCharts: true,
    showLegacyMaps: true,
    defaultPermissions: {
      owners: ["admin"],
      readers: ["admin"],
    },
    "project.content-editor.configuration": {
      autoSwitchToFieldsOnEmptyWidget: true,
      advancedModeDropdownHidden: false,
      hideFieldsControls: false,
      "mdx-common": {
        regularModeTab: "filters",
        advancedModeEnabled: false,
        advancedModeTab: "mdx",
      },
    },
    "user.contextValues": {
      EquityDerivativesCube: {},
      EquityDerivativesCubeDist: {},
    },
    "user.filters": {
      EquityDerivativesCube: [],
      EquityDerivativesCubeDist: [
        "[Geography].[City].[ALL].[AllMember].[Berlin]",
      ],
    },
    "filtering.hierarchyToFilterType.[Geography].[City]": "explicit",
    "filtering.hierarchyToFilterType.[Currency].[Currency]": "explicit",
    "filtering.hierarchyToFilterType.[Trades].[Trades]": "topcount",
    "servers.alias": {
      "https://activepivot-ranch.activeviam.com:5900": "http://localhost:8080",
    },
  },
};

/**
 * The content of a legacy /ui/settings folder on a Content Server, useful for unit tests.
 */
export const legacySettingsFolder: ContentRecord = {
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
            content: JSON.stringify(defaultPreferences),
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
      children: {
        ROLE_USER: {
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
                owners: ["ROLE_CS_ROOT"],
                readers: ["ROLE_USER"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
                content: JSON.stringify(roleUserPreferences),
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
                content: JSON.stringify(user1Preferences),
                isDirectory: false,
                owners: ["user1"],
                readers: ["user1"],
                timestamp: 1607879735685,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
            },
            permissions: {
              entry: {
                content: JSON.stringify(user1Permissions),
                isDirectory: false,
                owners: ["ROLE_CS_ROOT"],
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
                content: JSON.stringify(adminPreferences),
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
};
