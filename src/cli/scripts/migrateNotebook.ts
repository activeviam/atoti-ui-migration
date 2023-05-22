import { migrateWidget } from "../../5.0_to_5.1/migrateWidget";
import fs from "fs-extra";
import { DataModel } from "@activeviam/data-model-5.1";
import _fromPairs from "lodash/fromPairs";
import _mapValues from "lodash/mapValues";
import { getIndexedDataModel } from "@activeviam/data-model-5.1";
import { parse } from "@activeviam/activeui-sdk-5.1";
import { stringify } from "@activeviam/mdx-5.0";

/**
 * Migrates a Jupter Notebook from atoti 0.7 to 0.8.
 */
export const migrateNotebook = async ({
  inputPath,
  outputPath,
  serversPath,
  fromVersion,
  toVersion,
}: {
  inputPath: string;
  outputPath: string;
  serversPath: string;
  fromVersion: string;
  toVersion: string;
}): Promise<void> => {
  const notebook = await fs.readJSON(inputPath);
  const servers: {
    [serverKey: string]: { dataModel: DataModel<"raw">; url: string };
  } = await fs.readJSON(serversPath);
  const dataModels = _mapValues(servers, ({ dataModel }) =>
    getIndexedDataModel(dataModel),
  );

  const counters: {
    cellId: string;
    outcome: "success" | "failure";
  }[] = [];

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

      try {
        migrateWidget(widgetState, {
          dataModels,
          supportCalculatedMeasuresMigration: false,
          namesOfCalculatedMeasuresToMigrate: [],
          measureToCubeMapping: {},
        });
        counters.push({ cellId: cell.id, outcome: "success" });
      } catch {
        counters.push({ cellId: cell.id, outcome: "failure" });
      }

      widgetState.query.mdx = stringify(widgetState.query.mdx);
    }
  }

  await fs.writeJSON(outputPath, notebook, { spaces: 2 });
  console.log(
    `- ${
      counters.filter((cell) => cell.outcome === "success").length
    } widgets have been correctly migrated -`,
  );
  const numberOfFailures = counters.filter(
    (cell) => cell.outcome === "failure",
  ).length;
  if (numberOfFailures > 0) {
    console.log(`- ${numberOfFailures} widgets have failed to migrate -`);
  }

  console.log("--------- END OF NOTEBOOK MIGRATION ---------");
};
