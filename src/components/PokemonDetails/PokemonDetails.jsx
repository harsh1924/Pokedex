/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import LoadingState from "../LoadingState";
import { motion } from "motion/react";

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

const abilityColors = {
    competitive: "bg-[#FF69B4]",
    "inner-focus": "bg-[#C7489D]",
    "illuminate": "bg-[#FFE96B]",
    "thick-fat": "bg-[#8CB7E0]",
    "stench": "bg-[#AA8131]",
    "drizzle": "bg-[#BD3481]",
    "speed-boost": "bg-[#669DB8]",
    "battle-armor": "bg-[#DDF099]",
    "sturdy": "bg-[#AA4CFA]",
    "damp": "bg-[#88FCC2]",
    "limber": "bg-[#A22005]",
    "sand-veil": "bg-[#6DFCA2]",
    "static": "bg-[#A81259]",
    "volt-absorb": "bg-[#A37F37]",
    "water-absorb": "bg-[#C5703F]",
    "oblivious": "bg-[#17CA51]",
    "cloud-nine": "bg-[#4E66C3]",
    "compound-eyes": "bg-[#BE1861]",
    "insomnia": "bg-[#C84BAE]",
    "color-change": "bg-[#C0B793]",
    "immunity": "bg-[#F80716]",
    "flash-fire": "bg-[#848172]",
    "shield-dust": "bg-[#A442A8]",
    "own-tempo": "bg-[#0CAC41]",
    "suction-cups": "bg-[#8013C7]",
    "intimidate": "bg-[#881476]",
    "shadow-tag": "bg-[#6A9F6E]",
    "rough-skin": "bg-[#48194D]",
    "wonder-guard": "bg-[#F4174E]",
    "levitate": "bg-[#FE6132]",
    "effect-spore": "bg-[#90AED3]",
    "synchronize": "bg-[#CE11EE]",
    "clear-body": "bg-[#103175]",
    "natural-cure": "bg-[#34D840]",
    "lightning-rod": "bg-[#D4BEDC]",
    blaze: "bg-red-500",
    overgrow: "bg-green-500",
    torrent: "bg-blue-500",
    shield_dust: "bg-yellow-500",
    run_away: "bg-purple-500",
    pressure: "bg-gray-600",
    inner_focus: "bg-pink-500",
    swift_swim: "bg-cyan-500",
    chlorophyll: "bg-lime-500",
    volt_absorb: "bg-blue-400",
    "flame-body": "bg-rose-500",
    "magma-armor": "bg-[#1150DD]",
    "water-veil": "bg-[#6D810B]",
    "magnet-pull": "bg-[#B784EE]",
    "soundproof": "bg-[#437F3A]",
    "rain-dish": "bg-[#591FFA]",
    "sand-stream": "bg-[#CA2658]",
    "early-bird": "bg-[#00AF31]",
    "keen-eye": "bg-[#0B1AD0]",
    "hyper-cutter": "bg-[#B4BCFC]",
    "pickup": "bg-[#4E1196]",
    "truant": "bg-[#C939F7]",
    "hustle": "bg-[#2CDFA7]",
    "cute-charm": "bg-[#0CB593]",
    "plus": "bg-[#D7D18C]",
    "minus": "bg-[#DABE6E]",
    "forecast": "bg-[#D4E677]",
    "sticky-hold": "bg-[#CB79B2]",
    "shed-skin": "bg-[#504060]",
    "guts": "bg-[#F6C0F7]",
    "marvel-scale": "bg-[#C1412D]",
    "liquid-ooze": "bg-[#F2C606]",
    "swarm": "bg-[#6B3D43]",
    "rock-head": "bg-[#E2A28C]",
    "drought": "bg-[#86B1D0]",
    "arena-trap": "bg-[#EA93BD]",
    "vital-spirit": "bg-[#DC9195]",
    "white-smoke": "bg-[#CF9B7E]",
    "pure-power": "bg-[#A49A46]",
    "shell-armor": "bg-[#2087B4]",
    "air-lock": "bg-[#6D7275]",
    "tangled-feet": "bg-[#AD44B9]",
    "motor-drive": "bg-[#C70C24]",
    "rivalry": "bg-[#2FDC75]",
    "steadfast": "bg-[#BA2EB7]",
    "snow-cloak": "bg-[#7B81EC]",
    "gluttony": "bg-[#3C25DE]",
    "anger-point": "bg-[#D75C85]",
    "unburden": "bg-[#FD8661]",
    "heatproof": "bg-[#661946]",
    "simple": "bg-[#A00B93]",
    "dry-skin": "bg-[#3D87A2]",
    "download": "bg-[#3F66A1]",
    "iron-fist": "bg-[#947CEC]",
    "poison-heal": "bg-[#A16718]",
    "adaptability": "bg-[#1BBDF9]",
    "skill-link": "bg-[#FA52DC]",
    "hydration": "bg-[#8AE871]",
    "solar-power": "bg-[#B92F16]",
    "quick-feet": "bg-[#89431E]",
    "normalize": "bg-[#B24801]",
    "sniper": "bg-[#29B4CD]",
    "magic-guard": "bg-[#51E118]",
    "no-guard": "bg-[#23EAD7]",
    "stall": "bg-[#BDC929]",
    "technician": "bg-[#844DD0]",
    "leaf-guard": "bg-[#CB8D1E]",
    "klutz": "bg-[#CB2155]",
    "mold-breaker": "bg-[#847C91]",
    "super-luck": "bg-[#F89359]",
    "aftermath": "bg-[#1D82F6]",
    "anticipation": "bg-[#BD654A]",
    "forewarn": "bg-[#9AD9C7]",
    "unaware": "bg-[#BBDA3B]",
    "tinted-lens": "bg-[#31AD99]",
    "filter": "bg-[#A0F124]",
    "slow-start": "bg-[#AA827B]",
    "scrappy": "bg-[#D14B61]",
    "storm-drain": "bg-[#119FA3]",
    "ice-body": "bg-[#95CE2B]",
    "solid-rock": "bg-[#B2A521]",
    "snow-warning": "bg-[#E82BE2]",
    "honey-gather": "bg-[#A7DF8E]",
    "frisk": "bg-[#7BC5A6]",
    "reckless": "bg-[#3B71FA]",
    "multitype": "bg-[#48ED0B]",
    "flower-gift": "bg-[#EDA460]",
    "bad-dreams": "bg-[#D92FB6]",
    "pickpocket": "bg-[#7087F3]",
    "sheer-force": "bg-[#0C5BD1]",
    "contrary": "bg-[#D362DA]",
    "unnerve": "bg-[#EF9F34]",
    "defiant": "bg-[#59E008]",
    "defeatist": "bg-[#BAA74F]",
    "cursed-body": "bg-[#D010BB]",
    "healer": "bg-[#B6277E]",
    "friend-guard": "bg-[#D3CC29]",
    "weak-armor": "bg-[#C5A364]",
    "heavy-metal": "bg-[#476CC2]",
    "light-metal": "bg-[#7E82DA]",
    "multiscale": "bg-[#FA6CC5]",
    "toxic-boost": "bg-[#D114C7]",
    "flare-boost": "bg-[#648CE5]",
    "harvest": "bg-[#1CCB1E]",
    "telepathy": "bg-[#93FCD7]",
    "moody": "bg-[#71C3A2]",
    "overcoat": "bg-[#F5145A]",
    "poison-touch": "bg-[#DEB13A]",
    "regenerator": "bg-[#3F27F3]",
    "big-pecks": "bg-[#EB96C9]",
    "sand-rush": "bg-[#D66E1A]",
    "wonder-skin": "bg-[#EC3742]",
    "analytic": "bg-[#409D90]",
    "illusion": "bg-[#FF9346]",
    "imposter": "bg-[#E73A12]",
    "infiltrator": "bg-[#42D9AB]",
    "mummy": "bg-[#D6BDAC]",
    "moxie": "bg-[#9E4B09]",
    "justified": "bg-[#248A97]",
    "rattled": "bg-[#BA19C5]",
    "magic-bounce": "bg-[#F04F13]",
    "sap-sipper": "bg-[#8AFC44]",
    "prankster": "bg-[#9D6F36]",
    "sand-force": "bg-[#9CBE89]",
    "iron-barbs": "bg-[#274598]",
    "zen-mode": "bg-[#C0E8BD]",
    "victory-star": "bg-[#F0D60A]",
    "turboblaze": "bg-[#DBAB21]",
    "teravolt": "bg-[#52F748]",
    "run-away": "bg-[#F38B4C]",
    // ... continues up to all 230+ abilities
};


