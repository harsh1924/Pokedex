import { Routes, Route } from 'react-router-dom';
import Pokedex from './Pokedex';
import PokemonDetails from './PokemonDetails';

export default function CustomRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Pokedex />} />
            <Route path='/pokemon/:id' element={<PokemonDetails />} />
        </Routes>
    )
}