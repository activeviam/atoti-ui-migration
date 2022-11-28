import { MdxFunction, parse } from "@activeviam/activeui-sdk-5.0";
import { _doesCrossjoinRepresentAnExpandedMember } from "./_doesCrossjoinRepresentAnExpandedMember";
import { dataModelsForTests } from "@activeviam/data-model-5.0";

const cube = dataModelsForTests.sandbox.catalogs[0].cubes[0];

describe("_doesCrossjoinRepresentAnExpandedMember", () => {
  it("returns true when `crossjoin` represents an expanded member", () => {
    expect(
      _doesCrossjoinRepresentAnExpandedMember(
        parse<MdxFunction & { name: "Crossjoin" }>(`
        Crossjoin(
          [Currency].[Currency].[ALL].[AllMember].[EUR],
          Descendants(
            {
              [Geography].[City].[ALL].[AllMember]
            },
            [Geography].[City].[City]
          )
        )`),
        cube,
      ),
    ).toBe(true);
  });

  it("returns false when `crossjoin` represents all combinations of members from several levels", () => {
    expect(
      _doesCrossjoinRepresentAnExpandedMember(
        parse<MdxFunction & { name: "Crossjoin" }>(`
        Crossjoin(
          Hierarchize(
            DrilldownLevel(
              [Currency].[Currency].[ALL].[AllMember]
            )
          ),
          Hierarchize(
            DrilldownLevel(
              [Geography].[City].[ALL].[AllMember]
            )
          )
        )`),
        cube,
      ),
    ).toBe(false);
  });

  it("returns false when `crossjoin` represents all combinations of members from several levels, including a slicing one", () => {
    expect(
      _doesCrossjoinRepresentAnExpandedMember(
        parse<MdxFunction & { name: "Crossjoin" }>(`
        Crossjoin(
          Hierarchize(
            [Time].[HistoricalDates].[AsOfDate].Members
          ),
          Hierarchize(
            DrilldownLevel(
              [Currency].[Currency].[ALL].[AllMember]
            )
          )
        )`),
        cube,
      ),
    ).toBe(false);
  });
});
