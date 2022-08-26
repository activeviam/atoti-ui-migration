import { AWidgetState } from "@activeviam/activeui-sdk";

/**
 * Thrown when an object could only be partially migrated.
 * Contains the partially migrated state.
 */
export class PartialMigrationError extends Error {
  public migratedWidgetState: AWidgetState<"serialized">;

  constructor(
    message: string,
    migratedWidgetState: AWidgetState<"serialized">,
  ) {
    super(message);
    this.migratedWidgetState = migratedWidgetState;
  }
}
