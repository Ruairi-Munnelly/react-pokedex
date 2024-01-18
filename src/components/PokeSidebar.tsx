import { useEffect, useState } from "react";
import PokeItem from "./PokeItem";

export default function PokeSidebar({ pokedex }: { pokedex: object[] }) {
  const [active, setActive] = useState<number>();
  const [filter, setFilter] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);

  useEffect(() => {
    console.log("component re-render");
  });

  return (
    <div className="pokedex__sidebar" style={{margin: 'auto',flex: '0 0 25%'}}>
      <img
        className="relative"
        src="/pokemon-logo.svg"
        alt="Pokemon Logo"
        width={360}
        height={74}
      />
      <input
        name="filter"
        type="checkbox"
        value="filter"
        onClick={() => setShowFilter(!showFilter)}
      />
      <label className="font-bold p-1">Show search filter</label>
      <div
        className="pokedex-container overflow-y-scroll max-h-80 bg-yellow-300 rounded-md border-black border-2"
        style={{ flex: "1 1 25%", margin:'0 50px' }}
      >
        {showFilter && (
          <div className="filter-bar" style={{margin:'5px 0'}}>
            <input
              type="text"
              placeholder="Filter dex"
              style={{border: 'solid', borderRadius:'15px'}}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        )}
        {pokedex &&
          pokedex
            .filter((pokemon: any) => pokemon.name.includes(filter.toLowerCase()))
            .map((pokemon: any, index: number) => {
              const name = pokemon.name;

              let props = {
                id: index + 1,
                pokemon: name,
                active: active === index,
                onClick: () => {
                  setActive(index);
                },
              };
              return <PokeItem key={index} {...props} />;
            })}
      </div>
    </div>
  );
}
