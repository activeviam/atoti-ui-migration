import _mapValues from "lodash/mapValues";
import _findKey from "lodash/findKey";
import {
  Cube,
  DataModel,
  LevelCoordinates,
  QuickFilterWidgetState,
  getTargetCube,
  getHierarchy,
} from "@activeviam/activeui-sdk-5.0";

const _getMode = ({
  displayedAsSelect,
  multipleSelection,
  levelCoordinates,
  cube,
}: {
  displayedAsSelect?: boolean;
  multipleSelection?: boolean;
  levelCoordinates?: LevelCoordinates;
  cube?: Cube;
}): "select" | "multi-select" | "checkbox" | "radio" => {
  let shouldAllowMultipleSelection = multipleSelection;
  if (multipleSelection === undefined && levelCoordinates && cube) {
    const { dimensionName, hierarchyName, levelName } = levelCoordinates;
    const hierarchy = getHierarchy({ dimensionName, hierarchyName }, cube);
    const isLevelSlicing =
      hierarchy.slicing && hierarchy.levels[0].name === levelName;
    shouldAllowMultipleSelection = !isLevelSlicing;
  }

  if (displayedAsSelect) {
    if (shouldAllowMultipleSelection) {
      return "multi-select";
    } else {
      return "select";
    }
  } else {
    if (shouldAllowMultipleSelection) {
      return "checkbox";
    } else {
      return "radio";
    }
  }
};

/**
 * Returns the converted quick filter widget state, ready to be used by ActiveUI 5.
 */
export function migrateQuickFilter(
  // Legacy widget states are not typed.
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  legacyQuickFilterState: any,
  {
    servers,
  }: {
    servers: { [serverKey: string]: { dataModel: DataModel; url: string } };
  },
): QuickFilterWidgetState<"serialized"> {
  const {
    cube: cubeName,
    dimension: dimensionName,
    hierarchy: hierarchyName,
    level: levelName,
  } = legacyQuickFilterState?.value?.body?.levelDetails ?? {};

  const levelCoordinates =
    dimensionName && hierarchyName && levelName
      ? {
          dimensionName,
          hierarchyName,
          levelName,
        }
      : undefined;

  const serverUrl = legacyQuickFilterState?.value?.body?.serverUrl;

  const dataModels = _mapValues(servers, "dataModel");
  const { serverKey, cube } = getTargetCube({
    dataModels,
    cubeName,
    serverKey: !serverUrl
      ? undefined
      : _findKey(servers, ({ url }) => url === serverUrl),
  });

  const { displayedAsSelect, multipleSelection } =
    legacyQuickFilterState?.value?.body?.configuration ?? {};
  const mode = _getMode({
    cube,
    levelCoordinates,
    displayedAsSelect,
    multipleSelection,
  });

  return {
    mode,
    name: legacyQuickFilterState.name,
    levelCoordinates,
    cubeName,
    serverKey,
    widgetKey: "quick-filter",
  };
}
