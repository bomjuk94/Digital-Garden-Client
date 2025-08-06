import type { PlantType } from "../models";
import type { CapacityKeyType } from "../models";
import type { CapcityType } from "../CapacityType";

export interface HarvestPlantProps {
    plant: PlantType
    plantExists: (id: string, name: string) => boolean
    inventoryCount: number
    maxInventorySpace: number
    resetCursor: () => void
    addToInventory: (val: PlantType, name: string, multiplier?: number) => void
    removePlant: (id: string) => void
    setPlantCapacity: (capacityKey: CapacityKeyType, type?: CapcityType, val?: number) => void
    incrementInventoryCount: (multiplier?: number) => void
    pruneInactiveBuffs: () => Promise<void>
}