import { _getPathToContentRecord } from "./_getPathToContentRecord";
import { legacyUIFolder } from "./__test_resources__/legacyUIFolder";

describe("_getPathToContentRecord", () => {
  it("returns the path to the content record", () => {
    expect(
      _getPathToContentRecord(
        legacyUIFolder?.children?.bookmarks?.children?.structure!,
        "b06",
      ),
    ).toEqual(["3f3"]);
  });
});
