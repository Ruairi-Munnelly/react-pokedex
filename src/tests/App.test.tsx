import { screen, waitFor } from "@testing-library/react";
// Using our own custom render function and not RTL's render.
import { renderWithProviders } from "../utils/test-utils";
import * as pokedexMockData from "../../public/dummy-test-data.json";
import App from "../App";

const initialPokedex = {
  data: pokedexMockData,
  status: "succeeded",
  error: null,
  selectedPokemon: {},
};

test("fetches the data for pokdex and renders app with spinner if no data provided", async () => {
  renderWithProviders(<App />);
  expect(screen.getByTestId("spinner")).toBeInTheDocument();
});

test("render with the pokemon values when mock data provided", async () => {
  renderWithProviders(<App />, {
    preloadedState: {
      pokedex: initialPokedex,
    },
  });
  await waitFor(
    () => {
      expect(screen.getByTestId("pokedex")).toBeInTheDocument();
    },
    { timeout: 2000 }
  );
});
