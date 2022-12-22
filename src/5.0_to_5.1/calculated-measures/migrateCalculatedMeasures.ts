import {
  ContentRecord,
  CubeName,
  findContentRecords,
  getMetaData,
} from "@activeviam/activeui-sdk-5.0";
import { DataModel } from "@activeviam/activeui-sdk-5.1";
import { migrateCalculatedMeasureContent } from "./migrateCalculatedMeasureContent";
import { migrateCalculatedMeasuresInDashboards } from "./migrateCalculatedMeasuresInDashboards";
import { migrateCalculatedMeasuresInWidgets } from "./migrateCalculatedMeasuresInWidgets";
import _forEach from "lodash/forEach";
import _uniq from "lodash/uniq";
import { _addErrorToReport } from "../../_addErrorToReport";
import { ErrorReport, OutcomeCounters } from "../../migration.types";
import { _getFilesAncestry } from "../../_getFilesAncestry";
import { _serializeError } from "../../_serializeError";

const getCalculatedMeasureName = (
  legacyCalculatedMeasureFolder: ContentRecord,
  id: string,
): string => {
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
export function migrateCalculatedMeasures({
  contentServer,
  dataModels,
  errorReport,
  counters,
  doesReportIncludeStacks,
}: {
  contentServer: ContentRecord;
  dataModels: { [serverKey: string]: DataModel };
  errorReport: ErrorReport;
  counters: OutcomeCounters;
  doesReportIncludeStacks: boolean;
}): void {
  const legacyCalculatedMeasuresFolder =
    contentServer.children?.ui.children?.calculated_measures;
  const cmFolder: ContentRecord | undefined =
    contentServer.children?.pivot.children?.entitlements.children?.cm;

  const namesOfCalculatedMeasuresToMigrate: string[] = [];
  const legacyCalculatedMeasures: {
    [id: string]: { record: ContentRecord; name: string };
  } = {};
  if (legacyCalculatedMeasuresFolder) {
    _forEach(
      legacyCalculatedMeasuresFolder.children?.content.children,
      (record, id) => {
        const name = getCalculatedMeasureName(
          legacyCalculatedMeasuresFolder,
          id,
        );
        namesOfCalculatedMeasuresToMigrate.push(name);
        legacyCalculatedMeasures[id] = { name, record };
      },
    );
  }

  const {
    migratedWidgetsRecord,
    measureToCubeMapping: measureToCubeMappingInWidgets,
  } = migrateCalculatedMeasuresInWidgets(
    contentServer.children?.ui.children?.widgets!,
    dataModels,
    namesOfCalculatedMeasuresToMigrate,
  );

  const {
    migratedDashboards,
    measureToCubeMapping: measureToCubeMappingInDashboards,
  } = migrateCalculatedMeasuresInDashboards(
    contentServer.children?.ui.children?.dashboards!,
    dataModels,
    namesOfCalculatedMeasuresToMigrate,
  );

  const measureToCubeMapping = namesOfCalculatedMeasuresToMigrate.reduce(
    (acc: { [measureName: string]: CubeName[] }, measureName: string) => {
      const cubes = _uniq([
        ...(measureToCubeMappingInWidgets[measureName] ?? []),
        ...(measureToCubeMappingInDashboards[measureName] ?? []),
      ]);
      if (cubes.length > 0) {
        acc[measureName] = cubes;
      }
      return acc;
    },
    {},
  );

  Object.entries(legacyCalculatedMeasures).forEach(
    ([id, { record, name: measureName }]) => {
      // `legacyCalculatedMeasuresFolder.children` contains `content` and `structure` properties.
      const filesAncestry = _getFilesAncestry(
        legacyCalculatedMeasuresFolder?.children?.structure!,
      );
      const folderId = filesAncestry[id].map(({ id }) => id);
      const folderName = filesAncestry[id].map(({ name }) => name);

      const cubeNames = measureToCubeMapping[measureName];

      try {
        // If there are no `cubeNames`, the calculated measure is not used in any saved widgets or dashboards.
        if (!cubeNames) {
          // The calculated measure was not migrated.
          counters.calculated_measures.failed++;
          _addErrorToReport(errorReport, {
            contentType: "calculated_measures",
            folderId,
            folderName,
            fileErrorReport: {
              error: {
                message: `Warning: Calculated measure "${measureName}" was not migrated because it is not currently used in any saved widgets or dashboards.`,
              },
            },
            fileId: id,
            name: measureName,
          });
          return;
        }

        const migratedContent = migrateCalculatedMeasureContent(
          JSON.parse(record.entry.content),
          measureName,
        );
        record.entry.content = JSON.stringify(migratedContent);

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
            // `cmFolder.children[cubeName].children` is created above if it does not already exist.
            cmFolder.children[cubeName].children![
              `[Measures].[${measureName}]`
            ] = record;
          }
        });
        // The calculated measure was successfully migrated.
        counters.calculated_measures.success++;
      } catch (error) {
        // The calculated measure was not migrated.
        counters.calculated_measures.failed++;
        _addErrorToReport(errorReport, {
          contentType: "calculated_measures",
          folderId,
          folderName,
          fileErrorReport: {
            error: _serializeError(error, {
              doesReportIncludeStacks,
            }),
          },
          fileId: id,
          name: measureName,
        });
      }
    },
  );

  contentServer.children!.ui.children!.widgets = migratedWidgetsRecord;
  contentServer.children!.ui.children!.dashboards = migratedDashboards;
  delete contentServer.children?.ui.children?.calculated_measures;
}
