import { parseRow, parseDecklist } from "./ptcgo-utils";

describe("Unit tests for regex matcher", () => {
  it("should match row with starting asterisk", () => {
    const result = parseRow("* 3 Lapras-GX SUM 35");
    expect(result).toStrictEqual(["3", "Lapras-GX", "SUM", "35"]);
  });

  it("should match row without starting asterisk", () => {
    const result = parseRow("3 Lapras-GX SUM 35");
    expect(result).toStrictEqual(["3", "Lapras-GX", "SUM", "35"]);
  });

  it("should match row with double-digit amount", () => {
    const result = parseRow("10 Lapras-GX SUM 35");
    expect(result).toStrictEqual(["10", "Lapras-GX", "SUM", "35"]);
  });

  it("should match row with two-part name", () => {
    const result = parseRow("3 Tapu Lele-GX GRI 60");
    expect(result).toStrictEqual(["3", "Tapu Lele-GX", "GRI", "60"]);
  });

  it("should match row with a quote in name", () => {
    const result = parseRow("3 Professor Birch’s Observations GRI 60");
    expect(result).toStrictEqual([
      "3",
      "Professor Birch’s Observations",
      "GRI",
      "60"
    ]);
  });

  it("should match row with a promo card", () => {
    const result = parseRow("* 1 Tapu Bulu-GX PR-SM 32");
    expect(result).toStrictEqual(["1", "Tapu Bulu-GX", "PR-SM", "32"]);
  });

  it("should not match empty lines", () => {
    const result = parseRow("");
    expect(result).toBe(null);
  });

  it("should not match title line", () => {
    const result = parseRow(
      "****** Pokémon Trading Card Game Deck List ******"
    );
    expect(result).toBe(null);
  });

  it("should not match sub-headings", () => {
    const result = parseRow("##Pokémon - 12");
    expect(result).toBe(null);
  });

  it("should not match total line", () => {
    const result = parseRow("Total Cards - 60");
    expect(result).toBe(null);
  });

  it("should match basic energy without set code", () => {
    const result = parseRow("* 11 Water Energy");
    expect(result).toStrictEqual(["11", "Water"]);
  });

  it("should match basic energy with set code", () => {
    const result = parseRow("* 11 Water Energy COS 1");
    expect(result).toStrictEqual(["11", "Water"]);
  });

  it("should match basic darkness energy", () => {
    const result = parseRow("* 11 Darkness Energy");
    expect(result).toStrictEqual(["11", "Darkness"]);
  });

  it("should match basic Fairy energy", () => {
    const result = parseRow("* 11 Fairy Energy");
    expect(result).toStrictEqual(["11", "Fairy"]);
  });

  it("should match basic Fighting energy", () => {
    const result = parseRow("* 11 Fighting Energy");
    expect(result).toStrictEqual(["11", "Fighting"]);
  });

  it("should match basic Fire energy", () => {
    const result = parseRow("* 11 Fire Energy");
    expect(result).toStrictEqual(["11", "Fire"]);
  });

  it("should match basic Grass energy", () => {
    const result = parseRow("* 11 Grass Energy");
    expect(result).toStrictEqual(["11", "Grass"]);
  });

  it("should match basic Lightning energy", () => {
    const result = parseRow("* 11 Lightning Energy");
    expect(result).toStrictEqual(["11", "Lightning"]);
  });

  it("should match basic Metal energy", () => {
    const result = parseRow("* 11 Metal Energy");
    expect(result).toStrictEqual(["11", "Metal"]);
  });

  it("should match basic Psychic energy", () => {
    const result = parseRow("* 11 Psychic Energy");
    expect(result).toStrictEqual(["11", "Psychic"]);
  });

  it("should match basic Water energy", () => {
    const result = parseRow("* 11 Water Energy");
    expect(result).toStrictEqual(["11", "Water"]);
  });

  it("should not match imaginary basic magic energy", () => {
    const result = parseRow("* 11 Magic Energy");
    expect(result).toStrictEqual(null);
  });
});

describe("decklist parser tests", () => {
  it("should return empty for empty decklist", () => {
    const result = parseDecklist("");
    expect(result).toStrictEqual([]);
  });

  it("should return empty for heading only", () => {
    const result = parseDecklist(
      "****** Pokémon Trading Card Game Deck List ******"
    );
    expect(result).toStrictEqual([]);
  });

  it("should return empty for bad pokemon line", () => {
    const result = parseDecklist("* 1 Tapu Lele-GX GRI");
    expect(result).toStrictEqual([]);
  });

  it("should return single card list for single line", () => {
    const result = parseDecklist("* 1 Tapu Lele-GX GRI 60");
    expect(result).toStrictEqual([
      {
        name: "Tapu Lele-GX",
        set: "GRI",
        code: "60",
        type: "limited"
      }
    ]);
  });

  it("should return single card list for one card and headings", () => {
    const result = parseDecklist("##Pokemon 1\n* 1 Tapu Lele-GX GRI 60");
    expect(result).toStrictEqual([
      {
        name: "Tapu Lele-GX",
        set: "GRI",
        code: "60",
        type: "limited"
      }
    ]);
  });

  it("should return correctly for a basic energy", () => {
    const result = parseDecklist("* 10 Water Energy");
    const generateResult = [];
    for (let i = 0; i < 10; i++) {
      generateResult.push({
        name: "Water",
        set: undefined,
        code: undefined,
        type: "basic energy"
      });
    }
    expect(result).toStrictEqual(generateResult);
  });

  it("should return correctly for a basic energy and a pokemon", () => {
    const result = parseDecklist("* 1 Tapu Lele-GX GRI 60\n* 10 Water Energy");
    expect(result).toStrictEqual([
      {
        name: "Tapu Lele-GX",
        set: "GRI",
        code: "60",
        type: "limited"
      },
      {
        name: "Water",
        set: undefined,
        code: undefined,
        type: "basic energy"
      },
      {
        name: "Water",
        set: undefined,
        code: undefined,
        type: "basic energy"
      },
      {
        name: "Water",
        set: undefined,
        code: undefined,
        type: "basic energy"
      },
      {
        name: "Water",
        set: undefined,
        code: undefined,
        type: "basic energy"
      },
      {
        name: "Water",
        set: undefined,
        code: undefined,
        type: "basic energy"
      },
      {
        name: "Water",
        set: undefined,
        code: undefined,
        type: "basic energy"
      },
      {
        name: "Water",
        set: undefined,
        code: undefined,
        type: "basic energy"
      },
      {
        name: "Water",
        set: undefined,
        code: undefined,
        type: "basic energy"
      },
      {
        name: "Water",
        set: undefined,
        code: undefined,
        type: "basic energy"
      },
      {
        name: "Water",
        set: undefined,
        code: undefined,
        type: "basic energy"
      }
    ]);
  });
});
