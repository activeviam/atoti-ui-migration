import { FilterState as FilterState51 } from "@activeviam/dashboard-base-5.1";
import { MigrateFilterCallback } from "../migration.types";

/**
 * Mutates a 5.0 `filterState` into one usable in 5.1.
 */
export const migrateSavedFilter: MigrateFilterCallback<
  FilterState51,
  FilterState51
> = () => {
  // The state of saved filters is the same between 5.0 and 5.1 in the Content Server.
  // Nothing to do.
};
