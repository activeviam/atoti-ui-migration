import { _getFolderName } from "./_getFolderName";

describe("_getFolderName", () => {
  const entryData = {
    isDirectory: true,
    owners: ["admin"],
    readers: ["admin"],
    timestamp: 1607879735685,
    lastEditor: "admin",
    canRead: true,
    canWrite: true,
  };
  const legacyBookmarkContentFolder = {
    folder1: {
      entry: {
        ...entryData,
        content: JSON.stringify({ name: "Name 1" }),
      },
    },
    folder2: {
      entry: {
        ...entryData,
        content: JSON.stringify({ name: "Name 2" }),
      },
    },
    folder3: {
      entry: {
        ...entryData,
        content: JSON.stringify({ name: "Name 3" }),
      },
    },
  };

  it("returns an empty array if `pathOfIds` is empty", () => {
    expect(_getFolderName(legacyBookmarkContentFolder, [])).toEqual([]);
  });

  it("returns the names of the folders identified by `pathOfIds`", () => {
    expect(
      _getFolderName(legacyBookmarkContentFolder, [
        "folder1",
        "folder2",
        "folder3",
      ]),
    ).toEqual(["Name 1", "Name 2", "Name 3"]);
  });
});
