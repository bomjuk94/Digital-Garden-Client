import { showToast } from "./showToast"
import { SupplyEffectType } from "@/features/Store/types"
import { isTimedBuff } from "@/features/Greenhouse/utilities.ts"
import type { HarvestPlantProps } from "../types/props/HarvestPlantProps"

export const harvestPlant = async ({
    plant,
    plantExists,
    inventoryCount,
    maxInventorySpace,
    resetCursor,
    addToInventory,
    removePlant,
    setPlantCapacity,
    pruneInactiveBuffs,
}: HarvestPlantProps) => {
    if (!plant || !plant.id) return

    if (plantExists(plant.id, plant.name)) {
        showToast('error', 'You have already harvested this plant')
        return
    }

    if (plant.isHarvestable) {
        const buffsExist = plant.buffs.length > 0
        let count = 0
        let multiplier = 0

        if (buffsExist) {
            plant.buffs.forEach((buff) => {
                if (
                    buff.name === SupplyEffectType.BoostYield ||
                    (buff.name === SupplyEffectType.BoostYieldTimed &&
                        isTimedBuff(buff) && buff.expirationTime > Date.now())
                ) {
                    count += buff.multiplier
                    multiplier += buff.multiplier
                }
            })
            inventoryCount += count || 0
        }

        if (inventoryCount > maxInventorySpace) {
            resetCursor()
            return showToast('error', 'No more space in inventory')
        }

        if (multiplier === 0) {
            await addToInventory(plant, plant.name)
        } else {
            await addToInventory(plant, plant.name, multiplier)
        }

        removePlant(plant.id)
        setPlantCapacity('usedPlantCapacity', 'decrement')
        resetCursor()

        await pruneInactiveBuffs?.()
    } else if (plant.isDead) {
        removePlant(plant.id)
        setPlantCapacity('usedPlantCapacity', 'decrement')
        showToast('error', 'Plant is dead. It has been removed')
        resetCursor()
    } else {
        showToast('error', 'Plant is not ready to be harvested')
        resetCursor()
    }
}
