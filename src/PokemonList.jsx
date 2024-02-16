import { useEffect, useState } from "react"
import axios from 'axios'
import './PokemonList.css'
import Pokemon from "./Pokemon";

export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLodaing] = useState(true);
    const [URL, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [nextURL, setNextURL] = useState('');
    const [prevURL, setPrevURL] =useState('');

    async function downloadPokemons() {
        setIsLodaing(true);
        const response = await axios.get(URL);
        const pokemonResults = response.data.results;
        setNextURL(response.data.next);
        setPrevURL(response.data.previous);

        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultPromise);
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types,
                id: pokemon.id
            }
        })
        console.log(res);
        setPokemonList(res);
        setIsLodaing(false);
    }
    useEffect(() => {
        downloadPokemons();
    }, [URL]);
    return (
        <div>
            <div className="pokemon-list-wrapper">
                List of pokemons
                {(isLoading) ? 'Loading...' :
                    pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
                }
            </div>
            <div>
                <button disabled={prevURL == null} onClick={() => setUrl(prevURL)}>Prev</button>
                <button disabled={nextURL == null}onClick={() => setUrl(nextURL)}>Next</button>
            </div>
        </div>
    )
}