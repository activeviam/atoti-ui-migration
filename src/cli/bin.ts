import yargs from "yargs";
import _capitalize from "lodash/capitalize";
import _cloneDeep from "lodash/cloneDeep";
import fs from "fs-extra";
import { migrate_43_to_50 } from "../4.3_to_5.0/migrate_43_to_50";
import path from "path";
import { ContentRecord, DataModel } from "@activeviam/activeui-sdk-5.0";
import { ErrorReport, OutcomeCounters } from "../4.3_to_5.0/migration.types";
import _fromPairs from "lodash/fromPairs";
import { emptyUIFolder } from "@activeviam/content-server-initialization-5.0";

type MigrationFunction = (
  legacyUIFolder: ContentRecord,
  {
    migratedUIFolder,
    counters,
    errorReport,
    servers,
    keysOfWidgetPluginsToRemove,
    legacyPivotFolder,
    doesReportIncludeStacks,
  }: {
    migratedUIFolder: ContentRecord;
    counters: OutcomeCounters;
    errorReport: ErrorReport;
    servers: {
      [serverKey: string]: {
        dataModel: DataModel;
        url: string;
      };
    };
    keysOfWidgetPluginsToRemove?: string[] | undefined;
    doesReportIncludeStacks: boolean;
    legacyPivotFolder?: ContentRecord<any> | undefined;
  },
) => Promise<void>;

const migrationFunctions: [
  versionFrom: string,
  migrationFunction?: MigrationFunction,
][] = [["4.3", migrate_43_to_50], ["5.0"]];
const versions = migrationFunctions.map(([version]) => version);
const fromVersions = versions.slice(0, -1);
const toVersions = versions.slice(1);

const compose =
  (
    ...[firstMigrationFunction, ...otherMigrationFunctions]: MigrationFunction[]
  ) =>
  async (
    ...[
      legacyUIFolder,
      { migratedUIFolder, ...otherParams },
    ]: Parameters<MigrationFunction>
  ): ReturnType<MigrationFunction> => {
    if (!firstMigrationFunction) {
      return;
    }
    firstMigrationFunction(legacyUIFolder, {
      migratedUIFolder,
      ...otherParams,
    });
    const newMigratedUIFolder: ContentRecord = _cloneDeep(emptyUIFolder);
    compose(...otherMigrationFunctions)(migratedUIFolder, {
      migratedUIFolder: newMigratedUIFolder,
      ...otherParams,
    });
  };

const summaryMessages: { [folderName: string]: { [outcome: string]: string } } =
  {
    dashboards: {
      success: "were successfully migrated.",
      partial:
        "were partially migrated, but errors occurred in some of the widgets they contain. These widgets were copied as is into the migrated dashboards.",
      failed:
        "could not be migrated because errors occurred during their migration. They were copied as is into the migrated folder.",
      removed:
        "were cleaned up because they could not be found in the ui/dashboards/structure folder. They were already not visible in ActiveUI 4.",
    },
    filters: {
      success: "were successfully migrated.",
      failed:
        "could not be migrated because errors occurred during their migration. They were copied as is into the migrated folder.",
      removed:
        "were cleaned up because they could not be found in the ui/filters/structure folder. They were already not visible in ActiveUI 4.",
    },
    widgets: {
      success: "were successfully migrated.",
      partial: "were migrated with warnings.",
      removed:
        "were cleaned up because they could not be found in the ui/widgets/structure folder or because their keys were passed in the --remove-widgets option.",
      failed:
        "could not be migrated because errors occurred during their migration. They were copied as is into the migrated folder.",
    },
    folders: {
      removed:
        "were cleaned up because they could not be found in their structure folder. They were already not visible in ActiveUI 4.",
    },
  };

