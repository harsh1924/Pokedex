import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const topPokemons = [
    { id: 493, name: "Arceus", total: 720 },
    { id: 150, name: "Mewtwo", total: 680 },
    { id: 384, name: "Rayquaza", total: 680 },
    { id: 249, name: "Lugia", total: 680 },
    { id: 248, name: "Tyranitar", total: 600 },
    { id: 646, name: "Kyurem", total: 660 },
    { id: 382, name: "Kyogre", total: 670 },
    { id: 383, name: "Groudon", total: 670 },
    { id: 487, name: "Giratina", total: 680 },
    { id: 888, name: "Zacian", total: 720 },
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

export const StrongestPokemon = () => {
    const [topList, setTopList] = useState([]);

    useEffect(() => {
        async function fetchTopPokemon() {
            const results = await Promise.all(
                topPokemons.map(async (p) => {
                    const [pokemonRes, speciesRes] = await Promise.all([
                        axios.get(`https://pokeapi.co/api/v2/pokemon/${p.id}`),
                        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${p.id}`),
                    ]);

                    const pokemon = pokemonRes.data;
                    const species = speciesRes.data;

                    return {
                        id: p.id,
                        name: p.name,
                        image:
                            pokemon.sprites.other["official-artwork"].front_default ||
                            pokemon.sprites.front_default,
                        types: pokemon.types,
                        totalStats: p.total,
                        isLegendary: species.is_legendary,
                        isMythical: species.is_mythical,
                    };
                })
            );

            setTopList(results);
        }

        fetchTopPokemon();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {topList.map((p) => (
                <Link
                    to={`/pokemon/${p.id}`}
                    key={p.id}
                    className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition"
                >
                    <img
                        src={p.image}
                        alt={p.name}
                        className="w-32 h-32 mx-auto"
                    />
                    <h2 className="text-xl font-bold text-center capitalize mt-2">{p.name}</h2>
                    <div className="text-sm text-center text-gray-600 mb-1">
                        Base Stat Total: <strong>{p.totalStats}</strong>
                    </div>
                    <div className="flex justify-center gap-2 mt-1">
                        {p.types.map((t, i) => (
                            <span
                                key={i}
                                className={`text-white text-xs px-2 py-1 rounded-full ${typeColors[t.type.name]}`}
                            >
                                {t.type.name.toUpperCase()}
                            </span>
                        ))}
                    </div>
                    {(p.isLegendary || p.isMythical) && (
                        <div className="mt-2 text-center">
                            <span className="inline-block px-3 py-1 text-sm rounded-full bg-yellow-400 font-semibold text-black">
                                {p.isMythical ? "Mythical" : "Legendary"}
                            </span>
                        </div>
                    )}
                </Link>
            ))}
        </div>

    )
}
