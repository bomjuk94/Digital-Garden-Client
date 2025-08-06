import type { plantMapObjectType, PlantType } from "@/shared/types"
import type { GardenRemovalActions } from "../GardenRemovalActions"

export interface DiscardPlantFromGardenProps {
    removeFromGarden: (plant: PlantType, name: string, action: GardenRemovalActions) => void
    plant: plantMapObjectType
}