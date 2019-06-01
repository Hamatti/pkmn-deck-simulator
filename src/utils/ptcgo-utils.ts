Object.defineProperty(Array.prototype, "flat", {
  value: function(depth = 1) {
    return this.reduce(function(flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) && depth > 1
          ? toFlatten.flat(depth - 1)
          : toFlatten
      );
    }, []);
  }
});

const SET_PATTERN = /(?:\* )?(\d+) (.*) ([A-Z]{2,3}|[A-Z]{2}-[A-Z]{2}|[A-Z0-9]{3})? (\d+|XY\d+|BW\d+)/;
const BASIC_ENERGY_PATTERN = /(?:\* )?(\d+) (Darkness|Fairy|Fighting|Fire|Grass|Lightning|Metal|Psychic|Water) Energy.*/;

const BASIC_ENERGY_TYPES = [
  "Darkness",
  "Fairy",
  "Fighting",
  "Fire",
  "Grass",
  "Lightning",
  "Metal",
  "Psychic",
  "Water"
];

const isBasicEnergy = (row: string): boolean => {
  return (
    BASIC_ENERGY_TYPES.map(energy => row.includes(`${energy} Energy`)).filter(
      c => c
    ).length > 0
  );
};

export const parseRow = (row: string): Array<string> => {
  let result = null;
  if (isBasicEnergy(row)) {
    result = row.match(BASIC_ENERGY_PATTERN);
  } else {
    result = row.match(SET_PATTERN);
  }
  return result && result.slice(1);
};

type CardType = "limited" | "basic energy";

export const parseDecklist = (decklist: string): Array<IRawCardRow> => {
  return decklist
    .split("\n")
    .map(row => {
      const card = parseRow(row);
      if (card) {
        let type: CardType = "limited";
        if (card.length === 2) {
          type = "basic energy";
        }
        const [amount, name, set, code] = card;

        const flattened = [];

        for (let i = 0; i < parseInt(amount); i++) {
          flattened.push({
            type,
            name,
            set,
            code
          });
        }

        return flattened;
      }
      return null;
    })
    .flat()
    .filter(card => card);
};

type IPTCGO_SET_CODE =
  | "BS"
  | "JU"
  | "PR"
  | "FO"
  | "B2"
  | "TR"
  | "G1"
  | "G2"
  | "N1"
  | "N2"
  | "N3"
  | "N4"
  | "LC"
  | "EX"
  | "AQ"
  | "SK"
  | "RS"
  | "SS"
  | "DR"
  | "PR-NP"
  | "MA"
  | "HL"
  | "RG"
  | "RR"
  | "DX"
  | "EM"
  | "UF"
  | "DS"
  | "LM"
  | "HP"
  | "CG"
  | "DF"
  | "PK"
  | "PR-DPP"
  | "DP"
  | "MT"
  | "SW"
  | "GE"
  | "MD"
  | "LA"
  | "SF"
  | "PL"
  | "SV"
  | "AR"
  | "PR-HS"
  | "HS"
  | "UL"
  | "UD"
  | "TM"
  | "CL"
  | "PR-BLW"
  | "BLW"
  | "EPO"
  | "NVI"
  | "NXD"
  | "DEX"
  | "DRX"
  | "DRV"
  | "BCR"
  | "PLS"
  | "PLF"
  | "PLB"
  | "PR-XY"
  | "LTR"
  | "KSS"
  | "XY"
  | "FLF"
  | "FFI"
  | "PHF"
  | "PRC"
  | "DCR"
  | "ROS"
  | "AOR"
  | "BKT"
  | "BKP"
  | "GEN"
  | "FCO"
  | "STS"
  | "EVO"
  | "PR-SM"
  | "SUM"
  | "GRI"
  | "BUS"
  | "SLG"
  | "CIN"
  | "UPR"
  | "FLI"
  | "CES"
  | "DRM"
  | "LOT"
  | "TEU"
  | "GUM"
  | "UNB";

export type IRawCardRow = {
  name: string;
  type: string;
  set?: IPTCGO_SET_CODE;
  code?: string;
};
