import type { StoreSupply } from "../models"
import type { PlantBuffTimerType } from "@/shared/types"

export interface HandleSupplyUseProps {
    supply: StoreSupply
    e: React.MouseEvent<HTMLButtonElement>
    setCursorToTool: (name: string, effect?: StoreSupply) => void
    closeModal: () => void
    removeSupply: (id: string) => void
    applyBuffToAllPlants: (buff: PlantBuffTimerType) => void
}