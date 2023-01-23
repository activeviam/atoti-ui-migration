module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    // We console.log errors in the build script.
    // This prevents eslint from complaining about them.
    "no-console": "off",
    // Gives false positives. Let TypeScript handle it.
    "import/default": "off",
    // Gives false positives. Let TypeScript handle it.
    "import/named": "off",
    "import/no-extraneous-dependencies": "error",
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-expect-error": "allow-with-description",
        "ts-ignore": true,
        "ts-nocheck": true,
        "ts-check": false,
        minimumDescriptionLength: 10,
      },
    ],
    // Rules to consider re-enabling:
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
  },
};
