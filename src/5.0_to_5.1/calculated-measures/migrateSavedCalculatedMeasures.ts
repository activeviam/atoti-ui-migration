import { ContentRecord } from "@activeviam/activeui-sdk-5.0";
import { migrateSavedCalculatedMeasureContent } from "./migrateSavedCalculatedMeasureContent";
import _defaultsDeep from "lodash/defaultsDeep";

import { _addErrorToReport } from "../../_addErrorToReport";
import { ErrorReport, OutcomeCounters } from "../../migration.types";
import { _getFilesAncestry } from "../../_getFilesAncestry";
import { _serializeError } from "../../_serializeError";
import { _getMetaData } from "../../_getMetaData";

const contentServerWithEmptyPivotCalculatedMeasuresFolder = {
  entry: {
    isDirectory: true,
    owners: ["ROLE_CS_ROOT"],
    readers: ["ROLE_CS_ROOT"],
    timestamp: 1669226473908,
    lastEditor: "_no_user_",
    canRead: true,
    canWrite: true,
  },
  children: {
    pivot: {
      entry: {
        isDirectory: true,
        owners: ["ROLE_CS_ROOT"],
        readers: ["ROLE_CS_ROOT"],
        timestamp: 1669226475037,
        lastEditor: "_no_user_",
        canRead: true,
        canWrite: true,
      },
      children: {
        entitlements: {
          entry: {
            isDirectory: true,
            owners: ["ROLE_CS_ROOT"],
            readers: ["ROLE_CS_ROOT"],
            timestamp: 1669226475074,
            lastEditor: "_no_user_",
            canRead: true,
            canWrite: true,
          },
          children: {
            cm: {
              entry: {
                isDirectory: true,
                owners: ["ROLE_USER"],
                readers: ["ROLE_USER"],
                timestamp: 1669226475106,
                lastEditor: "_no_user_",
                canRead: true,
                canWrite: true,
              },
              children: {},
            },
          },
        },
      },
    },
  },
};

/**
 * Transforms the serialized definitions of all calculated measures created with ActiveUI 5.0 and used in a saved dashboard or saved widget, into ones that are natively supported by ActivePivot.
 * Mutates `contentServer`.
 */
export function migrateSavedCalculatedMeasures({
  contentServer,
  measureToCubeMapping,
  errorReport,
  counters,
  doesReportIncludeStacks,
  step,
  contentServerVersion,
}: {
  contentServer: ContentRecord;
  measureToCubeMapping: { [measureName: string]: string[] };
  errorReport: ErrorReport;
  counters: OutcomeCounters;
  doesReportIncludeStacks: boolean;
  step: string;
  contentServerVersion?: string;
}): void {
  const legacyCalculatedMeasuresFolder =
    contentServer.children?.ui?.children?.calculated_measures;

  const { content, structure } = legacyCalculatedMeasuresFolder?.children ?? {};
  if (!content?.children || !structure?.children) {
    return;
  }

  // Make sure that the folder /pivot/entitlements/cm folder exists.
  _defaultsDeep(
    contentServer,
    contentServerWithEmptyPivotCalculatedMeasuresFolder,
  );
  const pivotCalculatedMeasuresFolder =
    contentServer.children!.pivot.children!.entitlements.children!.cm;

  const filesAncestry = _getFilesAncestry(structure);
  Object.entries(content.children).forEach(([id, record]) => {
    const folderId = filesAncestry[id].map(({ id }) => id);
    const folderName = filesAncestry[id].map(({ name }) => name);
    const measureName = _getMetaData(structure, folderId, id).name!;

    try {
      const cubeNames = measureToCubeMapping[measureName];
      if (!cubeNames) {
        // The calculated measure is not used in any saved widgets or dashboards.
        // Do not migrate it.
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
          step,
        });
        return;
      }

      const migratedContent = migrateSavedCalculatedMeasureContent(
        JSON.parse(record.entry.content),
        measureName,
        contentServerVersion,
      );
      record.entry.content = migratedContent;

      cubeNames.forEach((cubeName) => {
        // If `cubeName` property does not already exist, create it.
        if (!pivotCalculatedMeasuresFolder.children?.[cubeName]) {
          pivotCalculatedMeasuresFolder.children![cubeName] = {
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
        pivotCalculatedMeasuresFolder.children![cubeName].children![
          `[Measures].[${measureName}]`
        ] = record;
      });

      // The calculated measure was successfully migrated.
      counters.calculated_measures.success++;
    } catch (error) {
      // The calculated measure could not be migrated.
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
        step,
      });
    }
  });

  delete contentServer.children?.ui.children?.calculated_measures;
}