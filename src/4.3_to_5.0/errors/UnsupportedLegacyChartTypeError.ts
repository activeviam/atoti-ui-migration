/**
 * Thrown when `legacyChartType` cannot be converted to a chart type supported in Atoti UI 5.
 */
export class UnsupportedLegacyChartTypeError extends Error {
  constructor(legacyChartType: string) {
    super(`Unsupported legacy chart type: "${legacyChartType}"`);
  }
}
