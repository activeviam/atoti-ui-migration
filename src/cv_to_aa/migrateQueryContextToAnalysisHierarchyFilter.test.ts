import { produce } from "immer";
import { migrateQueryContextToAnalysisHierarchyFilter } from "./migrateQueryContextToAnalysisHierarchyFilter";

describe("cv to aa", () => {
  it("converts", () => {
    const data = {
      queryContext: [
        { key: "VaRConfidenceLevel", value: "99" },
        { key: "ESConfidenceLevel", value: "97.5" },
        { key: "MarketDataSet", value: "Official EOD" },
        { key: "PnLEnd", value: "141" },
        { key: "PnLStart", value: "33" },
        { key: "referenceCurrency", value: "EUR" },
        { key: "DayToDayDifference", value: "2018-09-27" },
      ],
      filters: [],
    };

    const newData = produce(data, (draft) =>
      migrateQueryContextToAnalysisHierarchyFilter(draft),
    );

    expect(newData).toMatchInlineSnapshot(`
      {
        "filters": [
          {
            "dimensionName": "MarketData",
            "hierarchyName": "MarketDataSets",
            "members": [
              [
                "Official EOD",
              ],
            ],
            "type": "members",
          },
          {
            "dimensionName": "PnLIndex",
            "hierarchyName": "PnLEndIndex",
            "members": [
              [
                "AllMember",
                "141",
              ],
            ],
            "type": "members",
          },
          {
            "dimensionName": "PnLIndex",
            "hierarchyName": "PnLStartIndex",
            "members": [
              [
                "AllMember",
                "33",
              ],
            ],
            "type": "members",
          },
          {
            "dimensionName": "Currencies",
            "hierarchyName": "displayCurrency",
            "members": [
              [
                "EUR",
              ],
            ],
            "type": "members",
          },
          {
            "dimensionName": "Dates",
            "hierarchyName": "DayToDay",
            "members": [
              [
                "2018-09-27",
              ],
            ],
            "type": "members",
          },
        ],
        "queryContext": [
          {
            "key": "VaRConfidenceLevel",
            "value": "99",
          },
          {
            "key": "ESConfidenceLevel",
            "value": "97.5",
          },
        ],
      }
    `);
  });
});
