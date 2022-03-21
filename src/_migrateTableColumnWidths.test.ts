import { dataModelsForTests } from "@activeviam/data-model";
import type { DataVisualizationWidgetMapping } from "@activeviam/activeui-sdk";
import { _migrateTableColumnWidths } from "./_migrateTableColumnWidths";

const cube = dataModelsForTests.sandbox.catalogs[0].cubes[0];

const mapping: DataVisualizationWidgetMapping = {
  rows: [
    {
      type: "hierarchy",
      dimensionName: "Geography",
      hierarchyName: "City",
      levelName: "City",
    },
    {
      type: "hierarchy",
      dimensionName: "Currency",
      hierarchyName: "Currency",
      levelName: "Currency",
    },
  ],
  columns: [],
  measures: [],
};

describe("_migrateTableColumnWidths", () => {
  it("converts the column widths expressed in the widget state of AUI4 tables into the AUI5 format", () => {
    const legacyColumns = [
      {
        key: "[Currency].[Currency].[Currency]",
        width: 152,
      },
      {
        key: "[Measures].[Measures].[Measures]",
        width: 147,
      },
      {
        key: "c-treeCells-member",
        width: 355,
      },
      {
        key: "[Measures].[contributors.COUNT]",
        width: 100,
      },
      {
        key: "[Booking].[Desk].[AllMember].[LegalEntityA]",
        width: 200,
      },
      {
        key:
          "([Geography].[City].[ALL].[AllMember].[Berlin],[CounterParty].[CounterParty].[ALL].[AllMember].[Unilever])",
        width: 50,
      },
      {
        key:
          "([Measures].[pnl.SUM],[CounterParty].[CounterParty].[ALL].[AllMember].[Sumitomo])",
        width: 81,
      },
      {
        key: "__lineNumber__",
        width: 96,
      },
    ];

    const mapping: DataVisualizationWidgetMapping = {
      rows: [
        {
          type: "hierarchy",
          dimensionName: "Geography",
          hierarchyName: "City",
          levelName: "City",
        },
        {
          type: "hierarchy",
          dimensionName: "Currency",
          hierarchyName: "Currency",
          levelName: "Currency",
        },
      ],
      columns: [],
      measures: [],
    };

    expect(_migrateTableColumnWidths({ legacyColumns, mapping, cube }))
      .toMatchInlineSnapshot(`
      Object {
        "[Booking].[Desk].[AllMember].[LegalEntityA]": 200,
        "[Currency].[Currency].[Currency]": 152,
        "[Geography].[City].[ALL].[AllMember].[Berlin],[CounterParty].[CounterParty].[ALL].[AllMember].[Unilever]": 50,
        "[Geography].[City].[City]": 355,
        "[Measures].[Measures]": 147,
        "[Measures].[contributors.COUNT]": 100,
        "[Measures].[pnl.SUM],[CounterParty].[CounterParty].[ALL].[AllMember].[Sumitomo]": 81,
      }
    `);
  });

  it("ignores columns whose key is neither a level, member, or tuple unique name", () => {
    const legacyColumns = [{ key: "Some static table data", width: 100 }];
    expect(_migrateTableColumnWidths({ legacyColumns, cube, mapping })).toEqual(
      {},
    );
  });

  it("converts the [Measures].[Measures].[Measures] column key, representing all measures, to [Measures].[Measures]", () => {
    const legacyColumns = [
      { key: "[Measures].[Measures].[Measures]", width: 100 },
    ];
    expect(_migrateTableColumnWidths({ legacyColumns, cube, mapping })).toEqual(
      {
        "[Measures].[Measures]": 100,
      },
    );
  });

  it("converts the c-treeCells-member key to the unique name of the first level mapped on rows, if applicable", () => {
    const legacyColumns = [{ key: "c-treeCells-member", width: 125 }];
    expect(
      _migrateTableColumnWidths({
        legacyColumns,
        cube,
        mapping: {
          rows: [],
          columns: [],
          measures: [],
        },
      }),
    ).toEqual({});

    expect(
      _migrateTableColumnWidths({
        legacyColumns,
        cube,
        mapping: {
          rows: [
            {
              type: "hierarchy",
              dimensionName: "Geography",
              hierarchyName: "City",
              levelName: "City",
            },
            {
              type: "hierarchy",
              dimensionName: "Currency",
              hierarchyName: "Currency",
              levelName: "Currency",
            },
          ],
          columns: [],
          measures: [],
        },
      }),
    ).toEqual({
      "[Geography].[City].[City]": 125,
    });

    expect(
      _migrateTableColumnWidths({
        legacyColumns,
        cube,
        mapping: {
          rows: [
            {
              type: "compositeHierarchy",
              hierarchies: [
                {
                  dimensionName: "Booking",
                  hierarchyName: "Desk",
                  levelName: "BusinessUnit",
                  expandedDownTo: "Desk",
                },
              ],
            },
            {
              type: "hierarchy",
              dimensionName: "Currency",
              hierarchyName: "Currency",
              levelName: "Currency",
            },
          ],
          columns: [],
          measures: [],
        },
      }),
    ).toEqual({
      "[Booking].[Desk].[BusinessUnit]": 125,
    });

    expect(
      _migrateTableColumnWidths({
        legacyColumns,
        cube,
        mapping: {
          rows: [
            {
              type: "allMeasures",
            },
            {
              type: "hierarchy",
              dimensionName: "Currency",
              hierarchyName: "Currency",
              levelName: "Currency",
            },
          ],
          columns: [],
          measures: [],
        },
      }),
    ).toEqual({
      "[Measures].[Measures]": 125,
    });
  });

  it("strips the wrapping parentheses from the tuple unique name identifying a column", () => {
    const legacyColumns = [
      {
        key:
          "([Geography].[City].[ALL].[AllMember].[Berlin],[Measures].[contributors.COUNT])",
        width: 220,
      },
    ];
    expect(
      _migrateTableColumnWidths({
        legacyColumns,
        cube,
        mapping,
      }),
    ).toEqual({
      "[Geography].[City].[ALL].[AllMember].[Berlin],[Measures].[contributors.COUNT]": 220,
    });
  });
});
