import type { PlantBuffType, PlantBuffTimerType } from "../types"
import { isTimedBuff } from "@/features/Greenhouse/utilities.ts/isTimedBuff"

export const getActiveBuffsCount = (buffs: (PlantBuffType | PlantBuffTimerType)[]) => {
    if (!buffs) return 0

    return buffs.filter((buff) => {
        if (buff.effect.duration === "temporary") {
            return isTimedBuff(buff) && buff.expirationTime > Date.now()
        }
        return true
    }).length
}