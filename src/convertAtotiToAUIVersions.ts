/** The mapping of each UI version corresponding to a supported Python API version */
const versionMapping: { [atotiVersion: string]: string } = {
  "0.7": "5.0",
  "0.8": "5.1",
};

const atotiPythonValidFromVersions = ["0.7"];
const atotiPythonValidToVersions = ["0.8"];

const atotiUIValidFromVersions = ["4.3", "5.0"] as const;
const atotiUIValidToVersions = ["5.0", "5.1"] as const;

export const validFromVersions = [
  ...atotiUIValidFromVersions,
  ...atotiPythonValidFromVersions,
];
export const validToVersions = [
  ...atotiUIValidToVersions,
  ...atotiPythonValidToVersions,
];

export type AtotiUIFromVersion = typeof atotiUIValidFromVersions[number];
export type AtotiUIToVersion = typeof atotiUIValidToVersions[number];

export function convertFromVersion(
  version: typeof validFromVersions[number],
): AtotiUIFromVersion {
  if (atotiPythonValidFromVersions.includes(version)) {
    return versionMapping[version] as AtotiUIFromVersion;
  }
  return version as AtotiUIFromVersion;
}

export function convertToVersion(
  version: typeof validToVersions[number],
): AtotiUIToVersion {
  if (atotiPythonValidToVersions.includes(version)) {
    return versionMapping[version] as AtotiUIToVersion;
  }
  return version as AtotiUIToVersion;
}

export function convertVersions(versions: {
  fromVersion: typeof validFromVersions[number];
  toVersion: typeof validToVersions[number];
}): { fromVersion: AtotiUIFromVersion; toVersion: AtotiUIToVersion } {
  const fromVersion = convertFromVersion(versions.fromVersion);
  const toVersion = convertToVersion(versions.toVersion);
  return { fromVersion, toVersion };
}
