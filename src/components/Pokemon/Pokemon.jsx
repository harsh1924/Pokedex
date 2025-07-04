import { Link } from "react-router-dom";

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

const Pokemon = ({ name, image, id, types }) => {
    return (
        <Link
            to={`/pokemon/${id}`}
            className="w-48 bg-white rounded-xl shadow-md p-4 flex flex-col items-center gap-2 hover:cursor-pointer hover:shadow-lg"
        >
            <p className="text-sm font-black font-mono">#{id}</p>
            <img src={image} alt="Charmeleon" className="w-24 h-24 object-contain" />
            <h2 className="text-lg font-bold tracking-widest">
                {name.toUpperCase()}
            </h2>
            <div className="flex gap-2">
                <span className='flex gap-1'>
                    {types.map(t => (
                        <div 
                        className={`text-white px-3 py-1 rounded-full text-xs font-semibold ${typeColors[t.type.name]}`}
                        key={t.type.name}
                        >
                            {t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
                        </div>
                    ))}
                </span>
                {/* <span>
                    {abilities.map(ability => (
                        <div className="">
                            {ability.ability.name}
                        </div>
                    ))}
                </span> */}
            </div>
        </Link>

    )
}

export default Pokemon