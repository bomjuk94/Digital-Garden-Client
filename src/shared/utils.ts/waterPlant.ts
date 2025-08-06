import { showToast } from "./showToast"
import type { WaterPlantProps } from "../types/props/WaterPlantProps"

export const waterPlant = ({
    plant,
    resetCursor,
    setIsWatered,
    setHasBeenWateredThisCycle,
}: WaterPlantProps) => {
    if (!plant || !plant.id) return
    if (plant.isHarvestable) {
        showToast('success', 'Plant is ready to be harvested!')
        resetCursor()
        return
    }
    if (plant.isDead) {
        showToast('error', 'Plant is dead, harvest the plant in order to remove it.')
        resetCursor()
        return
    }
    if (plant.hasBeenWateredThisCycle) {
        showToast('error', `You have already watered the ${plant.label} this growth phase`)
        resetCursor()
        return
    }
    setIsWatered(plant.id, true)
    setHasBeenWateredThisCycle(plant.id, true)
    resetCursor()
}