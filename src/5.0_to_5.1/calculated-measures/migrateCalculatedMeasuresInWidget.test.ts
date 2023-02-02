import { sandboxDataModel } from "@activeviam/data-model-5.1/dist/__test_resources__";
import { getCalculatedMeasures } from "@activeviam/activeui-sdk-5.1";
import {
  mdxSelectWithNoCalculatedMeasures,
  mdxSelectWithThreeCalculatedMeasures,
} from "./migrateCalculatedMeasuresInMdx.test";
import { migrateCalculatedMeasuresInWidget } from "./migrateCalculatedMeasuresInWidget";
import _cloneDeep from "lodash/cloneDeep";

const dataModels = { "Ranch 6.0": sandboxDataModel };

const widgetWithCalculatedMeasuresState = {
  widgetKey: "pivot-table",
  query: {
    mdx: mdxSelectWithThreeCalculatedMeasures,
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

const namesOfCalculatedMeasuresToMigrate = [
  "Log pv.SUM",
  "One",
  "Some unused measure",
];

// Assume that by the time where `migrateCalculatedMeasuresInWidget` is called, it has already been identified that "Log pv.SUM" is used in a widget targeting "Some other cube".
const measureToCubeMapping = { "Log pv.SUM": ["Some other cube"] };

describe("migrateCalculatedMeasuresInWidget", () => {
  it("removes the calculated measure definitions of saved measures from the widget's query, and keeps track of the cube they belong to", () => {
    const mutatedMeasureToCubeMapping = _cloneDeep(measureToCubeMapping);
    migrateCalculatedMeasuresInWidget(widgetWithCalculatedMeasuresState, {
      dataModels,
      namesOfCalculatedMeasuresToMigrate,
      measureToCubeMapping: mutatedMeasureToCubeMapping,
    });

    expect(
      Object.keys(
        getCalculatedMeasures(widgetWithCalculatedMeasuresState.query.mdx),
      ),
      // - "Log pv.SUM" and "One" are defined in the widget's query and are saved calculated measures.
      // - "Distinct count city" is defined in the widget's query, but is not a saved calculated measure.
      // - "Some unused measure" is a saved calculated measure but is not defined in the widget's query.
      // After the migration, "Log pv.SUM" has been removed and only "Distinct count city" remains in the widget's query.
    ).toStrictEqual(["Distinct count city"]);
    expect(mutatedMeasureToCubeMapping).toStrictEqual({
      "Log pv.SUM": ["Some other cube", "EquityDerivativesCube"],
      One: ["EquityDerivativesCube"],
    });
  });

  it("has no effect on a widget that does not have calculated measures", () => {
    const widgetStateClone = _cloneDeep(widgetWithNoCalculatedMeasuresState);
    const measureToCubeMappingClone = _cloneDeep(measureToCubeMapping);

    migrateCalculatedMeasuresInWidget(widgetWithNoCalculatedMeasuresState, {
      dataModels,
      namesOfCalculatedMeasuresToMigrate,
      measureToCubeMapping,
    });

    expect(widgetStateClone).toStrictEqual(widgetWithNoCalculatedMeasuresState);
    expect(measureToCubeMappingClone).toStrictEqual(measureToCubeMapping);
  });

  it("has no effect on a widget that does not have a query", () => {
    const widgetStateClone = _cloneDeep(widgetWithNoQueryState);
    const measureToCubeMappingClone = _cloneDeep(measureToCubeMapping);

    migrateCalculatedMeasuresInWidget(widgetWithNoQueryState, {
      dataModels,
      namesOfCalculatedMeasuresToMigrate,
      measureToCubeMapping,
    });

    expect(widgetStateClone).toStrictEqual(widgetWithNoQueryState);
    expect(measureToCubeMappingClone).toStrictEqual(measureToCubeMapping);
  });
});
