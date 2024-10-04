import { Cube } from "@activeviam/data-model-5.0";
import {
  addMeasure,
  getMeasures,
  isMdxDrillthrough,
  MdxDrillthrough,
  MdxSelect,
} from "@activeviam/mdx-5.0";

export function _addDefaultMeasureIfNoneIsExplicitlyExpressed(
  mdx: MdxDrillthrough,
  { cube }: { cube: Cube },
): MdxDrillthrough;
export function _addDefaultMeasureIfNoneIsExplicitlyExpressed(
  mdx: MdxSelect,
  { cube }: { cube: Cube },
): MdxSelect;
export function _addDefaultMeasureIfNoneIsExplicitlyExpressed(
  mdx: MdxSelect | MdxDrillthrough,
  { cube }: { cube: Cube },
): MdxSelect | MdxDrillthrough;

/**
 * When there is any hierarchy expressed on the columns axis, but no measure explicitly expressed, the default measure is:
 * - displayed in Atoti UI 4.3
 * - not displayed in Atoti 5.0
 * This function explicitly adds it to the MDX so that it is isofunctional for the user.
 */
export function _addDefaultMeasureIfNoneIsExplicitlyExpressed(
  mdx: MdxSelect | MdxDrillthrough,
  { cube }: { cube: Cube },
): MdxSelect | MdxDrillthrough {
  if (isMdxDrillthrough(mdx)) {
    return mdx;
  }

  if (mdx.axes.length === 0) {
    return mdx;
  }

  const doesExplicitlyIncludeAMeasure = getMeasures(mdx).length > 0;
  if (doesExplicitlyIncludeAMeasure) {
    return mdx;
  }

  const columnsAxis = mdx.axes.find(
    ({ name }) => name === "COLUMNS" || name === "0",
  );

  if (!columnsAxis) {
    return mdx;
  }

  // A default measure is necessarily defined in each cube.
  const defaultMeasureName = cube.defaultMembers.find(
    ({ dimension }) => dimension === "Measures",
  )!.path[0];
  return addMeasure(mdx, { cube, measureName: defaultMeasureName });
}
