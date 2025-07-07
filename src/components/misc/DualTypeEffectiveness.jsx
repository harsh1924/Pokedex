import axios from "axios";
import { useEffect, useState } from "react";

const allTypes = [
    "normal", "fire", "water", "electric", "grass", "ice",
    "fighting", "poison", "ground", "flying", "psychic", "bug",
    "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

const multiplierMap = {
    0: "No Effect (0×)",
    0.25: "Double Resistant (¼×)",
    0.5: "Resistant (½×)",
    1: "Neutral (1×)",
    2: "Weak (2×)",
    4: "Very Weak (4×)"
};

export default function DualTypeEffectiveness() {
    const [selectedTypes, setSelectedTypes] = useState(["fire", "flying"]);
    const [typeData, setTypeData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTypes = async () => {
            setLoading(true);
            const allDamageMaps = await Promise.all(
                selectedTypes.map(async (type) => {
                    const typeRes = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
                    const rel = typeRes.data.damage_relations;

                    const map = {};
                    allTypes.forEach((t) => (map[t] = 1));

                    rel.double_damage_from.forEach((t) => (map[t.name] *= 2));
                    rel.half_damage_from.forEach((t) => (map[t.name] *= 0.5));
                    rel.no_damage_from.forEach((t) => (map[t.name] *= 0));

                    return map;
                })
            );

            const combined = {};
            allTypes.forEach((t) => {
                combined[t] = allDamageMaps.reduce((acc, map) => acc * map[t], 1);
            });

            setTypeData({ effectiveness: combined });
            setLoading(false);
        };

        fetchTypes();
    }, [selectedTypes]);

    return (
        <div className="bg-[#1e103b] p-6 rounded-xl max-w-3xl mx-auto font-serif text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Dual-Type Damage Matchups</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
                {selectedTypes.map((type, index) => (
                    <select
                        key={index}
                        value={type}
                        onChange={(e) => {
                            const updated = [...selectedTypes];
                            updated[index] = e.target.value;
                            setSelectedTypes(updated);
                        }}
                        className="bg-gray-900 text-white border border-gray-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        {allTypes.map((t) => (
                            <option key={t} value={t}>{t.toUpperCase()}</option>
                        ))}
                    </select>
                ))}
            </div>

            {loading ? (
                <div className="text-center text-gray-400">Loading...</div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {Object.entries(typeData.effectiveness || {}).map(([type, value]) => {
                        let color = "bg-gray-300 text-black";
                        if (value >= 4) color = "bg-red-700 text-white";
                        else if (value === 2) color = "bg-red-500 text-white";
                        else if (value === 0.5) color = "bg-blue-500 text-white";
                        else if (value === 0.25) color = "bg-blue-700 text-white";
                        else if (value === 0) color = "bg-gray-600 text-white";

                        return (
                            <div
                                key={type}
                                className={`rounded-xl px-4 py-3 text-center font-semibold text-md tracking-wide shadow ${color}`}
                            >
                                {type.toUpperCase()}<br />
                                <span className="text-sm font-normal block mt-1">
                                    {multiplierMap[value] || `${value}×`}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}