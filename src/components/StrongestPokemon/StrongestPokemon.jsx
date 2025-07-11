import axios from "axios";
import { useEffect, useState } from "react";

const topPokemons = [
    { id: 493, name: "Arceus", total: 720 },
    { id: 150, name: "Mewtwo", total: 680 },
    { id: 384, name: "Rayquaza", total: 680 },
    { id: 249, name: "Lugia", total: 680 },
    { id: 487, name: "Giratina", total: 680 },
    { id: 382, name: "Kyogre", total: 670 },
    { id: 383, name: "Groudon", total: 670 },
    { id: 483, name: "Dialga", total: 680 },
    { id: 250, name: "Ho-Oh", total: 680 },
    { id: 381, name: "Latios", total: 600 },
    { id: 380, name: "Latias", total: 600 },
    { id: 646, name: "Kyurem", total: 660 },
    { id: 485, name: "Heatran", total: 600 },
    { id: 386, name: "Deoxys", total: 600 },
    { id: 491, name: "Darkrai", total: 600 },
    { id: 494, name: "Victini", total: 600 },
    { id: 718, name: "Zygarde", total: 700 },
    { id: 898, name: "Calyrex", total: 680 },
    { id: 888, name: "Zacian", total: 720 },
    { id: 889, name: "Zamazenta", total: 720 },
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

const statColors = {
    defense: "bg-[#73bf71]",
    hp: "bg-[#ca5a57]",
    attack: "bg-[#e08049]",
    "special-attack": "bg-[#41aebd]",
    "special-defense": "bg-[#94419c]",
    speed: "bg-[#d5396d]",
};


export const StrongestPokemon = () => {
    const [topList, setTopList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    useEffect(() => {
        async function fetchTopPokemon() {
            const results = await Promise.all(
                topPokemons.map(async (p) => {
                    const [pokemonRes, speciesRes] = await Promise.all([
                        axios.get(`https://pokeapi.co/api/v2/pokemon/${p.id}`),
                        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${p.id}`)
                    ]);

                    const pokemon = pokemonRes.data;
                    const species = speciesRes.data;

                    return {
                        id: p.id,
                        name: p.name,
                        image: pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default,
                        types: pokemon.types,
                        totalStats: p.total,
                        isLegendary: species.is_legendary,
                        isMythical: species.is_mythical,
                        stats: pokemon.stats
                    };
                })
            );

            setTopList(results);
            setSelectedPokemon(results[0]); // default
        }

        fetchTopPokemon();
    }, []);

    return (
        <div className="flex flex-col md:flex-row bg-[#1e103b] text-white rounded-lg overflow-hidden font-serif">
            {/* Left: List */}
            <div className="md:w-1/2 w-full bg-[#2b1a5a] overflow-y-auto scrollbar-hide max-h-[90vh] p-6">
                <h1 className="text-4xl font-bold mb-6">Top 20 Strongest Pokémon</h1>
                <ul className="space-y-2">
                    {topList.map((p, index) => (
                        <li
                            key={p.id}
                            className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition ${selectedPokemon?.id === p.id ? "bg-purple-700" : "hover:bg-purple-800"
                                }`}
                            onClick={() => setSelectedPokemon(p)}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg font-bold">{index + 1}</span>
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-10 h-10"
                                />
                                <span className="capitalize font-bold">{p.name}</span>
                            </div>
                            <div className="flex gap-1">
                                {p.types.map((t, i) => (
                                    <span
                                        key={i}
                                        className={`text-xs px-2 py-1 rounded-full text-white capitalize ${typeColors[t.type.name]}`}
                                    >
                                        {t.type.name}
                                    </span>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right: Details */}
            <div className="md:w-1/2 w-full bg-[#1e103b] px-6 pt-10 pb-6 flex flex-col relative gap-60">
                {selectedPokemon && (
                    <>
                        <img
                            src={selectedPokemon.image}
                            alt={selectedPokemon.name}
                            className="w-[500px] h-[500px] absolute mb-4 right-0"
                        />
                        <div>
                            <h2 className="text-6xl tracking-widest font-bold uppercase">{selectedPokemon.name}
                            </h2>
                            <p className="text-gray-300 text-sm mb-30">#{selectedPokemon.id}</p>
                        </div>

                        <div className="mt-4 w-full flex flex-col justify-end ml-0 z-1">
                            <h3 className="text-lg font-semibold mb-2">Base Stats</h3>
                            {selectedPokemon.stats.map((stat, index) => {
                                const key = stat.stat.name.replace("-", " ");
                                const color = statColors[stat.stat.name] || "bg-gray-500";
                                return (
                                    <div key={index} className="mb-2">
                                        <div className="flex justify-between text-xs font-medium">
                                            <span className="uppercase">{key}</span>
                                            <span>{stat.base_stat}</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-700 rounded">
                                            <div
                                                className={`h-2 rounded ${color}`}
                                                style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
