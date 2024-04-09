import { configureStore, combineReducers } from "@reduxjs/toolkit";
import pokedexReducer from "../components/PokedexSlice";

export const store = configureStore({
  reducer: {
    pokedex: pokedexReducer,
  },
});

const rootReducer = combineReducers({
  pokedex: pokedexReducer,
});
export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
