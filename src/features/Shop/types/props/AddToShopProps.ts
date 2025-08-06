import type { plantMapObjectType, PlantType } from "@/shared/types"

export interface AddToShopProps {
    addToShop: (val: PlantType, name: string) => void
    item: plantMapObjectType
    setActiveIndex: (value: React.SetStateAction<number | null>) => void
}