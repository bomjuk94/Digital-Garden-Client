import { useUserProfileStore } from "@/shared/stores/useUserProfileStore"
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import { useUserModeStore } from "@/shared/stores/useUserModeStore"

export const useProfileActions = () => {
    const userMode = useUserModeStore.getState().userMode
    // guest
    const setBalance = useUserProfileStore.getState().setBalance
    const setPlantCapacity = useUserProfileStore((s) => s.setPlantCapacity)
    const addPlantCapacitySpace = useUserProfileStore((s) => s.addPlantCapacitySpace)
    const setLastAtShop = useUserProfileStore((s) => s.setLastAtShop)
    const getMaxPlantCapacityValue = useUserProfileStore((s) => s.getMaxPlantCapacityValue)
    // registered
    const setRegisteredProfileBalance = useRegisteredUserGameStore.getState().setRegisteredProfileBalance
    const setRegisteredPlantCapacity = useRegisteredUserGameStore((s) => s.setRegisteredPlantCapacity)
    const addRegisteredPlantCapacitySpace = useRegisteredUserGameStore((s) => s.addRegisteredPlantCapacitySpace)
    const setLastAtRegisteredShop = useRegisteredUserGameStore((s) => s.setLastAtRegisteredShop)
    const getMaxRegisteredPlantCapacityValue = useRegisteredUserGameStore((s) => s.getMaxRegisteredPlantCapacityValue)

    if (userMode === 'guest') {
        return {
            setBalance,
            setPlantCapacity,
            addPlantCapacitySpace,
            setLastAtShop,
            getMaxPlantCapacityValue,
        }
    }

    return {
        setBalance: setRegisteredProfileBalance,
        setPlantCapacity: setRegisteredPlantCapacity,
        addPlantCapacitySpace: addRegisteredPlantCapacitySpace,
        setLastAtShop: setLastAtRegisteredShop,
        getMaxPlantCapacityValue: getMaxRegisteredPlantCapacityValue,
    }
}