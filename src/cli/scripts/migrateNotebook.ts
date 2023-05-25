import { migrateWidget } from "../../5.0_to_5.1/migrateWidget";
import fs from "fs-extra";
import { DataModel, getIndexedDataModel } from "@activeviam/data-model-5.1";
import _mapValues from "lodash/mapValues";
import { serializeWidgetState } from "@activeviam/activeui-sdk-5.1";
import { deserializeWidgetState } from "@activeviam/activeui-sdk-5.0";
import { MigrateWidgetCallback } from "../../migration.types";
import { ValidFromVersion } from "./validateVersions";
import { ValidToVersion } from "./validateVersions";

const migrationSteps: {
  from: string;
  to: string;
  migrateWidget: MigrateWidgetCallback<any, any, any>;
}[] = [{ from: "5.0", to: "5.1", migrateWidget: migrateWidget }];

/**
 * Migrates the AUI widgets from 5.0 to 5.1 of an Atoti Jupter Notebook.
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
  fromVersion: ValidFromVersion;
  toVersion: ValidToVersion;
}): Promise<void> => {
  const notebook = await fs.readJSON(inputPath);

  const servers: {
    [serverKey: string]: { dataModel: DataModel<"raw">; url: string };
  } = await fs.readJSON(serversPath);

  const dataModels = _mapValues(servers, ({ dataModel }) =>
    getIndexedDataModel(dataModel),
  );

  let numberOfFailures = 0;

  const migrateWidgetFunctions = migrationSteps
    .filter(
      (migrationStep) =>
        migrationStep.from === fromVersion || migrationStep.to === toVersion,
    )
    .map((migrationStep) => migrationStep.migrateWidget);

  console.log("--------- START OF NOTEBOOK MIGRATION ---------");

  for (const cell of notebook.cells) {
    if ("atoti" in cell.metadata) {
      const widgetState = cell.metadata.atoti.widget;
      const deserializedWidgetState = deserializeWidgetState(widgetState);

      try {
        migrateWidgetFunctions.forEach((migrateWidgetFunction) => {
          migrateWidgetFunction(deserializedWidgetState, {
            dataModels,
            supportCalculatedMeasuresMigration: false,
            namesOfCalculatedMeasuresToMigrate: [],
            measureToCubeMapping: {},
          });
        });
      } catch {
        numberOfFailures += 1;
      }

      cell.metadata.atoti.widget = serializeWidgetState(
        // @ts-expect-error TypeScript does not expect that the deserializedWidgetState to be formatted as a 5.1 widgetState where its filters are of type filters and not mdx.
        deserializedWidgetState,
      );
    }
  }

  await fs.writeJSON(outputPath, notebook, { spaces: 2 });

  if (numberOfFailures > 0) {
    console.log(`- ${numberOfFailures} widget(s) have failed to migrate -`);
  }

  console.log("--------- END OF NOTEBOOK MIGRATION ---------");
};
