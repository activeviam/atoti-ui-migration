import { _getMapOfFolderIds } from "./_getMapOfFolderIds";
import { legacyUIFolder } from "../__test_resources__/legacyUIFolder";

describe("_getMapOfFolderIds", () => {
  it("returns a map of all records mapped to their paths", () => {
    expect(
      _getMapOfFolderIds(
        legacyUIFolder.children!.bookmarks!.children!.structure,
      ),
    ).toMatchInlineSnapshot(`
      Object {
        "02d": Array [],
        "0xb": Array [],
        "158": Array [],
        "1fe": Array [],
        "296": Array [
          "41c",
        ],
        "310": Array [
          "a05",
        ],
        "34d": Array [],
        "3a2": Array [],
        "3f3": Array [],
        "419": Array [],
        "41c": Array [],
        "4aa": Array [],
        "695": Array [],
        "75a": Array [],
        "76c": Array [],
        "77d": Array [
          "3f3",
        ],
        "9e3": Array [],
        "a05": Array [],
        "a5b": Array [
          "41c",
        ],
        "a9c": Array [],
        "abc": Array [],
        "afd": Array [],
        "b06": Array [
          "3f3",
        ],
        "bed": Array [],
        "c1a": Array [],
        "c8a": Array [],
        "cfd": Array [],
        "d67": Array [],
        "dec": Array [],
        "dfa": Array [],
        "e18": Array [],
        "e2b": Array [],
        "e5d": Array [],
        "eac": Array [
          "41c",
        ],
        "eef": Array [],
        "f06": Array [
          "3f3",
        ],
        "fba": Array [],
      }
    `);
  });
});
