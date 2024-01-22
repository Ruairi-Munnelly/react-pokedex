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
    <div className="pokedex__sidebar flex flex-1 flex-wrap m-auto basis-1/2 sm:basis-full ">
      <div className="checkbox basis-full sm:order-last">
        <input
          name="filter"
          type="checkbox"
          value="filter"
          onClick={() => setShowFilter(!showFilter)}
        />
        <label className="font-bold p-1">Show search filter</label>
      </div>
    <div className="pokedex__sidebar flex-1 m-auto basis-1/2 sm:basis-full">
      <div
        className="pokedex-container flex-1 basis-1/4 max-h-80 max-w-sm m-auto overflow-y-scroll bg-yellow-300 
        rounded-md border-black border-2"
      >
        {showFilter && (
          <div className="filter-bar my-5" style={{ margin: "5px 0" }}>
            <input
              type="text"
              className="border-solid rounded-3xl"
              placeholder="Filter dex"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        )}
        {pokedex &&
          pokedex
            .filter((pokemon: any) =>
              pokemon.name.includes(filter.toLowerCase())
            )
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
      <input
        name="filter"
        type="checkbox"
        value="filter"
        onClick={() => setShowFilter(!showFilter)}
      />
      <label className="font-bold p-1">Show search filter</label>
    </div>
  );
}
