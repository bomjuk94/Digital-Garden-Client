import type { PlantBuffTimerType, PlantBuffType } from "@/shared/types"
import { isTimedBuff } from "../utilities.ts/isTimedBuff"
import type { ShowActiveBuffsProps } from "../types/props/ShowActiveBuffsProps"

export const useHandleShowActiveBuffs = () => {

    const handleShowActiveBuffs = ({
        buffs,
        setPlantBuffs,
        toggleModal,
    }: ShowActiveBuffsProps) => {
        const activeBuffs: (PlantBuffType | PlantBuffTimerType)[] = []
        buffs.map((buff) => {
            if (buff.effect.duration === 'temporary') {
                if (isTimedBuff(buff) && buff.expirationTime > Date.now()) {
                    activeBuffs.push(buff)
                }
            } else {
                activeBuffs.push(buff)
            }
        })
        setPlantBuffs(activeBuffs)
        toggleModal('plantBuffs')
    }

    return { handleShowActiveBuffs }
}