# SCB MarketRisk Content Migration

## Offline installation

In order to allow users without access to Activeviam's private npm registry, this branch an be used offline. See https://classic.yarnpkg.com/en/docs/yarnrc#toc-yarn-offline-mirror

To update to a new version of the dependencies,

- update `package.json` accordingly
- remove `node_modules` and `yarn.lock`.

Run `npm install` without artifactory access.

## Build the script

Run `npm run build` to build the script. If you encounter openssl error as below,

## Run the script

Run the script with the input files. The migrated content will be available in the output file.

```bash
npm start -- --debug --input-path content_of_ui.json --servers-path servers.json --output-path migrated.json
```

By enabling debug flag, it will generate `report.json` file which includes the error messages for the items failed to migrate.

```json
  "widgetName": "Trade Details",
  "error": {
    "message": "Expression [New/Existing Trades] cannot be resolved as a member of cube \"MarketRiskCube\"."
  }
```
