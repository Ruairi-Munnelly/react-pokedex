import { usePokemonContext } from "../contexts/PokemonContext";

const API_POKEMON_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";
const ANIMATION_ENDPOINT = "https://www.smogon.com/dex/media/sprites/bw/";

type PokeItemType = {
  pokemon: string, 
  active: boolean, 
  id: number, 
  onClick: Function
}

export default function PokeItem({ pokemon, id, active, onClick }:PokeItemType ) {

  interface Pokemon {
    [key: string]: any; 
    name?: string;
  }

  const { selectedPokemon, setSelectedPokemon }:{selectedPokemon: Pokemon;  setSelectedPokemon: any } = usePokemonContext()
  const name = selectedPokemon.name;
  
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
        setSelectedPokemon({
          name: name,
          id,
          sprite: sprites.front_default,
          types: types,
          stats: stats,
          animation: animation,
        });
      }
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className={`pokemon-item ${active ? 'active' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
        fetchPokemon();
      }}
      style={{textAlign: 'left'}}
    >
      <div className="pokemon-item__details">
      <span className="pokemon-id m-2.5">{id < 100 ? id < 10 ? `00${id}`: `0${id}` : id}</span><span className="pokemon-name m-2.5">{pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}</span>
      </div>
    </div>
  );
}