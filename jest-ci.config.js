/* eslint-disable @typescript-eslint/no-var-requires */
const { jestConfig } = require("@activeviam/activeui-sdk-scripts");
const path = require("path");
const pkgDir = require("pkg-dir");

const root = pkgDir.sync();

if (!root) {
  throw new Error("Could not find root.");
}

module.exports = {
  ...jestConfig,
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputName: `${path.basename(root)}.xml`,
        suiteName: path.basename(root),
        // Fixing the hardcoded outputDirectory of `activeui-sdk-scripts`.
        // see https://support.activeviam.com/jira/browse/UI-7677
        outputDirectory: path.join(root, "reports", "unit_tests"),
        classNameTemplate: "{classname}",
        titleTemplate: "{title}",
        ancestorSeparator: " › ",
      },
    ],
  ],
};
