import { DeckType } from "../types";

export const isLegalDecklist = (deck: DeckType): boolean => {
  /* @TODO: add validation errors to return so we can show them on UI*/
  if (!deck) return false;
  const cardsInDeck = deck.reduce((acc, cur) => acc + cur.amount, 0);
  if (cardsInDeck !== 60) return false;

  const limitedCards: DeckType = deck.filter(
    card =>
      !(card.details.supertype === "Energy" && card.details.subtype === "Basic")
  );

  return (
    limitedCards.reduce((acc, cur) => (cur.amount > 4 ? acc + 1 : acc), 0) === 0
  );
};
