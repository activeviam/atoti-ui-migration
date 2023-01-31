import {
  parse,
  deserializeDashboardState,
  deserializeWidgetState,
} from "@activeviam/activeui-sdk-5.0";
import {
  WidgetMetaData,
  serializeWidgetState,
  serializeDashboardState,
  serializeFilter,
} from "@activeviam/activeui-sdk-5.1";
import { MigrationFunction } from "../migration.types";
import { migrateDashboard } from "./migrateDashboard";
import { migrateSavedFilter } from "./migrateSavedFilter";
import { migrateWidget } from "./migrateWidget";
import { getNamesOfCalculatedMeasuresToMigrate } from "./calculated-measures/getNamesOfCalculatedMeasuresToMigrate";
import { migrateSavedCalculatedMeasures } from "./calculated-measures/migrateSavedCalculatedMeasures";
import { _getMetaData } from "../_getMetaData";
import { _getFilesAncestry } from "../_getFilesAncestry";
import { _addCorruptFileErrorToReport } from "../_addCorruptFileErrorToReport";

export const migrate_50_to_51: MigrationFunction = (
  contentServer,
  {
    migrateDashboards,
    migrateSavedWidgets,
    migrateSavedFilters,
    dataModels,
    errorReport,
    counters,
    doesReportIncludeStacks,
  },
) => {
  const namesOfCalculatedMeasuresToMigrate =
    getNamesOfCalculatedMeasuresToMigrate(contentServer);
  // Accumulate the cubes to which the saved calculated measures belong.
  const measureToCubeMapping: { [measureName: string]: string[] } = {};

  migrateDashboards(
    deserializeDashboardState,
    (
      dashboardState,
      { keysOfWidgetPluginsToRemove, onErrorWhileMigratingWidget },
    ) =>
      migrateDashboard(dashboardState, {
        dataModels,
        keysOfWidgetPluginsToRemove,
        onErrorWhileMigratingWidget,
        namesOfCalculatedMeasuresToMigrate,
        measureToCubeMapping,
      }),
    serializeDashboardState,
  );

  migrateSavedWidgets(
    deserializeWidgetState,
    (widgetState) =>
      migrateWidget(widgetState, {
        dataModels,
        namesOfCalculatedMeasuresToMigrate,
        measureToCubeMapping,
      }),
    serializeWidgetState,
  );

  // Must be called after `migrateDashboards` and `migrateSavedWidgets`, as `measureToCubeMapping` is accumulated during those steps.
  migrateSavedCalculatedMeasures({
    contentServer,
    measureToCubeMapping,
    errorReport,
    counters,
    doesReportIncludeStacks,
    step: "5.0 to 5.1",
  });

  migrateSavedFilters(
    ({ mdx }) => ({
      mdx: parse(mdx),
    }),
    ({ mdx }) => migrateSavedFilter({ mdx }, { dataModels }),
    serializeFilter,
  );

  const { content: widgetContent, structure: widgetStructure } =
    contentServer.children?.ui.children?.widgets.children ?? {};
  for (const fileId in widgetContent.children) {
    const filesAncestry = _getFilesAncestry(widgetStructure);
    const pathToParentFolder = (filesAncestry[fileId] || []).map(
      ({ id }) => id,
    );
    console.log(pathToParentFolder, fileId);
    const widgetMetaData = _getMetaData<WidgetMetaData>(
      widgetStructure,
      pathToParentFolder,
      fileId,
    );
    if (widgetMetaData.version === undefined) {
      widgetMetaData.version = 1;
      console.log(widgetMetaData);
      const metadataRecord = [
        ...pathToParentFolder,
        fileId,
        `${fileId}_metadata`,
      ].reduce((acc, id) => acc.children![id], widgetStructure);
      metadataRecord.entry.content = JSON.stringify(widgetMetaData);
    }
  }
};
