export type DetailType = {
  id: string;
  name: string;
  supertype: string;
  subtype: string;
  evolvesFrom?: string;
  hp: string;
};

export type CardType = {
  amount: number;
  details: DetailType;
};

export type DeckType = Array<CardType>;
