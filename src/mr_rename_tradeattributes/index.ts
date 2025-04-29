import {
  DashboardState,
  deserializeWidgetState,
  serializeWidgetState,
  AWidgetState,
  isWidgetWithQueryState,
  traverseMdx,
  HierarchyCoordinates,
  LevelCoordinates,
  deserializeDashboardState,
  serializeDashboardState,
  Activity,
  Mdx,
  Filter,
  deserializeFilter,
  serializeFilter,
  parse,
  Cube,
  getCube,
  DataModel,
  LevelName,
  DataVisualizationWidgetState,
  stringify,
} from "@activeviam/activeui-sdk-5.2";
import { MigrationFunction } from "../migration.types";
import { migrateWidgetsWithinDashboard } from "../migrateWidgetsWithinDashboard";
import {
  getCubeName,
  getSpecificCompoundIdentifier,
} from "@activeviam/mdx-5.2";

function updateHierarchy(hierarchy: HierarchyCoordinates) {
  if (
    hierarchy.dimensionName === "TradeAttributes" &&
    hierarchy.hierarchyName === "MaturityDates"
  ) {
    hierarchy.hierarchyName = "TradeMaturityDates";
  }
}

function updateLevel(level: LevelCoordinates) {
  // Update the hierarchy separately in case the identifier level is AllMember
  updateHierarchy(level);

  if (
    level.dimensionName === "TradeAttributes" &&
    // /!\ Now has the new hierarchy name
    level.hierarchyName === "TradeMaturityDates" &&
    level.levelName === "MaturityDate"
  ) {
    level.levelName = "TradeMaturityDate";
  }
}

function updateMdx({ mdx, cube }: { mdx?: Mdx; cube?: Cube }) {
  traverseMdx(mdx, (mdx) => {
    if (mdx.elementType === "CompoundIdentifier") {
      if (cube) {
        // Enriches the parsed mdx using the cube, helps identify what is a hierarchy/dimension/level within the identifier.
        const specificCompoundIdentifier = getSpecificCompoundIdentifier(mdx, {
          cube,
        });

        if (specificCompoundIdentifier.type === "hierarchy") {
          updateHierarchy(specificCompoundIdentifier);
          Object.assign(mdx, specificCompoundIdentifier);
        } else if (
          specificCompoundIdentifier.type === "level" ||
          specificCompoundIdentifier.type === "member"
        ) {
          updateLevel(specificCompoundIdentifier);
          Object.assign(mdx, specificCompoundIdentifier);
        }
      } else {
        // When the cube is not available, best effort with simple token replacement.
        mdx.identifiers.forEach((identifier) => {
          if (identifier.value === "MaturityDates") {
            identifier.value = "TradeMaturityDates";
          } else if (identifier.value === "MaturityDate") {
            identifier.value = "TradeMaturityDate";
          }
        });
      }
    }
  });
}

function updateMappingHierarchyField(
  mappingHierarchyField: LevelCoordinates & { expandedDownTo?: LevelName },
) {
  updateLevel(mappingHierarchyField);
  if (mappingHierarchyField.expandedDownTo === "MaturityDate") {
    mappingHierarchyField.expandedDownTo = "TradeMaturityDate";
  }
}

function updateWidget(
  widget: AWidgetState,
  dataModels: Record<string, DataModel<"indexed">>,
) {
  if (isWidgetWithQueryState(widget)) {
    const { query, filters, serverKey } = widget;

    if (query.mdx !== undefined && serverKey !== undefined) {
      const dataModel = dataModels[serverKey];

      (filters || []).forEach(updateHierarchy);
      updateMdx({
        mdx: query.mdx,
        cube: getCube(dataModel, getCubeName(query.mdx)),
      });
    }

    if ("mapping" in widget) {
      const mapping = (widget as DataVisualizationWidgetState).mapping;
      Object.values(mapping).forEach((mappingFields) => {
        mappingFields.forEach((mappingField) => {
          if (mappingField.type === "hierarchy") {
            updateMappingHierarchyField(mappingField);
          } else if (mappingField.type === "compositeHierarchy") {
            mappingField.hierarchies.forEach((mappingHierarchyField) => {
              updateMappingHierarchyField(mappingHierarchyField);
            });
          }
        });
      });
    }
  }
}

