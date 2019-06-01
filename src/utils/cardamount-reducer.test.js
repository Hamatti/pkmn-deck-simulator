import { reduceWithAmounts } from "./cardamount-reducer";

it("should return amount 1 for 1 card", () => {
  const result = reduceWithAmounts([{ id: 1 }]);

  expect(result).toStrictEqual([{ amount: 1, details: { id: 1 } }]);
});

it("should return amount 2 for 2 same cards", () => {
  const result = reduceWithAmounts([{ id: 1 }, { id: 1 }]);

  expect(result).toStrictEqual([{ amount: 2, details: { id: 1 } }]);
});

it("should return amounts 1 for 2 different cards", () => {
  const result = reduceWithAmounts([{ id: 1 }, { id: 2 }]);

  expect(result).toStrictEqual([
    { amount: 1, details: { id: 1 } },
    { amount: 1, details: { id: 2 } }
  ]);
});

it("should return correct different amounts for multiple cards", () => {
  const result = reduceWithAmounts([
    { id: 1 },
    { id: 2 },
    { id: 1 },
    { id: 2 },
    { id: 1 }
  ]);

  expect(result).toStrictEqual([
    { amount: 3, details: { id: 1 } },
    { amount: 2, details: { id: 2 } }
  ]);
});
