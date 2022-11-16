import { Cube } from "@activeviam/data-model-5.0";
import {
  getSpecificCompoundIdentifier,
  isMdxCompoundIdentifier,
  isMdxFunction,
  MdxFunction,
} from "@activeviam/mdx-5.0";

/**
 * Returns whether `crossjoin` represents an expanded member on an axis.
 */
export function _doesCrossjoinRepresentAnExpandedMember(
  crossjoin: MdxFunction & { name: "Crossjoin" },
  cube: Cube,
): boolean {
  const [firstArgument, ...otherArguments] = crossjoin.arguments;

  return (
    isMdxCompoundIdentifier(firstArgument) &&
    getSpecificCompoundIdentifier(firstArgument, { cube }).type === "member" &&
    otherArguments.length === 1 &&
    isMdxFunction(otherArguments[0], "descendants")
  );
}
