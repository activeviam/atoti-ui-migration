import _pick from "lodash/pick";
import type { LegacyQuery } from "./_migrateQuery";

/**
 * Returns the query contained in `legacyWidgetState`.
 */
export const _getQueryInLegacyWidgetState = (
  // Legacy widget states are not typed.
  // eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  legacyWidgetState: any
): LegacyQuery =>
  _pick(legacyWidgetState?.value?.body, [
    "mdx",
    "contextValues",
    "updateMode",
    "ranges",
  ]);
