import _sum from "lodash/sum";
import {
  DataVisualizationWidgetMapping,
  HierarchyInMapping,
  quote,
} from "@activeviam/activeui-sdk-5.0";
import {
  Cube,
  LevelCoordinates,
  getHierarchy,
  getLevelIndex,
} from "@activeviam/data-model-5.0";

/**
 * Returns the depth of the level corresponding to the given `levelCoordinates`.
 * {@example}
 * For [Booking].[Desk].[Desk], returns 4.
 * Indeed, the [Booking].[Desk] hierarchy has 5 levels:
 * - ALL
 * - LegalEntity
 * - BusinessUnit
 * - Desk
 * - BookId
 */
function getLevelDepthForHierarchyInMapping({
  cube,
  ...levelCoordinates
}: { cube: Cube } & LevelCoordinates): number {
  const hierarchy = getHierarchy(levelCoordinates, cube);

  const levelIndex = getLevelIndex({
    cube,
    ...levelCoordinates,
  });

  // Slicing hierarchies don't have the level ALL.
  // Therefore their level indices start at 1 (members of their first level already count as they are visible in tables).
  return levelIndex + (hierarchy.slicing ? 1 : 0);
}

/**
 * Returns the sum of the depth of the deepest level per hierarchy found on the rows axis.
 * {@example} if the widget has Desk and Counterparty on rows, then returns 5.
 * Indeed, Desk is the 3rd level in its hierarchy (LegalEntity / BusinessUnit / Desk / BookId).
 * And Counterparty is the 2nd level in its hierarchy (CounterpartyGroup / Counterparty).
 */
export function _getLevelDepthOnRows({
  cube,
  mapping,
}: {
  cube: Cube;
  mapping: DataVisualizationWidgetMapping;
}): number {
  const levelDepthPerHierarchy: { [hierarchyUniqueName: string]: number } = {};
  const hierarchiesInMapping: Omit<HierarchyInMapping, "type">[] = [];

  mapping.rows.forEach((field) => {
    if (field.type === "hierarchy") {
      hierarchiesInMapping.push(field);
    } else if (field.type === "compositeHierarchy") {
      hierarchiesInMapping.push(...field.hierarchies);
    }
  });

  hierarchiesInMapping.forEach((field) => {
    const hierarchyUniqueName = quote(field.dimensionName, field.hierarchyName);
    const levelDepth = getLevelDepthForHierarchyInMapping({
      cube,
      ...field,
      levelName: field.expandedDownTo ?? field.levelName,
    });

    levelDepthPerHierarchy[hierarchyUniqueName] = Math.max(
      levelDepth,
      levelDepthPerHierarchy[hierarchyUniqueName] ?? 0,
    );
  });

  return _sum(Object.values(levelDepthPerHierarchy));
}
