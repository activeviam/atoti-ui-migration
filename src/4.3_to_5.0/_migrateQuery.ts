import type {
  QueryContextEntry,
  Cube,
  UpdateMode,
  Mdx,
  MdxDrillthrough,
  MdxSelect,
} from "@activeviam/activeui-sdk-5.0";
import { getFilters, parse, setFilters } from "@activeviam/activeui-sdk-5.0";
import { _fixErroneousExpansionMdx } from "./_fixErroneousExpansionMdx";
import {
  LegacyContextValues,
  _migrateContextValues,
} from "./_migrateContextValues";
import { _cleanupDescendants } from "./_cleanupDescendants";
import { _cleanupDrilldownLevel } from "./_cleanupDrilldownLevel";

export interface LegacyQuery {
  mdx?: string;
  contextValues?:
    | LegacyContextValues
    | { [cubeName: string]: LegacyContextValues };
  updateMode?: UpdateMode | "refresh-periodically";
  ranges?: {
    row: {
      chunkSize: number;
      thresholdPercentage: number;
    };
    column: {
      chunkSize: number;
      thresholdPercentage: number;
    };
  };
}

/**
 * Returns an array whose first item contains the query, filters and context corresponding to the given legacy query.
 * The second item indicates whether an unsupported update mode was used in the legacy query.
 */
export const _migrateQuery = <T extends MdxSelect | MdxDrillthrough>({
  legacyQuery,
  cube,
  shouldUpdateFiltersMdx,
}: {
  legacyQuery: LegacyQuery;
  cube: Cube;
  shouldUpdateFiltersMdx: boolean;
}): [
  {
    query: { mdx?: T; updateMode: UpdateMode };
    filters: Mdx[];
    queryContext: QueryContextEntry[];
  },
  boolean,
] => {
  const { mdx, updateMode, contextValues } = legacyQuery;
  const isUsingUnsupportedUpdateMode = updateMode === "refresh-periodically";

  // The checks ensure that the migratedUpdateMode is necessarily defined.
  const migratedUpdateMode = (
    !updateMode || isUsingUnsupportedUpdateMode
      ? // On AUI4, the default update mode could have been defined through setting `queries.defaultUpdateMode`.
        // It is not taken into account here.
        "once"
      : updateMode
  )!;

  const queryContext = _migrateContextValues(contextValues);

  if (!mdx) {
    return [
      {
        query: { updateMode: migratedUpdateMode },
        queryContext,
        filters: [],
      },
      isUsingUnsupportedUpdateMode,
    ];
  }

  const parsedMdx = parse<T>(mdx);

  let improvedMdx = parsedMdx;
  try {
    improvedMdx = _cleanupDescendants(improvedMdx, cube);
    improvedMdx = _cleanupDrilldownLevel(improvedMdx, cube);
    improvedMdx = _fixErroneousExpansionMdx(improvedMdx, cube);
  } catch (e) {
    // The MDX may be suboptimal, but it is expected to be valid from the perspective of the MDX specification.
    // So attempt to improve it, but do not block the migration if the process fails.
  }

  const filters = getFilters(improvedMdx, { cube }).map(
    ({ mdx: filterMdx }) => filterMdx,
  );

  const finalMdx = shouldUpdateFiltersMdx
    ? // The filters part of the MDX is removed from the query and stored in state.filters.
      setFilters(improvedMdx, { filters: [], cube })
    : // The filters part of the MDX remains stored as is, in state.query.
      improvedMdx;

  // TODO UI-5036 Migrate query ranges.
  return [
    {
      // Migrating the query preserves its type.
      query: { mdx: finalMdx as T, updateMode: migratedUpdateMode },
      filters,
      queryContext,
    },
    isUsingUnsupportedUpdateMode,
  ];
};
