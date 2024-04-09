import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectedPokemon, updateSelectedPokemon } from "./PokedexSlice";

const API_POKEMON_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";
const ANIMATION_ENDPOINT = "https://www.smogon.com/dex/media/sprites/bw/";

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

  const fetchPokemon = async () => {
    if (pokemon === name) {
      return;
    }
    try {
      let data = await fetch(API_POKEMON_ENDPOINT + pokemon);
      if (data.ok) {
        let pokeJson = await data.json();
        const { name, id, sprites, types, stats } = pokeJson;
        let animation = `${ANIMATION_ENDPOINT}${name}.gif`;

        dispatch(
          updateSelectedPokemon({
            name,
            id,
            sprite: sprites.front_default,
            types: types,
            stats: stats,
            animation,
          })
        );
      }
    } catch (e) {
      throw e;
    }
  };

  return (
    <div
      className={`pokemon__item ${active ? "active" : ""} text-left`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
        fetchPokemon();
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
