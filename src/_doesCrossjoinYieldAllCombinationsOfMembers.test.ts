import { MdxFunction, parse } from "@activeviam/mdx";
import { _doesCrossjoinYieldAllCombinationsOfMembers } from "./_doesCrossjoinYieldAllCombinationsOfMembers";
import { dataModelsForTests } from "@activeviam/data-model";

const cube = dataModelsForTests.sandbox.catalogs[0].cubes[0];

describe("_doesCrossjoinYieldAllCombinationsOfMembers", () => {
  it("returns false when `crossjoin` represents an expanded member", () => {
    expect(
      _doesCrossjoinYieldAllCombinationsOfMembers(
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
        {
          cube,
          levelsOnAxis: [
            {
              dimensionName: "Currency",
              hierarchyName: "Currency",
              levelName: "Currency",
            },
            {
              dimensionName: "Geography",
              hierarchyName: "City",
              levelName: "City",
            },
          ],
        }
      )
    ).toBe(false);
  });

  it("returns true when `crossjoin` represents all combinations of members from several levels", () => {
    expect(
      _doesCrossjoinYieldAllCombinationsOfMembers(
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
        {
          cube,
          levelsOnAxis: [
            {
              dimensionName: "Currency",
              hierarchyName: "Currency",
              levelName: "Currency",
            },
            {
              dimensionName: "Geography",
              hierarchyName: "City",
              levelName: "City",
            },
          ],
        }
      )
    ).toBe(true);
  });

  it("returns true when `crossjoin` represents all combinations of members from several levels, including a slicing one", () => {
    expect(
      _doesCrossjoinYieldAllCombinationsOfMembers(
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
        {
          cube,
          levelsOnAxis: [
            {
              dimensionName: "Time",
              hierarchyName: "HistoricalDates",
              levelName: "AsOfDate",
            },
            {
              dimensionName: "Currency",
              hierarchyName: "Currency",
              levelName: "Currency",
            },
          ],
        }
      )
    ).toBe(true);
  });

  it("returns true when `crossjoin` represents all combinations of members from several levels, even when a level is represented as a compound identifier", () => {
    expect(
      _doesCrossjoinYieldAllCombinationsOfMembers(
        parse<MdxFunction & { name: "Crossjoin" }>(`
        Crossjoin(
          [Time].[HistoricalDates].[AsOfDate],
          Hierarchize(
            DrilldownLevel(
              [Currency].[Currency].[ALL].[AllMember]
            )
          )
        )`),
        {
          cube,
          levelsOnAxis: [
            {
              dimensionName: "Time",
              hierarchyName: "HistoricalDates",
              levelName: "AsOfDate",
            },
            {
              dimensionName: "Currency",
              hierarchyName: "Currency",
              levelName: "Currency",
            },
          ],
        }
      )
    ).toBe(true);
  });

  it("returns true when `crossjoin` represents all combinations of members from several levels, even if polluted by a useless dangling member compound identifier, yielded by a user collapsing then re-expanding it in ActiveUI 4", () => {
    expect(
      _doesCrossjoinYieldAllCombinationsOfMembers(
        parse<MdxFunction & { name: "Crossjoin" }>(`
        Crossjoin(
          Hierarchize(
            Union(
              Hierarchize(
                DrilldownLevel(
                  [Currency].[Currency].[ALL].[AllMember]
                )
              ),
              [Currency].[Currency].[ALL].[AllMember].[EUR]
            )
          ),
          Hierarchize(
            DrilldownLevel(
              [Geography].[City].[ALL].[AllMember]
            )
          )
        )`),
        {
          cube,
          levelsOnAxis: [
            {
              dimensionName: "Currency",
              hierarchyName: "Currency",
              levelName: "Currency",
            },
            {
              dimensionName: "Geography",
              hierarchyName: "City",
              levelName: "City",
            },
          ],
        }
      )
    ).toBe(true);
  });

  it("returns false when `crossjoin` represents all combinations of members from several levels, but not all the levels present on the axis", () => {
    expect(
      _doesCrossjoinYieldAllCombinationsOfMembers(
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
        {
          cube,
          levelsOnAxis: [
            {
              dimensionName: "Currency",
              hierarchyName: "Currency",
              levelName: "Currency",
            },
            {
              dimensionName: "Geography",
              hierarchyName: "City",
              levelName: "City",
            },
            {
              dimensionName: "Booking",
              hierarchyName: "Desk",
              levelName: "LegalEntity",
            },
          ],
        }
      )
    ).toBe(false);
  });
});
