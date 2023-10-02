import { legacyPivotTableWithCrossjoinOnColumnsAndHiddenColumns } from "./__test_resources__/legacyPivotTableWithCrossjoinOnColumnsAndHiddenColumns";
import { legacyPivotTableWithHiddenColumns } from "./__test_resources__/legacyPivotTableWithHiddenColumns";
import { legacyTableWithHiddenColumns } from "./__test_resources__/legacyTableWithHiddenColumns";
import { _getHiddenColumnKeys } from "./_getHiddenColumnKeys";

describe("_getHiddenColumnKeys", () => {
  it("returns the hidden column keys in a table with a static header column hidden", () => {
    const hiddenColumnKeys = _getHiddenColumnKeys(legacyTableWithHiddenColumns);
    expect(hiddenColumnKeys).toMatchInlineSnapshot(`
      [
        "[Geography].[City].[City]",
      ]
    `);
  });

  it("returns the hidden column keys in a pivot table with a body column hidden", () => {
    const hiddenColumnKeys = _getHiddenColumnKeys(
      legacyPivotTableWithHiddenColumns,
    );
    expect(hiddenColumnKeys).toMatchInlineSnapshot(`
      [
        "[Time].[HistoricalDates].[AsOfDate].[2023-09-05]",
      ]
    `);
  });

  it("returns the hidden column keys in a table with a crossjoin on columns and a body column hidden", () => {
    const hiddenColumnKeys = _getHiddenColumnKeys(
      legacyPivotTableWithCrossjoinOnColumnsAndHiddenColumns,
    );
    expect(hiddenColumnKeys).toMatchInlineSnapshot(`
      [
        "[Time].[HistoricalDates].[AsOfDate].[2023-09-05],[Booking].[Desk].[ALL].[AllMember].[LegalEntityA],[Measures].[pnl.FOREX]",
      ]
    `);
  });
});
