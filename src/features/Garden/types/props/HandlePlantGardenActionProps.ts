import type { plantMapObjectType, PlantType } from "@/shared/types";
import type { GardenRemovalActions } from "../GardenRemovalActions";

export interface HandlePlantGardenActionProps {
    plant: plantMapObjectType
    action: string
    removeFromGarden: (plant: PlantType, name: string, action: GardenRemovalActions) => void
    setPlantDetails: (val: plantMapObjectType | null) => void
    setShowPlantDetails: (val: boolean) => void
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>
    inventoryCount: number
    maxInventorySpace: number
}