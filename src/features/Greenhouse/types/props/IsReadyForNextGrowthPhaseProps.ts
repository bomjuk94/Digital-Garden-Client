import type { PlantType } from "@/shared/types"

export interface IsReadyForNextGrowthPhaseProps {
    isReady: boolean
    isNotMature: boolean
    plant: PlantType
    now: number
}