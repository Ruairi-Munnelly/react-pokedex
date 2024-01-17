import {render,screen} from '@testing-library/react'
import PokeSidebar from '../components/PokeSidebar'
import { PokemonContextProvider } from '../contexts/PokemonContext'
import * as pokedex from '../../public/dummy-test-data.json'

describe('PokeSidebar', () => {
  describe('rendering', () => {
    it('should render correctly when passed pokedex obj', () => {
      let props = {
        pokedex: pokedex.results
      }
      render(
        <PokemonContextProvider>
          <PokeSidebar {...props} />
        </PokemonContextProvider>
      )
      expect(screen.getByText(/Bulbasaur/i)).not.toBeNull();
      expect(screen.getByText(/Charmander/i)).not.toBeNull();

    });
  })

})
