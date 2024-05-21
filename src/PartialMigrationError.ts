import { AWidgetState } from "@activeviam/activeui-sdk-5.0";

/**
 * Thrown when an object could only be partially migrated.
 * Contains the partially migrated state.
 */
export class PartialMigrationError extends Error {
  public migratedWidgetState: AWidgetState<"serialized">;

  constructor(
    message: string,
    migratedWidgetState: AWidgetState<"serialized">,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.migratedWidgetState = migratedWidgetState;
  }
}
