import { AWidgetState as AWidgetState50 } from "@activeviam/activeui-sdk-5.0";
import { AWidgetState as AWidgetState51 } from "@activeviam/activeui-sdk-5.1";
import { MigrateWidgetCallback } from "../migration.types";

export const migrateWidget: MigrateWidgetCallback<
  AWidgetState50,
  AWidgetState51
> = () => {
  // TODO
  // - migrate widget filters (wrap in {mdx})
  // - migrate widget context values (stringify)
};
