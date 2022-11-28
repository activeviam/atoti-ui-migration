import { legacySettingsFolder } from "./legacySettingsFolder";
import { migrateSettingsFolder } from "./migrateSettingsFolder";

describe("migrateSettingsFolder", () => {
  it("returns the folders corresponding to the converted ActiveUI 4 settings folder, ready to be used by ActiveUI 5", () => {
    expect(migrateSettingsFolder(legacySettingsFolder)).toMatchSnapshot();
  });

  it("returns an empty 'organization_settings' file and an empty 'users' folder when there is no settings folder", () => {
    expect(migrateSettingsFolder()).toMatchSnapshot();
  });
});
