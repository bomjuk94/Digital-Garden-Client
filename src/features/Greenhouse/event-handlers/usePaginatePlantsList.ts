import type { PlantType } from "@/shared/types"
import { useState } from "react"

export const usePaginatePlantsList = (plants: PlantType[]) => {
    const [currentPage, setCurrentPage] = useState(0)
    const PLANTS_PER_PAGE = 3

    if (!plants || plants.length === 0) {
        return {
            totalPages: 0,
            currentPlants: [],
            setCurrentPage,
            currentPage,
        }
    }

    const totalPages = Math.ceil(plants.length / PLANTS_PER_PAGE)
    const startIndex = currentPage * PLANTS_PER_PAGE
    const endIndex = startIndex + PLANTS_PER_PAGE
    const currentPlants = plants.slice(startIndex, endIndex)

    return {
        totalPages,
        currentPlants,
        currentPage,
        setCurrentPage,
    }
}
