import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

type PokedexState = {
  data?: object;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: null | Error;
  selectedPokemon?: object;
};

const initialState: PokedexState = {
  data: {},
  status: "idle",
  error: null,
  selectedPokemon: {},
};

export const fetchPokedex = createAsyncThunk(
  "pokedex/fetchPokedex",
  async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const jsonData = await response.json();
    return jsonData;
  }
);

const pokedexSlice = createSlice({
  name: "pokedex",
  initialState,
  reducers: {
    updateSelectedPokemon(state, action: PayloadAction<object>) {
      state.selectedPokemon = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPokedex.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        fetchPokedex.fulfilled,
        (state, action: PayloadAction<object>) => {
          state.status = "succeeded";
          // Add pokedex to data
          state.data = action.payload;
        }
      );
  },
});

export const { updateSelectedPokemon } = pokedexSlice.actions;

export default pokedexSlice.reducer;

export const pokedexData = (state: RootState) => state.pokedex.data;
export const pokedexStatus = (state: RootState) => state.pokedex.status;
export const selectedPokemon = (state: RootState) =>
  state.pokedex.selectedPokemon;
