import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokeItem from "../components/PokeItem";
import * as mockPokemonRes from "../../public/dummy-test-data-pokemon.json";
import {
  renderWithProviders,
  mockedResolvedResponse,
  mockedUnresolvedResponse,
} from "../utils/test-utils";

let active = true;

//mocks the response for the thunk dispatch call

const handleOnClick = (active: boolean) => {
  return !active;
};

let dummyProps = {
  active: active,
  pokemon: "Bulbasaur",
  id: 1,
  onClick: () => {
    handleOnClick(active);
  },
};

describe("rendering", () => {
  it("should render a single entry Pokedex check to see that props are correctly passed", () => {
    renderWithProviders(<PokeItem {...dummyProps} />, {});
    expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument();
  });
});

describe("dispatch events", () => {
  it("trigger the onclick and update state", async () => {
    mockedResolvedResponse(mockPokemonRes);
    const { store } = renderWithProviders(<PokeItem {...dummyProps} />, {});
    const pokemonItem = screen.getByTestId("Bulbasaur");
    userEvent.click(pokemonItem);
    await waitFor(() =>
      expect(store.getState().pokedex?.selectedPokemon?.name).toBe("bulbasaur")
    );
  });

  it("trigger the onclick and rejected fetch", async () => {
    mockedUnresolvedResponse(new Error("Rejected request"));
    const { store } = renderWithProviders(<PokeItem {...dummyProps} />, {});
    const pokemonItem = screen.getByLabelText(/pokedex list item/i);
    userEvent.click(pokemonItem);
    console.log(store.getState().pokedex.selectedPokemon);
    await waitFor(() =>
      expect(store.getState().pokedex?.selectedPokemon?.name).toBe(undefined)
    );
  });
});
