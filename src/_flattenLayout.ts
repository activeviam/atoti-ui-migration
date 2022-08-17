import type { Layout, LayoutLeaf } from "@activeviam/activeui-sdk";

import { isLegacyLayoutLeaf } from "./isLegacyLayoutLeaf";
import type { LegacyLayout, LegacyLayoutLeaf } from "./migration.types";

/**
 * Recursively transforms the `children` property of the legacyLayout from objects to arrays.
 */
export const _convertFromLegacyLayout = (
  legacyLayout: LegacyLayout | LegacyLayoutLeaf
): Layout | LayoutLeaf => {
  if (isLegacyLayoutLeaf(legacyLayout)) {
    return {
      size: legacyLayout.size,
      leafKey: legacyLayout.ck,
    };
  }
  return {
    ...legacyLayout,
    children: Object.values(legacyLayout.children || []).map(
      _convertFromLegacyLayout
    ),
  };
};

const isLeaf = (layout: Layout | LayoutLeaf): layout is LayoutLeaf =>
  "leafKey" in layout;

/**
 * Transform the given layout from a binary tree into a tree of minimal depth.
 * Mutates `layout`.
 * This makes the resizing of widgets more natural:
 * The benefit is that resizing a widget does not affect its siblings (aside from the one directly next to it of course).
 * With a binary structure, resizing a widget can also resize all its siblings on its left, which is unexpected.
 */
export const _flattenLayout = (layout: Layout | LayoutLeaf): void => {
  if (isLeaf(layout)) {
    return;
  }

  // Recurse first: this process needs to start from the leaves and progress down to the root.
  layout.children.forEach(_flattenLayout);

  // Flatten the direct children when possible.
  let i = 0;
  while (i < layout.children.length) {
    const child = layout.children[i];
    if (!isLeaf(child) && child.direction === layout.direction) {
      const grandChildren = child.children;
      // Hoist up the grand children whose parents share the same direction as the current layout.
      const hoistedGrandChildren = grandChildren.map((grandChild) => ({
        ...grandChild,
        size: (grandChild.size || 0.5) * (child.size || 0.5),
      }));
      layout.children.splice(i, 1, ...hoistedGrandChildren);
      i += grandChildren.length - 1;
    } else {
      i += 1;
    }
  }
};
