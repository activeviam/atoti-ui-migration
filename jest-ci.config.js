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
  reporters: ["default"],
};
