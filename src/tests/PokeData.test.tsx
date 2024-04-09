import React from "react";
import { screen } from "@testing-library/react";
import PokeData from "../components/PokeData";
import * as dummyPokemonData from "../../public/dummy-test-data-pokemon.json";
import { renderWithProviders } from "../utils/test-utils";

const initialPokedex = {
  data: {},
  status: "succeeded",
  error: null,
  selectedPokemon: dummyPokemonData,
};

describe("Pokedata", () => {
  it("should render with fallback text", async () => {
    renderWithProviders(<PokeData />);
    expect(
      screen.getByText("SELECT POKEMON FROM POKEDEX LIST")
    ).toBeInTheDocument();
  });

  it("should render with data stats", async () => {
    const statList: string[] = [
      "stat-hp",
      "stat-attack",
      "stat-defense",
      "stat-special-attack",
      "stat-special-defense",
      "stat-speed",
    ];
    renderWithProviders(<PokeData />, {
      preloadedState: {
        pokedex: initialPokedex,
      },
    });
    statList.forEach((stat) => {
      expect(screen.getByTestId(stat)).toBeInTheDocument();
    });
  });
});
