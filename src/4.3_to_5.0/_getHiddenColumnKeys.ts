import { LegacyWidgetState } from "./migration.types";

/**
 * Returns the keys identifying the hidden columns in `legacyTableState`.
 */
export function _getHiddenColumnKeys(
  legacyTableState: LegacyWidgetState,
): string[] | undefined {
  const columns: { key: string; hide?: boolean }[] | undefined =
    legacyTableState?.value?.body?.configuration?.tabular?.columns;

  if (!columns) {
    return;
  }

  const hiddenColumnKeys = columns
    .filter(({ hide }) => hide === true)
    .map(({ key }) =>
      key.startsWith("(") && key.endsWith(")") ? key.slice(1, -1) : key,
    );

  return hiddenColumnKeys;
}
