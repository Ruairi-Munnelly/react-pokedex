import { screen, act } from "@testing-library/react";
import PokeData from "../components/PokeData";
import * as dummyPokemonData from "../../public/dummy-test-data-pokemon.json";
import { renderWithProviders } from "../utils/test-utils";
import { store } from "../app/store";
import { fetchPokemon } from "../components/PokedexSlice";

const initialPokedex = {
  data: {},
  status: "succeeded",
  error: null,
  selectedPokemon: dummyPokemonData,
};

describe("Rendering", () => {
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

describe("events/updates", () => {
  it("should render and update the component if dispatch called", async () => {
    await act(async () => {
      await store.dispatch(fetchPokemon("bulbasaur"));
    });
    const { pokedex } = store.getState();
    renderWithProviders(<PokeData />, {
      preloadedState: {
        pokedex: pokedex,
      },
    });

    expect(
      screen.queryByText(/SELECT POKEMON FROM POKEDEX LIST/i)
    ).not.toBeInTheDocument();

    // renderWithProviders(<PokeData />,

    // await waitFor(
    //   () =>
    //     expect(
    //       screen.queryByText(/SELECT POKEMON FROM POKEDEX LIST/i)
    //     ).not.toBeInTheDocument(),
    //   { timeout: 2000 }
    // );
  });
});
