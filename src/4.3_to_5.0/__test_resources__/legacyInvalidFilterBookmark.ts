/**
 * Content entry representing a legacy filter containing an invalid property
 * Useful for unit tests.
 */
export const legacyInvalidFilterBookmark = {
  entry: {
    content:
      '{"name":"AUI4 filter","type":"mdx","invalidvalue":{"shouldReplace":true,"type":"filter","mdx":"{[Geography].[City].[ALL].[AllMember].[Berlin], [Geography].[City].[ALL].[AllMember].[London]}","cube":"EquityDerivativesCube"}}',
    isDirectory: false,
    owners: ["admin"],
    readers: ["admin"],
    timestamp: 1607879735685,
    lastEditor: "admin",
    canRead: true,
    canWrite: true,
  },
};
