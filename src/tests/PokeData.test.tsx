import React from 'react';
import { render, screen } from '@testing-library/react';
import { PokemonContextProvider, PokemonContext } from '../contexts/PokemonContext';
import PokeData from '../components/PokeData';
import * as dummyData from '../../public/dummy-test-data-pokemon.json'
  describe('Pokedata',  () => {
    it('should render with fallback text', async () => {
    render(
      <PokemonContextProvider>
        <PokeData />
      </PokemonContextProvider>
    )
    expect(screen.getByText('SELECT POKEMON FROM POKEDEX LIST')).toBeInTheDocument();
    })

    it('should render with data stats', async () => {
      const statList = ['stat-hp', 'stat-attack', 'stat-defense', 'stat-special-attack', 'stat-special-defense', 'stat-speed'];
      render (
        <PokemonContext.Provider value={{selectedPokemon:dummyData, setSelectedPokemon: undefined}}>
          <PokeData />
        </PokemonContext.Provider>
      )
      statList
      .forEach((stat) => {
      expect(screen.getByTestId(stat)).toBeInTheDocument();
      });
  })
});


