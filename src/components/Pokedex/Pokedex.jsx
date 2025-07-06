import { useState } from 'react';
import PokemonList from '../PokemonList/PokemonList'
import Search from '../Search/Search'
import { StrongestPokemon } from '../StrongestPokemon/StrongestPokemon';

const Pokedex = () => {
    const [search, setSearch] = useState("");

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
            {search.length === 0 ? <PokemonList search={'all'} /> : <PokemonList search={search} />}
            {/* <StrongestPokemon /> */}
        </div>
    )
}

export default Pokedex