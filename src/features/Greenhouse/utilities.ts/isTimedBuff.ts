import type { PlantBuffType, PlantBuffTimerType } from "@/shared/types"

export const isTimedBuff = (buff: PlantBuffType | PlantBuffTimerType): buff is PlantBuffTimerType => {
    return 'expirationTime' in buff;
}