import { useUpgradesStore } from "@/features/Greenhouse/stores/useUpgradesStore"
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import { useUserModeStore } from "@/shared/stores/useUserModeStore"

export const useUpgradeActions = () => {
    const userMode = useUserModeStore.getState().userMode
    // guest
    const addUpgrade = useUpgradesStore.getState().addUpgrade
    const removeUpgrade = useUpgradesStore.getState().removeUpgrade
    // registered
    const addRegisteredUpgrade = useRegisteredUserGameStore.getState().addRegisteredUpgrade
    const removeRegisteredUpgrade = useRegisteredUserGameStore.getState().removeRegisteredUpgrade

    if (userMode === 'guest') {
        return {
            addUpgrade,
            removeUpgrade
        }
    }

    return {
        addUpgrade: addRegisteredUpgrade,
        removeUpgrade: removeRegisteredUpgrade,
    }
}