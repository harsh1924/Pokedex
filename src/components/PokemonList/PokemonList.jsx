import axios from 'axios';
import { useEffect, useState } from 'react'
import LoadingState from '../LoadingState';
import Pokemon from '../Pokemon/Pokemon';

const PokemonList = () => {
    const [PokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon";
    async function DownloadPokemons() {
        const res = await axios.get(POKEDEX_URL);
        const pokemonResults = res.data.results;
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultPromise);

        const result = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                name: pokemon.name,
                image: pokemon.sprites.other ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types,
                id: pokemon.id
            }
        })
        setPokemonList(result);
        setIsLoading(false);
    }
    useEffect(() => {
        DownloadPokemons()
    }, []);

    return (
        <div className='flex  flex-wrap gap-4 justify-center'>
            {isLoading ?
                <LoadingState /> :
                PokemonList.map((pokemon) =>
                    <Pokemon
                        name={pokemon.name}
                        image={pokemon.image}
                        id={pokemon.id}
                        key={pokemon.id}
                        types={pokemon.types}
                    />
                )}
        </div>
    )
}

export default PokemonList