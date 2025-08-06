import type { PlantType } from "@/shared/types"

export interface IsHarvestableProps {
    isFullyMature: boolean
    isReady: boolean
    plant: PlantType
}