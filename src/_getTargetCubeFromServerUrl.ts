import _mapValues from "lodash/mapValues";
import _findKey from "lodash/findKey";
import { getCubeName, MdxDrillthrough, MdxSelect } from "@activeviam/mdx";
import type { Cube, DataModel } from "@activeviam/data-model";
import { getTargetCube } from "@activeviam/widget";

/**
 * Returns the serverKey, dataModel and cube targeted by the given `mdx` from a legacy AUI4 widget,
 * based on the `serverUrl` found in its state.
 *
 * @see getTargetCube
 */
export const _getTargetCubeFromServerUrl = ({
  mdx,
  serverUrl,
  servers,
}: {
  mdx?: MdxSelect | MdxDrillthrough;
  serverUrl?: string;
  servers: { [serverKey: string]: { dataModel: DataModel; url: string } };
}): { serverKey: string; dataModel: DataModel; cube: Cube } => {
  const dataModels = _mapValues(servers, "dataModel");
  const serverKey = !serverUrl
    ? undefined
    : _findKey(servers, ({ url }) => url === serverUrl);
  return getTargetCube({
    dataModels,
    cubeName: mdx ? getCubeName(mdx) : undefined,
    serverKey,
  });
};
