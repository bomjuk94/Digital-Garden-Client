import type { StoreSupply } from "../models"

export interface SetSingleSupplyProps {
    e: React.MouseEvent<HTMLButtonElement>
    setCursorToTool: (name: string, effect?: StoreSupply) => void
    supply: StoreSupply
    closeModal: () => void
    removeSupply: (effect: string) => void
}