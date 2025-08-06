import type { HandleToolBeltClickProps } from "../types/props/HandleToolBeltClickProps"

export const useToolBelt = () => {
    const handleToolBeltClick = ({
        name,
        toggleModal,
        setCursorToTool,
        setCursorToToolState,
    }: HandleToolBeltClickProps) => {
        if (name === 'plant-seed') {
            toggleModal('seeds')
        } else if (name === 'harvest-plant' || name === 'water-plant') {
            setCursorToTool(name)
            setCursorToToolState(true)
        } else if (name === 'show-inventory') {
            toggleModal('inventory')
        }
    }

    return { handleToolBeltClick }
}