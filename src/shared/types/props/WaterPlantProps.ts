import type { PlantType } from "../models"

export interface WaterPlantProps {
    plant: PlantType
    resetCursor: () => void
    setIsWatered: (id: string, val: boolean) => void
    setHasBeenWateredThisCycle: (id: string, val: boolean) => void
}