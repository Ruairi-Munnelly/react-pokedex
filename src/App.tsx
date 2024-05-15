import PokeData from "./components/PokeData";
import PokeSidebar from "./components/PokeSidebar";
import { pokedexStatus } from "./components/PokedexSlice";
import { useAppSelector } from "./app/hooks";
import "./App.css";
import Spinner from "./components/Spinner";

function App() {
  const status = useAppSelector(pokedexStatus);

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
            <div className='pokedex__container flex w-full flex-wrap'>
              <PokeData />
              <PokeSidebar />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
