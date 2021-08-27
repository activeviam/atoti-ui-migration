import type {
  AWidgetState,
  DataModel,
  MemberCoordinates,
  KpiComparison,
  MdxSelect,
  KpiWidgetState,
} from "@activeviam/activeui-sdk";
import {
  parse,
  stringify,
  traverseMdx,
  pluginWidgetKpi,
  serializeWidgetState,
  deriveMappingFromMdx,
} from "@activeviam/activeui-sdk";
import { _getQueryInLegacyWidgetState } from "./_getQueryInLegacyWidgetState";
import { _getTargetCubeFromServerUrl } from "./_getTargetCubeFromServerUrl";
import { _migrateQuery } from "./_migrateQuery";

/**
 * Returns the converted KPI (= Featured values) widget state, ready to be used by ActiveUI 5.
 */
export function migrateKpi(
  // Legacy widget states are not typed.
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  legacyKpiState: any,
  servers: { [serverKey: string]: { dataModel: DataModel; url: string } }
): AWidgetState<"serialized"> {
  const legacyQuery = _getQueryInLegacyWidgetState(legacyKpiState);
  const legacyMdx = legacyQuery.mdx
    ? parse<MdxSelect>(legacyQuery.mdx)
    : undefined;

  const serverUrlInLegacyWidgetState = legacyKpiState?.value?.body?.serverUrl;
  const { serverKey, cube } = _getTargetCubeFromServerUrl({
    mdx: legacyMdx,
    serverUrl: serverUrlInLegacyWidgetState,
    servers,
  });

  let legacyMdxWithoutPagesAxis = legacyMdx;
  let comparison: KpiComparison | undefined = undefined;
  const pagesAxis = (legacyMdx?.axes || []).find(
    ({ name }) => name === "PAGES"
  );
  if (pagesAxis) {
    const memberCoordinates: MemberCoordinates[] = [];

    traverseMdx(pagesAxis, (mdx) => {
      if (mdx.elementType === "CompoundIdentifier") {
        const specificCompoundIdentifier = getSpecificCompoundIdentifier(
          mdx,
          cube
        );
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
      referenceMemberNamePath: memberCoordinates[0].namePath,
      comparedMemberNamePath: memberCoordinates[1].namePath,
    };

    // At this stage the page axis exists in the MDX, so the MDX is necessarily defined.
    legacyMdxWithoutPagesAxis = {
      ...legacyMdx!,
      axes: legacyMdx!.axes.filter((axis) => axis !== pagesAxis),
    };
  }

  const { query, filters, queryContext } = _migrateQuery<MdxSelect>({
    legacyQuery: {
      ...legacyQuery,
      mdx: legacyMdxWithoutPagesAxis
        ? stringify(legacyMdxWithoutPagesAxis)
        : undefined,
    },
    cube,
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
  };

  return serializeWidgetState(migratedWidgetState);
}
