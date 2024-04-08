import PokeData from "./components/PokeData";
import PokeSidebar from "./components/PokeSidebar";
import { PokemonContextProvider } from "./contexts/PokemonContext";
import { pokedexStatus } from "./components/PokedexSlice";
import { useSelector } from "react-redux";
import "./App.css";
import Spinner from "./components/Spinner";

function App() {
  const status = useSelector(pokedexStatus);

  return (
    <div className='App h-screen bg-slate-500'>
      <header className='App-header flex'>
        <div className='image-header flex-1 basis-1/2'>
          <img
            className='relative m-auto'
            src='/pokemon-logo.svg'
            alt='Pokemon Logo'
            width={360}
            height={74}
          />
        </div>
      </header>
      <main>
        {status !== "succeeded" ? (
          <div
            data-testid='spinner'
            className='spinner-container h-screen flex justify-center items-center'
          >
            <Spinner size={240} />
          </div>
        ) : (
          <div data-testid='pokedex' className='pokedex'>
            <PokemonContextProvider>
              <div className='pokedex__container flex w-full flex-wrap'>
                <PokeData />
                <PokeSidebar />
              </div>
            </PokemonContextProvider>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
