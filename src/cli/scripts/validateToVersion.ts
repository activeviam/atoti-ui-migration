/** The mapping of each UI version corresponding to a supported Python API version */
const versionMapping = {
  "0.7": "5.0",
  "0.8": "5.1",
};
const atotiValidToVersions = ["0.8"];
const validToVersions = ["5.0", "5.1", "0.8"] as const;

export type ValidToVersion = typeof validToVersions[number];

export function validateFromVersion(version: string): ValidToVersion {
  if (![validToVersions, ...atotiValidToVersions].includes(version)) {
    throw new Error("Version to migrate is not available.");
  }
  if (atotiValidToVersions.includes(version)) {
    return versionMapping[version] as ValidToVersion;
  }
  return version as ValidToVersion;
}
