import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingState from "../LoadingState";

const getTypeColor = (type) => {
  const colors = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    poison: "bg-purple-500",
    normal: "bg-gray-400",
    electric: "bg-yellow-400",
    psychic: "bg-pink-500",
    fighting: "bg-orange-600",
    ground: "bg-yellow-700",
    rock: "bg-yellow-800",
    bug: "bg-lime-500",
    ghost: "bg-indigo-600",
    steel: "bg-gray-500",
    dragon: "bg-indigo-800",
    dark: "bg-gray-800",
    fairy: "bg-pink-300",
    ice: "bg-cyan-400",
    flying: "bg-sky-400",
  };
  return colors[type] || "bg-gray-300";
};

function getPriorityLabel(priority) {
  if (priority >= 4) return { label: "Extreme Priority", color: "text-green-700" };
  if (priority === 3) return { label: "Very High Priority", color: "text-green-600" };
  if (priority === 2) return { label: "High Priority", color: "text-green-500" };
  if (priority === 1) return { label: "Above Normal", color: "text-green-400" };
  if (priority === 0) return { label: "Normal Priority", color: "text-gray-800" };
  if (priority === -1) return { label: "Below Normal", color: "text-orange-500" };
  if (priority === -2) return { label: "Low Priority", color: "text-orange-600" };
  if (priority <= -3) return { label: "Very Low Priority", color: "text-red-600" };
  return { label: "Unknown", color: "text-gray-500" };
}


const getCategoryColor = (category) => {
  const colors = {
    physical: "bg-red-400",
    special: "bg-blue-400",
    status: "bg-yellow-500",
  };
  return colors[category] || "bg-gray-300";
};

const MoveDetails = () => {
  const { moveName } = useParams();
  const [move, setMove] = useState(null);
  const [loading, setLoading] = useState(true);
  const [learnedBy, setLearnedBy] = useState([]);
  const [visibleCount, setVisibleCount] = useState(24);

  useEffect(() => {
    const fetchMove = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/move/${moveName}`);
        setMove(res.data);
        setLearnedBy(res.data.learned_by_pokemon);
      } catch (err) {
        console.error("Failed to load move:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMove();
  }, [moveName]);

  if (loading) return <LoadingState />;

  if (!move) return <p className="text-center mt-10 text-gray-600">Move not found.</p>;

  const priorityInfo = getPriorityLabel(move.priority);

  return (
    <div className="min-h-screen bg-[#ede4d6] shadow-md py-10 px-4 font-serif">
      <div className="max-w-xl mx-auto p-6 bg-[#fbf4e8] rounded-xl shadow-sm space-y-4">
        {/* Move Name */}
        <h1 className="text-3xl flex items-center justify-between capitalize font-black">
          {move.name.replace("-", " ")}

          {/* Move Type */}
          <span className="text-sm font-semibold px-1 py-1 rounded-full">
            <span className={`capitalize font-bold text-lg text-white px-2 py-0.5 rounded ${getTypeColor(move.type.name)}`}>{move.type.name}</span>
          </span>
        </h1>

        {/* Move category */}
        <div className="flex flex-wrap justify-between items-center gap-2 rounded-md">
          <span className="text-sm flex text-center flex-col font-semibold px-3 py-1 uppercase">
            <span className="text-xl">Category</span>
            <span className={`capitalize font-bold text-white px-2 py-0.5 ml-1 rounded ${getCategoryColor(move.damage_class.name)}`}>
              {move.damage_class.name}
            </span>
          </span>

          {/* Power */}
          <div className="w-[1px] h-[50px] bg-gray-400" />
          <p className="flex text-center flex-col">
            <span className="font-bold text-xl">{move.power ?? "—"}</span>
            <strong className="text-lg">Power</strong>
          </p>

          {/* Accuracy */}
          <div className="w-[1px] h-[50px] bg-gray-400" />
          <p className="flex text-center flex-col">
            <strong>Accuracy</strong> {move.accuracy ?? "—"}%
          </p>
        </div>

        {/* PP */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <p className="flex flex-col text-center">
            <span className="font-bold text-xl">{move.pp}/20</span>
            <strong>PP</strong>
          </p>

          {/* Priority */}
          <p className="flex flex-col text-center">
            <span className={`font-bold text-xl ${priorityInfo.color}`}>{move.priority}</span>
            <strong>Priority</strong>
          </p>
        </div>

        {/* Effect */}
        <p className="text-sm text-gray-800 mt-2 bg-[#f0e4d1] px-2 py-4 font-bold rounded-md">
          {move.effect_entries?.[0]?.short_effect.replace("$effect_chance", move.effect_chance ?? "")}
        </p>
      </div>

      {/* Pokemon that knows this move */}
      {learnedBy.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl text-center font-bold mb-3 text-gray-800">Pokémon that learn this move</h2>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {learnedBy.slice(0, visibleCount).map((poke) => {
              const id = poke.url.split("/").filter(Boolean).pop();
              return (
                <Link
                  key={poke.name}
                  to={`/pokemon/${id}`}
                  className="text-center bg-white rounded-lg shadow hover:shadow-md transition p-2"
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                    alt={poke.name}
                    className="w-30 h-30 object-contain mx-auto"
                  />
                  <p className="uppercase tracking-wider font-bold text-sm mt-1">
                    {poke.name}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Load More */}
      {visibleCount < learnedBy.length && (
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
  );
};

export default MoveDetails;