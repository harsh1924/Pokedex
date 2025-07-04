import axios from 'axios';
import { useEffect, useState } from 'react'
import LoadingState from '../LoadingState';
import Pokemon from '../Pokemon/Pokemon';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PokemonList = () => {
    const [PokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [nextURL, setNextURL] = useState("");
    const [prevURL, setPrevURL] = useState("");
    const [POKEDEX_URL, setPokedexURL] = useState("https://pokeapi.co/api/v2/pokemon");

    async function DownloadPokemons() {
        setIsLoading(true);
        const res = await axios.get(POKEDEX_URL);
        const pokemonResults = res.data.results;
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultPromise);
        setNextURL(res.data.next);
        setPrevURL(res.data.previous);
        console.log(pokemonData);

        const result = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                name: pokemon.name,
                image: pokemon.sprites.other ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types,
                id: pokemon.id,
                height: pokemon.height,
                weight: pokemon.weight,
                abilities: pokemon.abilities
            }
        })
        setPokemonList(result);
        setIsLoading(false);
    }
    useEffect(() => {
        DownloadPokemons()
    }, [POKEDEX_URL]);

    return (
        <>
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
                            height={pokemon.height}
                            weight={pokemon.weight}
                            abilities={pokemon.abilities}
                        />
                    )}
            </div>
            <div className="flex justify-center items-center gap-6 mt-6">
                {/* Prev Button */}
                <button
                    disabled={!prevURL}
                    onClick={() => setPokedexURL(prevURL)}
                    className={`w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ${prevURL
                        ? 'bg-white hover:bg-red-500 hover:text-white hover:scale-110'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
    `}
                    aria-label="Previous"
                >
                    <ArrowLeft size={20} />
                </button>

                {/* Next Button */}
                <button
                    disabled={!nextURL}
                    onClick={() => setPokedexURL(nextURL)}
                    className={`w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ${nextURL
                        ? 'bg-white hover:bg-red-500 hover:text-white hover:scale-110'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
    `}
                    aria-label="Next"
                >
                    <ArrowRight size={20} />
                </button>
            </div>

        </>
    )
}

export default PokemonList