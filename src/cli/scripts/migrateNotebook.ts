import { migrateWidget } from "../../5.0_to_5.1/migrateWidget";
import fs from "fs-extra";
import { DataModel, getIndexedDataModel } from "@activeviam/data-model-5.1";
import _mapValues from "lodash/mapValues";
import { serializeWidgetState } from "@activeviam/activeui-sdk-5.1";
import { deserializeWidgetState } from "@activeviam/activeui-sdk-5.0";
import { MigrateWidgetCallback } from "../../migration.types";
import {
  AtotiUIFromVersion,
  AtotiUIToVersion,
} from "./convertAtotiToAUIVersions";
import { produce } from "immer";

const migrationSteps: {
  from: string;
  to: string;
  migrateWidget: MigrateWidgetCallback<any, any, any>;
}[] = [{ from: "5.0", to: "5.1", migrateWidget: migrateWidget }];

/**
 * Migrates the Atoti UI widgets from 5.0 to 5.1 of an Atoti Jupter Notebook.
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
  fromVersion: AtotiUIFromVersion;
  toVersion: AtotiUIToVersion;
}): Promise<void> => {
  const notebook = await fs.readJSON(inputPath);

  const servers: {
    [serverKey: string]: { dataModel: DataModel<"raw">; url: string };
  } = await fs.readJSON(serversPath);

  const dataModels = _mapValues(servers, ({ dataModel }) =>
    getIndexedDataModel(dataModel),
  );

  let numberOfFailures = 0;
  let numberOfMigratedWidgets = 0;

  const migrateWidgetFunctions = migrationSteps
    .filter(
      (migrationStep) =>
        migrationStep.from === fromVersion || migrationStep.to === toVersion,
    )
    .map((migrationStep) => migrationStep.migrateWidget);

  for (const cell of notebook.cells) {
    if ("atoti" in cell.metadata) {
      const widgetState = cell.metadata.atoti.widget;
      const deserializedWidgetState = deserializeWidgetState(widgetState);

      const updatedWidgetState = produce(deserializedWidgetState, (draft) => {
        migrateWidgetFunctions.forEach((migrateWidgetFunction) => {
          try {
            migrateWidgetFunction(draft, {
              dataModels,
              options: {},
            });
            numberOfMigratedWidgets += 1;
          } catch {
            numberOfFailures += 1;
          }
        });
      });

      // @ts-expect-error The deserializedWidgetState has been migrated to AWidgetState5.1 where its filters are of type Filter and not MdxExpression.
      cell.metadata.atoti.widget = serializeWidgetState(updatedWidgetState);
    }
  }

  await fs.writeJSON(outputPath, notebook, { spaces: 2 });

  console.log(`- Succesfully migrated ${numberOfMigratedWidgets} widget(s).`);
  if (numberOfFailures > 0) {
    console.log(`- Failed to migrate ${numberOfFailures} widget(s)`);
  }
};
