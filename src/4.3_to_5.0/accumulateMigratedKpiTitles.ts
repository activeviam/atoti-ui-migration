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
      if (memberUniqueName) {
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
    }

    legacyTitles.push({ title, tuple });
  }

  return legacyTitles;
}

/**
 * Accumulates the migrated KPI widget titles corresponding to legacyKpiState.
 * Mutates `migratedTitles`.
 */
export function accumulateMigratedKpiTitles(
  // Legacy widget states are not typed.
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  legacyKpiState: any,
  {
    migratedTitles = {},
    legacyMdx,
    mapping,
    cube,
  }: {
    migratedTitles: KpiWidgetState["titles"];
    legacyMdx: MdxSelect;
    mapping: DataVisualizationWidgetMapping;
    cube: Cube;
  },
): void {
  const legacyTitles = _getLegacyKpiTitles(legacyKpiState, { cube });
  const errors: Error[] = [];

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
    try {
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
    } catch (error) {
      errors.push(error as Error);
    }
  });

  if (errors.length > 0) {
    throw new Error(
      `One or more errors occurred while migrating the titles for the kpi named ${legacyKpiState.name}: ` +
        errors.map((e) => e.message).join(", "),
    );
  }
}
