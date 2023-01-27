import { PartialDashboardErrorReport } from "./migration.types";
import { _serializeError } from "./_serializeError";

/**
 * Adds `error` to `errorReport`, where `error` was thrown during the migration of a widget within the dashboard.
 * Mutates `errorReport`.
 */
export function _addWidgetErrorToReport(
  errorReport: PartialDashboardErrorReport,
  error: unknown,
  {
    doesReportIncludeStacks,
    pageKey,
    leafKey,
    pageName,
    widgetName,
  }: {
    doesReportIncludeStacks?: boolean;
    pageKey: string;
    leafKey: string;
    pageName: string;
    widgetName: string;
  },
): void {
  if (!errorReport.pages[pageKey]) {
    errorReport.pages[pageKey] = {
      pageName,
      widgets: {},
    };
  }
  errorReport.pages[pageKey].widgets[leafKey] = {
    widgetName,
    error: _serializeError(error, { doesReportIncludeStacks }),
  };
}
