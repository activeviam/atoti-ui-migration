import fs from "fs-extra";
import path from "path";
import _capitalize from "lodash/capitalize";

import {
  BehaviorOnError,
  ErrorReport,
  OutcomeCounters,
} from "./migration.types";

const summaryMessages: {
  [folderName: string]: {
    [outcome: string]:
      | string
      | { [behaviorOnError in BehaviorOnError]: string };
  };
} = {
  dashboards: {
    success: "were successfully migrated.",
    partial:
      "were partially migrated, but errors occurred in some of the widgets they contain. These widgets were copied as is into the migrated dashboards.",
    failed: {
      "keep-original":
        "could not be migrated because errors occurred during their migration. Their original versions were copied as is into the migrated folder.",
      "keep-last-successful-version":
        "could not be migrated because errors occurred during their migration. The version obtained after the last successful migration step was copied as is into the migrated folder.",
      "keep-going":
        "had errors occurring during their migration. They were tentatively migrated to the desired version, but very likely have issues and won't work well in the UI.",
    },
    removed:
      "were cleaned up because they could not be found in the ui/dashboards/structure folder. They were already not visible in your version of ActiveUI.",
  },
  filters: {
    success: "were successfully migrated.",
    failed: {
      "keep-original":
        "could not be migrated because errors occurred during their migration. Their original versions were copied as is into the migrated folder.",
      "keep-last-successful-version":
        "could not be migrated because errors occurred during their migration. The version obtained after the last successful migration step was copied as is into the migrated folder.",
      "keep-going":
        "had errors occurring during their migration. They were tentatively migrated to the desired version, but very likely have issues and won't work well in the UI.",
    },
    removed:
      "were cleaned up because they could not be found in the ui/filters/structure folder. They were already not visible in your version of ActiveUI.",
  },
  widgets: {
    success: "were successfully migrated.",
    partial: "were migrated with warnings.",
    removed:
      "were cleaned up because they could not be found in the ui/widgets/structure folder or because their keys were passed in the --remove-widgets option.",
    failed: {
      "keep-original":
        "could not be migrated because errors occurred during their migration. Their original versions were copied as is into the migrated folder.",
      "keep-last-successful-version":
        "could not be migrated because errors occurred during their migration. The version obtained after the last successful migration step was copied as is into the migrated folder.",
      "keep-going":
        "had errors occurring during their migration. They were tentatively migrated to the desired version, but very likely have issues and won't work well in the UI.",
    },
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

/**
 * Logs the outcome of the migration in the console, which includes the number of successful/failed individual resource migrations.
 * If `debug` is set to `true`, also logs the detailed `errorReport` in a `report.json` file under `migrationOutputDirectory`.
 */
export async function logMigrationReport({
  counters,
  errorReport,
  debug,
  doesReportIncludeStacks,
  behaviorOnError,
  migrationOutputDirectory,
}: {
  counters: OutcomeCounters;
  errorReport: ErrorReport;
  debug: boolean;
  doesReportIncludeStacks: boolean;
  behaviorOnError: BehaviorOnError;
  migrationOutputDirectory: string;
}): Promise<void> {
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
            `- ${counter} ${
              outcome === "failed" && folderName !== "calculated_measures"
                ? // Apart from calculated measures, all the content types with a failed outcome have a message per behavior on error.
                  (
                    summaryMessages[folderName][outcome] as {
                      [behaviorOnError: string]: string;
                    }
                  )[behaviorOnError]
                : summaryMessages[folderName][outcome]
            }`,
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
    if (!doesReportIncludeStacks) {
      console.log(
        "To see the stack traces of the errors in this file, you can also use the `--stack` option.",
      );
    }
  }

  console.log("--------------------------------------------");

  if (errorReport && debug) {
    await fs.writeJSON(
      path.join(...migrationOutputDirectory, "report.json"),
      errorReport,
      {
        spaces: 2,
      },
    );
  }
}
