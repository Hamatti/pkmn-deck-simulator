import { DeckType, DetailType } from "../types";

/**
 * Takes in a list of individual cards and reduces them into DeckType that
 * keeps track of the amount of each individual card
 */
export const reduceWithAmounts = (cards: Array<DetailType>): DeckType => {
  return Object.values(
    cards.reduce((acc: DeckType, cur: DetailType) => {
      if (Object.keys(acc).indexOf(cur.id.toString()) >= 0) {
        acc[cur.id] = { ...acc[cur.id], amount: acc[cur.id].amount + 1 };
      } else {
        acc[cur.id] = { amount: 1, details: cur };
      }

      return acc;
    }, {})
  );
};
