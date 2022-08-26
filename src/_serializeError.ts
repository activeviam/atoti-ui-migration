import _isError from "lodash/isError";

/**
 * Returns a version of `error` which can be output in a file.
 */
export function _serializeError(
  error: unknown,
  { doesReportIncludeStacks }: { doesReportIncludeStacks?: boolean },
): { message: string; stack?: string[] } {
  if (!_isError(error)) {
    // In order to make sure that error has its `message` and `stack` attributes below.
    // Should not happen.
    throw error;
  }

  return {
    message: error.message,
    ...(doesReportIncludeStacks ? { stack: error.stack?.split("\n") } : {}),
  };
}
