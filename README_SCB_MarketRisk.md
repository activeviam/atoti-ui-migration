# SCB MarketRisk Content Migration

## Installation without Artifactory
First, run `npm install` in a PC which has access to Artifactory. It will populate `node_modules` folder with dependent packages.
Look into the `node_modules\@activeviam` which we need to prepare for offline installation.

Run below script to generate tarball files for each of the package under `@activeviam` scope into the folder `vendor`.

```bash
PROJECT_DIR=$(pwd)
for f in node_modules/@activeviam/*; do
    if [ -d "$f" ]; then
        cd $f
        #echo "$PWD"
        npm pack --pack-destination $PROJECT_DIR/vendor/
        cd $PROJECT_DIR
    fi
done
```

Update `package.json` for `@activeviam` dependencies with tarball files.
Finally, It will be ready to `npm install` without artifactory access.

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
npm start --debug --input-path content_of_ui.json --servers-path servers.json --output-path migrated.json
```

 By enabling debug flag, it will generate `report.json` file which includes the error messages for the items failed to migrate.  
```json
  "widgetName": "Trade Details",
  "error": {
    "message": "Expression [New/Existing Trades] cannot be resolved as a member of cube \"MarketRiskCube\"."
  }
```