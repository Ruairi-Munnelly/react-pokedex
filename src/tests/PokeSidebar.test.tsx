import { screen } from "@testing-library/react";
import * as pokedex from "../../public/dummy-test-data.json";
import PokeSidebar from "../components/PokeSidebar";
import { renderWithProviders } from "../utils/test-utils";

const initialPokedex = {
  data: pokedex,
  status: "succeeded",
  error: null,
  selectedPokemon: {},
};

describe("PokeSidebar", () => {
  describe("rendering", () => {
    it("should render correctly when passed pokedex obj", () => {
      renderWithProviders(<PokeSidebar />, {
        preloadedState: {
          pokedex: initialPokedex,
        },
      });
      expect(screen.getByText(/Bulbasaur/i)).not.toBeNull();
      expect(screen.getByText(/Charmander/i)).not.toBeNull();
    });
  });
});
