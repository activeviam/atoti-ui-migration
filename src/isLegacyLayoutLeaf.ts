import type { LegacyLayout, LegacyLayoutLeaf } from "./migration.types";

/** Returns whether `legacyLayout` is a leaf. */
export const isLegacyLayoutLeaf = (
  legacyLayout: LegacyLayout | LegacyLayoutLeaf
): legacyLayout is LegacyLayoutLeaf => "ck" in legacyLayout;
