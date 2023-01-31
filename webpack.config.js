/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const webpack = require("webpack");

// Instead of using `activeui-sdk-scripts build`, this package is built with a Webpack config that mocks browser APIs and UI related modules.
// This allows the functions exported by this package to be run smoothly in a Node.js environment (see https://support.activeviam.com/jira/browse/UI-6165).
module.exports = {
  entry: {
    index: "./src/index.ts",
    bin: "./src/cli/bin.ts",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ttf$/i,
        use: ["file-loader"],
      },
      {
        test: /\.woff.?$/i,
        use: ["file-loader"],
      },
    ],
  },
  output: {
    hashFunction: "xxhash64",
    globalObject: "window",
    filename: (pathData) => {
      return pathData.chunk.name === "bin" ? "cli/[name].js" : "[name].js";
    },
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  target: "node",
  resolve: {
    extensions: [".js", ".ts"],
    modules: ["node_modules"],
    alias: {
      "mocked-window": path.resolve(__dirname, "mockedWindow"),
      "mocked-navigator": path.resolve(__dirname, "mockedNavigator"),
      "react-dnd": path.resolve(__dirname, "__mocks__", "react-dnd"),
      "@emotion/react/jsx-runtime": path.resolve(
        __dirname,
        "__mocks__",
        "@emotion",
        "react",
        "jsx-runtime",
      ),
      react: path.resolve(__dirname, "__mocks__", "react"),
      "react-dom": false,
      "react-intl": false,
      antd: false,
      "@ant-design/icons": false,
    },
  },
  mode: "none",
  plugins: [
    new webpack.ProvidePlugin({
      window: "mocked-window",
      navigator: "mocked-navigator",
    }),
  ],
  // Ignore warnings due to yarg's dynamic module loading as there is no fix for this.
  // See: https://github.com/yargs/yargs/issues/781.
  ignoreWarnings: [{ module: /node_modules\/yargs|require-main-filename/ }],
};
