import { _flattenLayout, _convertFromLegacyLayout } from "./_flattenLayout";
import type { LegacyLayout } from "./migration.types";

describe("_flattenLayout", () => {
  it("flattens a legacy dashboard layout built from left to right", () => {
    const legacyLayout: LegacyLayout = {
      children: {
        "0": {
          ck: "1",
          size: 0.34,
        },
        "1": {
          children: {
            "0": {
              ck: "2",
              size: 0.53,
            },
            "1": {
              ck: "3",
              size: 0.47,
            },
          },
          direction: "row",
          size: 0.66,
        },
      },
      direction: "row",
    };

    const layout = _convertFromLegacyLayout(legacyLayout);
    _flattenLayout(layout);

    expect(layout).toMatchInlineSnapshot(`
      Object {
        "children": Array [
          Object {
            "leafKey": "1",
            "size": 0.34,
          },
          Object {
            "leafKey": "2",
            "size": 0.34980000000000006,
          },
          Object {
            "leafKey": "3",
            "size": 0.3102,
          },
        ],
        "direction": "row",
      }
    `);
  });

  it("flattens a legacy dashboard layout built from right to left", () => {
    const legacyLayout: LegacyLayout = {
      children: {
        "0": {
          children: {
            "0": {
              ck: "3",
            },
            "1": {
              ck: "2",
            },
          },
          direction: "row",
        },
        "1": {
          ck: "1",
        },
      },
      direction: "row",
    };

    const layout = _convertFromLegacyLayout(legacyLayout);
    _flattenLayout(layout);

    expect(layout).toMatchInlineSnapshot(`
      Object {
        "children": Array [
          Object {
            "leafKey": "3",
            "size": 0.25,
          },
          Object {
            "leafKey": "2",
            "size": 0.25,
          },
          Object {
            "leafKey": "1",
            "size": undefined,
          },
        ],
        "direction": "row",
      }
    `);
  });

  it("flattens a big legacy dashboard layout", () => {
    const legacyLayout: LegacyLayout = {
      children: {
        "0": {
          children: {
            "0": {
              ck: "3",
              size: 0.35,
            },
            "1": {
              children: {
                "0": {
                  ck: "2",
                },
                "1": {
                  ck: "4",
                },
              },
              direction: "row",
              size: 0.65,
            },
          },
          direction: "row",
        },
        "1": {
          children: {
            "0": {
              children: {
                "0": {
                  children: {
                    "0": {
                      ck: "5",
                    },
                    "1": {
                      ck: "7",
                    },
                  },
                  direction: "column",
                  size: 0.64,
                },
                "1": {
                  ck: "6",
                  size: 0.36,
                },
              },
              direction: "column",
            },
            "1": {
              children: {
                "0": {
                  ck: "8",
                },
                "1": {
                  ck: "1",
                },
              },
              direction: "row",
            },
          },
          direction: "row",
        },
      },
      direction: "row",
    };

    const layout = _convertFromLegacyLayout(legacyLayout);
    _flattenLayout(layout);

    expect(layout).toMatchInlineSnapshot(`
      Object {
        "children": Array [
          Object {
            "leafKey": "3",
            "size": 0.175,
          },
          Object {
            "leafKey": "2",
            "size": 0.1625,
          },
          Object {
            "leafKey": "4",
            "size": 0.1625,
          },
          Object {
            "children": Array [
              Object {
                "leafKey": "5",
                "size": 0.32,
              },
              Object {
                "leafKey": "7",
                "size": 0.32,
              },
              Object {
                "leafKey": "6",
                "size": 0.36,
              },
            ],
            "direction": "column",
            "size": 0.25,
          },
          Object {
            "leafKey": "8",
            "size": 0.125,
          },
          Object {
            "leafKey": "1",
            "size": 0.125,
          },
        ],
        "direction": "row",
      }
    `);
  });
});
