import type { IsReadyForNextGrowthPhaseProps } from "../types"
import { getNextPhase } from "@/shared/utils.ts/getNextPhase"
import { calculateNextPhaseTime } from "@/shared/utils.ts/calculateNextPhaseTime"
import type { GrowthPhaseType } from "@/shared/types/GrowthPhaseType"
import { getPlantMultiplier } from "./getPlantMultiplier"

export const isReadyForNextGrowthPhase = ({
    isReady,
    isNotMature,
    plant,
    now,
}: IsReadyForNextGrowthPhaseProps) => {
    if (isReady && isNotMature && plant.isWatered) {
        const nextPhase = getNextPhase(plant.growthPhase)

        return {
            ...plant,
            growthPhase: nextPhase,
            nextPhaseAt: calculateNextPhaseTime(nextPhase as GrowthPhaseType, getPlantMultiplier(plant)),
            isWatered: false,
            hasBeenWateredThisCycle: false,
            missedWaterings: 0,
            lastUpdated: now
        }
    }
    return null
}