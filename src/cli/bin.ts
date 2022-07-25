import yargs from "yargs";
import fs from "fs-extra";
import { migrateUIFolder } from "../migrateUIFolder";
import { migratePivotFolder } from "../migratePivotFolder";

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
        desc: "The path to the JSON export of the ActiveUI 4 /pivot folder",
      });
    },
    async ({
      inputPath,
      outputPath,
      serversPath,
      removeWidgets: keysOfWidgetPluginsToRemove,
      pivotInputPath,
    }: {
      inputPath: string;
      outputPath: string;
      serversPath: string;
      removeWidgets: string[];
      pivotInputPath?: string;
    }) => {
      const legacyUIFolder = await fs.readJSON(inputPath);
      const legacyPivotFolder = pivotInputPath
        ? await fs.readJSON(pivotInputPath)
        : undefined;
      const servers = await fs.readJSON(serversPath);
      const migratedUIFolder = migrateUIFolder(
        legacyUIFolder,
        servers,
        keysOfWidgetPluginsToRemove
      );
      const migratedUIFolderWithCalculatedMeasures = legacyPivotFolder
        ? await migratePivotFolder(legacyPivotFolder, migratedUIFolder, servers)
        : migratedUIFolder;

      await fs.writeJSON(outputPath, migratedUIFolderWithCalculatedMeasures, {
        spaces: 2,
      });
      // FIXME Rely on yargs instead of having to call process.exit manually.
      // See https://support.activeviam.com/jira/browse/UI-7198
      process.exit(0);
    }
  )
  .demandCommand(1)
  .strict()
  .parse();
