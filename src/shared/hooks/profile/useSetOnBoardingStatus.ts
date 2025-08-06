import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import { useUserModeStore } from "@/shared/stores/useUserModeStore"
import { useUserProfileStore } from "@/shared/stores/useUserProfileStore"

export const useSetOnBoardingStatus = () => {
    const userMode = useUserModeStore.getState().userMode
    // guest
    const setOnBoardingStatus = useUserProfileStore.getState().setOnBoardingStatus
    // registered
    const setRegisteredOnBoardingStatus = useRegisteredUserGameStore.getState().setRegisteredOnBoardingStatus

    if (userMode === 'guest') {
        return { setOnBoardingStatus }
    }

    return { setOnBoardingStatus: setRegisteredOnBoardingStatus }
}