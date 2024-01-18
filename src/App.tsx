import useFetch from "./hooks/useFetch";
import PokeData from "./components/PokeData";
import PokeSidebar from "./components/PokeSidebar";
import { PokemonContextProvider } from "./contexts/PokemonContext";
import "./App.css";
import Spinner from "./components/Spinner";

function App() {

  type PokeData ={
    [key:string] : any;
  }

  const POKEDEX_ENDPOINT = "https://pokeapi.co/api/v2/pokemon?limit=151";
  const { data, loading}: { data: PokeData, loading:boolean} =
    useFetch(POKEDEX_ENDPOINT);

  const pokedex = data.results;
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        {loading ? (
          <div className="spinner-container h-screen flex justify-center items-center">
          <Spinner size={240}/> 
        </div>
        ) : (
          <div className="pokedex">
            <PokemonContextProvider>
              <div className="pokedex flex" style={{ width: "100%", margin: '0 50px'  }}>
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
