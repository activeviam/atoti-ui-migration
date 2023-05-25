import { validateVersion } from "./validateVersions";

describe("validateVersions", () => {
  it("returns correct AtotiUI versions", () => {
    const versions = validateVersion({ fromVersion: "4.3", toVersion: "5.1" });
    expect(versions).toEqual({ fromVersion: "4.3", toVersion: "5.1" });
  });
  it("converts atotiVersion to AtotiUI versions", () => {
    const versions = validateVersion({ fromVersion: "0.7", toVersion: "0.8" });
    expect(versions).toEqual({ fromVersion: "5.0", toVersion: "5.1" });
  });

  it("raises warning if fromVersion is not correct", () => {
    const callback = () => {
      validateVersion({ fromVersion: "4.5", toVersion: "5.0" });
    };
    expect(callback).toThrow(
      "Migrating from version 4.5 is not valid. Valid versions are 4.3, 5.0, 0.7",
    );
  });

  it("raises warning if toVersion is not correct", () => {
    const callback = () => {
      validateVersion({ fromVersion: "4.3", toVersion: "8.0" });
    };
    expect(callback).toThrow(
      "Migrating to version 8.0 is not valid. Valid versions are 5.0, 5.1, 0.8.",
    );
  });
});
