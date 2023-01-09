import {
  deserializeWidgetState,
  deserializeDashboardState,
  parse,
  DashboardState as DashboardState50,
  AWidgetState as WidgetState50,
  MdxExpression,
} from "@activeviam/activeui-sdk-5.0";
import {
  serializeWidgetState,
  serializeDashboardState,
  stringify,
  DashboardState as DashboardState51,
  AWidgetState as WidgetState51,
} from "@activeviam/activeui-sdk-5.1";
import { MigrationFunction } from "../migration.types";
import { migrateCalculatedMeasures } from "./calculated-measures/migrateCalculatedMeasures";
import { migrateDashboard } from "./migrateDashboard";
import { migrateSavedFilter } from "./migrateSavedFilter";
import { migrateWidget } from "./migrateWidget";

export const migrate_50_to_51: MigrationFunction<
  DashboardState50<"serialized">,
  DashboardState50<"deserialized">,
  DashboardState51<"deserialized">,
  DashboardState51<"serialized">,
  WidgetState50<"serialized">,
  WidgetState50<"deserialized">,
  WidgetState51<"deserialized">,
  WidgetState51<"serialized">,
  { mdx: string },
  { mdx: MdxExpression },
  { mdx: MdxExpression },
  { mdx: string }
> = (
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
  migrateCalculatedMeasures({
    contentServer,
    dataModels,
    errorReport,
    counters,
    doesReportIncludeStacks,
  });

  migrateDashboards(
    deserializeDashboardState,
    migrateDashboard,
    serializeDashboardState,
  );

  migrateSavedWidgets(
    deserializeWidgetState,
    migrateWidget,
    serializeWidgetState,
  );

  migrateSavedFilters(
    ({ mdx }) => ({
      mdx: parse(mdx),
    }),
    migrateSavedFilter,
    ({ mdx }) => ({ mdx: stringify(mdx) }),
  );
};
