import { useState } from "react";
import type { Seed } from "../types/types";

export const useHandleSeedClick = () => {

    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const handleSeedClick = (seed: Seed, i: number) => {
        if (seed.count > 0 && !seed.locked) {
            setActiveIndex(i)
        }
    }

    return { handleSeedClick, activeIndex, setActiveIndex }
}