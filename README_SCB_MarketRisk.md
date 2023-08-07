# SCB MarketRisk Content Migration

## Installation without Artifactory
The project comes with all the Atoti UI SDK packages in the vendor folder.

To update to a new version of the dependencies,
- use [perso-tht-atoti-ui-npm-bundler](https://github.com/activeviam/perso-tht-atoti-ui-npm-bundler) to download all the dependencies of the desired version, 
- copy the vendor folder (containing the dependencies tarballs) and 
- use the `output.json` to update `package.json` for `@activeviam` dependencies with tarball files.

Run `npm install` without artifactory access.

## Build the script
Run `npm run build` to build the script. If you encounter openssl error as below, 
```
opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ]
```
set the node options:
- for Unix, `export NODE_OPTIONS=--openssl-legacy-provider`
- for Windows, `set NODE_OPTIONS=--openssl-legacy-provider`

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