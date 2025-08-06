import type { plantMapObjectType, PlantType } from "@/shared/types"

export interface HandleAddPlantToGardenProps {
    item: plantMapObjectType
    addToGarden: (val: PlantType, name: string) => void
    removeFromInventory: (id: string, name: string, multiplier?: number) => void
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>
}