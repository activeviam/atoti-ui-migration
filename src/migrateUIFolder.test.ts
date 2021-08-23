import { migrateUIFolder } from "./migrateUIFolder";
import { smallLegacyUIFolder } from "./__test_resources__/smallLegacyUIFolder";
import { legacyUIFolder } from "./__test_resources__/legacyUIFolder";
import { servers } from "./__test_resources__/servers";

describe("migrateUIFolder", () => {
  it("returns a valid ActiveUI5 /ui folder on a small input", async () => {
    const migratedUIFolder = migrateUIFolder(smallLegacyUIFolder, servers);
    expect(migratedUIFolder).toMatchSnapshot();
  });

  it("returns a valid ActiveUI5 /ui folder on a real life input", async () => {
    const migratedUIFolder = migrateUIFolder(legacyUIFolder, servers);
    expect(migratedUIFolder).toMatchSnapshot();
  });
});
