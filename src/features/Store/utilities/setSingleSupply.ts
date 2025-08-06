import type { SetSingleSupplyProps } from "../types/props/SetSingleSupplyProps";

export const setSingleSupply = ({
    e,
    setCursorToTool,
    supply,
    closeModal,
    removeSupply,
}: SetSingleSupplyProps) => {
    e.stopPropagation();
    setCursorToTool(supply.effect, supply)
    closeModal()
    removeSupply(supply.id)
}