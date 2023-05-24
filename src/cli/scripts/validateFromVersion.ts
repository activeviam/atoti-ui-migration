/** The mapping of each UI version corresponding to a supported Python API version */
const versionMapping = {
  "0.7": "5.0",
  "0.8": "5.1",
};

const atotiValidFromVersions = ["0.7"];
const validFromVersions = ["4.3", "5.0"] as const;

export type ValidFromVersion = typeof validFromVersions[number];

export function validateFromVersion(version: string): ValidFromVersion {
  if (![validFromVersions, ...atotiValidFromVersions].includes(version)) {
    throw new Error("Version is not valid");
  }
  if (atotiValidFromVersions.includes(version)) {
    return versionMapping[version] as ValidFromVersion;
  }
  return version as ValidFromVersion;
}
