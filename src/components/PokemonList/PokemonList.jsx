import axios from 'axios';
import { useEffect, useState } from 'react'
import LoadingState from '../LoadingState';
import Pokemon from '../Pokemon/Pokemon';

const limit = 20;

const types = [
    "bug", "dragon", "fairy", "fire", "ghost",
    "grass", "ground", "ice", "electric", "fighting",
    "flying", "normal", "poison", "psychic", "rock",
    "steel", "dark", "water"
];

const typeColors = {
    fire: "bg-[#F08030]",
    water: "bg-[#6890F0]",
    grass: "bg-[#78C850]",
    electric: "bg-[#F8D030]",
    poison: "bg-[#A040A0]",
    bug: "bg-[#A8B820]",
    normal: "bg-[#A8A878]",
    flying: "bg-[#A890F0]",
    psychic: "bg-[#F85888]",
    ice: "bg-[#98D8D8]",
    dragon: "bg-[#7038F8]",
    dark: "bg-[#705848]",
    fairy: "bg-[#EE99AC]",
    ground: "bg-[#E0C068]",
    rock: "bg-[#B8A038]",
    ghost: "bg-[#705898]",
    steel: "bg-[#B8B8D0]",
    fighting: "bg-[#C03028]",
};

const PokemonList = ({ search }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonList, setPokemonList] = useState([]);
    const [allPokemonList, setAllPokemonList] = useState([]);

    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem("pokedex_page");
        return savedPage ? parseInt(savedPage, 10) : 1;
    });
    const [typeFilter, setTypeFilter] = useState('');
    const totalPages = Math.ceil(total / limit);
    const offset = (currentPage - 1) * limit;

    useEffect(() => {
        localStorage.setItem("pokedex_page", currentPage.toString());
        if (typeFilter) {
            DownloadPokemonsByType();
        } else {
            DownloadPokemons();
        }
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
            .then(res => setAllPokemonList(res.data.results))
            .catch(err => console.error("Error fetching all Pokémon", err));
    }, [currentPage, typeFilter]);

    async function DownloadPokemons() {
        setIsLoading(true);
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const pokemonResults = res.data.results;
        const pokemonResultPromise = pokemonResults.map(p => axios.get(p.url));
        const pokemonData = await axios.all(pokemonResultPromise);
        setTotal(res.data.count);

        const result = pokemonData.map(pokeData => {
            const pokemon = pokeData.data;
            return {
                name: pokemon.name,
                image: pokemon.sprites.other?.dream_world.front_default || pokemon.sprites.front_shiny,
                types: pokemon.types,
                id: pokemon.id,
                height: pokemon.height,
                weight: pokemon.weight,
                abilities: pokemon.abilities
            }
        });
        setPokemonList(result);
        setIsLoading(false);
    }

    async function DownloadPokemonsByType() {
        setIsLoading(true);
        const res = await axios.get(`https://pokeapi.co/api/v2/type/${typeFilter}`);
        const allPokemon = res.data.pokemon.map(p => p.pokemon);
        const currentSet = allPokemon.slice(offset, offset + limit);

        const data = await axios.all(currentSet.map(p => axios.get(p.url)));
        const result = data.map(pokeData => {
            const pokemon = pokeData.data;
            return {
                name: pokemon.name,
                image: pokemon.sprites.other?.dream_world.front_default || pokemon.sprites.front_shiny,
                types: pokemon.types,
                id: pokemon.id,
                height: pokemon.height,
                weight: pokemon.weight,
                abilities: pokemon.abilities
            }
        });

        setTotal(allPokemon.length);
        setPokemonList(result);
        setIsLoading(false);
    }

    return (
        <>
            {/* Type Filter Dropdown */}
            <div className="flex overflow-y-scroll scrollbar-hide gap-4 p-4">
                {types.map(type => (
                    <button
                        key={type}
                        onClick={() => setTypeFilter(type)} // your filter logic
                        className={`rounded-full px-4 py-2 w-full text-white font-bold tracking-wide text-lg transition-transform hover:scale-105 shadow ${typeColors[type]} cursor-pointer`}
                    >
                        {type.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className='flex flex-wrap gap-4 justify-center h-[700px] overflow-scroll scrollbar-hide'>
                {isLoading ? (
                    <LoadingState />
                ) : (
                    <>
                        {search === 'all' ? pokemonList.map(pokemon => (
                            <Pokemon
                                name={pokemon.name}
                                image={pokemon.image}
                                id={pokemon.id}
                                key={pokemon.id}
                                types={pokemon.types}
                            />
                        )) : allPokemonList
                            .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
                            .slice(0, 20) // optionally limit results
                            .map((p, idx) => (
                                <Pokemon
                                    key={p.name}
                                    id={p.url.split("/")[6]}
                                    name={p.name}
                                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.url.split("/")[6]}.png`}
                                    types={[]} // optional — you can fetch more detail if needed
                                />
                            ))

                        }
                    </>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                    className="px-3 py-1 bg-red-600 text-white rounded disabled:opacity-50"
                >
                    First
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page =>
                        page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2
                    )
                    .map((page, i, arr) => {
                        const prev = arr[i - 1];
                        const showEllipsis = prev && page - prev > 1;
                        return (
                            <span key={page}>
                                {showEllipsis && <span className="px-2">...</span>}
                                <button
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 rounded font-semibold ${page === currentPage
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
                    className="px-3 py-1 bg-red-600 text-white rounded disabled:opacity-50"
                >
                    Last
                </button>
            </div>
        </>
    )
}

export default PokemonList;
