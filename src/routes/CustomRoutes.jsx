import { Route, Routes } from "react-router-dom"
import Pokedex from "../components/Pokedex/Pokedex"
import { PokemonDetails } from "../components/PokemonDetails/PokemonDetails"
import MoveDetails from "../components/MoveDetails/MoveDetails"

const CustomRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Pokedex />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
            <Route path="/move/:moveName" element={<MoveDetails />} />
        </Routes>
    )
}

export default CustomRoutes