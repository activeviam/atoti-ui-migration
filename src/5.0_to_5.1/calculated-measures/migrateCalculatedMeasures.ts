import {
  ContentRecord,
  DataModel,
  findContentRecords,
  getMetaData,
} from "@activeviam/activeui-sdk-5.0";
import _mapKeys from "lodash/mapKeys";
import _merge from "lodash/merge";
import { migrateCalculatedMeasureRecord } from "./migrateCalculatedMeasureRecord";
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

/**
 * Transforms the serialized definitions of all calculated measures created with ActiveUI 5.0 and used in a saved dashboard or saved widget, into ones that are natively supported by ActivePivot.
 * Removes any query-scoped calculated measure definitions from saved dashboards and saved widgets.
 * Mutates `contentServer`.
 */
export function migrateCalculatedMeasures(
  contentServer: ContentRecord,
  dataModel: DataModel,
): any {
  const legacyCalculatedMeasuresFolder =
    contentServer.children?.ui.children?.calculated_measures;
  const cmFolder: ContentRecord | undefined =
    contentServer.children?.pivot.children?.entitlements.children?.cm;

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

  const {
    migratedWidgetsRecord,
    measureToCubeMapping: measureToCubeMappingInWidgets,
  } = migrateCalculatedMeasuresInWidgets(
    contentServer.children?.ui.children?.widgets!,
    dataModel,
    namesOfCalculatedMeasuresToMigrate,
  );

  const {
    migratedDashboards,
    measureToCubeMapping: measureToCubeMappingInDashboards,
  } = migrateCalculatedMeasuresInDashboards(
    contentServer.children?.ui.children?.dashboards!,
    dataModel,
    namesOfCalculatedMeasuresToMigrate,
  );

  const measureToCubeMapping = _merge(
    measureToCubeMappingInWidgets,
    measureToCubeMappingInDashboards,
  );

  Object.entries(legacyCalculatedMeasureRecords).forEach(
    ([measureName, record]) => {
      const cubeNames = measureToCubeMapping[measureName];
      if (!cubeNames) {
        //TODO add a warning in the report that the calculated measure was not migrated since it's not used anywhere
        console.log(`warning ${measureName} is not used anywhere`);
        return;
      }

      const migratedRecord = migrateCalculatedMeasureRecord(
        record,
        measureName,
      );

      cubeNames.forEach((cubeName) => {
        if (cmFolder && cmFolder.children) {
          // If `cubeName` property does not already exist, create it.
          if (!cmFolder.children[cubeName]) {
            cmFolder.children[cubeName] = {
              entry: {
                isDirectory: true,
                owners: ["ROLE_USER"],
                readers: ["ROLE_USER"],
                timestamp: 1669281586947,
                lastEditor: "admin",
                canRead: true,
                canWrite: true,
              },
              children: {},
            };
          }
          // This is created above if it does not already exist.
          cmFolder.children[cubeName].children![measureName] = migratedRecord;
        }
      });
    },
  );

  contentServer.children!.ui.children!.widgets = migratedWidgetsRecord;
  contentServer.children!.ui.children!.dashboards = migratedDashboards;
  delete contentServer.children?.ui.children?.calculated_measures;
}
