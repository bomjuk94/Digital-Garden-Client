import type { PlantBuffTimerType, PlantBuffType } from "@/shared/types";
import type { ModalType } from "@/shared/types";

export interface ShowActiveBuffsProps {
    buffs: (PlantBuffType | PlantBuffTimerType)[]
    setPlantBuffs: (buffs: (PlantBuffType | PlantBuffTimerType)[]) => void
    toggleModal: (modal: ModalType) => void
}