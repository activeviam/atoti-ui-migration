/** The mapping of each UI version corresponding to a supported Python API version */
const versionMapping: { [atotiVersion: string]: string } = {
  "0.7": "5.0",
  "0.8": "5.1",
};

const atotiValidFromVersions = ["0.7"];
const atotiValidToVersions = ["0.8"];

const validFromVersions = ["4.3", "5.0"] as const;
const validToVersions = ["5.0", "5.1"] as const;

export type ValidFromVersion = typeof validFromVersions[number];
export type ValidToVersion = typeof validToVersions[number];

function validateFromVersion(version: string): ValidFromVersion {
  if (![...validFromVersions, ...atotiValidFromVersions].includes(version)) {
    throw new Error(
      `Migrating from version ${version} is not valid. Valid versions are ${[
        ...validFromVersions,
        ...atotiValidFromVersions,
      ].join(", ")}.`,
    );
  }
  if (atotiValidFromVersions.includes(version)) {
    return versionMapping[version] as ValidFromVersion;
  }
  return version as ValidFromVersion;
}

function validateToVersion(version: string): ValidToVersion {
  if (![...validToVersions, ...atotiValidToVersions].includes(version)) {
    throw new Error(
      `Migrating to version ${version} is not valid. Valid versions are ${[
        ...validToVersions,
        ...atotiValidToVersions,
      ].join(", ")}.`,
    );
  }
  if (atotiValidToVersions.includes(version)) {
    return versionMapping[version] as ValidToVersion;
  }
  return version as ValidToVersion;
}

export function validateVersion(versions: {
  fromVersion: string;
  toVersion: string;
}): { fromVersion: ValidFromVersion; toVersion: ValidToVersion } {
  const fromVersion = validateFromVersion(versions.fromVersion);
  const toVersion = validateToVersion(versions.toVersion);
  return { fromVersion, toVersion };
}
