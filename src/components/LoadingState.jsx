import React from 'react'

const LoadingState = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            {/* Spinning Pokéball */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="w-16 h-16 animate-spin"
            >
                <circle cx="128" cy="128" r="96" fill="red" />
                <path d="M32 128h192" stroke="black" strokeWidth="16" />
                <circle cx="128" cy="128" r="24" fill="white" stroke="black" strokeWidth="8" />
            </svg>

            {/* Text */}
            <p className="text-black text-2xl font-extrabold tracking-wide font-mono animate-pulse">
                Loading...
            </p>
        </div>

    )
}

export default LoadingState