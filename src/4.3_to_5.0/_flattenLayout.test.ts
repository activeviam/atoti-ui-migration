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
      {
        "children": [
          {
            "leafKey": "1",
            "size": 0.34,
          },
          {
            "leafKey": "2",
            "size": 0.34980000000000006,
          },
          {
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
      {
        "children": [
          {
            "leafKey": "3",
            "size": 0.25,
          },
          {
            "leafKey": "2",
            "size": 0.25,
          },
          {
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
      {
        "children": [
          {
            "leafKey": "3",
            "size": 0.175,
          },
          {
            "leafKey": "2",
            "size": 0.1625,
          },
          {
            "leafKey": "4",
            "size": 0.1625,
          },
          {
            "children": [
              {
                "leafKey": "5",
                "size": 0.32,
              },
              {
                "leafKey": "7",
                "size": 0.32,
              },
              {
                "leafKey": "6",
                "size": 0.36,
              },
            ],
            "direction": "column",
            "size": 0.25,
          },
          {
            "leafKey": "8",
            "size": 0.125,
          },
          {
            "leafKey": "1",
            "size": 0.125,
          },
        ],
        "direction": "row",
      }
    `);
  });
});
