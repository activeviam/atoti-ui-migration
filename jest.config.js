/* eslint-disable @typescript-eslint/no-var-requires */
const pkgDir = require("pkg-dir");

const root = pkgDir.sync();

if (!root) {
  throw new Error("Could not find root.");
}

const extensions = ["js", "jsx", "ts", "tsx", "mjs", "json"];
const esmPackages = ["@activeviam/*", "lodash-es", "monaco-editor"];

// Note that in addition to the config below, there are several mocked modules under the __mocks__ folder.
// They correspond to modules that are UI/browser-related and are transitively pulled by @activeviam dependencies, but are not necessary for `activeui-migration` to work in a Node environment.
module.exports = {
  // TODO manually mock globals such as window and use the default "node" test environment instead.
  testEnvironment: "jsdom",
  moduleNameMapper: {
    // Required in addition to the antd mock so that submodules such as antd/lib/button are effectively mocked as well.
    antd: "<rootDir>/__mocks__/antd.js",
  },
  transformIgnorePatterns: [
    // See babel.config.js.
    // Transpiling ESM packages to CJS because Jest doesn't support ESM fully yet.
    // See https://jestjs.io/docs/en/ecmascript-modules.
    `[/\\\\]node_modules[/\\\\](?!${esmPackages.join(
      "|",
    )}).+\\.(${extensions.join("|")})$`,
  ],
};
