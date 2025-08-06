import type { plantMapObjectType } from "@/shared/types"
import type { PlantType } from "@/shared/types"
import type { GardenRemovalActions } from "../GardenRemovalActions"

export interface HarvestPlantFromGardenProps {
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>
    plant: plantMapObjectType
    inventoryCount: number
    maxInventorySpace: number
    removeFromGarden: (plant: PlantType, name: string, action: GardenRemovalActions) => void
}