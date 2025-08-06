import type { PlantBuffType, PlantType } from "../models"
import type { CapacityKeyType } from "../models"
import type { CapcityType } from "../CapacityType"

export interface HandlePlantClickProps {
    plant: PlantType
    i: number
    cursorToToolActive: boolean
    activeTool: string | null
    resetCursor: () => void
    setIsWatered: (id: string, val: boolean) => void
    setHasBeenWateredThisCycle: (id: string, val: boolean) => void
    plantExists: (id: string, name: string) => boolean
    addToInventory: (val: PlantType, name: string, multiplier?: number) => void
    removePlant: (id: string) => void
    setPlantCapacity: (capacityKey: CapacityKeyType, type?: CapcityType, val?: number) => void
    setActiveIndex: React.Dispatch<React.SetStateAction<number | undefined>>
    inventoryCount: number
    maxInventorySpace: number
    incrementInventoryCount: (multiplier?: number) => void,
    setPlantBoost: (id: string, buff: PlantBuffType) => void
    pruneInactiveBuffs: () => Promise<void>
}