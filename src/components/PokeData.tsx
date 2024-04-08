import { useSelector } from "react-redux";
import { selectedPokemon } from "./PokedexSlice";

export default function PokeData() {
  interface PokeObj {
    name?: string;
    sprite?: string;
    types?: TypeObjType[];
    stats?: StatObjType[];
    animation?: string;
  }

  interface TypeObjType {
    type: {
      name: string;
    };
  }

  interface StatBarType {
    name: string;
    val: number;
    maxVal: number;
  }

  interface StatObjType {
    stat: {
      name: string;
    };
    base_stat: number;
  }

  const selectedPokemonState = useSelector(selectedPokemon);
  const { name, sprite, types, stats, animation } =
    selectedPokemonState as PokeObj;

  const StatBar = ({ name, val, maxVal }: StatBarType) => {
    let width = (val / maxVal) * 100 + 10;
    return (
      <div
        data-testid={`stat-${name}`}
        className='stat stat-moved flex items-center m-1.5'
      >
        <span className='stat-title basis-1/4 items-left font-bold'>
          {name.replace("ecial-", ". ").toUpperCase()}
        </span>
        <div
          className='stat-bar'
          style={{
            width: `${width}%`,
            maxWidth: 75 + `%`,
          }}
        >
          <span className='stat-vals font-bold'>
            {val}/{maxVal}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className='pokedex__data m-auto flex-grow-0 flex-shrink-0 basis-1/2 sm:basis-full'>
      {name ? (
        <div className='sprite flex flex-col justify-end items-center'>
          <div className='circle-backdrop w-24 h-24 p-5 rounded-full bg-yellow-200'>
            <img
              className='pokemon-sprite h-10 m-auto'
              alt='pokemon-sprite'
              src={name && (animation ? animation : sprite)}
            />
          </div>
          {types && (
            <div className='pokemon-types flex justify-center'>
              {types.map((typeObj, i: number) => {
                const name = typeObj.type.name;
                return (
                  <span
                    key={i}
                    className={`type-icon type-${name} rounded m-0.5 p-0.5 font-bold`}
                  >
                    {name}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <>
          <span className='onload-text font-bold'>
            SELECT POKEMON FROM POKEDEX LIST
          </span>
        </>
      )}
      {stats && (
        <div className='pokemon-stats max-w-sm  bg-blue-300 m-auto rounded-md border-black border-2'>
          {stats.map((statObj, i: number) => {
            const name = statObj.stat.name;
            const base_stat: number = statObj.base_stat;
            const maxVal = 300;

            return (
              <StatBar key={i} name={name} val={base_stat} maxVal={maxVal} />
            );
          })}
        </div>
      )}
    </div>
  );
}
