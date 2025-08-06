import { useState, useEffect, useRef } from "react"
import type { PlantType } from "@/shared/types"

export const usePaginatedPlantManagerList = (plants: PlantType[]) => {
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 1

    const totalPages = Math.ceil(plants.length / itemsPerPage)

    const prevLengthRef = useRef(plants.length)

    useEffect(() => {
        if (plants.length !== prevLengthRef.current) {
            setCurrentPage(0)
            prevLengthRef.current = plants.length
        }
    }, [plants.length])

    const paginatedPlants = plants.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
    )

    return { paginatedPlants, totalPages, currentPage, setCurrentPage }
}
