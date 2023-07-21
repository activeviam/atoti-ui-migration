import { Filter, QueryContextEntry } from "@activeviam/activeui-sdk-5.1";

export const cvToAA: Record<
  string,
  { slicing?: boolean; hierarchyName: string; dimensionName: string }
> = {
  MarketDataSet: {
    hierarchyName: "MarketDataSets",
    dimensionName: "MarketData",
    slicing: true,
  },
  DayToDayDifference: {
    hierarchyName: "DayToDay",
    dimensionName: "Dates",
    slicing: true,
  },
  referenceCurrency: {
    hierarchyName: "displayCurrency",
    dimensionName: "Currencies",
    slicing: true,
  },
  DynamicTenorSet: {
    hierarchyName: "DynamicTenors",
    dimensionName: "DynamicBucketing",
    slicing: true,
  },
  DynamicMaturitySet: {
    hierarchyName: "DynamicMaturities",
    dimensionName: "DynamicBucketing",
    slicing: true,
  },
  DynamicMoneynessSet: {
    hierarchyName: "DynamicMoneyness",
    dimensionName: "DynamicBucketing",
    slicing: true,
  },
  PnLEnd: {
    hierarchyName: "PnLEndIndex",
    dimensionName: "PnLIndex",
    slicing: false,
  },
  PnLStart: {
    hierarchyName: "PnLStartIndex",
    dimensionName: "PnLIndex",
    slicing: false,
  },
};

const cvsToRemove = Object.keys(cvToAA);

/**
 * Mutates `state` to convert some context values to filters.
 */
export function migrateQueryContextToAnalysisHierarchyFilter(state: {
  queryContext?: QueryContextEntry[];
  filters?: Filter[];
}): void {
  state.queryContext?.forEach((qc) => {
    const analysisHierarchy = cvToAA[qc.key];
    if (analysisHierarchy !== undefined) {
      // converts context value to filter
      state.filters = [
        ...(state.filters || []),
        {
          type: "members",
          dimensionName: analysisHierarchy.dimensionName,
          hierarchyName: analysisHierarchy.hierarchyName,
          members: [
            analysisHierarchy.slicing ? [qc.value] : ["AllMember", qc.value],
          ],
        },
      ];
    }
  });

  if (state.queryContext) {
    // removes from the list of context values
    state.queryContext = state.queryContext.filter(
      (qc) => !cvsToRemove.includes(qc.key),
    );
  }
}
