import { useToolsStore } from "../stores/useToolsStore"
import { showToast } from "./showToast"
import type { BoostYieldOrGrowthProps } from "../types/props/BoostYieldOrGrowthProps"

export const boostYieldOrGrowth = ({
    plant,
    activeTool,
    setPlantBoost,
    resetCursor,
    plantExists,
}: BoostYieldOrGrowthProps) => {
    if (!plant || !plant.id) return

    const toolEffect = useToolsStore.getState().toolEffect
    if (!toolEffect) return

    const buffO = {
        name: activeTool,
        effect: toolEffect,
        multiplier: toolEffect?.multiplier
    }
    if (plantExists(plant.id, plant.name)) {
        return showToast('error', 'Plant does not exist')
    }
    setPlantBoost(plant.id, buffO)
    resetCursor()
}