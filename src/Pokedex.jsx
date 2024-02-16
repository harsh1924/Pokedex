import Search from "./Search";
import PokemonList from './PokemonList'
export default function Pokedex() {

    return (
        <div className="pokedex-wrapper">
            <Search />
            <PokemonList />
        </div>
    )
}