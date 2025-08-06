import type { PlantBuffType, PlantBuffTimerType } from "@/shared/types"
import { isTimedBuff } from "./isTimedBuff"

export const getActiveBuffsCount = (buffs: (PlantBuffType | PlantBuffTimerType)[]) => {
    if (!buffs) return 0
    return buffs.filter((buff) =>
        buff.effect.duration === "temporary"
            ? isTimedBuff(buff) && buff.expirationTime > Date.now()
            : true
    ).length
}