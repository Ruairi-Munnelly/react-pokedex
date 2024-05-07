import { screen } from "@testing-library/react";
import PokeItem from "../components/PokeItem";
import { renderWithProviders } from "../utils/test-utils";

let active = true;

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

describe("PokeItem", () => {
  describe("rendering", () => {
    it("should render a single entry Pokedex check to see that props are correctly passed", () => {
      renderWithProviders(<PokeItem {...dummyProps} />, {});
      expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument();
    });
  });
});
