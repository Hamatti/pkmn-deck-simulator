import { DeckType, DetailType } from "../types";

/**
 * Takes in a list of individual cards and reduces them into DeckType that
 * keeps track of the amount of each individual card

 * [{id: 1, ...}, {id: 1, ...}, { id: 2, ...}]
 * =>
 * [{amount: 2, details: {id: 1, ...}}, { amount: 1, details: { id: 2, ...}}]
 */
export const reduceWithAmounts = (cards: Array<DetailType>): DeckType => {
  return Object.values(
    cards.reduce((acc: DeckType, cur: DetailType) => {
      if (existsInObject(cur.id.toString(), acc)) {
        acc[cur.id] = { ...acc[cur.id], amount: acc[cur.id].amount + 1 };
      } else {
        acc[cur.id] = { amount: 1, details: cur };
      }

      return acc;
    }, {})
  );
};

const existsInObject = (needle, haystack): boolean =>
  Object.keys(haystack).indexOf(needle) >= 0;
