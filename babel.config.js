// Used by Jest to transpile files before running test.
// The `transformIgnorePatterns` propery in the Jest config controls which files the transformations are applied to.
module.exports = {
  presets: [
    [
      // Transpile ESM to CJS.
      require.resolve("@babel/preset-env"),
      {
        targets: { node: "current" },
        modules: "commonjs",
      },
    ],
    [
      // Transpile TypeScript to JavaScript.
      require.resolve("@babel/preset-typescript"),
    ],
  ],
};
