import type { Mdx } from "@activeviam/activeui-sdk-5.0";

/**
 * Wraps the MDX of each filter in `filters`.
 * Mutates `filters`.
 */
export function migrateFilters(filters?: Mdx[]): void {
  filters?.forEach((mdx, index) => {
    // @ts-expect-error The point of the migration is to mutate the filters from `mdx` to `{mdx}`.
    filters[index] = { mdx };
  });
}
