import { calculateNextPhaseTime } from "@/shared/utils.ts/calculateNextPhaseTime"
import type { GrowthPhaseType } from "@/shared/types/GrowthPhaseType"
import type { IsPlantDeadProps } from "../types"
import { EffectNames } from "@/features/Effects/constants"

export const isPlantDead = ({
    isReady,
    isNotMature,
    plant,
    now
}: IsPlantDeadProps) => {
    if (isReady && isNotMature && !plant.isWatered) {
        const missedWaterings = plant.missedWaterings + 1

        if (missedWaterings >= 2) {
            return {
                ...plant,
                isDead: true,
                lastUpdated: now,
                missedWaterings,
            }
        }

        const growthMultipliers: number[] = []
        let multiplier = 0
        plant.buffs.map((buff) => {
            if (
                buff.name === EffectNames.BoostGrowth ||
                buff.name === EffectNames.BoostGrowthTimed
            ) {
                growthMultipliers.push(buff.multiplier)
            }
        })

        if (growthMultipliers.length > 0) {
            growthMultipliers.map((growthMultiplier) => multiplier += growthMultiplier)
        }

        return {
            ...plant,
            missedWaterings,
            hasBeenWateredThisCycle: false,
            nextPhaseAt: calculateNextPhaseTime(plant.growthPhase as GrowthPhaseType, multiplier)
        }
    }
    return null
}