import { contentServer } from "./5.0_to_5.1/__test_resources__/contentServer";
import { _getMetaData } from "./_getMetaData";

describe("_getMetaData", () => {
  it("returns the parsed metadata of an ActiveUI 5 content file", () => {
    const dashboardsStructure =
      contentServer.children!.ui.children!.dashboards.children!.structure;
    const pathToParentFolder = ["346"];
    const id = "14f";
    expect(
      _getMetaData(dashboardsStructure, pathToParentFolder, id),
    ).toStrictEqual({ name: "Too many columns" });
  });
});
