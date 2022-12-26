import { QueryContextEntry } from "@activeviam/activeui-sdk-5.0";

/**
 * Stringifes the values of the entries in `queryContext`.
 * Mutates `queryContext`.
 */
export function migrateContextValues(queryContext?: QueryContextEntry[]): void {
  queryContext?.forEach((queryContextEntry) => {
    console.log(
      "queryContextEntry",
      queryContextEntry.value,
      typeof queryContextEntry.value,
    );
    queryContextEntry.value = String(queryContextEntry.value);
    console.log(
      "queryContextEntry",
      queryContextEntry.value,
      typeof queryContextEntry.value,
    );
  });
}
