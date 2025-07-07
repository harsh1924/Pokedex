import { useEffect, useState } from 'react';
import PokemonList from '../PokemonList/PokemonList';
import Search from '../Search/Search';
import { StrongestPokemon } from '../StrongestPokemon/StrongestPokemon';
import SpecialPokemon from '../SpecialPokemon/SpecialPokemon';
import LegendaryPokemon from '../LegendaryPokemon/LegendaryPokemon';
import MythicalPokemon from '../MythicalPokemon/MythicalPokemon';
import StarterPokemon from '../Starters/StarterPokemon';
import MegaEvolutions from '../MegaPokemon/MegaEvolutions';
import PseudoLegendaryPokemon from '../PsuedoLegendary/PseudoLegendaryPokemon';
import ParadoxPokemon from '../ParadoxPokemon/ParadoxPokemon';
import GigantamaxPokemon from '../GigantamaxPokemon/GigantamaxPokemon';

const buttonViews = [
    { label: "All", value: "default" },
    { label: "Starter", value: "starter" },
    { label: "Strongest", value: "strongest" },
    { label: "Mythical", value: "mythical" },
    { label: "Legendary", value: "legendary" },
    { label: "Ultra Beasts", value: "special" },
    { label: "Mega Evolution", value: "mega" },
    { label: "Pseudo-Legendary", value: "pseudo" },
    { label: "Paradox", value: "paradox" },
    { label: "Gigantamax", value: "gmax" },
];

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

            <div className="overflow-x-auto w-full scrollbar-hide px-4 h-[60px] flex items-center font-serif">
                <div className="flex whitespace-nowrap gap-3">
                    {buttonViews.map(({ label, value }) => {
                        const isActive = view === value;
                        return (
                            <button
                                key={value}
                                onClick={() => handleViewChange(value)}
                                className={`min-w-fit px-4 py-2 rounded-md font-extrabold tracking-wide text-lg transition-transform hover:scale-105 shadow-[4px_4px_0_0_#000] translate-y-[-4px] border-2 cursor-pointer
                                        ${isActive
                                        ? "bg-red-500 text-white border-black"
                                        : "bg-white text-black border-black"
                                    }`}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>


            <div className="h-[1px] bg-gray-400 mt-3" />

            {search.length === 0 && view === "default" && <PokemonList search={'all'} />}
            {search.length > 0 && <PokemonList search={search} />}

            {view === "strongest" && <StrongestPokemon />}
            {view === "mythical" && <MythicalPokemon />}
            {view === "legendary" && <LegendaryPokemon />}
            {view === "special" && <SpecialPokemon />}
            {view === "starter" && <StarterPokemon />}
            {view === "mega" && <MegaEvolutions />}
            {view === "pseudo" && <PseudoLegendaryPokemon />}
            {view === "paradox" && <ParadoxPokemon />}
            {view === "gmax" && <GigantamaxPokemon />}
        </div>
    );
};

export default Pokedex;
