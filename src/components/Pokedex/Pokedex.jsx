import { useEffect, useState } from 'react';
import PokemonList from '../PokemonList/PokemonList';
import Search from '../Search/Search';
import { StrongestPokemon } from '../StrongestPokemon/StrongestPokemon';
import SpecialPokemon from '../SpecialPokemon/SpecialPokemon';
import LegendaryPokemon from '../LegendaryPokemon/LegendaryPokemon';
import MythicalPokemon from '../MythicalPokemon/MythicalPokemon';
import StarterPokemon from '../Starters/StarterPokemon';

const Pokedex = () => {
    const [search, setSearch] = useState("");
    const [view, setView] = useState("default");

    // Load view from localStorage on mount
    useEffect(() => {
        const savedView = localStorage.getItem("pokedex-view");
        if (savedView) {
            setView(savedView);
        }
    }, []);

    // Save view to localStorage whenever it changes
    const handleViewChange = (newView) => {
        setView(newView);
        localStorage.setItem("pokedex-view", newView);
    };

    return (
        <div className='flex flex-col py-10 gap-y-3 bg-[#e9eae5]'>
            <div className="mx-auto text-center">
                <h1 className='font-bold font-serif text-xl'>
                    Pokédex
                </h1>
                <p className='mx-auto text-sm'>
                    Search for a Pokemon by name.
                </p>
            </div>

            <Search setSearch={setSearch} />

            <div className="flex overflow-x-scroll scrollbar-hide justify-center gap-3 px-4">
                <button
                    onClick={() => handleViewChange("default")}
                    className='rounded-md bg-rose-500 hover:bg-rose-600 px-4 py-2 text-white font-bold tracking-wide text-lg transition-transform hover:scale-105 shadow cursor-pointer'
                >
                    All
                </button>
                <button
                    onClick={() => handleViewChange("starter")}
                    className="rounded-md bg-emerald-500 hover:bg-emerald-600 px-4 py-2 text-white font-bold tracking-wide text-lg transition-transform hover:scale-105 shadow cursor-pointer"
                >
                    Starter
                </button>

                <button
                    onClick={() => handleViewChange("strongest")}
                    className="rounded-md bg-red-500 hover:bg-red-600 px-4 py-2 text-white font-bold tracking-wide text-lg transition-transform hover:scale-105 shadow cursor-pointer"
                >
                    Strongest
                </button>
                <button
                    onClick={() => handleViewChange("mythical")}
                    className="rounded-md bg-purple-500 hover:bg-purple-600 px-4 py-2 text-white font-bold tracking-wide text-lg transition-transform hover:scale-105 shadow cursor-pointer"
                >
                    Mythical
                </button>
                <button
                    onClick={() => handleViewChange("legendary")}
                    className="rounded-md bg-yellow-500 hover:bg-yellow-600 px-4 py-2 text-white font-bold tracking-wide text-lg transition-transform hover:scale-105 shadow cursor-pointer"
                >
                    Legendary
                </button>
                <button
                    onClick={() => handleViewChange("special")}
                    className="rounded-md bg-pink-500 hover:bg-pink-600 px-4 py-2 text-white font-bold tracking-wide text-lg transition-transform hover:scale-105 shadow cursor-pointer"
                >
                    Ultra Beasts
                </button>
            </div>

            <div className="h-[1px] bg-gray-400 mt-3" />

            {search.length === 0 && view === "default" && <PokemonList search={'all'} />}
            {search.length > 0 && <PokemonList search={search} />}

            {view === "strongest" && <StrongestPokemon />}
            {view === "mythical" && <MythicalPokemon />}
            {view === "legendary" && <LegendaryPokemon />}
            {view === "special" && <SpecialPokemon />}
            {view === "starter" && <StarterPokemon />}
        </div>
    );
};

export default Pokedex;
