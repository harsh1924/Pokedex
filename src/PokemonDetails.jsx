import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios'

export default function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});

    async function downloadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name)
        })
    }

    useEffect(() => {
        downloadPokemon();
    }, [])
    return (
        <div>
            name: {pokemon.name}
            <img src={pokemon.image} />
            Height: {pokemon.height}
            Weight: {pokemon.weight}
            Types: 
            {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
        </div>
    )
}
