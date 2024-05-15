import pokedexReducer, {
  PokedexState,
  updateSelectedPokemon,
  fetchPokedex,
  fetchPokemon,
  pokedexData,
  pokedexStatus,
  selectedPokemon,
} from "../components/PokedexSlice";
import * as pokemonData from "../../public/dummy-test-data-pokemon.json";
import * as pokedexDataMock from "../../public/dummy-test-data.json";
import { RootState } from "../app/store";

const mockFetch = (res: any) =>
  (global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(res),
  }));

describe("pokedex reducer", () => {
  it("should return the initial state when passed an empty action", () => {
    const initialState = undefined;
    const action = { type: "" };
    const result = pokedexReducer(initialState, action);
    expect(result).toEqual({
      data: {},
      status: "idle",
      error: null,
      selectedPokemon: {},
    });
  });

  it("should return the updated pokemon", () => {
    const initialState = undefined;
    const action = updateSelectedPokemon(pokemonData);
    const result = pokedexReducer(initialState, action);
    expect(result.selectedPokemon).toEqual(pokemonData);
  });

  it("should update the results to include the pokedex data", () => {});
});

describe("selectors", () => {
  describe("pokedexData", () => {
    it("should return as empty initially", () => {
      const pokedex: PokedexState = {
        data: {},
        status: "idle",
        error: null,
        selectedPokemon: {},
      };
      const result = pokedexData({ pokedex } as RootState);
      expect(result).toEqual({});
    });
    it("should return as matching a post fetch results return", () => {
      const pokedex: PokedexState = {
        data: pokemonData,
        status: "idle",
        error: null,
        selectedPokemon: {},
      };
      const result = pokedexData({ pokedex } as RootState);
      expect(result).toEqual(pokemonData);
    });
  });
  describe("pokedexStatus", () => {
    it("should return as idle", () => {
      const pokedex: PokedexState = {
        data: {},
        status: "idle",
        error: null,
        selectedPokemon: {},
      };
      const result = pokedexStatus({ pokedex } as RootState);
      expect(result).toEqual("idle");
    });

    it("should return as succeeded", () => {
      const pokedex: PokedexState = {
        data: {},
        status: "succeeded",
        error: null,
        selectedPokemon: {},
      };
      const result = pokedexStatus({ pokedex } as RootState);
      expect(result).toEqual("succeeded");
    });
  });

  describe("selectedPokemon", () => {
    it("should return as empty initially", () => {
      const pokedex: PokedexState = {
        data: {},
        status: "idle",
        error: null,
        selectedPokemon: {},
      };
      const result = selectedPokemon({ pokedex } as RootState);
      expect(result).toEqual({});
    });
    it("should return as matching a post fetch results return", () => {
      const pokedex: PokedexState = {
        data: {},
        status: "idle",
        error: null,
        selectedPokemon: pokemonData,
      };
      const result = selectedPokemon({ pokedex } as RootState);
      expect(result).toEqual(pokemonData);
    });
  });
});

describe("thunks", () => {
  describe("fetchPokedex w/mocked dispatch", () => {
    it("should return an updated state of mocked data", async () => {
      mockFetch({ success: true });
      const dispatch = jest.fn();
      const state: PokedexState = {
        data: {},
        status: "idle",
        error: null,
        selectedPokemon: {},
      };
      const thunk = fetchPokedex();
      await thunk(dispatch, () => state, undefined);
      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toEqual("pokedex/fetchPokedex/pending");
      expect(calls[1][0].type).toEqual("pokedex/fetchPokedex/fulfilled");
      expect(calls[1][0].payload).toEqual({ success: true });
    });
    it("should return a empty object if failed", async () => {
      const dispatch = jest.fn();
      const state: PokedexState = {
        data: {},
        status: "idle",
        error: null,
        selectedPokemon: {},
      };
      const thunk = fetchPokedex();
      await thunk(dispatch, () => state, undefined);
      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toEqual("pokedex/fetchPokedex/pending");
      expect(calls[1][0].type).toEqual("pokedex/fetchPokedex/rejected");
      expect(calls[1][0].payload).toEqual(undefined);
    });
  });
  describe("fetchPokemon w/mocked dispatch", () => {
    it("should return an updated state of mocked data", async () => {
      mockFetch(pokemonData);
      const dispatch = jest.fn();
      const state: PokedexState = {
        data: {},
        status: "idle",
        error: null,
        selectedPokemon: {},
      };
      const thunk = fetchPokemon("bulbasaur");
      await thunk(dispatch, () => state, undefined);
      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toEqual("pokedex/fetchPokemon/pending");
      expect(calls[1][0].type).toEqual("pokedex/fetchPokemon/fulfilled");
      expect(calls[1][0].payload).toEqual(pokemonData);
    });
    it("should return a empty object if failed", async () => {
      const dispatch = jest.fn();
      const state: PokedexState = {
        data: {},
        status: "idle",
        error: null,
        selectedPokemon: pokemonData,
      };
      const thunk = fetchPokemon("bulbasaur");
      await thunk(dispatch, () => state, undefined);
      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toEqual("pokedex/fetchPokemon/pending");
      expect(calls[1][0].type).toEqual("pokedex/fetchPokemon/rejected");
      expect(calls[1][0].payload).toEqual(undefined);
    });
  });
});
