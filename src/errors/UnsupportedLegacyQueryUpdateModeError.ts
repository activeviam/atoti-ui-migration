import { AWidgetState } from "@activeviam/activeui-sdk";
import { PartialMigrationError } from "./PartialMigrationError";

/**
 * Thrown when a widget contains a query whose update mode is unsupported.
 */
export class UnsupportedLegacyQueryUpdateModeError extends PartialMigrationError {
  constructor(migratedWidgetState: AWidgetState<"serialized">) {
    super(
      "The 'refresh-periodically' mode for query updates is not supported in ActiveUI 5, falling back to 'once'.",
      migratedWidgetState,
    );
  }
}
