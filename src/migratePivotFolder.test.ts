import { ContentRecord } from "@activeviam/activeui-sdk";
import { migratePivotFolder } from "./migratePivotFolder";
import { migrateUIFolder } from "./migrateUIFolder";
import { servers } from "./__test_resources__/servers";
import { smallLegacyPivotFolder } from "./__test_resources__/smallLegacyPivotFolder";
import { smallLegacyUIFolder } from "./__test_resources__/smallLegacyUIFolder";
import { uiFolderWithoutCalculatedMeasuresEntry } from "./__test_resources__/uiFolderWithoutCalculatedMeasuresEntry";

describe("migratePivotFolder", () => {
  beforeAll(() => {
    const generateId = require("./generateId");
    let counter = 0;
    jest.spyOn(generateId, "generateId").mockImplementation(() => {
      const id = `00${counter}`;
      counter += 1;
      return id;
    });
  });

  it("returns a valid ActiveUI5 /ui folder", async () => {
    const migratedUIFolder = migrateUIFolder(smallLegacyUIFolder, servers);
    const migratedUIFolderWithCalculatedMeasures = await migratePivotFolder(
      smallLegacyPivotFolder,
      migratedUIFolder
    );

    expect(migratedUIFolderWithCalculatedMeasures).toMatchSnapshot();
  });

  it("returns a valid ActiveUI5 /ui folder on an input that does not contain an entry for calculated measures", async () => {
    const migratedUIFolderWithCalculatedMeasures = await migratePivotFolder(
      smallLegacyPivotFolder,
      uiFolderWithoutCalculatedMeasuresEntry
    );

    expect(migratedUIFolderWithCalculatedMeasures).toMatchSnapshot();
  });
});
