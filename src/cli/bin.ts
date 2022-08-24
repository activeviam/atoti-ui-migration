import yargs from "yargs";
import fs from "fs-extra";
import { migrateUIFolder } from "../migrateUIFolder";
import path from "path";

yargs
  .command(
    "$0",
    "Migrates a JSON /ui folder from ActiveUI 4 to ActiveUI 5. The resulting JSON file is ready to be imported under /ui on a Content Server, to be used by ActiveUI 5.",
    (args) => {
      args.option("input-path", {
        alias: "i",
        type: "string",
        demandOption: true,
        desc: "The path to the JSON export of the ActiveUI 4 /ui folder.",
      });
      args.option("output-path", {
        alias: "o",
        type: "string",
        demandOption: true,
        desc: "The path to the migrated file, ready to be imported into the Content Server and used in ActiveUI 5.",
      });
      args.option("servers-path", {
        alias: "s",
        type: "string",
        demandOption: true,
        desc: "The path to the JSON file holding the servers information.",
      });
      args.option("remove-widgets", {
        type: "array",
        demandOption: false,
        desc: "A list of keys of ActiveUI 4 widget plugins that should be removed during the migration.",
      });
      args.option("pivot-input-path", {
        alias: "p",
        type: "string",
        demandOption: false,
        desc: "The path to the JSON export of the /pivot folder on the content server.",
      });
      args.option("debug", {
        type: "boolean",
        demandOption: false,
        default: false,
        desc: "Whether to create a file containing details about the errors encountered during the migration.",
      });
      args.option("stack", {
        type: "boolean",
        demandOption: false,
        default: false,
        desc: "Whether to include stacktraces in the error report file.",
      });
    },
    async ({
      inputPath,
      outputPath,
      serversPath,
      removeWidgets: keysOfWidgetPluginsToRemove,
      pivotInputPath,
      debug: doesCreateReportFile,
      stack: doesReportIncludeStacks,
    }: {
      inputPath: string;
      outputPath: string;
      serversPath: string;
      removeWidgets: string[];
      pivotInputPath?: string;
      debug: boolean;
      stack: boolean;
    }) => {
      const legacyUIFolder = await fs.readJSON(inputPath);
      const legacyPivotFolder = pivotInputPath
        ? await fs.readJSON(pivotInputPath)
        : undefined;
      const servers = await fs.readJSON(serversPath);

      const [migratedUIFolder, counters, errorReport] = await migrateUIFolder(
        legacyUIFolder,
        {
          legacyPivotFolder,
          servers,
          keysOfWidgetPluginsToRemove,
          doesReportIncludeStacks,
        },
      );

      const { dir } = path.parse(outputPath);

      await fs.writeJSON(outputPath, migratedUIFolder, {
        spaces: 2,
      });

      if (errorReport) {
        if (!doesCreateReportFile) {
          console.log(`--------- END OF CONTENT MIGRATION ---------
# Dashboards
- ${counters.dashboards.success} were succesfully migrated.
- ${counters.dashboards.partial} were partially migrated, but errors occurred in some of the widgets they contain. These widgets were copied as is into the migrated dashboards.
- ${counters.dashboards.failed} could not be migrated because errors occurred during their migration. They were copied as is into the migrated folder.

# Filters
- ${counters.filters.success} were succesfully migrated.
- ${counters.filters.failed} could not be migrated because errors occurred during their migration. 

# Widgets
- ${counters.widgets.success} were succesfully migrated.
- ${counters.widgets.removed} were removed.
- ${counters.widgets.failed} could not be migrated because errors occurred during their migration. They were copied as is into the migrated folder.

For more information about the errors that occurred, rerun the command with the \`--debug\` option. 
This will output a file named \`report.json\` containing the error messages.
To see the stack traces of the errors in this file, you can also use the \`--stack\` option.
--------------------------------------------`);
        } else {
          await fs.writeJSON(path.join(...dir, "report.json"), errorReport, {
            spaces: 2,
          });
          console.error(
            "The migration ended with some errors, see `report.json`.",
          );
        }
      } else {
        console.log("The migration ended with no errors.");
      }
      // FIXME Rely on yargs instead of having to call process.exit manually.
      // See https://support.activeviam.com/jira/browse/UI-7198
      process.exit(0);
    },
  )
  .demandCommand(1)
  .strict()
  .parse();
