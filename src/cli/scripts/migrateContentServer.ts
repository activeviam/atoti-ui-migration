import fs from "fs-extra";
import path from "path";
import _capitalize from "lodash/capitalize";
import _fromPairs from "lodash/fromPairs";
import _mapValues from "lodash/mapValues";
import { ContentRecord, DataModel } from "@activeviam/activeui-sdk-5.1";
import { getIndexedDataModel } from "@activeviam/data-model-5.1";
import {
  BehaviorOnError,
  OutcomeCounters,
  MigrationFunction,
} from "../../migration.types";
import { getMigrateDashboards } from "../../getMigrateDashboards";
import { getMigrateSavedWidgets } from "../../getMigrateSavedWidgets";
import { getMigrateSavedFilters } from "../../getMigrateSavedFilters";
import { migrate_43_to_50 } from "../../4.3_to_5.0";
import { migrate_50_to_51 } from "../../5.0_to_5.1";
import { getContent } from "../../getContent";
import {
  AtotiUIFromVersion,
  AtotiUIToVersion,
} from "./convertAtotiToAUIVersions";

const migrationSteps: {
  from: string;
  to: string;
  migrate: MigrationFunction;
}[] = [{ from: "5.0", to: "5.1", migrate: migrate_50_to_51 }];

const fromVersions = migrationSteps.map(({ from }) => from);
const toVersions = migrationSteps.map(({ to }) => to);

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

export async function migrateContentServer({
  inputPath,
  outputPath,
  serversPath,
  fromVersion,
  toVersion,
  removeWidgets: keysOfWidgetPluginsToRemove,
  debug,
  doesReportIncludeStacks,
  onError: behaviorOnError,
}: {
  inputPath: string;
  outputPath: string;
  serversPath: string;
  fromVersion: AtotiUIFromVersion;
  toVersion: AtotiUIToVersion;
  removeWidgets: string[];
  debug: boolean;
  doesReportIncludeStacks: boolean;
  onError: BehaviorOnError;
}): Promise<void> {
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
    ["dashboards", "widgets", "filters", "folders", "calculated_measures"].map(
      (type) => [
        type,
        {
          success: 0,
          partial: 0,
          failed: 0,
          removed: 0,
        },
      ],
    ),
    // _fromPairs returns a Dictionary.
    // In this case, the keys used correspond to the attributes of OutcomeCounters.
  ) as OutcomeCounters;
  const errorReport = {};

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
    await fs.writeJSON(path.join(...dir, "report.json"), errorReport, {
      spaces: 2,
    });
  }
}