yargs
  .command<{
    inputPath: string;
    outputPath: string;
    serversPath: string;
    fromVersion: string;
    toVersion: string;
    removeWidgets: string[];
    pivotInputPath?: string;
    debug: boolean;
    stack: boolean;
  }>(
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
      args.option("from-version", {
        alias: "f",
        type: "string",
        demandOption: true,
        choices: fromVersions,
        desc: "The version which the content is migrated from.",
      });
      args.option("to-version", {
        alias: "t",
        type: "string",
        demandOption: true,
        choices: toVersions,
        desc: "The version which the content is migrated to.",
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
        desc: "Whether an error report file is created at the end of the migration.",
      });
      args.option("stack", {
        type: "boolean",
        demandOption: false,
        default: false,
        desc: "Whether stacktraces are included in the error report file.",
      });
    },
    async ({
      inputPath,
      outputPath,
      serversPath,
      fromVersion,
      toVersion,
      removeWidgets: keysOfWidgetPluginsToRemove,
      pivotInputPath,
      debug,
      stack,
    }) => {
      const counters = _fromPairs(
        ["dashboards", "widgets", "filters", "folders"].map((type) => [
          type,
          {
            success: 0,
            partial: 0,
            failed: 0,
            removed: 0,
          },
        ]),
        // _fromPairs returns a Dictionary.
        // In this case, the keys used correspond to the attributes of OutcomeCounters.
      ) as OutcomeCounters;

      const migratedUIFolder: ContentRecord = _cloneDeep(emptyUIFolder);
      const errorReport = {};

      const fromVersionIndex = migrationFunctions.findIndex(
        ([version]) => version === fromVersion,
      );
      const toVersionIndex = migrationFunctions.findIndex(
        ([version]) => version === toVersion,
      );

      const functionsToCompose = migrationFunctions
        .slice(fromVersionIndex, toVersionIndex)
        .map(([, func]) => func);

      const legacyUIFolder = await fs.readJSON(inputPath);
      const legacyPivotFolder = pivotInputPath
        ? await fs.readJSON(pivotInputPath)
        : undefined;
      const servers = await fs.readJSON(serversPath);

      const migrate = compose(...(functionsToCompose as MigrationFunction[]));

      await migrate(legacyUIFolder, {
        migratedUIFolder,
        counters,
        errorReport,
        legacyPivotFolder,
        servers,
        keysOfWidgetPluginsToRemove,
        doesReportIncludeStacks: stack,
      });

      const { dir } = path.parse(outputPath);

      await fs.writeJSON(outputPath, migratedUIFolder, {
        spaces: 2,
      });

      console.log("--------- END OF CONTENT MIGRATION ---------");

      Object.entries(counters)
        .filter(([, countersForFolder]) =>
          Object.values(countersForFolder).some((value) => value > 0),
        )
        .forEach(([folderName, countersForFolder]) => {
          console.log(`\n# ${_capitalize(folderName)}`);
          Object.entries(countersForFolder).forEach(([outcome, counter]) => {
            if (counter > 0) {
              console.log(
                `- ${counter} ${summaryMessages[folderName][outcome]}`,
              );
            }
          });
        });

      console.log("\n");

      if (
        counters.dashboards.failed +
          counters.dashboards.partial +
          counters.filters.failed +
          counters.widgets.failed >
        0
      ) {
        if (!debug) {
          console.log(`For more information about the errors that occurred, rerun the command with the \`--debug\` option. 
This will output a file named \`report.json\` containing the error messages.`);
        } else {
          console.log(
            `See report.json for more information about the errors that occurred.`,
          );
        }
        if (!stack) {
          console.log(
            "To see the stack traces of the errors in this file, you can also use the `--stack` option.",
          );
        }
      }

      console.log("--------------------------------------------");

      if (errorReport && debug) {
        await fs.writeJSON(path.join(...dir, "report.json"), errorReport, {
          spaces: 2,
        });
      }
      // FIXME Rely on yargs instead of having to call process.exit manually.
      // See https://support.activeviam.com/jira/browse/UI-7198
      process.exit(0);
    },
  )
  .check(({ fromVersion, toVersion }) => {
    const fromVersionIndex = migrationFunctions.findIndex(
      ([version]) => version === fromVersion,
    );
    const toVersionIndex = migrationFunctions.findIndex(
      ([version]) => version === toVersion,
    );
    if (fromVersionIndex >= toVersionIndex) {
      throw new Error(`
        You specified ${fromVersion} as the version to migrate your content from, and ${toVersion} as the version to migrate your content to.
        The version to migrate to must be higher than the version to migrate from.
      `);
    }
    return true;
  })
  .demandCommand(1)
  .strict()
  .parse();
