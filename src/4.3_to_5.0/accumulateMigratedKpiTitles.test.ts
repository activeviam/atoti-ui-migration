import { dataModelsForTests } from "@activeviam/data-model-5.0";
import { accumulateMigratedKpiTitles } from "./accumulateMigratedKpiTitles";
import { legacyKpi } from "./__test_resources__/legacyKpi";
import { _getQueryInLegacyWidgetState } from "./_getQueryInLegacyWidgetState";
import { MdxSelect, parse } from "@activeviam/mdx-5.0";
import { KpiWidgetState } from "@activeviam/activeui-sdk-5.0";

const cube = dataModelsForTests.sandbox.catalogs[0].cubes[0];

describe("accumulateMigratedKpiTitles", () => {
  it("returns the migrated KPI titles corresponding to the legacy KPI state, ready to be used in Atoti UI 5.0", () => {
    const legacyQuery = _getQueryInLegacyWidgetState(legacyKpi);

    if (!legacyQuery || !legacyQuery.mdx) {
      throw new Error("Expected the legacy KPI state to contain a query");
    }

    const legacyMdx = parse<MdxSelect>(legacyQuery.mdx);
    const migratedTitles: KpiWidgetState["titles"] = {};
    accumulateMigratedKpiTitles(legacyKpi, {
      migratedTitles,
      cube,
      legacyMdx,
      mapping: {
        columns: [],
        measures: [{ type: "measure", measureName: "contributors.COUNT" }],
        rows: [
          {
            type: "hierarchy",
            dimensionName: "Currency",
            hierarchyName: "Currency",
            levelName: "Currency",
          },
        ],
      },
    });
    expect(migratedTitles).toMatchInlineSnapshot(`
      {
        "[Measures].[contributors.COUNT],[Currency].[Currency].[AllMember].[EUR, USD]": "Hello World",
      }
    `);
  });
});
