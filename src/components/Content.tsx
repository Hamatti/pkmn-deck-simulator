import React, { useState } from "react";
import axios from "axios";
import "./Main.scss";

import { DecklistInput, DecklistView } from "./Panes";
import { parseDecklist, IRawCardRow } from "../utils/ptcgo-utils";
import { setcodes } from "../utils/setcodes";
import { reduceWithAmounts } from "../utils/cardamount-reducer";

export const Content = () => {
  const [deck, setDeck] = useState(null);

  const handleDecklistInput = (decklist: string) => {
    const deck = parseDecklist(decklist);
    Promise.all(
      deck.map((card: IRawCardRow) => {
        if (card.set && card.code) {
          const set = setcodes[card.set];
          const id = `${set}-${card.code}`;
          return axios.get(`https://api.pokemontcg.io/v1/cards?id=${id}`);
        }
        return null;
      })
    ).then(response => {
      const cards = response
        .filter(c => c) // Remove undefined cards. @FIXME: Don't send null but a custom promise for basic energies
        .map((resp: any) => resp.data.cards[0]);
      const amountedCards = reduceWithAmounts(cards);
      setDeck(amountedCards);
    });
  };

  return (
    <main>
      <DecklistInput onClick={handleDecklistInput} />
      <DecklistView deck={deck} />
    </main>
  );
};
