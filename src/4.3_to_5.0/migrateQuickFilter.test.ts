import { migrateQuickFilter } from "./migrateQuickFilter";
import { legacyQuickFilter } from "../__test_resources__/legacyQuickFilter";
import { servers } from "../__test_resources__/servers";
import { produce } from "immer";

describe("migrateQuickFilter", () => {
  it("returns the ActiveUI5 quick filter widget state corresponding to the given ActiveUI4 quick filter widget state in checkbox mode", () => {
    const legacyQuickFilterInCheckboxMode = produce(
      legacyQuickFilter,
      (draft) => {
        draft.value.body.configuration.displayedAsSelect = false;
        draft.value.body.configuration.multipleSelection = true;
      },
    );
    expect(migrateQuickFilter(legacyQuickFilterInCheckboxMode, servers))
      .toMatchInlineSnapshot(`
      Object {
        "cubeName": "EquityDerivativesCube",
        "levelCoordinates": Object {
          "dimensionName": "Currency",
          "hierarchyName": "Currency",
          "levelName": "Currency",
        },
        "mode": "checkbox",
        "name": "Quick filter",
        "serverKey": "my-server",
        "widgetKey": "quick-filter",
      }
    `);
  });

  it("returns the ActiveUI5 quick filter widget state corresponding to the given ActiveUI4 quick filter widget state in radio mode", () => {
    const legacyQuickFilterInRadioMode = produce(legacyQuickFilter, (draft) => {
      draft.value.body.configuration.displayedAsSelect = false;
      draft.value.body.configuration.multipleSelection = false;
    });
    expect(migrateQuickFilter(legacyQuickFilterInRadioMode, servers))
      .toMatchInlineSnapshot(`
      Object {
        "cubeName": "EquityDerivativesCube",
        "levelCoordinates": Object {
          "dimensionName": "Currency",
          "hierarchyName": "Currency",
          "levelName": "Currency",
        },
        "mode": "radio",
        "name": "Quick filter",
        "serverKey": "my-server",
        "widgetKey": "quick-filter",
      }
    `);
  });

  it("returns the ActiveUI5 quick filter widget state corresponding to the given ActiveUI4 quick filter in multi-select mode", () => {
    const legacyQuickFilterInMultiSelectMode = produce(
      legacyQuickFilter,
      (draft) => {
        draft.value.body.configuration.displayedAsSelect = true;
        draft.value.body.configuration.multipleSelection = true;
      },
    );
    expect(migrateQuickFilter(legacyQuickFilterInMultiSelectMode, servers))
      .toMatchInlineSnapshot(`
      Object {
        "cubeName": "EquityDerivativesCube",
        "levelCoordinates": Object {
          "dimensionName": "Currency",
          "hierarchyName": "Currency",
          "levelName": "Currency",
        },
        "mode": "multi-select",
        "name": "Quick filter",
        "serverKey": "my-server",
        "widgetKey": "quick-filter",
      }
    `);
  });

  it("returns the ActiveUI5 quick filter widget state corresponding to the given ActiveUI4 quick filter in single-select mode", () => {
    const legacyQuickFilterInSingleSelectMode = produce(
      legacyQuickFilter,
      (draft) => {
        draft.value.body.configuration.displayedAsSelect = true;
        draft.value.body.configuration.multipleSelection = false;
      },
    );
    expect(migrateQuickFilter(legacyQuickFilterInSingleSelectMode, servers))
      .toMatchInlineSnapshot(`
      Object {
        "cubeName": "EquityDerivativesCube",
        "levelCoordinates": Object {
          "dimensionName": "Currency",
          "hierarchyName": "Currency",
          "levelName": "Currency",
        },
        "mode": "select",
        "name": "Quick filter",
        "serverKey": "my-server",
        "widgetKey": "quick-filter",
      }
    `);
  });

  it("defaults the quick-filter mode to a single selection mode for slicing levels", () => {
    const legacyQuickFilterOnSlicingLevel = produce(
      legacyQuickFilter,
      (draft) => {
        draft.value.body.levelDetails = {
          cube: "EquityDerivativesCube",
          dimension: "Time",
          hierarchy: "HistoricalDates",
          level: "AsOfDate",
        };
        draft.value.body.configuration.displayedAsSelect = true;
        draft.value.body.configuration.multipleSelection = undefined;
      },
    );
    expect(migrateQuickFilter(legacyQuickFilterOnSlicingLevel, servers))
      .toMatchInlineSnapshot(`
      Object {
        "cubeName": "EquityDerivativesCube",
        "levelCoordinates": Object {
          "dimensionName": "Time",
          "hierarchyName": "HistoricalDates",
          "levelName": "AsOfDate",
        },
        "mode": "select",
        "name": "Quick filter",
        "serverKey": "my-server",
        "widgetKey": "quick-filter",
      }
    `);
  });
});
