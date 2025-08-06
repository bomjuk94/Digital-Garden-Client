import type { HandlePlantClickProps } from "../types"
import { waterPlant } from "../utils.ts/waterPlant"
import { harvestPlant } from "../utils.ts/harvestPlant"
import { boostYieldOrGrowth } from "../utils.ts/boostYieldOrGrowth"

export const useHandlePlantClick = () => {

    const handlePlantClick = ({
        plant,
        i,
        cursorToToolActive,
        activeTool,
        resetCursor,
        setIsWatered,
        setHasBeenWateredThisCycle,
        plantExists,
        addToInventory,
        removePlant,
        setPlantCapacity,
        setActiveIndex,
        inventoryCount,
        maxInventorySpace,
        incrementInventoryCount,
        setPlantBoost,
        pruneInactiveBuffs,
    }: HandlePlantClickProps) => {

        if (cursorToToolActive) {
            if (activeTool === 'water-plant') {
                waterPlant({
                    plant,
                    resetCursor,
                    setIsWatered,
                    setHasBeenWateredThisCycle,
                })
            } else if (activeTool === 'harvest-plant') {
                harvestPlant({
                    plant,
                    plantExists,
                    inventoryCount,
                    maxInventorySpace,
                    resetCursor,
                    addToInventory,
                    removePlant,
                    setPlantCapacity,
                    incrementInventoryCount,
                    pruneInactiveBuffs,
                })
            } else if (
                activeTool === 'boostYield' ||
                activeTool === 'boostGrowth'
            ) {
                boostYieldOrGrowth({
                    plant,
                    activeTool,
                    setPlantBoost,
                    resetCursor,
                    plantExists,
                })
                if (!plant || !plant.id) return
            }
        } else {
            setActiveIndex((prev) => (prev === i ? undefined : i))
        }
    }

    return { handlePlantClick }
}