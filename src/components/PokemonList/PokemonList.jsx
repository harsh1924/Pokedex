import axios from 'axios';
import { useEffect, useState } from 'react'
import LoadingState from '../LoadingState';
import Pokemon from '../Pokemon/Pokemon';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const limit = 20; // Pokémon per page

const PokemonList = () => {
    const [PokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem("pokedex_page");
        return savedPage ? parseInt(savedPage, 10) : 1;
    });
    const totalPages = Math.ceil(total / limit);
    const offset = (currentPage - 1) * limit;

    async function DownloadPokemons() {
        setIsLoading(true);
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const pokemonResults = res.data.results;
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultPromise);
        setTotal(res.data.count); // total = 1302
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
        localStorage.setItem("pokedex_page", currentPage.toString());
        DownloadPokemons()
    }, [currentPage]);

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
                        />
                    )}
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                    className="px-3 py-1 bg-red-600 text-white rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    First
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                        (page) =>
                            page === 1 || // always show first
                            page === totalPages || // always show last
                            Math.abs(page - currentPage) <= 2 // current ±2
                    )
                    .map((page, i, arr) => {
                        const prev = arr[i - 1];
                        const showEllipsis = prev && page - prev > 1;

                        return (
                            <span key={page}>
                                {showEllipsis && <span className="px-2">...</span>}
                                <button
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 rounded font-semibold
                                    ${page === currentPage
                                            ? "bg-red-600 text-white"
                                            : "bg-white text-red-600 border border-red-600 hover:bg-red-100"}`}

                                >
                                    {page}
                                </button>
                            </span>
                        );
                    })}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    className="px-3 py-1 bg-red-600 text-white rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Last
                </button>
            </div>
        </>
    )
}

export default PokemonList