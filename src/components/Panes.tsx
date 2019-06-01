import React, { useState } from "react";
import { isLegalDecklist } from "../utils/decklist-utils";

import "./Panes.scss";

export const DecklistInput = ({ onClick }) => {
  const [decklist, setDecklist] = useState(null);
  return (
    <div className="left">
      <p>Paste your PTCGO decklist here</p>
      <textarea
        rows={40}
        cols={60}
        onChange={ev => setDecklist(ev.target.value)}
      />
      <br />
      <button onClick={() => onClick(decklist)}>Analyze</button>
    </div>
  );
};

/* The API's use of GX, EX and TAG TEAM override their stage so this is
   a workaround to figure out if a Pokemon is basic or not */
const calculateSubtype = card => {
  if (card.subtype !== "GX" && card.subtype !== "TAG TEAM") {
    return card.subtype;
  }
  if (!card.evolvesFrom) {
    return "Basic";
  } else {
    return "Non-basic GX or TAG TEAM";
  }
};

export const DecklistView = ({ deck }) => {
  const isValid = isLegalDecklist(deck);
  return (
    <div className="right">
      <h2>Your deck</h2>
      <p>
        {deck
          ? isValid
            ? "Your deck is valid"
            : "Your deck is invalid"
          : null}
      </p>
      {deck ? (
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>ID</th>
              <th>Name</th>
              <th>Supertype</th>
              <th>Subtype</th>
            </tr>
          </thead>
          <tbody>
            {deck
              ? deck.map(card =>
                  card ? (
                    <tr>
                      <td>{card.amount}</td>
                      <td>{card.details.id}</td>
                      <td>{card.details.name}</td>
                      <td>{card.details.supertype}</td>
                      <td>{calculateSubtype(card.details)}</td>
                    </tr>
                  ) : null
                )
              : null}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};
