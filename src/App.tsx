import useFetch from "./hooks/useFetch";
import PokeData from "./components/PokeData";
import PokeSidebar from "./components/PokeSidebar";
import { PokemonContextProvider } from "./contexts/PokemonContext";
import "./App.css";
import Spinner from "./components/Spinner";

function App() {
  type PokeData = {
    [key: string]: any;
  };

  const POKEDEX_ENDPOINT = "https://pokeapi.co/api/v2/pokemon?limit=151";
  const { data, loading }: { data: PokeData; loading: boolean } =
    useFetch(POKEDEX_ENDPOINT);

  const pokedex = data.results;
  return (
    <div className="App h-screen bg-slate-500">
      <header className="App-header flex">
        <div className="image-header flex-1 basis-1/2">
          <img
            className="relative m-auto"
            src="/pokemon-logo.svg"
            alt="Pokemon Logo"
            width={360}
            height={74}
          />
        </div>
      </header>
      <main>
        {loading ? (
          <div data-testid="spinner" className="spinner-container h-screen flex justify-center items-center">
            <Spinner size={240} />
          </div>
        ) : (
          <div data-testid='pokedex' className="pokedex">
            <PokemonContextProvider>
              <div className="pokedex__container flex w-full flex-wrap">
                <PokeData />
                <PokeSidebar pokedex={pokedex} />
              </div>
            </PokemonContextProvider>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
