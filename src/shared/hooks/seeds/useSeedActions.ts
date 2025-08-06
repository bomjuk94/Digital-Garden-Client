import { useSeedsStore } from "@/features/Greenhouse/stores/useSeedsStore"
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import { useUserModeStore } from "@/shared/stores/useUserModeStore"

export const useSeedActions = () => {
    const userMode = useUserModeStore.getState().userMode
    // guest
    const setSeedCount = useSeedsStore.getState().setSeedCount
    const unlockSeed = useSeedsStore.getState().unlockSeed
    const addRandomSeedToList = useSeedsStore.getState().addRandomSeedToList
    // registered
    const setRegisteredSeedCount = useRegisteredUserGameStore.getState().setRegisteredSeedCount
    const unlockRegisteredSeed = useRegisteredUserGameStore.getState().unlockRegisteredSeed
    const addRandomRegisteredSeedToList = useRegisteredUserGameStore.getState().addRandomRegisteredSeedToList

    if (userMode === 'guest') {
        return {
            setSeedCount,
            unlockSeed,
            addRandomSeedToList,
        }
    }

    return {
        setSeedCount: setRegisteredSeedCount,
        unlockSeed: unlockRegisteredSeed,
        addRandomRegisteredSeedToList: addRandomRegisteredSeedToList,
    }
}