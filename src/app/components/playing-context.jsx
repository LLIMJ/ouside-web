"use client";

import { createContext, useContext, useState } from "react";

const PlayingContext = createContext(null);

export function PlayingProvider({ children }) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <PlayingContext.Provider value={{ isPlaying, setIsPlaying }}>
            {children}
        </PlayingContext.Provider>
    );
}

export const usePlaying = () => useContext(PlayingContext);