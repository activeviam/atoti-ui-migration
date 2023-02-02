import { _getMapOfFolderIds } from "./_getMapOfFolderIds";
import { legacyUIFolder } from "./__test_resources__/legacyUIFolder";

describe("_getMapOfFolderIds", () => {
  it("returns a map of all records mapped to their paths", () => {
    expect(
      _getMapOfFolderIds(
        legacyUIFolder.children!.bookmarks!.children!.structure,
      ),
    ).toMatchInlineSnapshot(`
      {
        "02d": [],
        "0xb": [],
        "158": [],
        "1fe": [],
        "296": [
          "41c",
        ],
        "310": [
          "a05",
        ],
        "34d": [],
        "3a2": [],
        "3f3": [],
        "419": [],
        "41c": [],
        "4aa": [],
        "695": [],
        "75a": [],
        "76c": [],
        "77d": [
          "3f3",
        ],
        "9e3": [],
        "a05": [],
        "a5b": [
          "41c",
        ],
        "a9c": [],
        "abc": [],
        "afd": [],
        "b06": [
          "3f3",
        ],
        "bed": [],
        "c1a": [],
        "c8a": [],
        "cfd": [],
        "d67": [],
        "dec": [],
        "dfa": [],
        "e18": [],
        "e2b": [],
        "e5d": [],
        "eac": [
          "41c",
        ],
        "eef": [],
        "f06": [
          "3f3",
        ],
        "fba": [],
      }
    `);
  });
});
