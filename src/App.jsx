import Pokedex from './components/Pokedex/Pokedex'
import { motion } from "motion/react";
import CustomRoutes from './routes/CustomRoutes';
import { Link } from 'react-router-dom';

function App() {

  return (
    <>
      <div
        className="h-[120px] flex items-center justify-center bg-white shadow-md"
      >
        <Link to={'/'} className="flex items-center gap-4 text-black text-4xl font-bold">
          {/* Pokéball SVG with spin animation */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="w-10 h-10"
            animate={{ rotate: [0, 20, -20, 10, 0] }}
            transition={{ repeat: Infinity, repeatDelay: 1, duration: 1, ease: "easeInOut" }}
          >
            <circle cx="128" cy="128" r="96" fill="red" />
            <path d="M32 128h192" stroke="black" strokeWidth="16" />
            <circle cx="128" cy="128" r="24" fill="white" stroke="black" strokeWidth="8" />
          </motion.svg>

          Pokédex
        </Link>
      </div>

      <CustomRoutes />
    </ >
  )
}

export default App