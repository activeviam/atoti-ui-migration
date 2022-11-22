import type { LegacyWidgetState } from "../migration.types";

/**
 * The widgetState of a legacy drillthrough, useful for unit tests.
 */
export const legacyDrillthrough: LegacyWidgetState = {
  name: "Drillthrough LegalEntityA ➜ BusinessUnitA",
  type: "container",
  value: {
    style: {},
    showTitleBar: true,
    body: {
      serverUrl: "",
      mdx: "DRILLTHROUGH SELECT FROM [EquityDerivativesCube] WHERE [Booking].[Desk].[ALL].[AllMember].[LegalEntityA].[BusinessUnitA] RETURN MemberValue([BusinessUnit]), Caption([BusinessUnit]), MemberValue([TradeId]), Caption([TradeId])",
      contextValues: {},
      updateMode: "once",
      configuration: {
        drillthrough: {
          hideAddButton: true,
          lineNumbers: true,
          statisticsShown: true,
          columnOrder: {
            key: "explicit",
            args: {
              orderedColumns: ["BusinessUnit", "TradeId"],
            },
          },
          columns: [
            {
              key: "BusinessUnit",
              width: 250,
            },
          ],
        },
      },
    },
    containerKey: "drillthrough",
  },
  writable: false,
};
