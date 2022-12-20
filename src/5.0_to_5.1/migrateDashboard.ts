import { DashboardState as DashboardState50 } from "@activeviam/activeui-sdk-5.0";
import { DashboardState as DashboardState51 } from "@activeviam/activeui-sdk-5.1";
import { MigrateDashboardCallback } from "../migration.types";

export const migrateDashboard: MigrateDashboardCallback<
  DashboardState50,
  DashboardState51
> = () => {
  // TODO
  // - migrate dashboard and page filters (wrap in {mdx})
  // - migrate dashboard and page context values (stringify)
};
