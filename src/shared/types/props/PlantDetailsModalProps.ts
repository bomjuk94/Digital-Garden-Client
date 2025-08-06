import type { plantMapObjectType } from "../models"

export interface PlantDetailsModalProps {
    plant: plantMapObjectType | null
    onPlantDetailsClose: () => void
}