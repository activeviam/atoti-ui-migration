import { DataVisualizationWidgetMapping } from "@activeviam/activeui-sdk";
import { _getLevelDepthOnRows } from "./_getLevelDepthOnRows";
import { dataModelsForTests } from "@activeviam/data-model";

const cube = dataModelsForTests.sandbox.catalogs[0].cubes[0];

describe("_getLevelDepthOnRows", () => {
  it("returns the sum of the depth of the deepest level of each hierarchy on rows", () => {
    const mapping: DataVisualizationWidgetMapping = {
      rows: [
        {
          type: "hierarchy",
          dimensionName: "Booking",
          hierarchyName: "Desk",
          levelName: "Desk",
        },
        {
          type: "hierarchy",
          dimensionName: "Time",
          hierarchyName: "HistoricalDates",
          levelName: "AsOfDate",
        },
      ],
    };

    // Desk is the 3rd level on the [Booking].[Desk] hierarchy (which is non slicing).
    // AsOfDate is the 1st level on the [Time].[HistoricalDates] hierarchy (which is slicing).
    expect(_getLevelDepthOnRows({ cube, mapping })).toBe(4);
  });

  it("takes into account the `expandedDownTo` attribute into the deepest level", () => {
    const mapping: DataVisualizationWidgetMapping = {
      rows: [
        {
          type: "hierarchy",
          dimensionName: "Booking",
          hierarchyName: "Desk",
          levelName: "BusinessUnit",
          expandedDownTo: "Desk",
        },
      ],
    };

    // The field only shows all business units (second level in hierarchy)
    // But at least one of them is expanded down to its children desks.
    expect(_getLevelDepthOnRows({ cube, mapping })).toBe(3);
  });

  it("sums all hierarchies forming a composite hierarchy, when the mapping contains one", () => {
    const mapping: DataVisualizationWidgetMapping = {
      rows: [
        // Counts for 1.
        {
          type: "hierarchy",
          dimensionName: "Geography",
          hierarchyName: "City",
          levelName: "City",
        },
        {
          type: "compositeHierarchy",
          hierarchies: [
            {
              // Counts for 1.
              dimensionName: "Currency",
              hierarchyName: "Currency",
              levelName: "Currency",
            },
            // Counts for 3.
            {
              dimensionName: "Booking",
              hierarchyName: "Desk",
              levelName: "BusinessUnit",
              expandedDownTo: "Desk",
            },
          ],
        },
      ],
    };

    expect(_getLevelDepthOnRows({ cube, mapping })).toBe(5);
  });
});
