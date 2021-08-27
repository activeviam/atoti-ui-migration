import execa from "execa";
import fs from "fs-extra";
import path from "path";
import pkgDir from "pkg-dir";
import os from "os";

const binPath = path.join(pkgDir.sync()!, "bin");

// Make sure to rebuild the package before running the test.
describe("Migration CLI", () => {
  it("creates a json file corresponding to the input AUI4 content migrated to AUI5", async () => {
    const pathToTmpDirectory = await fs.mkdtemp(`${os.tmpdir()}${path.sep}`);
    const outputFileName = "aui5_ui_folder.json";
    const pathToTmpOutput = path.join(pathToTmpDirectory, outputFileName);

    try {
      // Migrate through the CLI.
      await execa("node", [
        binPath,
        "-i",
        path.join(__dirname, "..", "__test_resources__", "aui4_ui_folder.json"),
        "-s",
        path.join(__dirname, "..", "__test_resources__", "servers.json"),
        "-o",
        pathToTmpOutput,
      ]);

      const outputFiles = await fs.readdir(pathToTmpDirectory);
      expect(outputFiles.length).toBe(1);
      expect(outputFiles[0]).toBe(outputFileName);

      const migratedContent = await fs.readJson(pathToTmpOutput);
      expect(migratedContent).toMatchSnapshot();
    } finally {
      await fs.rm(pathToTmpDirectory, { force: true, recursive: true });
    }
  });
});
