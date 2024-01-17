import {render, screen } from '@testing-library/react'
import PokeItem from '../components/PokeItem'
import { PokemonContextProvider } from '../contexts/PokemonContext'

let active = true;

const handleOnClick = (active:boolean) => {
  !active;
}

let dummyProps = {
  active: active,
  pokemon: 'Bulbasaur',
  id: 1,
  onClick: () => {handleOnClick(active)}
}

describe('PokeItem', () => {
  describe('rendering', () => {
    it('should render a single entry Pokedex check to see that props are correctly passed', () => {
      RenderPokeItem();
      expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument;
    });
  })

  describe('click event testing', () => {
    it('Test click event', () => {
      RenderPokeItem();
      screen.getByText(/Bulbasaur/i);
    });
  })
})

function RenderPokeItem() {
  render(
    <PokemonContextProvider>
      <PokeItem {...dummyProps} />
    </ PokemonContextProvider>
  )
}
