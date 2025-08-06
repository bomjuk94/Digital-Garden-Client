import type { PlantType } from "@/shared/types"

export interface IsPlantDeadProps {
    isReady: boolean
    isNotMature: boolean
    plant: PlantType
    now: number
}