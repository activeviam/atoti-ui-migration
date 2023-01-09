import {
  getTargetCube,
  createFilter,
  DataModel,
} from "@activeviam/activeui-sdk-5.1";
import { Mdx } from "@activeviam/activeui-sdk-5.0";
import { getAllCubes } from "./getAllCubes";
import { createFilterWithFirstMatchingCube } from "./createFilterWithFirstMatchingDataModel";

/**
 * In 5.0, a filter in a widget/dashboard state is just an MdxExpression.
 * In 5.1, it is an AFilter.
 * Mutates `filters`.
 */
export function migrateFilters(
  filters: Mdx[] | undefined,
  {
    dataModels,
    cubeName,
    serverKey,
  }: {
    dataModels: { [serverKey: string]: DataModel };
    cubeName?: string;
    serverKey?: string;
  },
): void {
  const cubes = getAllCubes(dataModels);
  filters?.forEach((mdx, index) => {
    if (cubeName) {
      const { cube } = getTargetCube({ dataModels, cubeName, serverKey });
      // @ts-expect-error The point of the migration is to mutate the filters from MdxExpression to AFilter.
      filters[index] = createFilter(mdx, cube);
    } else {
      // @ts-expect-error The point of the migration is to mutate the filters from MdxExpression to AFilter.
      filters[index] = createFilterWithFirstMatchingCube(mdx, cubes);
    }
  });
}
