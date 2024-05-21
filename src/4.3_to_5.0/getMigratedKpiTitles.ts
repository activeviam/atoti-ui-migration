import {
  Cube,
  DataVisualizationWidgetMapping,
  KpiWidgetState,
  MdxUnknownCompoundIdentifier,
  parse,
} from "@activeviam/activeui-sdk-5.0";
import {
  getSpecificCompoundIdentifier,
  quote,
  getMeasuresAxisName,
  getMeasuresPositionOnAxis,
  MdxSelect,
} from "@activeviam/mdx-5.0";

interface LegacyKpiTitle {
  title: string;
  tuple: { [hierarchyUniqueName: string]: string[] };
}

/**
 * Returns the legacy KPI titles attached to `legacyKpiState`.
 */
function _getLegacyKpiTitles(
  // Legacy widget states are not typed.
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  legacyKpiState: any,
  { cube }: { cube: Cube },
): LegacyKpiTitle[] {
  const locations =
    legacyKpiState?.value?.body?.configuration?.featuredValues?.locations;

  if (!locations) {
    return [];
  }

  const legacyTitles: LegacyKpiTitle[] = [];

  for (const tupleKey in locations) {
    const { title } = locations[tupleKey];
    const tuple: {
      [hierarchyUniqueName: string]: string[];
    } = {};
    const memberUniqueNames = tupleKey.split(/,(?![^\[]*\])/);
    for (const memberUniqueName of memberUniqueNames) {
      const compoundIdentifier =
        parse<MdxUnknownCompoundIdentifier>(memberUniqueName);
      const specificCompoundIdentifier = getSpecificCompoundIdentifier(
        compoundIdentifier,
        { cube },
      );
      if (specificCompoundIdentifier.type === "measure") {
        tuple[`[Measures].[Measures]`] = [
          specificCompoundIdentifier.measureName,
        ];
      } else if (specificCompoundIdentifier.type === "member") {
        const hierarchyUniqueName = quote(
          specificCompoundIdentifier.dimensionName,
          specificCompoundIdentifier.hierarchyName,
        );
        tuple[hierarchyUniqueName] = specificCompoundIdentifier.path;
      }
    }
    legacyTitles.push({ title, tuple });
  }

  return legacyTitles;
}

/**
 * Returns the migrated KPI widget titles corresponding to legacyKpiState.
 */
export function getMigratedKpiTitles(
  // Legacy widget states are not typed.
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  legacyKpiState: any,
  {
    legacyMdx,
    mapping,
    cube,
  }: {
    legacyMdx: MdxSelect;
    mapping: DataVisualizationWidgetMapping;
    cube: Cube;
  },
): KpiWidgetState["titles"] {
  const legacyTitles = _getLegacyKpiTitles(legacyKpiState, { cube });
  const migratedTitles: KpiWidgetState["titles"] = {};

  const numberOfColumnFields = mapping.columns?.length ?? 0;

  const measuresAxisName = getMeasuresAxisName(legacyMdx);
  const measuresAxis = legacyMdx.axes.find(
    (axis) => axis.name === measuresAxisName,
  );
  let measuresPositionInTuple = -1;
  if (measuresAxis) {
    const measuresPositionOnAxis = getMeasuresPositionOnAxis(measuresAxis);
    measuresPositionInTuple = ["0", "COLUMNS"].includes(measuresAxisName)
      ? measuresPositionOnAxis
      : numberOfColumnFields + measuresPositionOnAxis;
  }

  // Atoti UI 5.0 KPI widgets expect tuple keys to express members in the following order:
  // - column fields first
  // - then row fields
  const ordinalFields = [...(mapping.columns ?? []), ...(mapping.rows ?? [])];

  legacyTitles.forEach(({ title, tuple }) => {
    const memberUniqueNames: string[] = [];

    ordinalFields.forEach((field) => {
      if (field.type === "hierarchy") {
        const hierarchyUniqueName = quote(
          field.dimensionName,
          field.hierarchyName,
        );
        const namePath = tuple[hierarchyUniqueName];
        if (namePath) {
          memberUniqueNames.push(
            `${hierarchyUniqueName}.${quote(...namePath)}`,
          );
        }
      }
    });

    if (measuresPositionInTuple > -1) {
      const measureName = tuple[quote("Measures", "Measures")][0];
      memberUniqueNames.splice(
        measuresPositionInTuple,
        0,
        quote("Measures", measureName),
      );
    }

    const tupleKey = memberUniqueNames.join(",");
    migratedTitles[tupleKey] = title;
  });

  return migratedTitles;
}
