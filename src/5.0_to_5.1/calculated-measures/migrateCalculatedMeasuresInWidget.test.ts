import { sandboxDataModel } from "@activeviam/data-model-5.1/dist/__test_resources__";
import { getCalculatedMeasures } from "@activeviam/activeui-sdk-5.1";
import {
  mdxSelectWithNoCalculatedMeasures,
  mdxSelectWithTwoCalculatedMeasures,
} from "./migrateCalculatedMeasuresInMdx.test";
import { migrateCalculatedMeasuresInWidget } from "./migrateCalculatedMeasuresInWidget";
import _cloneDeep from "lodash/cloneDeep";

const dataModels = { "Ranch 6.0": sandboxDataModel };

const widgetWithCalculatedMeasuresState = {
  widgetKey: "pivot-table",
  query: {
    mdx: mdxSelectWithTwoCalculatedMeasures,
  },
};

const widgetWithNoCalculatedMeasuresState = {
  widgetKey: "pivot-table",
  query: {
    mdx: mdxSelectWithNoCalculatedMeasures,
  },
};

const widgetWithNoQueryState = {
  widgetKey: "text-editor",
};

describe("migrateCalculatedMeasuresInWidget", () => {
  // Assume that by the time where `migrateCalculatedMeasuresInWidget` is called, it has already been identified that "Log pv.SUM" is used in a widget targeting "Some other cube".
  const measureToCubeMapping = { "Log pv.SUM": ["Some other cube"] };
  migrateCalculatedMeasuresInWidget(widgetWithCalculatedMeasuresState, {
    dataModels,
    namesOfCalculatedMeasuresToMigrate: ["Log pv.SUM", "Some unused measure"],
    measureToCubeMapping,
  });

  it("removes the calculated measure definitions of saved measures from the widget's query", () => {
    expect(
      Object.keys(
        getCalculatedMeasures(widgetWithCalculatedMeasuresState.query.mdx),
      ),
      // - "Log pv.SUM" is defined in the widget's query and is a saved calculated measure.
      // - "Distinct count city" is defined in the widget's query, but is not a saved calculated measure.
      // - "Some unused measure" is a saved calculated measure but is not defined in the widget's query.
      // After the migration, "Log pv.SUM" has been removed and only "Distinct count city" remains in the widget's query.
    ).toStrictEqual(["Distinct count city"]);
  });

  it("keeps track of the cube to which the removed calculated measures belong", () => {
    expect(measureToCubeMapping).toStrictEqual({
      "Log pv.SUM": ["Some other cube", "EquityDerivativesCube"],
    });
  });

  it("has no effect on a widget that does not have calculated measures", () => {
    const clone = _cloneDeep(widgetWithNoCalculatedMeasuresState);
    migrateCalculatedMeasuresInWidget(widgetWithNoCalculatedMeasuresState, {
      dataModels,
      namesOfCalculatedMeasuresToMigrate: ["Log pv.SUM", "Some unused measure"],
      measureToCubeMapping,
    });
    expect(clone).toStrictEqual(widgetWithNoCalculatedMeasuresState);
  });

  it("has no effect on a widget that does not have a query", () => {
    const clone = _cloneDeep(widgetWithNoQueryState);
    migrateCalculatedMeasuresInWidget(widgetWithNoQueryState, {
      dataModels,
      namesOfCalculatedMeasuresToMigrate: ["Log pv.SUM", "Some unused measure"],
      measureToCubeMapping,
    });
    expect(clone).toStrictEqual(widgetWithNoQueryState);
  });
});
