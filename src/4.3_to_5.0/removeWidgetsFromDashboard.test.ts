import { testDashboard } from "./__test_resources__/testDashboard";
import { removeWidgetsFromDashboard } from "./removeWidgetsFromDashboard";

describe("removeWidgetsFromDashboard", () => {
  it("removes the widgets identified by `keysOfLeavesToRemove` from the dashboard", () => {
    const keysOfLeavesToRemove: { [key: string]: string[] } = {
      "p-0": ["2", "3", "4"],
    };

    const updatedDashboard = removeWidgetsFromDashboard(
      testDashboard,
      keysOfLeavesToRemove,
    );

    expect(updatedDashboard).toMatchInlineSnapshot();
  });
});
