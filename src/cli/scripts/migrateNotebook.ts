import { migrateWidget } from "../../5.0_to_5.1/migrateWidget";
import fs from "fs-extra";
import { DataModel } from "@activeviam/data-model-5.1";
import _fromPairs from "lodash/fromPairs";
import _mapValues from "lodash/mapValues";
import { getIndexedDataModel } from "@activeviam/data-model-5.1";
import { parse } from "@activeviam/activeui-sdk-5.1";
import { stringify } from "@activeviam/mdx-5.0";

// const migrationSteps: {
//   from: string;
//   to: string;
// }[] = [{ from: "0.7", to: "0.8" }];
// const fromVersions = migrationSteps.map(({ from }) => from);
// const toVersions = migrationSteps.map(({ to }) => to);

/**
 * Migrates a Jupter Notebook from atoti 0.7 to 0.8.
 */
export const migrateNotebook = async ({
  inputPath,
  outputPath,
  serversPath,
  fromVersion,
  toVersion,
  doesReportIncludeStacks,
}: {
  inputPath: string;
  outputPath: string;
  serversPath: string;
  fromVersion: string;
  toVersion: string;
  doesReportIncludeStacks: any;
}): Promise<void> => {
  const notebook = await fs.readJSON(inputPath);
  const servers: {
    [serverKey: string]: { dataModel: DataModel<"raw">; url: string };
  } = await fs.readJSON(serversPath);
  const dataModels = _mapValues(servers, ({ dataModel }) =>
    getIndexedDataModel(dataModel),
  );

  // ME: really need a content server to get the potential calculated measure ?
  //   const namesOfCalculatedMeasuresToMigrate =
  //     getNamesOfCalculatedMeasuresToMigrate(contentServer);
  //   // Accumulate the cubes to which the saved calculated measures belong.
  //   const measureToCubeMapping: { [measureName: string]: string[] } = {};

  //   const counters = _fromPairs(
  //     ["dashboards", "widgets", "filters", "folders", "calculated_measures"].map(
  //       (type) => [
  //         type,
  //         {
  //           success: 0,
  //           partial: 0,
  //           failed: 0,
  //           removed: 0,
  //         },
  //       ],
  //     ),
  //     // _fromPairs returns a Dictionary.
  //     // In this case, the keys used correspond to the attributes of OutcomeCounters.
  //   ) as OutcomeCounters;
  //   const errorReport = {};

  console.log("--------- START OF NOTEBOOK MIGRATION ---------");

  for (const cell of notebook.cells) {
    if ("atoti" in cell.metadata) {
      const widgetState = cell.metadata.atoti.widget;

      // The widgetState MDXs (query MDX and the filters MDX) need to be converted to AST before migrating the widget.
      widgetState.query.mdx = parse(widgetState.query.mdx);
      if (Object.keys(widgetState).includes("filters")) {
        widgetState.filters = widgetState.filters.map((filter: string) =>
          parse(filter),
        );
      }

      migrateWidget(widgetState, {
        dataModels,
        supportCalculatedMeasuresMigration: false,
        namesOfCalculatedMeasuresToMigrate: [],
        measureToCubeMapping: {},
      });

      widgetState.query.mdx = stringify(widgetState.query.mdx);
    }
  }

  await fs.writeJSON(outputPath, notebook, { spaces: 2 });

  console.log("--------- END OF NOTEBOOK MIGRATION ---------");
};
