import { useState } from "react";
import { useSelector } from "react-redux";
import { pokedexData } from "./PokedexSlice";
import PokeItem from "./PokeItem";

export default function PokeSidebar() {
  const [active, setActive] = useState<number>();
  const [filter, setFilter] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  interface PokedexObj {
    [key: string]: any;
  }

  const { results: pokedex } = useSelector(pokedexData) as PokedexObj;
  return (
    <div className='pokedex__sidebar--block flex flex-1 flex-wrap m-auto basis-1/2 sm:basis-full '>
      <div className='checkbox checkbox--container basis-full sm:order-last'>
        <input
          name='filter'
          className='checkbox__input'
          type='checkbox'
          value='filter'
          onClick={() => setShowFilter(!showFilter)}
        />
        <label className='checkbox__label font-bold p-1'>
          Show search filter
        </label>
      </div>
      <div className='pokedex__list flex-1 m-auto basis-1/2 sm:basis-full'>
        <div
          className='pokemon flex-1 basis-1/4 max-h-80 max-w-sm m-auto overflow-y-scroll bg-yellow-300 
        rounded-md border-black border-2'
        >
          {showFilter && (
            <div
              className='pokemon__filter-bar my-5'
              style={{ margin: "5px 0" }}
            >
              <input
                type='text'
                className='filter-input border-solid rounded-3xl'
                placeholder='Filter dex'
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          )}
          {pokedex &&
            pokedex
              .filter((pokemon: PokedexObj) =>
                pokemon.name.includes(filter.toLowerCase())
              )
              .map((pokemon: PokedexObj, index: number) => {
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
    </div>
  );
}
