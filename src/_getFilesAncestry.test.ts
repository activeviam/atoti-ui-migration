import { _getFilesAncestry } from "./_getFilesAncestry";
import { dashboardsStructure } from "./__test_resources__/dashboardsStructure";

describe("_getFilesAncestry", () => {
  it("returns a map from file id to the ids and names of the parent folders of the file.", () => {
    expect(_getFilesAncestry(dashboardsStructure)).toMatchInlineSnapshot(`
      Object {
        "00c": Array [
          Object {
            "id": "fe0",
            "name": "AMC",
          },
        ],
        "06a": Array [],
        "13f": Array [],
        "14f": Array [
          Object {
            "id": "346",
            "name": "MAD",
          },
        ],
        "1ed": Array [],
        "22a": Array [],
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
        "2c1": Array [
          Object {
            "id": "542",
            "name": "rosi",
          },
          Object {
            "id": "940",
            "name": "uno",
          },
          Object {
            "id": "f15",
            "name": "dos",
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
        "422": Array [],
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
        "50a": Array [],
        "524": Array [],
        "53c": Array [],
        "542": Array [],
        "575": Array [
          Object {
            "id": "542",
            "name": "rosi",
          },
          Object {
            "id": "940",
            "name": "uno",
          },
          Object {
            "id": "f15",
            "name": "dos",
          },
          Object {
            "id": "2c1",
            "name": "tres",
          },
          Object {
            "id": "980",
            "name": "cuatro",
          },
        ],
        "5ad": Array [],
        "5b9": Array [],
        "5c4": Array [],
        "65e": Array [],
        "65f": Array [
          Object {
            "id": "fe0",
            "name": "AMC",
          },
        ],
        "670": Array [],
        "6d4": Array [],
        "6d7": Array [],
        "737": Array [],
        "77c": Array [],
        "7ac": Array [],
        "7b4": Array [],
        "7d7": Array [
          Object {
            "id": "346",
            "name": "MAD",
          },
        ],
        "895": Array [],
        "8d4": Array [],
        "936": Array [],
        "940": Array [
          Object {
            "id": "542",
            "name": "rosi",
          },
        ],
        "94a": Array [],
        "980": Array [
          Object {
            "id": "542",
            "name": "rosi",
          },
          Object {
            "id": "940",
            "name": "uno",
          },
          Object {
            "id": "f15",
            "name": "dos",
          },
          Object {
            "id": "2c1",
            "name": "tres",
          },
        ],
        "989": Array [],
        "98e": Array [],
        "a2b": Array [
          Object {
            "id": "542",
            "name": "rosi",
          },
        ],
        "a41": Array [],
        "a82": Array [],
        "aec": Array [
          Object {
            "id": "346",
            "name": "MAD",
          },
        ],
        "b0c": Array [],
        "b60": Array [],
        "b8b": Array [],
        "c2a": Array [],
        "c45": Array [],
        "c5b": Array [
          Object {
            "id": "fe0",
            "name": "AMC",
          },
        ],
        "c6a": Array [
          Object {
            "id": "346",
            "name": "MAD",
          },
        ],
        "c9c": Array [
          Object {
            "id": "346",
            "name": "MAD",
          },
          Object {
            "id": "31b",
            "name": "lil mad",
          },
        ],
        "ce3": Array [],
        "d0d": Array [],
        "d22": Array [],
        "d8d": Array [],
        "e11": Array [
          Object {
            "id": "346",
            "name": "MAD",
          },
        ],
        "e3b": Array [
          Object {
            "id": "542",
            "name": "rosi",
          },
          Object {
            "id": "940",
            "name": "uno",
          },
          Object {
            "id": "f15",
            "name": "dos",
          },
          Object {
            "id": "2c1",
            "name": "tres",
          },
          Object {
            "id": "980",
            "name": "cuatro",
          },
          Object {
            "id": "575",
            "name": "cinco",
          },
        ],
        "f15": Array [
          Object {
            "id": "542",
            "name": "rosi",
          },
          Object {
            "id": "940",
            "name": "uno",
          },
        ],
        "fe0": Array [],
      }
    `);
  });
});
