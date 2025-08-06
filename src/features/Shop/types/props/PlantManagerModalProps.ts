import type { plantMapObjectType } from "@/shared/types"

export interface PlantManagerModalProps {
    plant: plantMapObjectType | null
    onPlantManagerDetailsClose: () => void
}