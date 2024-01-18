import { usePokemonContext } from "../contexts/PokemonContext";

export default function PokeData() {
  interface PokeObj {
    name?: string;
    sprite?: string;
    types?: Object[];
    stats?: Object[];
    animation?: string;
  }

  interface StatBarType {
    name: string;
    val: number;
    maxVal: number;
  }

  const { selectedPokemon } = usePokemonContext();
  const { name, sprite, types, stats, animation }: PokeObj = selectedPokemon;

  const StatBar = ({ name, val, maxVal }: StatBarType) => {
    let width = (val / maxVal) * 100 + 10;
    return (
      <div className="stat stat-moved flex items-center m-1.5">
        <span className="stat-title basis-1/4 items-left font-bold">
          {name.replace("ecial-", ". ").toUpperCase()}
        </span>
        <div
          className="stat-bar"
          style={{
            width: `${width}%`,
            maxWidth: 75 + `%`,
          }}
        >
          <span className="stat-vals font-bold">
            {val}/{maxVal}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="pokedex__data m-auto flex-grow-0 flex-shrink-0 basis-1/2 sm:basis-full">
      {name ? (
        <div className="sprite-container flex flex-col justify-end items-center">
          <div className="circle-backdrop w-24 h-24 p-5 rounded-full bg-yellow-200">
            <img
              className="pokemon-sprite h-10 m-auto"
              alt="pokemon-sprite"
              src={name && (animation ? animation : sprite)}
            />
          </div>
          {types && (
            <div className="pokemon-types flex justify-center">
              {types.map((typeObj: any, i: number) => {
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
          <h2>Select pokemon from the dex</h2>
        </>
      )}
      {stats && (
        <div className="pokemon-stats__grid max-w-sm  bg-blue-300 m-auto rounded-md border-black border-2">
          {stats.map((statObj: any, i: number) => {
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
