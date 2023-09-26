import _set from "lodash/set";
import { produce } from "immer";
import {
  MdxSelect,
  MdxDrillthrough,
  getLevels,
  Cube,
} from "@activeviam/activeui-sdk-5.0";
import { isMdxDrillthrough } from "@activeviam/mdx-5.0";

import { _doesCrossjoinRepresentAnExpandedMember } from "./_doesCrossjoinRepresentAnExpandedMember";
import {
  MatchAndPath,
  UnionNodeWithCrossjoinsAsArguments,
  _findErroneousUnionNode,
} from "./_findErroneousUnionNode";

/**
 * Returns an Mdx which yields the same results as the input `mdx`.
 * But the returned mdx does not have the typical useless (and dangerous) parts of queries created by collapsing then re-expanding a member in ActiveUI 4.
 * See https://support.activeviam.com/jira/browse/UI-6692
 */
export function _fixErroneousExpansionMdx<
  T extends MdxSelect | MdxDrillthrough,
>(mdx: T, cube: Cube): T {
  if (isMdxDrillthrough(mdx)) {
    return mdx;
  }

  return produce<T>(mdx, (draft) => {
    (draft as MdxSelect).axes.forEach((axis) => {
      const levelsOnAxis = getLevels(axis, { cube });

      let erroneousUnionNode:
        | MatchAndPath<UnionNodeWithCrossjoinsAsArguments>
        | undefined = undefined;
      while (
        (erroneousUnionNode = _findErroneousUnionNode(axis, {
          cube,
          levelsOnAxis,
        }))
      ) {
        const { match, path } = erroneousUnionNode;

        // Remove all expanded members.
        match.arguments = match.arguments.filter(
          (crossjoin) =>
            !_doesCrossjoinRepresentAnExpandedMember(crossjoin, cube),
        );

        if (match.arguments.length === 1) {
          // The union has only one argument left. Clean it up.
          _set(axis, path, match.arguments[0]);
        }
      }
    });
    return draft;
  });
}
