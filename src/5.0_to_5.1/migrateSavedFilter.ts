import { FilterState as FilterState51 } from "@activeviam/dashboard-base-5.1";
import { MigrateFilterCallback } from "../migration.types";
import { MdxString } from "@activeviam/mdx-5.0";

/**
 * Returns the 5.1 migrated version of the 5.0 `filterState`.
 * Used only for saved filters, not for filters within dashboards.
 */
export const migrateSavedFilter: MigrateFilterCallback<
  MdxString,
  FilterState51<"serialized">
> = (filterState) => ({ mdx: filterState });
