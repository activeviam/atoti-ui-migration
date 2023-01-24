import { _getQueryInLegacyWidgetState } from "./_getQueryInLegacyWidgetState";

describe("_getQueryInLegacyWidgetState", () => {
  it("returns the query in a legacy widget state", () => {
    expect(
      _getQueryInLegacyWidgetState({
        value: {
          body: {
            serverUrl: "",
            mdx: "SELECT NON EMPTY Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])) ON ROWS, NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
            contextValues: {},
            updateMode: "once",
            ranges: {
              row: {
                chunkSize: 20,
                thresholdPercentage: 0.1,
              },
              column: {
                chunkSize: 20,
                thresholdPercentage: 0.1,
              },
            },
            configuration: {
              featuredValues: {},
            },
          },
        },
      }),
    ).toMatchInlineSnapshot(`
      {
        "contextValues": {},
        "mdx": "SELECT NON EMPTY Hierarchize(DrilldownLevel([Currency].[Currency].[ALL].[AllMember])) ON ROWS, NON EMPTY [Measures].[contributors.COUNT] ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS",
        "ranges": {
          "column": {
            "chunkSize": 20,
            "thresholdPercentage": 0.1,
          },
          "row": {
            "chunkSize": 20,
            "thresholdPercentage": 0.1,
          },
        },
        "updateMode": "once",
      }
    `);
  });
});
