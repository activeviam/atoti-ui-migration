import yargs from "yargs";
import _capitalize from "lodash/capitalize";
import _fromPairs from "lodash/fromPairs";
import _mapValues from "lodash/mapValues";
import fs from "fs-extra";
import path from "path";
import { ContentRecord, DataModel } from "@activeviam/activeui-sdk-5.1";
import { getIndexedDataModel } from "@activeviam/data-model-5.1";
import {
  BehaviorOnError,
  MigrationFunction,
  OutcomeCounters,
} from "../migration.types";
import { gte, coerce } from "semver";
import { getMigrateDashboards } from "../getMigrateDashboards";
import { getMigrateSavedWidgets } from "../getMigrateSavedWidgets";
import { getMigrateSavedFilters } from "../getMigrateSavedFilters";
import { migrate_43_to_50 } from "../4.3_to_5.0";
import { migrate_50_to_51 } from "../5.0_to_5.1";
import { getContent } from "../getContent";

const migrationSteps: {
  from: string;
  to: string;
  migrate: MigrationFunction;
}[] = [{ from: "5.0", to: "5.1", migrate: migrate_50_to_51 }];
const fromVersions = migrationSteps.map(({ from }) => from);
const toVersions = migrationSteps.map(({ to }) => to);

const summaryMessages: { [folderName: string]: { [outcome: string]: string } } =
  {
    dashboards: {
      success: "were successfully migrated.",
      partial:
        "were partially migrated, but errors occurred in some of the widgets they contain. These widgets were copied as is into the migrated dashboards.",
      failed:
        "could not be migrated because errors occurred during their migration. They were copied as is into the migrated folder.",
      removed:
        "were cleaned up because they could not be found in the ui/dashboards/structure folder. They were already not visible in your version of ActiveUI.",
    },
    filters: {
      success: "were successfully migrated.",
      failed:
        "could not be migrated because errors occurred during their migration. They were copied as is into the migrated folder.",
      removed:
        "were cleaned up because they could not be found in the ui/filters/structure folder. They were already not visible in your version of ActiveUI.",
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
        "were cleaned up because they could not be found in their structure folder. They were already not visible in your version of ActiveUI.",
    },
    calculated_measures: {
      success: "were successfully migrated.",
      failed:
        "could not be migrated because errors occurred during their migration.",
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
    debug: boolean;
    stack: boolean;
    behaviorOnError: BehaviorOnError;
  }>(
    "$0",
    "Migrates a JSON /ui folder from ActiveUI 4 to ActiveUI 5. The resulting JSON file is ready to be imported under /ui on a Content Server, to be used by ActiveUI 5.",
    (args) => {
      args.option("input-path", {
        alias: "i",
        type: "string",
        demandOption: true,
        desc: "The path to the JSON export of the Content Server to migrate.",
      });
      args.option("output-path", {
        alias: "o",
        type: "string",
        demandOption: true,
        desc: "The path to the migrated file, ready to be imported into the Content Server and used in the ActiveUI version to migrate to.",
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
        choices: ["4.3", ...fromVersions],
        desc: "The version to migrate from.",
      });
      args.option("to-version", {
        alias: "t",
        type: "string",
        demandOption: true,
        choices: ["5.0", ...toVersions],
        desc: "The version to migrate to.",
      });
      args.option("remove-widgets", {
        type: "array",
        demandOption: false,
        desc: "A list of keys of ActiveUI 4 widget plugins that should be removed during the migration.",
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
      args.option("on-error", {
        type: "string",
        demandOption: false,
        choices: [
          "keep-original",
          "keep-last-successful-version",
          "keep-going",
        ],
        default: "keep-original",
        desc: `The behavior when an error occurs during the migration of an item. This has an effect only when migrating through several versions in one go.
         
          For example, suppose that you're migrating from 5.0 to 5.3. For each saved item (e.g. a dashboard), three migration steps are applied: 5.0 => 5.1, 5.1 => 5.2, and 5.2 => 5.3. Each of these three steps might fail.
         
          More generically, assuming that the error occurred at step p out of a total of n, you can choose one of the following behaviors:
          \n- "keep-original": keep the original item untouched, as before the whole migration.
          \n- "keep-last-successful-version": keep the version of the item obtained after the first p-1 successful steps.
          \n- "keep-going": try to apply the n-p remaining steps to the version of the item obtained after step p, despite the error. Note that the remaining steps are likely to fail too, and in that case the result will be the same as "keep-last-succesful-version".
        `,
      });
    },
    async ({
      inputPath,
      outputPath,
      serversPath,
      fromVersion,
      toVersion,
      removeWidgets: keysOfWidgetPluginsToRemove,
      debug,
      stack,
      behaviorOnError,
    }) => {
      const contentServer: ContentRecord = await fs.readJSON(inputPath);

      const originalDashboardsContent = getContent(
        contentServer,
        "dashboard",
        fromVersion,
      );
      const originalWidgetsContent = getContent(
        contentServer,
        "widget",
        fromVersion,
      );
      const originalFiltersContent = getContent(
        contentServer,
        "filter",
        fromVersion,
      );

      const servers: {
        [serverKey: string]: { dataModel: DataModel<"raw">; url: string };
      } = await fs.readJSON(serversPath);

      const counters = _fromPairs(
        [
          "dashboards",
          "widgets",
          "filters",
          "folders",
          "calculated_measures",
        ].map((type) => [
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
      const errorReport = {};

      const doesReportIncludeStacks = stack;

      // Handle the special case of 4.3 to 5.0 separately, as:
      // - the corresponding migration function has a different signature than all others
      // - in particular, it is the only migration step with async logic
      if (fromVersion === "4.3") {
        await migrate_43_to_50(contentServer, {
          errorReport,
          counters,
          servers,
          keysOfWidgetPluginsToRemove,
          doesReportIncludeStacks,
        });
      }

      const fromVersionIndex =
        fromVersion === "4.3" ? 0 : fromVersions.indexOf(fromVersion);
      const toVersionIndex = toVersions.indexOf(toVersion);

      const dataModels = _mapValues(servers, ({ dataModel }) =>
        getIndexedDataModel(dataModel),
      );

      migrationSteps
        .slice(fromVersionIndex, toVersionIndex + 1)
        .forEach(({ migrate, from, to }) => {
          const step = `${from} to ${to}`;
          const migrateDashboards = getMigrateDashboards(contentServer, {
            originalContent: originalDashboardsContent,
            dataModels,
            keysOfWidgetPluginsToRemove,
            errorReport,
            counters,
            doesReportIncludeStacks,
            behaviorOnError,
            step,
          });

          const migrateSavedWidgets = getMigrateSavedWidgets(contentServer, {
            originalContent: originalWidgetsContent,
            dataModels,
            keysOfWidgetPluginsToRemove,
            errorReport,
            counters,
            doesReportIncludeStacks,
            behaviorOnError,
            step,
          });

          const migrateSavedFilters = getMigrateSavedFilters(contentServer, {
            originalContent: originalFiltersContent,
            dataModels,
            errorReport,
            counters,
            doesReportIncludeStacks,
            behaviorOnError,
            step,
          });

          migrate(contentServer, {
            migrateDashboards,
            migrateSavedWidgets,
            migrateSavedFilters,
            dataModels,
            keysOfWidgetPluginsToRemove,
            errorReport,
            counters,
            doesReportIncludeStacks,
          });
        });

      const { dir } = path.parse(outputPath);

      await fs.writeJSON(outputPath, contentServer, { spaces: 2 });

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
    // The formats of `fromVersion` and `toVersion` are already validated, with yargs' `choices` option.
    // They must be of the form "X.Y", hence `coerce` won't return null.
    if (gte(coerce(fromVersion)!, coerce(toVersion)!)) {
      throw new Error("--to-version must be greater than --from-version");
    }
    return true;
  })
  .demandCommand(1)
  .strict()
  .parse();