function updateFilter(filter: Filter<"deserialized">) {
  // All filters inherit from AFilter/HierarchyCoordinates
  updateHierarchy(filter);

  // Some special filters also have mdx in them
  if (filter.type === "custom") {
    updateMdx({ mdx: filter.mdx, cube: undefined });
  } else if ("levelName" in filter) {
    // Some filters have a levelName property in them.
    updateLevel(filter);
  } else if ("hierarchyName" in filter) {
    // Some filters have a hierarchyName property in them.
    updateHierarchy(filter);
  }
}

/**
 * Updates the following hierarchy and level names:
 *
 * |     | Dimension       | Hierarchy          | Level             |
 * |-----|-----------------|--------------------|-------------------|
 * | Old | TradeAttributes | MaturityDates      | MaturityDate      |
 * | New | TradeAttributes | TradeMaturityDates | TradeMaturityDate |
 *
 * For all:
 * - saved filters
 * - saved widgets
 * - filters within dashboards/pages/widgets.
 * - widgets within a dashboard (query and mapping)
 * - user filters
 * - calculated measures
 */
export const renameTradeAttributes: MigrationFunction<
  DashboardState<"serialized">,
  DashboardState<"deserialized">,
  DashboardState<"deserialized">,
  DashboardState<"serialized">
> = (
  contentServer,
  { migrateDashboards, migrateSavedFilters, migrateSavedWidgets, dataModels },
) => {
  migrateSavedFilters(
    (filter) => deserializeFilter(filter),
    updateFilter,
    (filter) => serializeFilter(filter),
  );

  migrateSavedWidgets(
    (widget) => deserializeWidgetState(widget),
    (widget: AWidgetState<"deserialized">) => {
      updateWidget(widget, dataModels);
    },
    (widget) => serializeWidgetState(widget),
  );

  migrateDashboards(
    (dashboard) => deserializeDashboardState(dashboard),
    (
      dashboard: DashboardState<"deserialized">,
      { onErrorWhileMigratingWidget, keysOfWidgetPluginsToRemove, dataModels },
    ) => {
      (dashboard.filters || []).forEach(updateFilter);

      Object.values(dashboard.pages).forEach((page) => {
        (page.filters || []).forEach(updateFilter);
      });

      migrateWidgetsWithinDashboard(
        dashboard,
        (widget: AWidgetState<"deserialized">) => {
          updateWidget(widget, dataModels);
        },
        {
          dataModels,
          keysOfWidgetPluginsToRemove,
          onError: onErrorWhileMigratingWidget,
        },
      );
    },
    (dashboard) => serializeDashboardState(dashboard),
  );

  // Migrate user filters
  const userContentRecord =
    contentServer.children?.ui?.children?.users.children || {};

  // For each user
  Object.values(userContentRecord).forEach((userRecord) => {
    const activityEntry = userRecord.children?.["activity"]?.entry;
    // Look for activity file
    if (activityEntry) {
      const activity: Activity<"serialized"> = JSON.parse(
        activityEntry.content,
      );
      // Update the user filters
      activity.userFilters = activity.userFilters.map(
        (filter: Filter<"serialized">) => {
          const deserializedFilter = deserializeFilter(filter);
          updateFilter(deserializedFilter);
          return serializeFilter(deserializedFilter);
        },
      );
      activityEntry.content = JSON.stringify(activity);
    }
  });

  // Migrate calculated measures
  const calculatedMeasureContentRecord =
    contentServer.children?.pivot?.children?.entitlements?.children?.cm
      ?.children || {};

  // For each cube
  Object.values(calculatedMeasureContentRecord).forEach((cubeRecord) => {
    // For each calculated measure
    Object.values(cubeRecord.children || {}).forEach(
      (calculatedMeasureRecord) => {
        // Update its expression
        const calculatedMeasureDescription: { expression: string } = JSON.parse(
          calculatedMeasureRecord.entry.content,
        );
        const calculatedMeasureMdx = parse(
          calculatedMeasureDescription.expression,
        );
        updateMdx({ mdx: calculatedMeasureMdx });
        calculatedMeasureDescription.expression =
          stringify(calculatedMeasureMdx);
        calculatedMeasureRecord.entry.content = JSON.stringify(
          calculatedMeasureDescription,
        );
      },
    );
  });
};
