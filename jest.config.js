/* eslint-disable @typescript-eslint/no-var-requires */
const pkgDir = require("pkg-dir");
const { peerDependenciesInBrowser } = require("./peerDependenciesInBrowser");

const root = pkgDir.sync();

if (!root) {
  throw new Error("Could not find root.");
}

const extensions = ["js", "jsx", "ts", "tsx", "mjs", "json"];
const esmPackages = [
  "@activeviam/*",
  "monaco-editor",
  "lodash-es",
  // "@react-dnd",
  // "react-dnd",
  // "dnd-core",
];

module.exports = {
  // TODO manually mock globals such as window and use the default "node" test environment instead.
  testEnvironment: "jsdom",
  // Mock the peer dependencies of @activeviam packages that are not needed in a Node environment.
  moduleNameMapper: peerDependenciesInBrowser.reduce((acc, dependencyName) => {
    acc[dependencyName] = "<rootDir>/noop.js";
    return acc;
  }, {}),
  // transform: { "^.+\\.[jt]sx?$": require.resolve("./jestBabelTransform.js") },
  transformIgnorePatterns: [
    // Transpiling ESM packages to CJS because Jest doesn't support ESM fully yet.
    // See https://jestjs.io/docs/en/ecmascript-modules.
    `[/\\\\]node_modules[/\\\\](?!${esmPackages.join(
      "|",
    )}).+\\.(${extensions.join("|")})$`,
  ],
};
