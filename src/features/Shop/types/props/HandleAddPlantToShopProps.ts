import type { plantMapObjectType, PlantType } from "@/shared/types"

export interface HandleAddPlantToShopProps {
    item: plantMapObjectType
    addToShop: (val: PlantType, name: string) => void
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>
}