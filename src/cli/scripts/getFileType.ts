const supportedFileTypes = ["JSON", "IPYNB"];

export function getFileType(path: string): string {
  const fileType = path.split(".").pop()?.toUpperCase();

  if (!fileType || !supportedFileTypes.includes(fileType)) {
    throw new Error(`File of type ${fileType} are not supported.`);
  }

  return fileType;
}
