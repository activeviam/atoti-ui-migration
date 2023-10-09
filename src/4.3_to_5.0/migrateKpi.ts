import _set from "lodash/set";
import type {
  AWidgetState,
  DataModel,
  MemberCoordinates,
  KpiComparison,
  MdxSelect,
  KpiWidgetState,
} from "@activeviam/activeui-sdk-5.0";
import {
  parse,
  stringify,
  traverseMdx,
  pluginWidgetKpi,
  serializeWidgetState,
  deriveMappingFromMdx,
  isMdxFunction,
  isMdxCompoundIdentifier,
  Mdx,
  Cube,
  MdxAxis,
} from "@activeviam/activeui-sdk-5.0";
import {
  getSpecificCompoundIdentifier,
  findDescendant,
} from "@activeviam/mdx-5.0";
import { UnsupportedLegacyQueryUpdateModeError } from "./errors/UnsupportedLegacyQueryUpdateModeError";
import { _getQueryInLegacyWidgetState } from "./_getQueryInLegacyWidgetState";
import { _getTargetCubeFromServerUrl } from "./_getTargetCubeFromServerUrl";
import { _migrateQuery } from "./_migrateQuery";
import { produce } from "immer";

const moveExpressionToWithClause = (
  draft: any,
  descendant:
    | {
        match: Mdx;
        path: (string | number)[];
      }
    | undefined,
  cube: Cube,
  type: "current" | "next",
) => {
  const pagesAxis = draft.axes.find((axis: MdxAxis) => axis.name === "PAGES");
  if (!pagesAxis) {
    return;
  }

  const match = descendant?.match;
  if (
    match &&
    isMdxFunction(match) &&
    isMdxCompoundIdentifier(match.arguments[0])
  ) {
    const originalCompound = getSpecificCompoundIdentifier(match.arguments[0], {
      cube,
    });

    if (originalCompound.type !== "hierarchy") {
      return;
    }

    const { dimensionName, hierarchyName } = originalCompound;

    const name = {
      elementType: "CompoundIdentifier",
      type: "unknown",
      identifiers: [dimensionName, hierarchyName, type].map((value) => ({
        elementType: "Identifier",
        quoting: "QUOTED",
        value,
      })),
    };
    draft.withClause.push({
      elementType: "Formula",
      expression: match,
      inlined: false,
      properties: [],
      name,
      type: "MEMBER",
    });

    _set(pagesAxis, descendant.path, name);
  }
};

export function moveCurrentAndNextMembersToWithClause(
  mdx: MdxSelect,
  { cube }: { cube: Cube },
): MdxSelect {
  return produce(mdx, (draft) => {
    const pagesAxis = draft.axes.find((axis) => axis.name === "PAGES");
    if (!pagesAxis) {
      return;
    }

    const current = findDescendant(pagesAxis, (node) =>
      isMdxFunction(node, "currentmember"),
    );
    moveExpressionToWithClause(draft, current, cube, "current");

    const next = findDescendant(pagesAxis, (node) =>
      isMdxFunction(node, "nextmember"),
    );
    moveExpressionToWithClause(draft, next, cube, "next");
  });
}

/**
 * Returns the converted KPI (= Featured values) widget state, ready to be used by ActiveUI 5.
 */
export function migrateKpi(
  // Legacy widget states are not typed.
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  legacyKpiState: any,
  {
    servers,
    shouldUpdateFiltersMdx,
  }: {
    servers: { [serverKey: string]: { dataModel: DataModel; url: string } };
    shouldUpdateFiltersMdx: boolean;
  },
): AWidgetState<"serialized"> {
  const legacyQuery = _getQueryInLegacyWidgetState(legacyKpiState);
  let legacyMdx = legacyQuery.mdx
    ? parse<MdxSelect>(legacyQuery.mdx)
    : undefined;

  const serverUrlInLegacyWidgetState = legacyKpiState?.value?.body?.serverUrl;
  const { serverKey, cube } = _getTargetCubeFromServerUrl({
    mdx: legacyMdx,
    serverUrl: serverUrlInLegacyWidgetState,
    servers,
  });
  if (legacyMdx) {
    legacyMdx = moveCurrentAndNextMembersToWithClause(legacyMdx, { cube });
  }

  let legacyMdxWithoutPagesAxis = legacyMdx;
  let comparison: KpiComparison | undefined = undefined;
  const pagesAxis = (legacyMdx?.axes || []).find(
    ({ name }) => name === "PAGES",
  );
  if (pagesAxis) {
    const memberCoordinates: MemberCoordinates[] = [];

    traverseMdx(pagesAxis, (mdx) => {
      if (mdx.elementType === "CompoundIdentifier") {
        const specificCompoundIdentifier = getSpecificCompoundIdentifier(mdx, {
          cube,
        });
        if (specificCompoundIdentifier.type === "member") {
          const {
            dimensionName,
            hierarchyName,
            path: namePath,
          } = specificCompoundIdentifier;
          memberCoordinates.push({ dimensionName, hierarchyName, namePath });
        }
      }
    });

    comparison = {
      dimensionName: memberCoordinates[0].dimensionName,
      hierarchyName: memberCoordinates[0].hierarchyName,
      comparedMemberNamePath: memberCoordinates[0].namePath,
      referenceMemberNamePath: memberCoordinates[1].namePath,
    };

    // At this stage the page axis exists in the MDX, so the MDX is necessarily defined.
    legacyMdxWithoutPagesAxis = {
      ...legacyMdx!,
      axes: legacyMdx!.axes.filter((axis) => axis !== pagesAxis),
    };
  }

  const [{ query, filters, queryContext }, isUsingUnsupportedUpdateMode] =
    _migrateQuery<MdxSelect>({
      legacyQuery: {
        ...legacyQuery,
        mdx: legacyMdxWithoutPagesAxis
          ? stringify(legacyMdxWithoutPagesAxis)
          : undefined,
      },
      cube,
      shouldUpdateFiltersMdx,
    });

  const mapping = deriveMappingFromMdx({
    mdx: query.mdx,
    cube,
    widgetPlugin: pluginWidgetKpi,
  });

  const migratedWidgetState: KpiWidgetState = {
    query,
    filters,
    queryContext,
    ...(comparison && { comparison }),
    mapping,
    name: legacyKpiState.name,
    serverKey,
    widgetKey: "kpi",
    ...(!shouldUpdateFiltersMdx && {
      areFiltersDrivenByMdx: true,
    }),
  };

  const serializedWidgetState = serializeWidgetState(migratedWidgetState);

  if (isUsingUnsupportedUpdateMode) {
    throw new UnsupportedLegacyQueryUpdateModeError(serializedWidgetState);
  }
  return serializedWidgetState;
}
