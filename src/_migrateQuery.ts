import type { UpdateMode } from "@activeviam/activepivot-client";
import type { QueryContextEntry } from "@activeviam/dashboard-base";
import type { Cube } from "@activeviam/data-model";
import {
  getFilters,
  Mdx,
  MdxDrillthrough,
  MdxSelect,
  parse,
  setFilters,
} from "@activeviam/mdx";
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
 * Returns the query, filters and context corresponding to the given legacy query.
 */
export const _migrateQuery = <T extends MdxSelect | MdxDrillthrough>({
  legacyQuery,
  cube,
}: {
  legacyQuery: LegacyQuery;
  cube: Cube;
}): {
  query: { mdx?: T; updateMode: UpdateMode };
  filters: Mdx[];
  queryContext: QueryContextEntry[];
} => {
  const { mdx, updateMode, contextValues } = legacyQuery;

  if (updateMode === "refresh-periodically") {
    // eslint-disable-next-line no-console
    console.warn(
      "The 'refresh-periodically' mode for query updates is not supported in ActiveUI 5. Falling back on 'once'"
    );
  }
  // The checks ensure that the migratedUpdateMode is necessarily defined.
  const migratedUpdateMode = (
    !updateMode || updateMode === "refresh-periodically"
      ? // On AUI4, the default update mode could have been defined through setting `queries.defaultUpdateMode`.
        // It is not taken into account here.
        "once"
      : updateMode
  )!;

  const queryContext = _migrateContextValues(contextValues);

  if (!mdx) {
    return {
      query: { updateMode: migratedUpdateMode },
      queryContext,
      filters: [],
    };
  }

  const parsedMdx = parse<T>(mdx);
  const fixedMdx = _fixErroneousExpansionMdx(parsedMdx, cube);
  const filters = getFilters(fixedMdx, { cube }).map(
    ({ mdx: filterMdx }) => filterMdx
  );
  const mdxWithoutFilters = setFilters(fixedMdx, { filters: [], cube });

  // TODO UI-5036 Migrate query ranges.
  return {
    // Migrating the query preserves its type.
    // eslint-disable-next-line activeui/no-as
    query: { mdx: mdxWithoutFilters as T, updateMode: migratedUpdateMode },
    filters,
    queryContext,
  };
};
