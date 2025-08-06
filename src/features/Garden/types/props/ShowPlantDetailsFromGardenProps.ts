import type { plantMapObjectType, PlantType } from "@/shared/types"

export interface ShowPlantDetailsFromGardenProps {
    setPlantDetails: (val: plantMapObjectType | null) => void
    setShowPlantDetails: (val: boolean) => void
    setActiveIndex: (value: React.SetStateAction<number | null>) => void
    plant: plantMapObjectType
}