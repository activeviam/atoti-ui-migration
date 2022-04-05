import yargs from "yargs";
import fs from "fs-extra";
import { migrateUIFolder } from "../migrateUIFolder";

yargs
  .command(
    "$0",
    "Migrates a JSON /ui folder from ActiveUI 4 to ActiveUI 5. The resulting JSON file is ready to be imported under /ui on a Content Server, to be used by ActiveUI 5.",
    (args) => {
      args.option("input-path", {
        alias: "i",
        string: true,
        demandOption: true,
        desc: "The path to the JSON export of the ActiveUI 4 /ui folder.",
      });
      args.option("output-path", {
        alias: "o",
        string: true,
        demandOption: true,
        desc: "The path to the migrated file, ready to be imported into the Content Server and used in ActiveUI 5.",
      });
      args.option("servers-path", {
        alias: "s",
        string: true,
        demandOption: true,
        desc: "The path to the JSON file holding the servers information.",
      });
    },
    async ({
      inputPath,
      outputPath,
      serversPath,
    }: {
      inputPath: string;
      outputPath: string;
      serversPath: string;
    }) => {
      const legacyUIFolder = await fs.readJSON(inputPath);
      const servers = await fs.readJSON(serversPath);
      const migratedUIFolder = migrateUIFolder(legacyUIFolder, servers);
      await fs.writeJSON(outputPath, migratedUIFolder, { spaces: 2 });
      // FIXME Rely on yargs instead of having to call process.exit manually.
      // See https://support.activeviam.com/jira/browse/UI-7198
      process.exit(0);
    }
  )
  .demandCommand(1)
  .strict()
  .parse();
