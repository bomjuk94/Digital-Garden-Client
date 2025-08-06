import type { plantMapType } from "@/shared/types"
import { useState } from "react"

export const usePaginateGardenList = (garden: plantMapType) => {
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 5

    const gardenList = Object.values(garden)
    const totalPages = Math.ceil(gardenList.length / itemsPerPage)
    const paginatedPlants = gardenList.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
    )

    return { paginatedPlants, totalPages, currentPage, setCurrentPage }
}