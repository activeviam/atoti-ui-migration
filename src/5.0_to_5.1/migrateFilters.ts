/**
 * Wraps the MDX of each filter in `filters`.
 * Mutates `filters`.
 */
export function migrateFilters(filters: any[] | undefined): void {
  filters?.forEach((mdx, index) => {
    filters[index] = { mdx };
  });
}
