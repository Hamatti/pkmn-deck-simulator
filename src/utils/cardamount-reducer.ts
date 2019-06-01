export const reduceWithAmounts = cards => {
  return Object.values(
    cards.reduce((acc, cur) => {
      if (Object.keys(acc).indexOf(cur.id.toString()) >= 0) {
        acc[cur.id] = { ...acc[cur.id], amount: acc[cur.id].amount + 1 };
      } else {
        acc[cur.id] = { amount: 1, details: cur };
      }

      return acc;
    }, {})
  );
};
