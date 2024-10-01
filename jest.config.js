/* eslint-disable @typescript-eslint/no-var-requires */
const isCI = require("is-ci");

const extensions = ["js", "jsx", "ts", "tsx", "mjs", "json"];
const esmPackages = [
  "@activeviam/*",
  "lodash-es",
  "monaco-editor",
  "react-dnd-html5-backend",
  "array-move",
];

// Note that in addition to the config below, there are several mocked modules under the __mocks__ folder.
// They correspond to modules that are UI/browser-related and are transitively pulled by @activeviam dependencies, but are not necessary for `activeui-migration` to work in a Node environment.
const config = {
  // TODO manually mock globals such as window and use the default "node" test environment instead.
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]s?$": ["@swc/jest"],
  },
  transformIgnorePatterns: [
    // Transpiling ESM packages to CJS because Jest doesn't support ESM fully yet.
    // See https://jestjs.io/docs/en/ecmascript-modules.
    `[/\\\\]node_modules[/\\\\](?!${esmPackages.join(
      "|",
    )}).+\\.(${extensions.join("|")})$`,
  ],
  moduleNameMapper: {
    // Necessary so that Jest can resolve imports of test resources from @activeviam packages such as the following:
    // `import { sandboxDataModel } from "@activeviam/data-model/dist/__test_resources__"`
    // TODO: try changing those imports to the following to align on the `exports` field of the @activeviam/packages:
    // `import { sandboxDataModel } from "@activeviam/data-model/__test_resources__"`
    // To do so, the webpack config would need to be changed.
    "^(.*)/dist/__test_resources__$": "$1/__test_resources__",
  },
};

const ciConfig = {
  // CircleCI issues: https://discuss.circleci.com/t/jest-out-of-memory-error/32263
  maxWorkers: 2,
};

module.exports = isCI ? { ...config, ...ciConfig } : config;
