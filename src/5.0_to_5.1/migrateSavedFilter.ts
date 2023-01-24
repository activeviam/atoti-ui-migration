import { Filter, Mdx } from "@activeviam/activeui-sdk-5.1";
import { MigrateFilterCallback } from "../migration.types";

/**
 * Mutates a 5.0 saved filter into one usable in 5.1.
 */
export const migrateSavedFilter: MigrateFilterCallback<{ mdx: Mdx }, Filter> =
  () => {
    // TODO implement.
  };
