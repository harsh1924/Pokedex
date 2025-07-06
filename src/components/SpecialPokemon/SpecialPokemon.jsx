import axios from "axios";
import { useEffect, useState } from "react";

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
  hp: "bg-[#ca5a57]",
  attack: "bg-[#e08049]",
  defense: "bg-[#73bf71]",
  "special-attack": "bg-[#41aebd]",
  "special-defense": "bg-[#94419c]",
  speed: "bg-[#d5396d]",
};

// ✅ Official Ultra Beast IDs (from Pokémon Sun & Moon onwards)
const ultraBeastIds = [
  793, // Nihilego
  794, // Buzzwole
  795, // Pheromosa
  796, // Xurkitree
  797, // Celesteela
  798, // Kartana
  799, // Guzzlord
  800,
  801,
  803, // Poipole
  804, // Naganadel
  805, // Stakataka
  806, // Blacephalon
];

const SpecialPokemon = () => {
  const [ultras, setUltras] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUltraBeasts = async () => {
      const data = await Promise.all(
        ultraBeastIds.map(async (id) => {
          const [pokemonRes, speciesRes] = await Promise.all([
            axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
            axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
          ]);

          return {
            id,
            name: speciesRes.data.name,
            image: pokemonRes.data.sprites.other["official-artwork"].front_default || pokemonRes.data.sprites.front_default,
            types: pokemonRes.data.types,
            stats: pokemonRes.data.stats,
          };
        })
      );

      setUltras(data);
      setSelectedPokemon(data[0]);
      setLoading(false);
    };

    fetchUltraBeasts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1e103b] text-white font-bold text-2xl tracking-wide">
        Loading Ultra Beasts...
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row bg-[#1e103b] text-white rounded-lg overflow-hidden font-serif">
      {/* Left: List */}
      <div className="md:w-1/2 w-full bg-[#2b1a5a] p-6 overflow-y-auto max-h-[90vh]">
        <h1 className="text-4xl font-bold mb-6">Ultra Beasts</h1>
        <ul className="space-y-2">
          {ultras.map((p, index) => (
            <li
              key={p.id}
              className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition ${selectedPokemon?.id === p.id ? "bg-purple-700" : "hover:bg-purple-800"}`}
              onClick={() => setSelectedPokemon(p)}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold">{index + 1}</span>
                <img src={p.image} alt={p.name} className="w-10 h-10" />
                <span className="capitalize font-bold">{p.name}</span>
              </div>
              <div className="flex gap-1 items-center">
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
              <h2 className="text-6xl tracking-widest font-bold uppercase">
                {selectedPokemon.name}
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

export default SpecialPokemon;