export const PokemonDetails = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const [pokemon, setPokemon] = useState([]);
    const [captureRate, setCaptureRate] = useState(null);
    const [visibleCount, setVisibleCount] = useState(24);
    const [evolutionLine, setEvolutionLine] = useState([]);
    const [relatedPokemon, setRelatedPokemon] = useState([]);
    const [baseFriendship, setBaseFriendship] = useState(null);
    const [damageRelations, setDamageRelations] = useState(null);

    async function DownloadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        // console.log(response.data);
        const data = response.data;
        setPokemon({
            name: data.name,
            image: data.sprites.other ? data.sprites.other.dream_world.front_default : data.sprites.front_shiny,
            weight: data.weight,
            height: data.height,
            abilities: data.abilities,
            moves: data.moves,
            stats: data.stats,
            types: data.types
        });

        // Fetch species data to get capture rate
        const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        setCaptureRate(speciesRes.data.capture_rate);

        setIsLoading(false);
    }

    async function DownloadRelatedPokemon(typesArray) {
        const allPokemonMap = new Map();

        for (const type of typesArray) {
            const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
            const data = response.data;

            for (const p of data.pokemon) {
                const id = p.pokemon.url.split("/").slice(-2, -1)[0];

                // Avoid duplicates
                if (!allPokemonMap.has(id)) {
                    allPokemonMap.set(id, {
                        name: p.pokemon.name,
                        id,
                        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
                    });
                }
            }
        }

        // Now fetch actual types for each unique Pokémon
        const allRelated = [];
        const promises = Array.from(allPokemonMap.values()).map(async (poke) => {
            const response = await axios.get(poke.url);
            const types = response.data.types.map(t => t.type.name); // real types

            allRelated.push({
                name: poke.name,
                id: poke.id,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`,
                types, // this is now an array, e.g. ['poison', 'flying']
            });
        });

        await Promise.all(promises);
        setRelatedPokemon(allRelated);
    }


    async function fetchEvolutionChain(pokemonName) {
        try {
            const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
            const evoChainUrl = speciesRes.data.evolution_chain.url;

            const evoRes = await axios.get(evoChainUrl);
            const chain = evoRes.data.chain;

            const evolutionArray = [];
            let current = chain;

            while (current) {
                const name = current.species.name;
                const idMatch = current.species.url.match(/\/pokemon-species\/(\d+)\//);
                const id = idMatch ? idMatch[1] : null;

                evolutionArray.push({
                    name,
                    id,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                });

                if (current.evolves_to.length > 0) {
                    current = current.evolves_to[0]; // handle linear evolution for now
                } else {
                    current = null;
                }
            }

            setEvolutionLine(evolutionArray);
        } catch (err) {
            console.error("Evolution fetch failed", err);
        }
    }

    function getCaptureRateInfo(rate) {
        if (rate >= 200) {
            return {
                label: "Very Easy",
                color: "bg-green-500",
                emoji: "🟢",
            };
        } else if (rate >= 150) {
            return {
                label: "Easy",
                color: "bg-lime-500",
                emoji: "🟩",
            };
        } else if (rate >= 100) {
            return {
                label: "Moderate",
                color: "bg-yellow-500",
                emoji: "🟡",
            };
        } else if (rate >= 50) {
            return {
                label: "Hard",
                color: "bg-orange-500",
                emoji: "🟠",
            };
        } else {
            return {
                label: "Very Hard",
                color: "bg-red-500",
                emoji: "🔴",
            };
        }
    }


    async function fetchSpeciesDetails(pokemonName) {
        try {
            const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
            setBaseFriendship(speciesRes.data.base_happiness);
        } catch (err) {
            console.error("Species fetch failed", err);
        }
    }

    async function fetchDamageRelations(types) {
        const relations = {
            double_damage_from: new Set(),
            half_damage_from: new Set(),
            no_damage_from: new Set(),

            double_damage_to: new Set(),
            half_damage_to: new Set(),
            no_damage_to: new Set(),
        };

        for (const type of types) {
            const res = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
            const rel = res.data.damage_relations;

            rel.double_damage_from.forEach(t => relations.double_damage_from.add(t.name));
            rel.half_damage_from.forEach(t => relations.half_damage_from.add(t.name));
            rel.no_damage_from.forEach(t => relations.no_damage_from.add(t.name));

            rel.double_damage_to.forEach(t => relations.double_damage_to.add(t.name));
            rel.half_damage_to.forEach(t => relations.half_damage_to.add(t.name));
            rel.no_damage_to.forEach(t => relations.no_damage_to.add(t.name));
        }

        return {
            double_damage_from: Array.from(relations.double_damage_from),
            half_damage_from: Array.from(relations.half_damage_from),
            no_damage_from: Array.from(relations.no_damage_from),

            double_damage_to: Array.from(relations.double_damage_to),
            half_damage_to: Array.from(relations.half_damage_to),
            no_damage_to: Array.from(relations.no_damage_to),
        };
    }

    useEffect(() => {
        DownloadPokemon();
    }, [id]);

    useEffect(() => {
        if (pokemon?.types?.length) {
            const typesArray = pokemon.types.map(t => t.type.name);
            DownloadRelatedPokemon(typesArray);
            fetchDamageRelations(typesArray).then(setDamageRelations);
        }
    }, [pokemon]);

    useEffect(() => {
        if (id) {
            fetchEvolutionChain(id);
            fetchSpeciesDetails(id);
        }
    }, [id]);

    return (
        <>
            {isLoading ? <LoadingState /> :
                <>
                    <div className="mx-auto mt-10 p-6 rounded-xl bg-white">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1 flex flex-col items-center">
                                {/* Left: Image */}
                                <img
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                    className="w-60 h-60 object-contain"
                                />

                                {/* Mobile Details Section */}
                                <div className="flex-1 md:hidden">
                                    <h2 className="text-3xl font-bold capitalize mb-2">
                                        #{id.toString().padStart(3, "0")} {pokemon.name}
                                    </h2>

                                    {/* Types */}
                                    <div className="flex gap-2 mb-4">
                                        {pokemon.types?.slice(0, 10).map(t => (
                                            <div
                                                className={`text-white px-3 py-1 rounded-md text-xs font-semibold ${typeColors[t.type.name]}`}
                                                key={t.type.name}
                                            >
                                                {t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
                                            </div>
                                        ))}
                                    </div>

                                    {/* About Section */}
                                    <div className="mb-4">
                                        <h3 className="font-bold text-lg mb-1">About</h3>

                                        <div className="text-sm text-gray-700 space-y-1">
                                            {/* Height and Weight */}
                                            <p>
                                                <strong>Height:</strong> {pokemon.height / 10} m
                                            </p>
                                            <p>
                                                <strong>Weight:</strong> {pokemon.weight / 10} kg
                                            </p>

                                            {/* Abilities */}
                                            <div className="flex gap-1">
                                                <strong>Abilities:</strong>
                                                {pokemon.abilities?.map(a => (
                                                    <div
                                                        className={`tracking-wider px-3 py-1 rounded-md text-xs font-semibold ${abilityColors[a.ability.name]} text-white`}
                                                        key={a.ability.slot}
                                                    >
                                                        {a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Capture Rate */}
                                            {captureRate !== null && (() => {
                                                const info = getCaptureRateInfo(captureRate);
                                                const percentage = Math.round((captureRate / 255) * 100);

                                                return (
                                                    <div className="mt-2">
                                                        <p className="font-medium mb-1">Capture Rate:</p>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className={`px-2 py-0.5 text-white text-xs rounded ${info.color}`}>
                                                                {info.emoji} {captureRate}/255
                                                            </span>
                                                            <span className="text-xs text-gray-600 italic">({info.label})</span>
                                                        </div>
                                                        <div className="w-full h-2 bg-gray-200 rounded">
                                                            <div
                                                                className={`h-full rounded ${info.color}`}
                                                                style={{ width: `${percentage}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                );
                                            })()}

                                        </div>
                                    </div>

                                    {/* Stats Section */}
                                    <div>
                                        <h3 className="font-bold text-lg mb-2">Base Stats</h3>
                                        <div className="space-y-2">
                                            {pokemon.stats?.map((stat, index) => (
                                                <div key={index}>
                                                    <div className="flex justify-between text-sm font-medium text-gray-800">
                                                        <span className="uppercase">{stat.stat.name.replace('-', ' ')}</span>
                                                        <span>{stat.base_stat}</span>
                                                    </div>
                                                    <div className="w-full h-3 bg-gray-200 rounded">
                                                        <motion.div
                                                            initial={{ scaleX: 0 }}
                                                            animate={{ scaleX: `${Math.min(stat.base_stat, 100)}%` }}
                                                            transition={{ duration: 0.8, ease: "easeInOut" }}
                                                            className="h-3 bg-orange-500 rounded origin-left"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Moves Section */}
                                <div className="w-full mt-6">
                                    <h3 className="text-lg font-bold mb-2">Moves</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-[300px] overflow-y-auto pr-1">
                                        {pokemon.moves?.slice(0, 24).map((m, index) => (
                                            <Link
                                                to={`/move/${m.move.name}`}
                                                key={index}
                                                className="bg-gray-100 text-gray-800 rounded-md px-3 py-2 text-xs font-semibold capitalize shadow hover:bg-gray-200 transition cursor-pointer"
                                            >
                                                {m.move.name.replace(/-/g, " ")}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* Right: Info */}
                            <div className="md:flex flex-1 flex-col hidden">
                                <h2 className="text-3xl font-bold capitalize mb-2">
                                    #{id.toString().padStart(3, "0")} {pokemon.name}
                                </h2>

                                {/* Types */}
                                <div className="flex gap-2 mb-4">
                                    {pokemon.types?.slice(0, 10).map(t => (
                                        <div
                                            className={`text-white px-3 py-1 rounded-md text-xs font-semibold ${typeColors[t.type.name]}`}
                                            key={t.type.name}
                                        >
                                            {t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
                                        </div>
                                    ))}
                                </div>

                                {/* About Section */}
                                <div className="mb-4">
                                    <h3 className="font-bold text-lg mb-1">About</h3>

                                    {/* Abilities, height, weight */}
                                    <div className="text-sm text-gray-700 space-y-1">
                                        {/* Height and Weight */}
                                        <p>
                                            <strong>Height:</strong> {pokemon.height / 10} m
                                        </p>
                                        <p>
                                            <strong>Weight:</strong> {pokemon.weight / 10} kg
                                        </p>

                                        {/* Abilities */}
                                        <div className="flex gap-1 items-center">
                                            <strong>Abilities:</strong>
                                            {pokemon.abilities?.map(a => (
                                                <div
                                                    className={`tracking-wider px-3 py-1 rounded-md text-xs font-semibold ${abilityColors[a.ability.name]} text-white`}
                                                    key={a.ability.slot}
                                                >
                                                    {a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Capture Rate */}
                                        {captureRate !== null && (() => {
                                            const info = getCaptureRateInfo(captureRate);
                                            const percentage = Math.round((captureRate / 255) * 100);

                                            return (
                                                <div className="mt-2">
                                                    <p className="font-medium mb-1">Capture Rate:</p>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`px-2 py-0.5 text-white text-xs rounded ${info.color}`}>
                                                            {info.emoji} {captureRate}/255
                                                        </span>
                                                        <span className="text-xs text-gray-600 italic">({info.label})</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-gray-200 rounded">
                                                        <div
                                                            className={`h-full rounded ${info.color}`}
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            );
                                        })()}

                                    </div>
                                </div>

                                {/* Stats Section */}
                                <div>
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        📊 Base Stats
                                    </h3>

                                    <div className="space-y-3">
                                        {pokemon.stats?.map((stat, index) => {
                                            const value = stat.base_stat;
                                            const barColor = value >= 100 ? "bg-red-500" : "bg-orange-500";

                                            return (
                                                <div key={index}>
                                                    <div className="flex justify-between text-sm font-medium text-gray-700">
                                                        <span className="uppercase tracking-wide">{stat.stat.name.replace('-', ' ')}</span>
                                                        <span className="font-semibold text-gray-900">{value}</span>
                                                    </div>

                                                    <div className="w-full h-3 bg-gray-100 rounded overflow-hidden">
                                                        <motion.div
                                                            initial={{ scaleX: 0 }}
                                                            animate={{ scaleX: Math.min(value, 150) / 150 }}
                                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                                            className={`h-3 ${barColor} rounded origin-left`}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div>

                    <div className="h-[1px] bg-gray-300 mt-3" />

                    {/* Evolution Line */}
                    {evolutionLine.length > 1 && (
                        <div className="p-10 bg-gray-100 shadow">
                            <h3 className="font-black text-4xl text-center">Evolution Line</h3>
                            <div className="flex items-center justify-center gap-5 overflow-x-auto py-4">
                                {evolutionLine.map((poke, index) => (
                                    <div key={poke.name} className="flex items-center gap-5">
                                        <Link
                                            to={`/pokemon/${poke.id}`}
                                            className="flex flex-col items-center group"
                                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                        >
                                            <img
                                                src={poke.image}
                                                alt={poke.name}
                                                className={`w-16 h-16 object-contain mb-1 transition-transform duration-300 group-hover:scale-110 ${poke.id == id ? "ring-2 ring-orange-500" : ""}`}
                                            />
                                            <p className="text-sm capitalize font-medium">{poke.name}</p>
                                        </Link>

                                        {index < evolutionLine.length - 1 && (
                                            <span className="text-2xl text-gray-400">→</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Damage Relation from another types */}
                    {damageRelations && (
                        <div className="mt-12 px-4">
                            <h2 className="text-4xl font-extrabold text-center mb-6">Damage Relations</h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Defensive Section */}
                                <div className="bg-white shadow-xl rounded-lg p-6">
                                    <h3 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center gap-2">
                                        🛡️ Defensive
                                    </h3>
                                    <div className="space-y-4">
                                        {["double_damage_from", "half_damage_from", "no_damage_from"].map(key => (
                                            <div key={key}>
                                                <p className="text-sm font-semibold mb-2 capitalize text-gray-700">
                                                    {key.replace(/_/g, " ")}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {damageRelations[key].length > 0 ? damageRelations[key].map(t => (
                                                        <span
                                                            key={t}
                                                            className={`px-3 py-1 rounded-md text-white text-xs font-semibold shadow ${typeColors[t] || "bg-gray-400"}`}
                                                        >
                                                            {t.toUpperCase()}
                                                        </span>
                                                    )) : (
                                                        <span className="text-gray-400 italic text-sm">None</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Offensive Section */}
                                <div className="bg-white shadow-xl rounded-lg p-6">
                                    <h3 className="text-2xl font-semibold text-red-600 mb-4 flex items-center gap-2">
                                        ⚔️ Offensive
                                    </h3>
                                    <div className="space-y-4">
                                        {["double_damage_to", "half_damage_to", "no_damage_to"].map(key => (
                                            <div key={key}>
                                                <p className="text-sm font-semibold mb-2 capitalize text-gray-700">
                                                    {key.replace(/_/g, " ")}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {damageRelations[key].length > 0 ? damageRelations[key].map(t => (
                                                        <span
                                                            key={t}
                                                            className={`px-3 py-1 rounded-md text-white text-xs font-semibold shadow ${typeColors[t] || "bg-gray-400"}`}
                                                        >
                                                            {t.toUpperCase()}
                                                        </span>
                                                    )) : (
                                                        <span className="text-gray-400 italic text-sm">None</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Related Pokemon */}
                    <h1 className="font-black text-4xl text-center mt-10 pb-5">
                        Related Pokémon
                    </h1>
                    <div className="flex flex-wrap px-2 gap-5 justify-center bg-[#f3f7e6] py-4">
                        {relatedPokemon.slice(0, visibleCount).map(p => (
                            <Link
                                to={`/pokemon/${p.id}`}
                                key={p.name}
                                className="w-32 cursor-pointer"
                                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            >
                                <div className="flex justify-center gap-1">
                                    {p.types.map(t => (
                                        <div
                                            key={t}
                                            className={`text-white text-xs mt-1 px-2 py-0.5 rounded-md ${typeColors[t]} text-center font-bold`}
                                        >
                                            {t.toUpperCase()}
                                        </div>
                                    ))}
                                </div>
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-full h-24 object-contain"
                                />
                                <p className="tracking-wider text-sm capitalize font-bold mt-1 text-center">
                                    {p.name.toUpperCase()}
                                </p>
                            </Link>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="bg-[#f3f7e6]">
                        {visibleCount < relatedPokemon.length && (
                            <div className="text-center py-4">
                                <button
                                    onClick={() => setVisibleCount(prev => prev + 24)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full border-2 border-red-200 shadow-red-500 cursor-pointer shadow-md transition duration-300"
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>
                </>
            }
        </>
    )
}