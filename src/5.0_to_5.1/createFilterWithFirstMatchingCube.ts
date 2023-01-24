import { stringify } from "@activeviam/activeui-sdk-5.0";
import {
  createFilter,
  MdxExpression,
  Filter,
  Cube,
} from "@activeviam/activeui-sdk-5.1";

/**
 * Returns a {@link Filter} based on `mdx`, with the first cube containing the hierarchies expressed in the MDX expression.
 */
export function createFilterWithFirstMatchingCube(
  mdx: MdxExpression,
  cubes: Cube[],
): Filter {
  for (const cube of cubes) {
    try {
      return createFilter(mdx, cube);
    } catch (e) {
      // The filter creation might be successful with another cube.
      // Continue.
    }
  }

  throw new Error(
    `The following MDX does not represent a filter: ${stringify(mdx, {
      indent: true,
    })}`,
  );
}
