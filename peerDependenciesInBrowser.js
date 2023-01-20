/**
 * activeui-migration imports utils and types from `@activeviam` packages.
 * Several of these packages have peer dependencies on libraries that make sense only for the UI in a browser (e.g. react).
 * Since they are peer dependencies, they are not installed.
 */
const peerDependenciesInBrowser = [
  "@ant-design/icons",
  "antd",
  "react",
  "react-dom",
  "react-dnd",
  "react-intl",
  "@emotion/react/jsx-runtime",
];

module.exports = {
  peerDependenciesInBrowser,
};
