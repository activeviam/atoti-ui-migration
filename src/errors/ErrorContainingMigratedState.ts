import { AWidgetState } from "@activeviam/activeui-sdk";

/**
 * Parent class for all errors that wrap a sucessfully migrated widget state.
 */
export class ErrorContainingMigratedState extends Error {
  public migratedWidgetState: AWidgetState<"serialized">;

  constructor(
    message: string,
    migratedWidgetState: AWidgetState<"serialized">,
  ) {
    super(message);
    this.migratedWidgetState = migratedWidgetState;
  }
}
