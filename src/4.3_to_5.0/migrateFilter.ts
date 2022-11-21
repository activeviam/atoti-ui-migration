import type { CubeName, MdxString } from "@activeviam/activeui-sdk";
interface LegacyFilter {
  name: string;
  type: "mdx";
  value: {
    shouldReplace: boolean;
    type: "filter";
    mdx: MdxString;
    cube: CubeName;
  };
}

/**
 * Returns the converted filter, ready to be used in ActiveUI 5.
 */
export function migrateFilter(legacyFilter: LegacyFilter): {
  content: { mdx: MdxString };
  metaData: { name: string };
} {
  return {
    content: { mdx: legacyFilter.value.mdx },
    metaData: { name: legacyFilter.name },
  };
}
