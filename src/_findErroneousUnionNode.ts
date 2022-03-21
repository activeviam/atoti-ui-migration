import {
  Cube,
  LevelCoordinates,
  isMdxFunction,
  Mdx,
  MdxFunction,
} from "@activeviam/activeui-sdk";
import { findDescendant } from "@activeviam/mdx";

import { _doesCrossjoinRepresentAnExpandedMember } from "./_doesCrossjoinRepresentAnExpandedMember";
import { _doesCrossjoinYieldAllCombinationsOfMembers } from "./_doesCrossjoinYieldAllCombinationsOfMembers";

/**
 * An Mdx union function whose arguments are all crossjoins.
 */
export interface UnionNodeWithCrossjoinsAsArguments extends MdxFunction {
  name: "Union";
  arguments: (MdxFunction & {
    name: "Crossjoin";
  })[];
}

/**
 * A node matched during an Mdx traversal process, and the path leading to it within the traversed mdx.
 */
export type MatchAndPath<T extends Mdx> = {
  match: T;
  path: (string | number)[];
};

/**
 * Returns whether `node` is a Union function, whose arguments are all crossjoins.
 */
function _isUnionNodeWithCrossjoinAsArguments(
  node: Mdx
): node is UnionNodeWithCrossjoinsAsArguments {
  return (
    isMdxFunction(node, "union") &&
    node.arguments.every((argument) => isMdxFunction(argument, "crossjoin"))
  );
}

// See _findErroneousUnionNode.test.ts for concrete examples of erroneous nodes.

/**
 * Returns whether `mdx` represents an erroneous union node.
 */
export function _findErroneousUnionNode(
  mdx: Mdx,
  { cube, levelsOnAxis }: { cube: Cube; levelsOnAxis: LevelCoordinates[] }
): MatchAndPath<UnionNodeWithCrossjoinsAsArguments> | undefined {
  const result = findDescendant(mdx, (node) => {
    if (
      !_isUnionNodeWithCrossjoinAsArguments(node) ||
      node.arguments.length < 2
    ) {
      // If `node` is not a union whose arguments are all crossjoins, then it is not erroneous.
      return false;
    }

    let numberOfCrossjoinsYieldingAllCombinationOfMembers = 0;
    let numberOfCrossjoinsRepresentingAnExpandedMember = 0;

    node.arguments.forEach((crossjoin) => {
      if (_doesCrossjoinRepresentAnExpandedMember(crossjoin, cube)) {
        numberOfCrossjoinsRepresentingAnExpandedMember++;
      } else if (
        _doesCrossjoinYieldAllCombinationsOfMembers(crossjoin, {
          cube,
          levelsOnAxis,
        })
      ) {
        numberOfCrossjoinsYieldingAllCombinationOfMembers++;
      }
    });

    // Expanded members are useless if the axis already contains all combinations of members of the levels expressed on it.
    // The union node is redundant (and therefore erroneous) if it yields all combination of members AND dangling expanded members on top of it.
    // For instance, if it yields all combination of Currency * City, AND the cities under EUR on top of it.
    return (
      numberOfCrossjoinsYieldingAllCombinationOfMembers === 1 &&
      numberOfCrossjoinsRepresentingAnExpandedMember ===
        node.arguments.length - 1
    );
  });

  if (result === undefined) {
    return undefined;
  }

  return {
    path: result.path,
    // See early returns above, ensuring that `match` is a Union function node, whose arguments are all Crossjoin function nodes.
    match: result.match as unknown as UnionNodeWithCrossjoinsAsArguments,
  };
}
