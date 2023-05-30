import { convertVersions } from "./convertAtotiToAUIVersions";

describe("validateVersions", () => {
  it("returns correct AtotiUI versions", () => {
    const versions = convertVersions({ fromVersion: "4.3", toVersion: "5.1" });
    expect(versions).toEqual({ fromVersion: "4.3", toVersion: "5.1" });
  });
  it("converts atotiVersion to AtotiUI versions", () => {
    const versions = convertVersions({ fromVersion: "0.7", toVersion: "0.8" });
    expect(versions).toEqual({ fromVersion: "5.0", toVersion: "5.1" });
  });
});
