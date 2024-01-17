import {useContext, createContext} from 'react';
import useSelectedPokemon from '../hooks/useSelectedPokemon';

type PokemonContextType = {
  selectedPokemon: object;
  setSelectedPokemon: React.Dispatch<React.SetStateAction<object>>;
}

const PokemonContext = createContext<undefined | PokemonContextType>(undefined);

function PokemonContextProvider({children}:{children:any}) {
  const { selectedPokemon, setSelectedPokemon} = useSelectedPokemon();
  return(
  <PokemonContext.Provider
    value={{selectedPokemon, setSelectedPokemon}}>
      {children}
  </PokemonContext.Provider>
  )
}

const usePokemonContext = () => {
  const context = useContext(PokemonContext);

  if (context === undefined) {
    throw new Error('context not recognised');
  }

  return context;
}

export { PokemonContextProvider, usePokemonContext}