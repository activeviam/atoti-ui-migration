import type { LegacyDashboardState } from "../4.3_to_5.0/migration.types";
import { legacyChart } from "./legacyChart";
import { legacyPageFilters } from "./legacyPageFilters";
import { legacyQuickFilter } from "./legacyQuickFilter";
import { legacyTreeTable } from "./legacyTreeTable";

/**
 * The dashboardState of a legacy dashboard, useful for unit tests.
 */
export const legacyDashboard: LegacyDashboardState = {
  name: "1 page, 4 widgets",
  type: "container",
  value: {
    style: {},
    showTitleBar: false,
    body: {
      pages: [
        {
          content: [
            {
              key: "1",
              bookmark: legacyTreeTable,
            },
            {
              key: "2",
              bookmark: legacyChart,
            },
            {
              key: "3",
              bookmark: legacyQuickFilter,
            },
            { key: "4", bookmark: legacyPageFilters },
          ],
          layout: {
            children: {
              "0": {
                size: 0.2,
                ck: "4",
              },
              "1": {
                size: 0.8,
                children: {
                  "0": {
                    ck: "3",
                    size: 0.3,
                  },
                  "1": {
                    children: {
                      "0": {
                        ck: "1",
                        size: 0.4,
                      },
                      "1": {
                        ck: "2",
                        size: 0.6,
                      },
                    },
                    direction: "column",
                    size: 0.7,
                  },
                },
                direction: "column",
              },
            },
            direction: "row",
          },
          name: "Start page",
          contextValues: {
            EquityDerivativesCube: {
              "mdx.lightCrossjoin": true,
            },
            EquityDerivativesCubeDist: {
              "mdx.aggressiveFormulaEvaluation": true,
            },
          },
        },
      ],
      contextValues: {
        EquityDerivativesCube: {
          queriesTimeLimit: 60,
          "mdx.casesensitive": true,
          "mdx.defaultmembers.[Geography].[City]": "[AllMember].[Berlin]",
        },
        EquityDerivativesCubeDist: {
          "mdx.casesensitive": false,
          "mdx.defaultmembers.[Geography].[City]": "[AllMember].[Paris]",
        },
      },
    },
    containerKey: "dashboard",
  },
  writable: true,
};
