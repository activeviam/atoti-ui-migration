import { _getFilesAncestry } from "./_getFilesAncestry";
import { contentServer } from "./5.0_to_5.1/__test_resources__/contentServer";

describe("_getFilesAncestry", () => {
  it("returns a map from file id to the ids and names of the parent folders of the file.", () => {
    const dashboardsStructure =
      contentServer.children?.ui.children?.dashboards.children?.structure!;
    expect(_getFilesAncestry(dashboardsStructure)).toMatchInlineSnapshot(`
      {
        "14f": [
          {
            "id": "346",
            "name": "MAD",
          },
        ],
        "241": [
          {
            "id": "346",
            "name": "MAD",
          },
          {
            "id": "31b",
            "name": "lil mad",
          },
        ],
        "31b": [
          {
            "id": "346",
            "name": "MAD",
          },
        ],
        "346": [],
        "387": [],
        "478": [
          {
            "id": "346",
            "name": "MAD",
          },
          {
            "id": "31b",
            "name": "lil mad",
          },
        ],
        "524": [],
      }
    `);
  });
});
