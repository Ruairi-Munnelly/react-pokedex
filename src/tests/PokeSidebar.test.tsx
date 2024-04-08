import { render, screen } from "@testing-library/react";
import PokeSidebar from "../components/PokeSidebar";
import * as pokedex from "../../public/dummy-test-data.json";
import { Provider } from "react-redux";

describe("PokeSidebar", () => {
  describe("rendering", () => {
    it("should render correctly when passed pokedex obj", () => {
      render(<PokeSidebar />);
      expect(screen.getByText(/Bulbasaur/i)).not.toBeNull();
      expect(screen.getByText(/Charmander/i)).not.toBeNull();
    });
  });
});
