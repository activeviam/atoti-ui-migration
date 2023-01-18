/* eslint-disable @typescript-eslint/no-var-requires */
const { jestConfig } = require("@activeviam/activeui-sdk-scripts");
const pkgDir = require("pkg-dir");

const root = pkgDir.sync();

if (!root) {
  throw new Error("Could not find root.");
}

const extensions = ["js", "jsx", "ts", "tsx", "mjs", "json"];
const esmPackages = [
  "@activeviam/data-model",
  "@activeviam/icons",
  "@activeviam/mdx",
  "@activeviam/mdx-lexer",
  "@activeviam/mdx-parser",
  "@activeviam/plugins-core",
  "@activeviam/theme",
  "@activeviam/utils",
  "monaco-editor",
  "lodash-es",
  "@react-dnd",
  "react-dnd",
  "dnd-core",
];

module.exports = {
  ...jestConfig,
  reporters: ["default"],
  transformIgnorePatterns: [
    // Transpiling ESM packages to CJS because Jest doesn't support ESM fully yet.
    // See https://jestjs.io/docs/en/ecmascript-modules.
    `[/\\\\]node_modules[/\\\\](?!${esmPackages.join(
      "|",
    )}).+\\.(${extensions.join("|")})$`,
  ],
};
