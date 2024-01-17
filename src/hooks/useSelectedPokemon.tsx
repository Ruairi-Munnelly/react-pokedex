import { useState } from "react";

export default function useSelectedPokemon(pokemon: object = {}) {
  const [selectedPokemon, setSelectedPokemon] = useState<object>(pokemon);

  return { selectedPokemon, setSelectedPokemon };
}
