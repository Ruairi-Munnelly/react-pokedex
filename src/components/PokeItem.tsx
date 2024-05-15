import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPokemon, selectedPokemon } from "./PokedexSlice";

type PokeItemType = {
  pokemon: string;
  active: boolean;
  id: number;
  onClick: Function;
};

export default function PokeItem({
  pokemon,
  id,
  active,
  onClick,
}: PokeItemType) {
  interface Pokemon {
    [key: string]: any;
    name?: string;
  }
  const dispatch = useAppDispatch();
  const { name } = useAppSelector(selectedPokemon) as Pokemon;

  const updatePokemonSelected = async () => {
    if (pokemon === name) {
      return;
    }
    try {
      await dispatch(fetchPokemon(pokemon));
    } catch (e) {
      throw e;
    }
  };

  return (
    <div
      className={`pokemon__item ${
        active && "active outline-dotted rounded-md bg-blue-300"
      } text-left`}
      aria-label={`pokedex list item ${pokemon}`}
      data-testid={pokemon}
      onClick={(e) => {
        e.preventDefault();
        console.log("clicked");
        onClick();
        updatePokemonSelected();
      }}
    >
      <div className='pokemon__details'>
        <span className='pokemon__id m-2.5'>
          {id < 100 ? (id < 10 ? `00${id}` : `0${id}`) : id}
        </span>
        <span className='pokemon__name m-2.5'>
          {pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}
        </span>
      </div>
    </div>
  );
}
