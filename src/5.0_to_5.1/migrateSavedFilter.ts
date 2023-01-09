import { AFilter } from "@activeviam/activeui-sdk-5.1";
import { MdxExpression } from "@activeviam/activeui-sdk-5.0";
import { MigrateFilterCallback } from "../migration.types";
import { createFilterWithFirstMatchingCube } from "./createFilterWithFirstMatchingDataModel";
import { getAllCubes } from "./getAllCubes";

/**
 * Mutates a 5.0 `filterState` into one usable in 5.1.
 */
export const migrateSavedFilter: MigrateFilterCallback<
  { mdx: MdxExpression },
  AFilter
> = ({ mdx }, { dataModels }) => {
  const cubes = getAllCubes(dataModels);
  return createFilterWithFirstMatchingCube(mdx, cubes);
};
