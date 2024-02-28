import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  describe('testing initial load', () => {
    it('load page', () => {
      render(<App />);
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    })
    it('load pokedex after fetch timeout', async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getByTestId('pokedex')).toBeInTheDocument();
      }, {timeout: 2000})
    })
  })

});
