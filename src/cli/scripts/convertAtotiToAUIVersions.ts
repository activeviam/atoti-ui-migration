/** The mapping of each UI version corresponding to a supported Python API version */
const versionMapping: { [atotiVersion: string]: string } = {
  "0.7": "5.0",
  "0.8": "5.1",
};

const atotiValidFromVersions = ["0.7"];
const atotiValidToVersions = ["0.8"];

const validFromVersions = ["4.3", "5.0"] as const;
const validToVersions = ["5.0", "5.1"] as const;

export const possibleFromVersions = [
  ...validFromVersions,
  ...atotiValidFromVersions,
];
export const possibleToVersions = [...validToVersions, ...atotiValidToVersions];

export type ValidFromVersion = typeof validFromVersions[number];
export type ValidToVersion = typeof validToVersions[number];

export function convertFromVersion(
  version: typeof possibleFromVersions[number],
): ValidFromVersion {
  if (atotiValidFromVersions.includes(version)) {
    return versionMapping[version] as ValidFromVersion;
  }
  return version as ValidFromVersion;
}

export function convertToVersion(
  version: typeof possibleToVersions[number],
): ValidToVersion {
  if (atotiValidToVersions.includes(version)) {
    return versionMapping[version] as ValidToVersion;
  }
  return version as ValidToVersion;
}

export function convertVersions(versions: {
  fromVersion: typeof possibleFromVersions[number];
  toVersion: typeof possibleToVersions[number];
}): { fromVersion: ValidFromVersion; toVersion: ValidToVersion } {
  const fromVersion = convertFromVersion(versions.fromVersion);
  const toVersion = convertToVersion(versions.toVersion);
  return { fromVersion, toVersion };
}
