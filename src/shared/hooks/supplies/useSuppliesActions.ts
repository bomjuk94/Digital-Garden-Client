import { useSuppliseStore } from "@/features/Greenhouse/stores/useSuppliesStore"
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import { useUserModeStore } from "@/shared/stores/useUserModeStore"

export const useSuppliesActions = () => {
    const userMode = useUserModeStore.getState().userMode
    // guest
    const addSupply = useSuppliseStore.getState().addSupply
    const removeSupply = useSuppliseStore.getState().removeSupply
    // registered
    const addRegisteredSupply = useRegisteredUserGameStore.getState().addRegisteredSupply
    const removeRegisteredSupply = useRegisteredUserGameStore.getState().removeRegisteredSupply

    if (userMode === 'guest') {
        return {
            addSupply,
            removeSupply
        }
    }

    return {
        addSupply: addRegisteredSupply,
        removeSupply: removeRegisteredSupply,
    }
}