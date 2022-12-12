import {
  ContentRecord,
  DataModel,
  findContentRecords,
  getMetaData,
} from "@activeviam/activeui-sdk-5.0";
import _mapKeys from "lodash/mapKeys";
import _merge from "lodash/merge";
import { migrateCalculatedMeasuresInDashboards } from "./migrateCalculatedMeasuresInDashboards";
import { migrateCalculatedMeasuresInWidgets } from "./migrateCalculatedMeasuresInWidgets";

const getCalculatedMeasureName = (
  legacyCalculatedMeasureFolder: ContentRecord,
  id: any,
): string[] => {
  const { structure } = legacyCalculatedMeasureFolder.children ?? {};
  const ids = Object.keys(
    legacyCalculatedMeasureFolder.children?.content.children ?? {},
  );

  const contentRecords = structure ? findContentRecords(structure, ids) : {};

  const calculatedMeasureName = JSON.parse(
    getMetaData(contentRecords[id].node, id),
  ).name;

  return calculatedMeasureName;
};

export function migrateCalculatedMeasures(
  contentServer: ContentRecord,
  dataModel: DataModel,
): any {
  const legacyCalculatedMeasuresFolder =
    contentServer.children?.calculated_measures;
  // const pivotFolder = contentServer.children?.pivot;

  const legacyCalculatedMeasureRecords: {
    [measureName: string]: ContentRecord;
  } = legacyCalculatedMeasuresFolder?.children
    ? _mapKeys(
        legacyCalculatedMeasuresFolder.children.content.children,
        (value, key) =>
          getCalculatedMeasureName(legacyCalculatedMeasuresFolder, key),
      )
    : {};

  const namesOfCalculatedMeasuresToMigrate = Object.keys(
    legacyCalculatedMeasureRecords,
  );
  // console.log(namesOfCalculatedMeasuresToMigrate);

  const {
    migratedWidgetsRecord,
    measureToCubeMapping: measureToCubeMappingInWidgets,
  } = migrateCalculatedMeasuresInWidgets(
    contentServer.children?.widgets!,
    dataModel,
    namesOfCalculatedMeasuresToMigrate,
  );

  const {
    migratedDashboards,
    measureToCubeMapping: measureToCubeMappingInDashboards,
  } = migrateCalculatedMeasuresInDashboards(
    contentServer.children?.dashboards!,
    dataModel,
    namesOfCalculatedMeasuresToMigrate,
  );

  const measureToCubeMapping = _merge(
    measureToCubeMappingInWidgets,
    measureToCubeMappingInDashboards,
  );

  return namesOfCalculatedMeasuresToMigrate;
}

