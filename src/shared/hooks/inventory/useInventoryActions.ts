import { useInventoryStore } from "@/shared/stores/useInventoryStore"
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import { useUserModeStore } from "@/shared/stores/useUserModeStore"

export const useInventoryActions = () => {
    const userMode = useUserModeStore((s) => s.userMode)
    // guest
    const inventoryCount = useInventoryStore((s) => s.inventoryCount)
    const maxInventorySpace = useInventoryStore((s) => s.maxInventorySpace)
    const decrementInventoryCount = useInventoryStore((s) => s.decrementInventoryCount)
    const addToInventory = useInventoryStore((s) => s.addToInventory)
    const removeFromInventory = useInventoryStore((s) => s.removeFromInventory)
    const plantExists = useInventoryStore((s) => s.plantExists)
    const incrementInventoryCount = useInventoryStore((s) => s.incrementInventoryCount)
    const pruneInactiveBuffs = useInventoryStore((s) => s.pruneInactiveBuffs)
    const getMaxInventorySpace = useInventoryStore((s) => s.getMaxInventorySpace)
    // registered
    const registeredInventoryCount = useRegisteredUserGameStore((s) => s.registeredInventoryCount)
    const maxRegisteredInventorySpace = useRegisteredUserGameStore((s) => s.maxRegisteredInventorySpace)
    const decrementRegisteredInventoryCount = useRegisteredUserGameStore((s) => s.decrementRegisteredInventoryCount)
    const addToRegisteredInventory = useRegisteredUserGameStore((s) => s.addToRegisteredInventory)
    const removeRegisteredPlantFromInventory = useRegisteredUserGameStore((s) => s.removeRegisteredPlantFromInventory)
    const registeredPlantExists = useRegisteredUserGameStore((s) => s.registeredPlantExists)
    const incrementRegisteredInventoryCount = useRegisteredUserGameStore((s) => s.incrementRegisteredInventoryCount)
    const pruneInactiveRegisteredBuffs = useRegisteredUserGameStore((s) => s.pruneInactiveRegisteredBuffs)
    const getRegisteredMaxInventorySpace = useRegisteredUserGameStore((s) => s.getRegisteredMaxInventorySpace)

    if (userMode === 'guest') {
        return {
            inventoryCount,
            maxInventorySpace,
            decrementInventoryCount,
            addToInventory,
            removeFromInventory,
            plantExists,
            incrementInventoryCount,
            pruneInactiveBuffs,
            getMaxInventorySpace,
        }
    }

    return {
        inventoryCount: registeredInventoryCount,
        maxInventorySpace: maxRegisteredInventorySpace,
        decrementInventoryCount: decrementRegisteredInventoryCount,
        addToInventory: addToRegisteredInventory,
        removeFromInventory: removeRegisteredPlantFromInventory,
        plantExists: registeredPlantExists,
        incrementInventoryCount: incrementRegisteredInventoryCount,
        pruneInactiveBuffs: pruneInactiveRegisteredBuffs,
        getMaxInventorySpace: getRegisteredMaxInventorySpace,
    }
}