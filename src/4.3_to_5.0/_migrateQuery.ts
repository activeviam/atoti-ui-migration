import type {
  QueryContextEntry,
  Cube,
  UpdateMode,
  Mdx,
  MdxDrillthrough,
  MdxSelect,
} from "@activeviam/activeui-sdk";
import { getFilters, parse, setFilters } from "@activeviam/activeui-sdk";
import { _fixErroneousExpansionMdx } from "./_fixErroneousExpansionMdx";
import {
  LegacyContextValues,
  _migrateContextValues,
} from "./_migrateContextValues";

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
 * The second item indicates wheter an unsupported update mode was used in the legacy query.
 */
export const _migrateQuery = <T extends MdxSelect | MdxDrillthrough>({
  legacyQuery,
  cube,
}: {
  legacyQuery: LegacyQuery;
  cube: Cube;
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
  const fixedMdx = _fixErroneousExpansionMdx(parsedMdx, cube);
  const filters = getFilters(fixedMdx, { cube }).map(
    ({ mdx: filterMdx }) => filterMdx,
  );
  const mdxWithoutFilters = setFilters(fixedMdx, { filters: [], cube });

  // TODO UI-5036 Migrate query ranges.
  return [
    {
      // Migrating the query preserves its type.
      query: { mdx: mdxWithoutFilters as T, updateMode: migratedUpdateMode },
      filters,
      queryContext,
    },
    isUsingUnsupportedUpdateMode,
  ];
};
