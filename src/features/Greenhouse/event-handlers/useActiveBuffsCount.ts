import { useEffect, useState } from "react"
import type { PlantBuffType, PlantBuffTimerType } from "@/shared/types"
import type { PlantType } from "@/shared/types"
import { getActiveBuffsCount } from "../utilities.ts/getActiveBuffsCount"

export const useActiveBuffsCount = (plants: PlantType[]) => {
    const [buffCounts, setBuffCounts] = useState<number[]>([])

    useEffect(() => {
        if (!plants || plants.length === 0) return

        const updateCounts = () => {
            const counts = plants.map((plant) =>
                getActiveBuffsCount(plant.buffs as (PlantBuffType | PlantBuffTimerType)[])
            )
            setBuffCounts(counts)
        }

        updateCounts()
        const interval = setInterval(updateCounts, 1000)

        return () => clearInterval(interval)
    }, [plants])

    return buffCounts
}
