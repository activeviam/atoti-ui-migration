import _forEach from "lodash/forEach";
import _map from "lodash/map";
import type { QueryContextEntry } from "@activeviam/content-client";

export interface LegacyContextValues {
  [key: string]: string | number | boolean;
}

/**
 * Returns the query context entries corresponding to the given legacy context values.
 * The legacy context values can be given flat or grouped by cube.
 * See https://github.com/activeviam/activeui-4/commit/41053594eb1c95ad31c5405d58dd51930d2c933a#diff-8f174eeae18a9628dcddcbd6059973d1dbfaf874ca0dcba13a90e4b00f710dcdR72-R91
 */
export function _migrateContextValues(
  legacyContextValues:
    | { [cubeName: string]: LegacyContextValues }
    | LegacyContextValues
    | undefined
): QueryContextEntry[] {
  const mergedContextValues: LegacyContextValues = {};
  _forEach(legacyContextValues, (value, key) => {
    if (typeof value === "object") {
      _forEach(value, (_value, _key) => {
        mergedContextValues[_key] = _value;
      });
    } else {
      mergedContextValues[key] = value;
    }
  });
  return _map(mergedContextValues, (value, key) => ({ key, value }));
}
