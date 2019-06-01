import React from "react";
import "public/chilicorn.svg";

import "./header.scss";
import "./footer.scss";

export const Header = () => (
  <header>
    <h1>Pokemon TCG Deck Simulator</h1>
  </header>
);

export const Footer = () => (
  <footer>
    <p>
      This app is built by{" "}
      <a
        href="https://twitter.com/hamatti"
        target="_blank"
        rel="noopener noreferrer"
      >
        Hamatti
      </a>{" "}
      with the help of{" "}
      <a href="https://pokemontcg.io" target="_blank" rel="noopener noreferrer">
        PokemonTCG.io API
      </a>
      .
    </p>
    <p>
      Supported by <img alt="Chilicorn" src={"chilicorn.svg"} height="30px" />{" "}
      <a
        href="https://spiceprogram.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Spice Program
      </a>
      .
    </p>
    <p className="notice">
      This website is not produced, endorsed, supported, or affiliated with
      Nintendo or The Pokémon Company.
    </p>
  </footer>
);
