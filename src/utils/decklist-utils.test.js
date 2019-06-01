import { isLegalDecklist } from "./decklist-utils";
import { DeckType } from "../types";

const createDeck = (amount: number): DeckType => {
  let deck = [];
  for (let i = 0; i < amount; i++) {
    deck.push({
      amount: 1,
      details: { supertype: "Pokémon", subtype: "Basic" }
    });
  }
  return deck;
};

it("should not be legal to have less than 60 cards", () => {
  const result = isLegalDecklist(createDeck(59));
  expect(result).toBe(false);
});

it("should be legal to have a 60 card deck", () => {
  const result = isLegalDecklist(createDeck(60));
  expect(result).toBe(true);
});

it("should be legal to have up to 4 cards of limited type", () => {
  let deck = createDeck(58);
  deck[0] = {
    amount: 3,
    details: {
      supertype: "Trainer",
      subtype: "Stadium"
    }
  };

  const result = isLegalDecklist(deck);

  expect(result).toBe(true);
});

it("should not be legal to have more than 4 cards of limited type", () => {
  let deck = createDeck(56);
  deck[0] = {
    amount: 5,
    details: {
      supertype: "Trainer",
      subtype: "Stadium"
    }
  };

  const result = isLegalDecklist(deck);
  expect(result).toBe(false);
});

it("should be legal to have any amount of basic energies", () => {
  const result = isLegalDecklist([
    { amount: 59, details: { supertype: "Energy", subtype: "Basic" } },
    { amount: 1, details: { supertype: "Pokémon", subtype: "Basic" } }
  ]);
  expect(result).toBe(true);
});

it("should not be legal to have more than 4 special energies", () => {
  let deck = createDeck(56);
  deck[0] = {
    amount: 5,
    details: {
      supertype: "Energy",
      subtype: "Special"
    }
  };

  const result = isLegalDecklist(deck);
  expect(result).toBe(false);
});

it("should be legal to have 4 special energies", () => {
  let deck = createDeck(57);
  deck[0] = {
    amount: 4,
    details: { supertype: "Energy", subtype: "Special" }
  };

  const result = isLegalDecklist(deck);
  expect(result).toBe(true);
});
