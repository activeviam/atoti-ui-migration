import yargs from "yargs";
import { BehaviorOnError } from "../migration.types";
import { migrateContentServer } from "./scripts/migrateContentServer";
import { migrateNotebook } from "./scripts/migrateNotebook";
import {
  convertFromVersion,
  convertToVersion,
  convertVersion,
  possibleFromVersions,
  possibleToVersions,
} from "./scripts/convertAtotiToAUIVersions";

const supportedFileExtension = ["JSON", "IPYNB"];

export function getFileExtension(path: string): string {
  const fileExtension = path.split(".").pop()?.toUpperCase();

  if (!fileExtension || !supportedFileExtension.includes(fileExtension)) {
    throw new Error(
      `The extension "${fileExtension}" is not supported. Supported extensions for the input file are "JSON" and "IPYNB"`,
    );
  }
  return fileExtension;
}

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
    onError: BehaviorOnError;
  }>(
    "$0",
    "Migrates a JSON export of a Content Server or an Atoti jupyter notebook, saved with ActiveUI or Atoti version `--from-version` to be usable in version `--to-version`.",
    (args) => {
      args.option("input-path", {
        alias: "i",
        type: "string",
        demandOption: true,
        desc: "The path to the file to migrate. This file can be a JSON export of a Content Server, or an Atoti jupyter notebook.",
      });
      args.option("output-path", {
        alias: "o",
        type: "string",
        demandOption: true,
        desc: "The path to the migrated file, ready to be imported into the Atoti Admin UI and used in your upgraded Atoti UI, if it is a Content Server export. Or ready to be used with your upgraded Atoti JupyterLab extension, if it is a notebook.",
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
        choices: possibleFromVersions,
        desc: "The version to migrate from.",
      });
      args.option("to-version", {
        alias: "t",
        type: "string",
        demandOption: true,
        choices: possibleToVersions,
        desc: "The version to migrate to.",
      });
      args.option("remove-widgets", {
        type: "array",
        demandOption: false,
        desc: "A list of keys of widget plugins that should be removed during the migration.",
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
      args.implies("stack", "debug");
    },
    ({
      inputPath,
      outputPath,
      serversPath,
      fromVersion,
      toVersion,
      removeWidgets,
      debug,
      stack,
      onError,
    }) => {
      const doesReportIncludeStacks = stack;

      const fileExtension = getFileExtension(inputPath);
      const { fromVersion: validFromVersion, toVersion: validToVersion } =
        convertVersion({
          fromVersion,
          toVersion,
        });

      if (fileExtension === "JSON") {
        // Ensure that Atoti versions are not used as versions to migrate content server
        migrateContentServer({
          inputPath,
          outputPath,
          serversPath,
          fromVersion: validFromVersion,
          toVersion: validToVersion,
          removeWidgets,
          debug,
          doesReportIncludeStacks,
          onError,
        });
      } else {
        migrateNotebook({
          inputPath,
          outputPath,
          serversPath,
          fromVersion: validFromVersion,
          toVersion: validToVersion,
        });
      }
    },
  )
  .check(({ fromVersion, toVersion }) => {
    if (convertFromVersion(fromVersion) >= convertToVersion(toVersion)) {
      throw new Error("--to-version must be greater than --from-version");
    }
    return true;
  })
  .demandCommand(1)
  .strict()
  .parse();
