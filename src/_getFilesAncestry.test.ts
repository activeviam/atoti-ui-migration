import { _getFilesAncestry } from "./_getFilesAncestry";
import { contentServer } from "./5.0_to_5.1/__test_resources__/contentServer";

describe("_getFilesAncestry", () => {
  it("returns a map from file id to the ids and names of the parent folders of the file.", () => {
    const dashboardsStructure =
      contentServer.children?.ui.children?.dashboards.children?.structure!;
    expect(_getFilesAncestry(dashboardsStructure)).toMatchInlineSnapshot(`
      Object {
        "14f": Array [
          Object {
            "id": "346",
            "name": "MAD",
          },
        ],
        "241": Array [
          Object {
            "id": "346",
            "name": "MAD",
          },
          Object {
            "id": "31b",
            "name": "lil mad",
          },
        ],
        "31b": Array [
          Object {
            "id": "346",
            "name": "MAD",
          },
        ],
        "346": Array [],
        "387": Array [],
        "478": Array [
          Object {
            "id": "346",
            "name": "MAD",
          },
          Object {
            "id": "31b",
            "name": "lil mad",
          },
        ],
        "524": Array [],
      }
    `);
  });
});
