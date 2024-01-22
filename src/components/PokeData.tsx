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
      <div className="stat stat-moved flex">
        <span className="stat-title">
          {name.replace("ecial-", ". ").toUpperCase()}
        </span>
        <div
          className="stat-bar"
          style={{
            width: `${width}%`,
            maxWidth: 75 + `%`,
          }}
        >
          <span className="stat-vals">
            {val}/{maxVal}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="pokedex__data" style={{ margin: "auto", flex: "0 0 50%" }}>
      {name ? (
        <div className="sprite-container">
          <div className="circle-backdrop">
            <img
              className="pokemon-sprite h-10"
              alt="pokemon-sprite"
              src={name && (animation ? animation : sprite)}
              style={{ margin: "auto" }}
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
          <span className="onload-text font-bold">SELECT POKEMON FROM POKEDEX LIST</span>
        </>
      )}
      {stats && (
        <div className="pokemon-stats__grid  bg-blue-300 rounded-md border-black border-2">
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
